// Данные о командах
const teamsData = {
    'manchester-united': {
        name: 'Манчестер Юнайтед',
        logo: 'https://dumpster.cdn.sports.ru/7/96/9df2f70b1c5cbc8fb256d701a4662.jpeg',
        position: '7-ое место, сезон 2025-2026',
        league: 'Английская Премьер-лига',
        record: {
            wins: 7,
            losses: 2,
            draws: 1,
            total: 10
        }
    },
    'liverpool': {
        name: 'Ливерпуль',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNkYzI2MjYiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyTDEzLjA5IDguMjZMMjAgOUwxNCAxNUwxNi4xOCAyMkwxMiAxOUw3LjgyIDIyTDEwIDE1TDQgOUwxMC45MSA4LjI2TDEyIDJaIi8+Cjwvc3ZnPgo8L3N2Zz4K',
        description: 'Ливерпуль - один из самых успешных клубов Англии.',
        position: '1-ое место, сезон 2024-2025',
        league: 'Английская Премьер-лига',
        record: {
            wins: 9,
            losses: 1,
            draws: 1,
            total: 11
        }
    },
    'chelsea': {
        name: 'Челси',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwMDc4ZDQiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyTDEzLjA5IDguMjZMMjAgOUwxNCAxNUwxNi4xOCAyMkwxMiAxOUw3LjgyIDIyTDEwIDE1TDQgOUwxMC45MSA4LjI2TDEyIDJaIi8+Cjwvc3ZnPgo8L3N2Zz4K'
    },
    'arsenal': {
        name: 'Арсенал',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNmZmM5MDAiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJibGFjayI+CjxwYXRoIGQ9Ik0xMiAyTDEzLjA5IDguMjZMMjAgOUwxNCAxNUwxNi4xOCAyMkwxMiAxOUw3LjgyIDIyTDEwIDE1TDQgOUwxMC45MSA4LjI2TDEyIDJaIi8+Cjwvc3ZnPgo8L3N2Zz4K'
    },
    'tottenham': {
        name: 'Тоттенхэм',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM5NjRiYTAiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyTDEzLjA5IDguMjZMMjAgOUwxNCAxNUwxNi4xOCAyMkwxMiAxOUw3LjgyIDIyTDEwIDE1TDQgOUwxMC45MSA4LjI2TDEyIDJaIi8+Cjwvc3ZnPgo8L3N2Zz4K'
    }
};

