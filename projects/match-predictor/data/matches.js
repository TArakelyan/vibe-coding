const PREDICTOR_BOOSTER = {
  multiplier: 2,
  icon: "https://dumpster.cdn.sports.ru/b/2f/a387c9d97edacf02f2ba00355f22d.png",
};

const PREDICTOR_POINTS = {
  correctOutcome: 10,
  correctHomeGoals: 5,
  correctAwayGoals: 5,
  correctGoalDiff: 5,
  correctScoreBonus: 5,
};

const PREDICTOR_TEAMS = {
  alashkert: {
    id: "alashkert",
    logo: "https://dumpster.cdn.sports.ru/a/38/42d2fe9cae715aadd16141aba4d3f.png",
  },
  ararat: {
    id: "ararat",
    logo: "https://dumpster.cdn.sports.ru/f/b4/0f3d6cb7368647ca47c088a3b24da.png",
  },
  bkma: {
    id: "bkma",
    logo: "https://dumpster.cdn.sports.ru/a/bd/68c0ac62f0db0f78919127984c6fe.png",
  },
  shirak: {
    id: "shirak",
    logo: "https://dumpster.cdn.sports.ru/d/ab/7324aec6ed4d54e8bdd2cc17d4729.png",
  },
  noah: {
    id: "noah",
    logo: "https://dumpster.cdn.sports.ru/1/df/0ad4dce2d8ebb60a0b2ed7a310ad5.png",
  },
  syunik: {
    id: "syunik",
    logo: "https://dumpster.cdn.sports.ru/9/83/af3c0bc33eb06ad05cda54e7daf9b.png",
  },
  gandzasar: {
    id: "gandzasar",
    logo: "https://dumpster.cdn.sports.ru/9/54/1d5c16ed21c1f86e32deb4a90c4aa.png",
  },
  ararat_armenia: {
    id: "ararat_armenia",
    logo: "https://dumpster.cdn.sports.ru/9/db/71ea26bff148ff219d6ccc9626c40.png",
  },
  urartu: {
    id: "urartu",
    logo: "https://dumpster.cdn.sports.ru/4/f7/4cc1740ef0b4981703d8b75a8ed3d.png",
  },
  pyunik: {
    id: "pyunik",
    logo: "https://dumpster.cdn.sports.ru/f/d5/55ab7259d1899dc8395a0ecf511f9.png",
  },
  van: {
    id: "van",
    logo: "https://dumpster.cdn.sports.ru/d/53/b617ea6a02eb6d88fe81838ce0187.png",
  },
  sardarapat: {
    id: "sardarapat",
    logo: "https://dumpster.cdn.sports.ru/9/26/24c15f2e270c05ba5e2c63b24986e.png",
  },
};

const PREDICTOR_ROUNDS = [
  { id: "all", labelKey: "roundAll", dates: "" },
  { id: "round-1", labelKey: "roundN", n: 1, dates: "31.07–02.08.2026" },
  { id: "round-2", labelKey: "roundN", n: 2, dates: "07–09.08.2026" },
  { id: "round-3", labelKey: "roundN", n: 3, dates: "14–16.08.2026" },
  { id: "round-4", labelKey: "roundN", n: 4, dates: "21–23.08.2026" },
  { id: "round-5", labelKey: "roundN", n: 5, dates: "28–30.08.2026" },
  { id: "round-6", labelKey: "roundN", n: 6, dates: "04–06.09.2026" },
  { id: "round-7", labelKey: "roundN", n: 7, dates: "11–13.09.2026" },
  { id: "round-8", labelKey: "roundN", n: 8, dates: "18–20.09.2026" },
];

function makeMatch(id, round, homeId, awayId) {
  return {
    id: id,
    round: round,
    kickoff: null,
    kickoffDisplay: null,
    home: PREDICTOR_TEAMS[homeId],
    away: PREDICTOR_TEAMS[awayId],
    result: null,
  };
}

