/** Единые значения виджета. Дублируются fallback-блоком в index.html (деплой одним файлом). */
window.BET_STATS_DATA = {
  title: "Статистика последних 5 прогнозов:",
  stats: [
    { type: "win", icon: "+", value: 0, label: "Победы" },
    { type: "lose", icon: "-", value: 5, label: "Поражения" },
    { type: "refund", icon: "=", value: 0, label: "Возврат" },
  ],
  averageOdds: "3.10",
};
