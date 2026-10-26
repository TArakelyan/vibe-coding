const BONUS_CONFIG = {
  minDeposit: 100,
  maxBonus: 20000,
  turnoverMultiplier: 15,
  defaultDeposit: 7500,
  sliderMax: 50000,
  sliderStep: 100,
  cards: [
    {
      step: 1,
      type: 'input',
      title: 'Введите депозит',
      footerText: 'Минимальный деп = 100₽',
    },
    {
      step: 2,
      title: 'Доступный фрибет',
      footerIcon: 'gift',
      footerText: 'Максимальный бонус = 20000₽',
    },
    {
      step: 3,
      title: 'Сумма ставок для вывода',
      footerIcon: 'target',
      footerText: '',
    },
  ],
};