const PREDICTOR_MATCHES = [
  makeMatch("apl-r1-alashkert-ararat", "round-1", "alashkert", "ararat"),
  makeMatch("apl-r1-bkma-shirak", "round-1", "bkma", "shirak"),
  makeMatch("apl-r1-noah-syunik", "round-1", "noah", "syunik"),
  makeMatch("apl-r1-gandzasar-ararat_armenia", "round-1", "gandzasar", "ararat_armenia"),
  makeMatch("apl-r1-urartu-pyunik", "round-1", "urartu", "pyunik"),
  makeMatch("apl-r1-van-sardarapat", "round-1", "van", "sardarapat"),

  makeMatch("apl-r2-ararat-sardarapat", "round-2", "ararat", "sardarapat"),
  makeMatch("apl-r2-pyunik-van", "round-2", "pyunik", "van"),
  makeMatch("apl-r2-ararat_armenia-urartu", "round-2", "ararat_armenia", "urartu"),
  makeMatch("apl-r2-syunik-gandzasar", "round-2", "syunik", "gandzasar"),
  makeMatch("apl-r2-shirak-noah", "round-2", "shirak", "noah"),
  makeMatch("apl-r2-alashkert-bkma", "round-2", "alashkert", "bkma"),

  makeMatch("apl-r3-bkma-ararat", "round-3", "bkma", "ararat"),
  makeMatch("apl-r3-noah-alashkert", "round-3", "noah", "alashkert"),
  makeMatch("apl-r3-gandzasar-shirak", "round-3", "gandzasar", "shirak"),
  makeMatch("apl-r3-urartu-syunik", "round-3", "urartu", "syunik"),
  makeMatch("apl-r3-van-ararat_armenia", "round-3", "van", "ararat_armenia"),
  makeMatch("apl-r3-sardarapat-pyunik", "round-3", "sardarapat", "pyunik"),

  makeMatch("apl-r4-ararat-pyunik", "round-4", "ararat", "pyunik"),
  makeMatch("apl-r4-ararat_armenia-sardarapat", "round-4", "ararat_armenia", "sardarapat"),
  makeMatch("apl-r4-syunik-van", "round-4", "syunik", "van"),
  makeMatch("apl-r4-shirak-urartu", "round-4", "shirak", "urartu"),
  makeMatch("apl-r4-alashkert-gandzasar", "round-4", "alashkert", "gandzasar"),
  makeMatch("apl-r4-bkma-noah", "round-4", "bkma", "noah"),

  makeMatch("apl-r5-noah-ararat", "round-5", "noah", "ararat"),
  makeMatch("apl-r5-gandzasar-bkma", "round-5", "gandzasar", "bkma"),
  makeMatch("apl-r5-urartu-alashkert", "round-5", "urartu", "alashkert"),
  makeMatch("apl-r5-van-shirak", "round-5", "van", "shirak"),
  makeMatch("apl-r5-sardarapat-syunik", "round-5", "sardarapat", "syunik"),
  makeMatch("apl-r5-pyunik-ararat_armenia", "round-5", "pyunik", "ararat_armenia"),

  makeMatch("apl-r6-ararat-ararat_armenia", "round-6", "ararat", "ararat_armenia"),
  makeMatch("apl-r6-syunik-pyunik", "round-6", "syunik", "pyunik"),
  makeMatch("apl-r6-shirak-sardarapat", "round-6", "shirak", "sardarapat"),
  makeMatch("apl-r6-alashkert-van", "round-6", "alashkert", "van"),
  makeMatch("apl-r6-bkma-urartu", "round-6", "bkma", "urartu"),
  makeMatch("apl-r6-noah-gandzasar", "round-6", "noah", "gandzasar"),

  makeMatch("apl-r7-gandzasar-ararat", "round-7", "gandzasar", "ararat"),
  makeMatch("apl-r7-urartu-noah", "round-7", "urartu", "noah"),
  makeMatch("apl-r7-van-bkma", "round-7", "van", "bkma"),
  makeMatch("apl-r7-sardarapat-alashkert", "round-7", "sardarapat", "alashkert"),
  makeMatch("apl-r7-pyunik-shirak", "round-7", "pyunik", "shirak"),
  makeMatch("apl-r7-ararat_armenia-syunik", "round-7", "ararat_armenia", "syunik"),

  makeMatch("apl-r8-ararat-syunik", "round-8", "ararat", "syunik"),
  makeMatch("apl-r8-shirak-ararat_armenia", "round-8", "shirak", "ararat_armenia"),
  makeMatch("apl-r8-alashkert-pyunik", "round-8", "alashkert", "pyunik"),
  makeMatch("apl-r8-bkma-sardarapat", "round-8", "bkma", "sardarapat"),
  makeMatch("apl-r8-noah-van", "round-8", "noah", "van"),
  makeMatch("apl-r8-gandzasar-urartu", "round-8", "gandzasar", "urartu"),
];
