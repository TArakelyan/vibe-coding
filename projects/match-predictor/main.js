(function () {
  var predictions = {};
  var authMode = "login";
  var boosterState = {};
  var activeRoundFilter = "all";

  var matchesList = document.getElementById("matchesList");
  var leaderboardBody = document.getElementById("leaderboardBody");
  var roundFilter = document.getElementById("roundFilter");
  var matchesView = document.getElementById("matchesView");
  var leaderboardView = document.getElementById("leaderboardView");
  var navMatches = document.getElementById("navMatches");
  var navLeaderboard = document.getElementById("navLeaderboard");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");
  var logoutBtn = document.getElementById("logoutBtn");
  var userBadge = document.getElementById("userBadge");
  var verifiedBadge = document.getElementById("verifiedBadge");
  var authOverlay = document.getElementById("authModal");
  var authForm = document.getElementById("authForm");
  var authTitle = document.getElementById("authTitle");
  var authNameField = document.getElementById("authNameField");
  var authPhoneField = document.getElementById("authPhoneField");
  var authContactField = document.getElementById("authContactField");
  var authEmailField = document.getElementById("authEmailField");
  var authPasswordField = document.getElementById("authPasswordField");
  var authNameInput = document.getElementById("authName");
  var authEmailInput = document.getElementById("authEmail");
  var authPhoneInput = document.getElementById("authPhone");
  var authContactInput = document.getElementById("authContact");
  var authPasswordInput = document.getElementById("authPassword");
  var authSubmitBtn = document.getElementById("authSubmit");
  var authError = document.getElementById("authError");
  var authNote = document.getElementById("authNote");
  var authForgotLink = document.getElementById("authForgotLink");
  var authSwitchRegister = document.getElementById("authSwitchRegister");
  var authSwitchLogin = document.getElementById("authSwitchLogin");
  var authSwitchWrap = document.getElementById("authSwitchWrap");
  var leagueTitle = document.getElementById("leagueTitle");
  var leaderboardTitle = document.getElementById("leaderboardTitle");
  var lbPlace = document.getElementById("lbPlace");
  var lbPlayer = document.getElementById("lbPlayer");
  var lbPoints = document.getElementById("lbPoints");
  var toast = document.getElementById("toast");
  var toastText = document.getElementById("toastText");

  function t(key, vars) {
    return PredictorI18n.t(key, vars);
  }

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add("toast--visible");
    setTimeout(function () {
      toast.classList.remove("toast--visible");
    }, 3000);
  }

  function getRoundMeta(roundId) {
    return PREDICTOR_ROUNDS.find(function (x) {
      return x.id === roundId;
    });
  }

  function getRoundLabel(roundId) {
    var r = getRoundMeta(roundId);
    if (!r) return roundId;
    if (r.labelKey === "roundN") return t("roundN", { n: r.n });
    return t(r.labelKey);
  }

  function formatKickoff(match) {
    if (match.kickoffDisplay) return match.kickoffDisplay;
    if (match.kickoff) {
      var d = new Date(match.kickoff);
      var lang = PredictorI18n.getLang();
      var locale = lang === "hy" ? "hy-AM" : lang === "en" ? "en-GB" : "ru-RU";
      try {
        return d.toLocaleString(locale, {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (e) {
        return match.kickoff;
      }
    }
    return t("datePlaceholder");
  }

  function getActiveMatches() {
    return PREDICTOR_MATCHES.filter(function (match) {
      return !isMatchLocked(match) && !match.result;
    });
  }

  function getMatchesForRound(roundId) {
    if (roundId === "all") return PREDICTOR_MATCHES;
    return PREDICTOR_MATCHES.filter(function (m) {
      return m.round === roundId;
    });
  }

  function isMatchLocked(match) {
    if (!match.kickoff) return false;
    return new Date(match.kickoff).getTime() <= Date.now();
  }

  function validatePrediction(homeScore, awayScore) {
    var errors = [];
    var home = Number(homeScore);
    var away = Number(awayScore);

    if (!Number.isInteger(home) || home < 0 || home > 15) {
      errors.push(t("scoreError"));
    }
    if (!Number.isInteger(away) || away < 0 || away > 15) {
      errors.push(t("scoreError"));
    }

    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, data: { home: home, away: away } };
  }

  function outcome(home, away) {
    if (home > away) return "home";
    if (home < away) return "away";
    return "draw";
  }

  function calcPoints(pred, match) {
    if (!match.result || !pred || !pred.verified) return 0;
    var pts = 0;
    var r = match.result;
    var P = PREDICTOR_POINTS;

    if (outcome(pred.home, pred.away) === outcome(r.home, r.away)) {
      pts += P.correctOutcome;
    }
    if (pred.home === r.home) pts += P.correctHomeGoals;
    if (pred.away === r.away) pts += P.correctAwayGoals;
    if (pred.home - pred.away === r.home - r.away) pts += P.correctGoalDiff;
    if (pred.home === r.home && pred.away === r.away) pts += P.correctScoreBonus;

    if (pred.booster) pts *= PREDICTOR_BOOSTER.multiplier;
    return pts;
  }

  function clearBoosterInRound(roundId, exceptMatchId) {
    PREDICTOR_MATCHES.forEach(function (m) {
      if (m.round !== roundId || m.id === exceptMatchId) return;
      boosterState[m.id] = false;
      if (predictions[m.id]) {
        predictions[m.id] = Object.assign({}, predictions[m.id], {
          booster: false,
        });
      }
    });
  }

  function applyStaticI18n() {
    document.title = t("pageTitle");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("pageDesc"));

    navMatches.textContent = t("navMatches");
    navLeaderboard.textContent = t("navLeaderboard");
    loginBtn.textContent = t("login");
    registerBtn.textContent = t("register");
    logoutBtn.textContent = t("logout");
    leagueTitle.textContent = t("leagueTitle");
    leaderboardTitle.textContent = t("leaderboardTitle");
    lbPlace.textContent = t("place");
    lbPlayer.textContent = t("player");
    lbPoints.textContent = t("points");
    roundFilter.setAttribute("aria-label", t("roundFilter"));
    authForgotLink.textContent = t("forgotPassword");
    authSwitchRegister.textContent = t("authSwitchRegister");
    authSwitchLogin.textContent = t("authSwitchLogin");
    document.getElementById("authCancel").textContent = t("cancel");
    document.getElementById("authNameLabel").textContent = t("name");
    document.getElementById("authEmailLabel").textContent = t("email");
    document.getElementById("authPhoneLabel").textContent = t("phone");
    document.getElementById("authContactLabel").textContent =
      t("email") + " / " + t("phone");
    document.getElementById("authPasswordLabel").textContent =
      authMode === "reset" ? t("newPassword") : t("password");
    authNameInput.placeholder = t("namePlaceholder");
    authPhoneInput.placeholder = t("phonePlaceholder");
    authContactInput.placeholder = t("email") + " / " + t("phone");

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle(
        "lang-btn--active",
        btn.dataset.lang === PredictorI18n.getLang()
      );
    });

    syncAuthModalLabels();
    renderRoundFilter();
    renderMatches();
    renderLeaderboard();
  }

  function syncAuthModalLabels() {
    if (authMode === "register") {
      authTitle.textContent = t("authRegisterTitle");
      authSubmitBtn.textContent = t("createAccount");
      authNote.textContent = t("authNote");
    } else if (authMode === "reset") {
      authTitle.textContent = t("authResetTitle");
      authSubmitBtn.textContent = t("sendReset");
      authNote.textContent = t("authResetNote");
    } else {
      authTitle.textContent = t("authLoginTitle");
      authSubmitBtn.textContent = t("login");
      authNote.textContent = t("authNote");
    }
    document.getElementById("authPasswordLabel").textContent =
      authMode === "reset" ? t("newPassword") : t("password");
  }

  function renderRoundFilter() {
    roundFilter.innerHTML = PREDICTOR_ROUNDS.map(function (r) {
      var sel = r.id === activeRoundFilter ? " selected" : "";
      var label =
        r.labelKey === "roundN" ? t("roundN", { n: r.n }) : t(r.labelKey);
      if (r.dates) label += " · " + r.dates;
      return (
        '<option value="' + r.id + '"' + sel + ">" + label + "</option>"
      );
    }).join("");
  }

  function renderMatchCard(match) {
    var saved = predictions[match.id];
    var homeVal = saved ? saved.home : "";
    var awayVal = saved ? saved.away : "";
    var booster = saved ? saved.booster : boosterState[match.id];
    boosterState[match.id] = booster;

    var boosterClass = booster ? " booster-btn--active" : "";
    var hintHtml = "";
    if (saved && saved.verified) {
      hintHtml =
        '<span class="match-card__hint match-card__hint--ok" data-role="hint">' +
        t("saved") +
        "</span>";
    } else {
      hintHtml =
        '<span class="match-card__hint match-card__hint--hidden" data-role="hint"></span>';
    }

    var homeName = PredictorI18n.teamName(match.home.id);
    var awayName = PredictorI18n.teamName(match.away.id);

    return (
      '<article class="match-card' +
      (saved && saved.verified ? " match-card--saved" : "") +
      '" data-match="' +
      match.id +
      '" data-round="' +
      match.round +
      '">' +
      '<header class="match-card__head">' +
      '<p class="match-card__round">' +
      getRoundLabel(match.round) +
      "</p>" +
      '<p class="match-card__date" data-role="kickoff">' +
      formatKickoff(match) +
      "</p>" +
      "</header>" +
      '<div class="match-card__body">' +
      '<div class="match-card__scoreline">' +
      '<div class="team-col">' +
      '<img class="team__logo" src="' +
      match.home.logo +
      '" alt="' +
      homeName +
      '" width="64" height="64" />' +
      '<span class="team__name">' +
      homeName +
      "</span>" +
      "</div>" +
      '<div class="score-col">' +
      '<div class="score-block">' +
      '<input class="score-input" type="number" min="0" max="15" inputmode="numeric" placeholder="0" data-role="home" value="' +
      homeVal +
      '" />' +
      '<input class="score-input" type="number" min="0" max="15" inputmode="numeric" placeholder="0" data-role="away" value="' +
      awayVal +
      '" />' +
      "</div>" +
      "</div>" +
      '<div class="team-col">' +
      '<img class="team__logo" src="' +
      match.away.logo +
      '" alt="' +
      awayName +
      '" width="64" height="64" />' +
      '<span class="team__name">' +
      awayName +
      "</span>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<footer class="match-card__footer">' +
      '<div class="match-card__actions">' +
      '<button type="button" class="save-btn" data-role="save">' +
      t("savePrediction") +
      "</button>" +
      '<button type="button" class="booster-btn' +
      boosterClass +
      '" data-role="booster" aria-label="Booster ×2" title="×2">' +
      '<img class="booster-btn__icon" src="' +
      PREDICTOR_BOOSTER.icon +
      '" alt="×2" width="28" height="28" />' +
      "</button>" +
      "</div>" +
      hintHtml +
      "</footer>" +
      "</article>"
    );
  }

  function renderMatches() {
    var activeMatches = getActiveMatches();

    if (!activeMatches.length) {
      matchesList.innerHTML =
        '<div class="empty-state">' + t("noMatches") + "</div>";
      return;
    }

    var html = [];
    var currentRound = null;

    activeMatches.forEach(function (match) {
      if (match.round !== currentRound) {
        currentRound = match.round;
        var meta = getRoundMeta(match.round);
        var dates = meta && meta.dates ? " · " + meta.dates : "";
        html.push(
          '<div class="round-heading">' +
            getRoundLabel(match.round) +
            dates +
            "</div>"
        );
      }
      html.push(renderMatchCard(match));
    });

    matchesList.innerHTML = html.join("");

    matchesList.querySelectorAll(".match-card").forEach(function (card) {
      var matchId = card.dataset.match;
      var roundId = card.dataset.round;

      card
        .querySelector('[data-role="booster"]')
        .addEventListener("click", function () {
          var next = !boosterState[matchId];
          if (next) {
            var hadOther = PREDICTOR_MATCHES.some(function (m) {
              return (
                m.round === roundId &&
                m.id !== matchId &&
                (boosterState[m.id] ||
                  (predictions[m.id] && predictions[m.id].booster))
              );
            });
            clearBoosterInRound(roundId, matchId);
            boosterState[matchId] = true;
            if (hadOther) showToast(t("toastBoosterOne"));
          } else {
            boosterState[matchId] = false;
          }
          renderMatches();
        });

      card
        .querySelector('[data-role="save"]')
        .addEventListener("click", function () {
          saveMatchPrediction(card, matchId);
        });
    });
  }

  function saveMatchPrediction(card, matchId) {
    if (!PredictorAuth.isLoggedIn()) {
      openAuthModal("login");
      showToast(t("toastLoginRequired"));
      return;
    }

    var user = PredictorAuth.getCurrentUser();
    if (user.mode === "firebase" && !user.verified) {
      showToast(t("toastVerifyEmail"));
      return;
    }

    var match = PREDICTOR_MATCHES.find(function (m) {
      return m.id === matchId;
    });
    if (!match || isMatchLocked(match)) return;

    var home = card.querySelector('[data-role="home"]').value;
    var away = card.querySelector('[data-role="away"]').value;
    var booster = Boolean(boosterState[matchId]);
    var hint = card.querySelector('[data-role="hint"]');

    var check = validatePrediction(home, away);
    if (!check.ok) {
      hint.textContent = check.errors[0];
      hint.className = "match-card__hint match-card__hint--error";
      return;
    }

    if (booster) clearBoosterInRound(match.round, matchId);

    predictions[matchId] = {
      home: check.data.home,
      away: check.data.away,
      booster: booster,
      verified: true,
      savedAt: new Date().toISOString(),
    };

    PredictorAuth.savePredictions(predictions)
      .then(function () {
        showToast(t("toastSaved"));
        renderMatches();
        renderLeaderboard();
      })
      .catch(function () {
        showToast(t("toastSaveError"));
      });
  }

  function renderLeaderboard() {
    var roundMatches = getMatchesForRound(activeRoundFilter);

    PredictorAuth.getAllPlayers().then(function (players) {
      var rows = players
        .map(function (p) {
          var pts = 0;
          roundMatches.forEach(function (m) {
            var pred = p.predictions[m.id];
            if (pred && pred.verified) pts += calcPoints(pred, m);
          });
          return { id: p.id, name: p.name, points: pts };
        })
        .sort(function (a, b) {
          return b.points - a.points;
        });

      if (!rows.length) {
        leaderboardBody.innerHTML =
          '<div class="leaderboard__empty">' + t("noPlayers") + "</div>";
        return;
      }

      var currentId =
        PredictorAuth.getCurrentUser() && PredictorAuth.getCurrentUser().id;

      leaderboardBody.innerHTML = rows
        .map(function (row, i) {
          var rank = i + 1;
          var rankMod =
            rank === 1
              ? " leaderboard__rank--gold"
              : rank === 2
                ? " leaderboard__rank--silver"
                : rank === 3
                  ? " leaderboard__rank--bronze"
                  : "";
          var youClass = row.id === currentId ? " leaderboard__row--you" : "";
          return (
            '<div class="leaderboard__row' +
            youClass +
            '">' +
            '<span class="leaderboard__rank' +
            rankMod +
            '">' +
            rank +
            "</span>" +
            '<span class="leaderboard__name">' +
            row.name +
            "</span>" +
            '<span class="leaderboard__points">' +
            row.points +
            "</span>" +
            "</div>"
          );
        })
        .join("");
    });
  }

  function showView(view) {
    matchesView.hidden = view !== "matches";
    leaderboardView.hidden = view !== "leaderboard";
    navMatches.classList.toggle("nav-link--active", view === "matches");
    navLeaderboard.classList.toggle("nav-link--active", view === "leaderboard");
    if (view === "leaderboard") renderLeaderboard();
  }

  function updateHeaderAuth(user) {
    var loggedIn = Boolean(user);
    loginBtn.hidden = loggedIn;
    registerBtn.hidden = loggedIn;
    logoutBtn.hidden = !loggedIn;
    loginBtn.classList.toggle("is-hidden", loggedIn);
    registerBtn.classList.toggle("is-hidden", loggedIn);
    logoutBtn.classList.toggle("is-hidden", !loggedIn);

    if (user) {
      userBadge.hidden = false;
      userBadge.textContent = user.name;
      if (user.mode === "firebase") {
        verifiedBadge.hidden = false;
        verifiedBadge.textContent = user.verified ? "✓" : "!";
        verifiedBadge.style.color = user.verified ? "" : "#c0392b";
      } else {
        verifiedBadge.hidden = true;
      }
    } else {
      userBadge.hidden = true;
      verifiedBadge.hidden = true;
    }
  }

  function openAuthModal(mode) {
    authMode =
      mode === "register" ? "register" : mode === "reset" ? "reset" : "login";

    var firebaseMode = PredictorAuth.isConfigured();
    var resetNeedsPassword = authMode === "reset" && !firebaseMode;

    authNameField.hidden = authMode !== "register";
    authPhoneField.hidden = authMode !== "register";
    authEmailField.hidden = authMode === "reset";
    authContactField.hidden = authMode !== "reset";
    authPasswordField.hidden = authMode === "reset" && firebaseMode;
    authForgotLink.hidden = authMode !== "login";
    authSwitchWrap.hidden = authMode === "reset";

    authEmailInput.required = authMode !== "reset";
    authContactInput.required = authMode === "reset";
    authPasswordInput.required = authMode !== "reset" || resetNeedsPassword;
    authPasswordInput.autocomplete =
      authMode === "reset" ? "new-password" : "current-password";

    authError.hidden = true;
    authForm.reset();
    syncAuthModalLabels();
    authOverlay.classList.add("modal-overlay--open");
  }

  function closeAuthModal() {
    authOverlay.classList.remove("modal-overlay--open");
  }

  function loadUserData() {
    return PredictorAuth.loadPredictions().then(function (data) {
      predictions = data || {};
      Object.keys(predictions).forEach(function (id) {
        if (predictions[id]) boosterState[id] = predictions[id].booster;
      });
      renderMatches();
    });
  }

  roundFilter.addEventListener("change", function () {
    activeRoundFilter = roundFilter.value;
    renderLeaderboard();
  });

  authForm.addEventListener("submit", function (e) {
    e.preventDefault();
    authError.hidden = true;
    authSubmitBtn.disabled = true;

    var action;
    if (authMode === "register") {
      action = PredictorAuth.signUp(
        authEmailInput.value,
        authPasswordInput.value,
        authNameInput.value,
        authPhoneInput.value
      );
    } else if (authMode === "reset") {
      action = PredictorAuth.resetPassword(
        authContactInput.value,
        authPasswordInput.value
      );
    } else {
      action = PredictorAuth.signIn(
        authEmailInput.value,
        authPasswordInput.value
      );
    }

    action
      .then(function (result) {
        if (authMode === "reset") {
          closeAuthModal();
          if (result && result.method === "email") {
            showToast(t("toastResetSent"));
          } else {
            showToast(t("toastResetLocal"));
          }
          openAuthModal("login");
          return;
        }
        closeAuthModal();
        showToast(
          authMode === "register" ? t("toastRegistered") : t("toastWelcome")
        );
        return loadUserData();
      })
      .catch(function (err) {
        authError.textContent = err.message;
        authError.hidden = false;
      })
      .finally(function () {
        authSubmitBtn.disabled = false;
      });
  });

  loginBtn.addEventListener("click", function () {
    openAuthModal("login");
  });
  registerBtn.addEventListener("click", function () {
    openAuthModal("register");
  });
  logoutBtn.addEventListener("click", function () {
    PredictorAuth.signOut().then(function () {
      predictions = {};
      boosterState = {};
      renderMatches();
      renderLeaderboard();
      showToast(t("toastLogout"));
    });
  });

  navMatches.addEventListener("click", function (e) {
    e.preventDefault();
    showView("matches");
  });
  navLeaderboard.addEventListener("click", function (e) {
    e.preventDefault();
    showView("leaderboard");
  });

  document.getElementById("authClose").addEventListener("click", closeAuthModal);
  document.getElementById("authCancel").addEventListener("click", closeAuthModal);
  authSwitchRegister.addEventListener("click", function (e) {
    e.preventDefault();
    openAuthModal("register");
  });
  authSwitchLogin.addEventListener("click", function (e) {
    e.preventDefault();
    openAuthModal("login");
  });
  authForgotLink.addEventListener("click", function (e) {
    e.preventDefault();
    openAuthModal("reset");
  });

  authOverlay.addEventListener("click", function (e) {
    if (e.target === authOverlay) closeAuthModal();
  });

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      PredictorI18n.setLang(btn.dataset.lang);
      applyStaticI18n();
    });
  });

  PredictorI18n.init();

  PredictorAuth.init(function (user) {
    updateHeaderAuth(user);
    if (user) loadUserData();
    else {
      predictions = {};
      renderMatches();
    }
    renderLeaderboard();
  });

  applyStaticI18n();
})();
