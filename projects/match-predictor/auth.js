(function () {
  var currentUser = null;
  var onUserChangeCallback = null;
  var firebaseApp = null;
  var firebaseAuth = null;
  var firebaseDb = null;
  var useFirebase = false;

  var LOCAL_USERS_KEY = "predictor_users";
  var LOCAL_SESSION_KEY = "predictor_session";
  var BLOCKED_NAMES = ["aaarql"];

  function isFirebaseConfigured() {
    if (!PREDICTOR_CONFIG || !PREDICTOR_CONFIG.firebaseEnabled) return false;
    var cfg = PREDICTOR_CONFIG.firebase || {};
    return Boolean(cfg.apiKey && cfg.projectId && cfg.authDomain);
  }

  function notifyUserChange() {
    if (typeof onUserChangeCallback === "function") {
      onUserChangeCallback(currentUser);
    }
  }

  function predictionsKey(userId) {
    return "predictor_predictions_" + userId;
  }

  function readLocalUsers() {
    try {
      var raw = localStorage.getItem(LOCAL_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeLocalUsers(users) {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  }

  function normalizePhone(phone) {
    return String(phone || "").replace(/[^\d+]/g, "").trim();
  }

  function isBlockedPlayer(player) {
    var name = String((player && player.name) || "").trim().toLowerCase();
    var email = String((player && player.email) || "").trim().toLowerCase();
    return BLOCKED_NAMES.some(function (blocked) {
      return name === blocked || email === blocked || email.indexOf(blocked + "@") === 0;
    });
  }

  function hashPassword(password) {
    if (window.crypto && crypto.subtle) {
      var enc = new TextEncoder();
      return crypto.subtle
        .digest("SHA-256", enc.encode(password))
        .then(function (buf) {
          return Array.from(new Uint8Array(buf))
            .map(function (b) {
              return b.toString(16).padStart(2, "0");
            })
            .join("");
        });
    }
    var hash = 0;
    for (var i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0;
    }
    return Promise.resolve("local_" + Math.abs(hash));
  }

  function mapFirebaseUser(user) {
    return {
      id: user.uid,
      email: user.email || "",
      phone: user.phoneNumber || "",
      name: user.displayName || user.email || "Игрок",
      verified: user.emailVerified,
      mode: "firebase",
    };
  }

  function initFirebase() {
    if (!window.firebase || !isFirebaseConfigured()) return false;
    var cfg = PREDICTOR_CONFIG.firebase;
    firebaseApp = firebase.initializeApp(cfg);
    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();
    firebaseAuth.onAuthStateChanged(function (user) {
      currentUser = user ? mapFirebaseUser(user) : null;
      notifyUserChange();
    });
    return true;
  }

  function initLocalSession() {
    try {
      var sessionRaw = localStorage.getItem(LOCAL_SESSION_KEY);
      if (!sessionRaw) {
        currentUser = null;
        notifyUserChange();
        return;
      }
      var session = JSON.parse(sessionRaw);
      var users = readLocalUsers();
      var user = users.find(function (u) {
        return u.id === session.userId;
      });
      currentUser = user
        ? {
            id: user.id,
            email: user.email,
            phone: user.phone || "",
            name: user.name,
            verified: Boolean(user.verified),
            mode: "local",
          }
        : null;
    } catch (e) {
      currentUser = null;
    }
    notifyUserChange();
  }

  function init(onUserChange) {
    onUserChangeCallback = onUserChange;
    useFirebase = initFirebase();
    if (!useFirebase) initLocalSession();
  }

  function getCurrentUser() {
    return currentUser;
  }

  function isLoggedIn() {
    return Boolean(currentUser);
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isPhoneValid(phone) {
    var n = normalizePhone(phone);
    return n.length >= 8 && n.length <= 16;
  }

  function signUp(email, password, name, phone) {
    email = (email || "").trim().toLowerCase();
    password = password || "";
    name = (name || "").trim() || email.split("@")[0];
    phone = normalizePhone(phone);

    if (!isEmailValid(email)) {
      return Promise.reject(new Error("Введите корректный email"));
    }
    if (phone && !isPhoneValid(phone)) {
      return Promise.reject(new Error("Введите корректный телефон"));
    }
    if (password.length < 6) {
      return Promise.reject(new Error("Пароль — минимум 6 символов"));
    }

    if (useFirebase) {
      return firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(function (cred) {
          return cred.user
            .updateProfile({ displayName: name })
            .then(function () {
              return firebaseDb
                .collection("predictor_users")
                .doc(cred.user.uid)
                .set(
                  {
                    email: email,
                    name: name,
                    phone: phone || "",
                    predictions: {},
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                  },
                  { merge: true }
                );
            })
            .then(function () {
              return cred.user.sendEmailVerification();
            })
            .then(function () {
              return cred.user.reload().then(function () {
                return mapFirebaseUser(firebaseAuth.currentUser);
              });
            });
        })
        .catch(function (err) {
          throw new Error(formatFirebaseError(err));
        });
    }

    var users = readLocalUsers();
    if (users.some(function (u) {
      return u.email === email;
    })) {
      return Promise.reject(new Error("Email уже зарегистрирован"));
    }
    if (phone && users.some(function (u) {
      return normalizePhone(u.phone) === phone;
    })) {
      return Promise.reject(new Error("Телефон уже зарегистрирован"));
    }

    return hashPassword(password).then(function (passwordHash) {
      var user = {
        id: "local_" + Date.now(),
        email: email,
        phone: phone || "",
        name: name,
        passwordHash: passwordHash,
        verified: true,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      writeLocalUsers(users);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ userId: user.id }));
      currentUser = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        verified: true,
        mode: "local",
      };
      notifyUserChange();
      return currentUser;
    });
  }

  function signIn(email, password) {
    email = (email || "").trim().toLowerCase();
    password = password || "";
    if (!email || !password) {
      return Promise.reject(new Error("Введите email и пароль"));
    }

    if (useFirebase) {
      return firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(function (cred) {
          return mapFirebaseUser(cred.user);
        })
        .catch(function (err) {
          throw new Error(formatFirebaseError(err));
        });
    }

    var users = readLocalUsers();
    var user = users.find(function (u) {
      return u.email === email;
    });
    if (!user) return Promise.reject(new Error("Пользователь не найден"));

    return hashPassword(password).then(function (passwordHash) {
      if (user.passwordHash !== passwordHash) {
        throw new Error("Неверный пароль");
      }
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ userId: user.id }));
      currentUser = {
        id: user.id,
        email: user.email,
        phone: user.phone || "",
        name: user.name,
        verified: Boolean(user.verified),
        mode: "local",
      };
      notifyUserChange();
      return currentUser;
    });
  }

  function resetPassword(contact, newPassword) {
    contact = String(contact || "").trim();
    newPassword = newPassword || "";

    if (!contact) {
      return Promise.reject(new Error("Укажите email или телефон"));
    }

    var isEmail = contact.indexOf("@") !== -1;
    var email = isEmail ? contact.toLowerCase() : "";
    var phone = isEmail ? "" : normalizePhone(contact);

    if (isEmail && !isEmailValid(email)) {
      return Promise.reject(new Error("Введите корректный email"));
    }
    if (!isEmail && !isPhoneValid(phone)) {
      return Promise.reject(new Error("Введите корректный телефон"));
    }

    if (useFirebase) {
      if (!isEmail) {
        return Promise.reject(
          new Error("В облачном режиме сброс доступен по email")
        );
      }
      return firebaseAuth
        .sendPasswordResetEmail(email)
        .then(function () {
          return { method: "email" };
        })
        .catch(function (err) {
          throw new Error(formatFirebaseError(err));
        });
    }

    if (newPassword.length < 6) {
      return Promise.reject(new Error("Пароль — минимум 6 символов"));
    }

    var users = readLocalUsers();
    var idx = users.findIndex(function (u) {
      if (isEmail) return u.email === email;
      return normalizePhone(u.phone) === phone;
    });
    if (idx === -1) {
      return Promise.reject(new Error("Пользователь не найден"));
    }

    return hashPassword(newPassword).then(function (passwordHash) {
      users[idx].passwordHash = passwordHash;
      writeLocalUsers(users);
      return { method: "local" };
    });
  }

  function signOut() {
    if (useFirebase) {
      return firebaseAuth.signOut().then(function () {
        currentUser = null;
        notifyUserChange();
      });
    }
    localStorage.removeItem(LOCAL_SESSION_KEY);
    currentUser = null;
    notifyUserChange();
    return Promise.resolve();
  }

  function loadPredictions() {
    if (!currentUser) return Promise.resolve({});

    if (useFirebase) {
      return firebaseDb
        .collection("predictor_users")
        .doc(currentUser.id)
        .get()
        .then(function (doc) {
          if (!doc.exists) return {};
          var data = doc.data();
          return data.predictions && typeof data.predictions === "object"
            ? data.predictions
            : {};
        })
        .catch(function () {
          return {};
        });
    }

    try {
      var raw = localStorage.getItem(predictionsKey(currentUser.id));
      return Promise.resolve(raw ? JSON.parse(raw) : {});
    } catch (e) {
      return Promise.resolve({});
    }
  }

  function savePredictions(predictions) {
    if (!currentUser) return Promise.resolve();

    if (useFirebase) {
      return firebaseDb
        .collection("predictor_users")
        .doc(currentUser.id)
        .set(
          {
            email: currentUser.email,
            name: currentUser.name,
            phone: currentUser.phone || "",
            predictions: predictions,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    }

    localStorage.setItem(
      predictionsKey(currentUser.id),
      JSON.stringify(predictions)
    );
    return Promise.resolve();
  }

  function getAllPlayers() {
    if (useFirebase) {
      return firebaseDb
        .collection("predictor_users")
        .get()
        .then(function (snap) {
          var players = [];
          snap.forEach(function (doc) {
            var data = doc.data();
            var player = {
              id: doc.id,
              name: data.name || "Игрок",
              email: data.email || "",
              phone: data.phone || "",
              predictions: data.predictions || {},
            };
            if (!isBlockedPlayer(player)) players.push(player);
          });
          return players;
        })
        .catch(function () {
          return [];
        });
    }

    return Promise.resolve(
      readLocalUsers()
        .filter(function (u) {
          return !isBlockedPlayer(u);
        })
        .map(function (u) {
          var raw = localStorage.getItem(predictionsKey(u.id));
          var predictions = {};
          try {
            predictions = raw ? JSON.parse(raw) : {};
          } catch (e) {}
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone || "",
            predictions: predictions,
          };
        })
    );
  }

  function formatFirebaseError(err) {
    var code = err && err.code ? err.code : "";
    if (code === "auth/email-already-in-use") return "Email уже зарегистрирован";
    if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
      return "Неверный email или пароль";
    }
    if (code === "auth/weak-password") return "Пароль слишком слабый";
    if (code === "auth/invalid-email") return "Некорректный email";
    if (code === "auth/user-not-found") return "Пользователь не найден";
    if (code === "auth/too-many-requests") return "Слишком много попыток, подождите";
    return (err && err.message) || "Ошибка авторизации";
  }

  window.PredictorAuth = {
    init: init,
    isConfigured: isFirebaseConfigured,
    isLoggedIn: isLoggedIn,
    getCurrentUser: getCurrentUser,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    resetPassword: resetPassword,
    loadPredictions: loadPredictions,
    savePredictions: savePredictions,
    getAllPlayers: getAllPlayers,
  };
})();
