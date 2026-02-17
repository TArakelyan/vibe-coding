// Данные ставок на матч
const bundesTeamsData = {
    contenders: [
        {
            id: 'golovin',
            name: 'Головин забьет',
            logo: 'https://dumpster.cdn.sports.ru/0/fe/8b3c20a81cd9736adf2a947d7ecf2.png',
            oddsYes: '4.00',
            oddsNo: '1.20'
        },
        {
            id: 'safonov',
            name: 'Сафонов отразит пенальти',
            logo: 'https://dumpster.cdn.sports.ru/0/42/79757a585d31cc4c68eb475c1739c.png',
            oddsYes: '6.50',
            oddsNo: '1.08'
        }
    ]
};

// Для совместимости с существующим кодом
const topContenders = bundesTeamsData.contenders;
