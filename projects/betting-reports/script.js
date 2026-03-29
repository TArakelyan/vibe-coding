// Данные компаний
const companiesData = {
    'fonbet': {
        name: 'FONBET',
        logo: 'https://dumpster.cdn.sports.ru/8/23/31836b8ae127c677c83aa5c2dcc3c.png',
        founded: '1994',
        entity: 'ООО «Фонкор»',
        financials: {
            '2019': {
                revenue: { value: 38.06, unit: 'млрд', change: null },
                profit: { value: 19.40, unit: 'млрд', change: null },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 27.68, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': {
                revenue: { value: 52.19, unit: 'млрд', change: null },
                market_share: { value: 21.93, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 23.30, unit: 'млрд', change: null },
                target_contributions: { value: 818, unit: 'млн', change: null },
                salaries: { value: 3.17, unit: 'млрд', change: null },
                staff: { value: '—', unit: '', change: null },
                commercial: { value: '—', unit: '', change: null }
            },
            '2021': {
                revenue: { value: 264.40, unit: 'млрд', change: 406.6 },
                market_share: { value: 35.81, unit: '%', change: 13.88, changeKind: 'pp' },
                winnings: { value: 196.00, unit: 'млрд', change: null },
                ggr: { value: 68.40, unit: 'млрд', change: null },
                ggr_margin: { value: 25.87, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 29.71, unit: 'млрд', change: 27.5 },
                target_contributions: { value: 3536, unit: 'млн', change: 332.3 },
                salaries: { value: 3.98, unit: 'млрд', change: 25.5 },
                staff: { value: '—', unit: '', change: null },
                commercial: { value: '—', unit: '', change: null }
            },
            '2022': {
                revenue: { value: 220.78, unit: 'млрд', change: -16.5 },
                market_share: { value: 25.11, unit: '%', change: -10.7, changeKind: 'pp' },
                winnings: { value: 166.91, unit: 'млрд', change: -14.8 },
                ggr: { value: 53.87, unit: 'млрд', change: -21.2 },
                ggr_margin: { value: 24.40, unit: '%', change: -1.47, changeKind: 'pp' },
                profit: { value: 26.36, unit: 'млрд', change: -11.3 },
                target_contributions: { value: 3233, unit: 'млн', change: -8.6 },
                salaries: { value: 2.39, unit: 'млрд', change: -39.9 },
                staff: { value: 1090, unit: 'чел.', change: null },
                commercial: { value: 5.80, unit: 'млрд', change: null }
            },
            '2023': {
                revenue: { value: 435.64, unit: 'млрд', change: 97.3 },
                market_share: { value: 35.71, unit: '%', change: 10.6, changeKind: 'pp' },
                winnings: { value: 327.83, unit: 'млрд', change: 96.4 },
                ggr: { value: 107.81, unit: 'млрд', change: 100.1 },
                ggr_margin: { value: 24.75, unit: '%', change: 0.35, changeKind: 'pp' },
                profit: { value: 59.20, unit: 'млрд', change: 124.6 },
                target_contributions: { value: 6509, unit: 'млн', change: 101.4 },
                salaries: { value: 5.75, unit: 'млрд', change: 140.2 },
                staff: { value: 2387, unit: 'чел.', change: null },
                commercial: { value: 8.03, unit: 'млрд', change: 38.5 }
            },
            '2024': {
                revenue: { value: 608.81, unit: 'млрд', change: 39.7 },
                market_share: { value: 35.19, unit: '%', change: -0.52, changeKind: 'pp' },
                winnings: { value: 467.98, unit: 'млрд', change: 42.8 },
                ggr: { value: 140.83, unit: 'млрд', change: 30.6 },
                ggr_margin: { value: 23.13, unit: '%', change: -1.62, changeKind: 'pp' },
                profit: { value: 37.44, unit: 'млрд', change: -36.8 },
                target_contributions: { value: 12122, unit: 'млн', change: 86.3 },
                salaries: { value: 6.52, unit: 'млрд', change: 13.4 },
                staff: { value: 2336, unit: 'чел.', change: null },
                commercial: { value: 18.99, unit: 'млрд', change: 136.5 }
            },
            '2025': {
                revenue: { value: 712.42, unit: 'млрд', change: 17.0 },
                market_share: { value: 37.65, unit: '%', change: 2.46, changeKind: 'pp' },
                winnings: { value: 563.46, unit: 'млрд', change: 20.4 },
                ggr: { value: 148.96, unit: 'млрд', change: 5.8 },
                ggr_margin: { value: 20.91, unit: '%', change: -2.22, changeKind: 'pp' },
                profit: { value: 28.78, unit: 'млрд', change: -23.1 },
                target_contributions: { value: 14217, unit: 'млн', change: 17.3 },
                salaries: { value: 7.36, unit: 'млрд', change: 12.8 },
                staff: { value: 2339, unit: 'чел.', change: null },
                commercial: { value: 21.56, unit: 'млрд', change: 13.5 }
            }
        }
    },
    'winline': {
        name: 'WINLINE',
        logo: 'https://dumpster.cdn.sports.ru/b/fc/6d2147368a7165750355955619ca6.png',
        founded: '2009',
        entity: 'ООО «Управляющая компания НКС»',
        financials: {
            '2019': {
                revenue: { value: 29.58, unit: 'млрд', change: null },
                profit: { value: 2.61, unit: 'млрд', change: null },
                ggr: { value: 6.06, unit: 'млрд', change: null },
                market_share: { value: 21.51, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': {
                revenue: { value: 47.95, unit: 'млрд', change: 62.1 },
                profit: { value: 3.99, unit: 'млрд', change: 52.9 },
                ggr: { value: 10.24, unit: 'млрд', change: 68.9 },
                market_share: { value: 20.15, unit: '%', change: -6.3 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 111.16, unit: 'млрд', change: 131.9 },
                profit: { value: 9.91, unit: 'млрд', change: 148.4 },
                ggr: { value: 22.07, unit: 'млрд', change: 115.5 },
                market_share: { value: 15.05, unit: '%', change: -25.3 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2022': {
                revenue: { value: 166.10, unit: 'млрд', change: 49.4 },
                profit: { value: 13.14, unit: 'млрд', change: 32.6 },
                ggr: { value: 33.67, unit: 'млрд', change: 52.6 },
                market_share: { value: 18.89, unit: '%', change: 25.5 },
                target_contributions: { value: 2491, unit: 'млн', change: null }
            },
            '2023': {
                revenue: { value: 277.27, unit: 'млрд', change: 66.9 },
                profit: { value: 26.86, unit: 'млрд', change: 104.4 },
                ggr: { value: 71.15, unit: 'млрд', change: 111.3 },
                market_share: { value: 22.73, unit: '%', change: 20.3 },
                target_contributions: { value: 4163, unit: 'млн', change: 67.1 }
            },
            '2024': {
                revenue: { value: 414.99, unit: 'млрд', change: 49.7 },
                profit: { value: 27.75, unit: 'млрд', change: 3.3 },
                ggr: { value: 99.92, unit: 'млрд', change: 40.5 },
                market_share: { value: 23.99, unit: '%', change: 5.5 },
                target_contributions: { value: 9113, unit: 'млн', change: 118.9 }
            }
        }
    },
    'melbet': {
        name: 'Мелбет',
        logo: 'https://dumpster.cdn.sports.ru/3/95/b803d3289aae7797635a551d71575.jpg',
        founded: '2012',
        entity: 'ООО «Мелофон»',
        financials: {
            '2025': {
                revenue: { value: 39.36, unit: 'млрд', change: 13.5 },
                market_share: { value: 2.08, unit: '%', change: 0.08, changeKind: 'pp' },
                winnings: { value: 27.61, unit: 'млрд', change: 10.7 },
                ggr: { value: 11.75, unit: 'млрд', change: 20.6 },
                ggr_margin: { value: 29.85, unit: '%', change: 1.75, changeKind: 'pp' },
                profit: { value: 5.75, unit: 'млрд', change: 6.1 },
                target_contributions: { value: 787.231, unit: 'млн', change: 13.5 },
                salaries: { value: 17.266, unit: 'млн', change: -11.4 }
            },
            '2024': {
                revenue: { value: 34.69, unit: 'млрд', change: 42.2 },
                market_share: { value: 2, unit: '%', change: 0, changeKind: 'pp' },
                winnings: { value: 24.94, unit: 'млрд', change: 29.3 },
                ggr: { value: 9.75, unit: 'млрд', change: 91.2 },
                ggr_margin: { value: 28.1, unit: '%', change: 7.2, changeKind: 'pp' },
                profit: { value: 5.42, unit: 'млрд', change: 35.9 },
                target_contributions: { value: 693.727, unit: 'млн', change: 89.6 },
                salaries: { value: 19.492, unit: 'млн', change: -91.6 }
            },
            '2023': {
                revenue: { value: 24.39, unit: 'млрд', change: 1.4 },
                market_share: { value: 2, unit: '%', change: -0.73, changeKind: 'pp' },
                winnings: { value: 19.29, unit: 'млрд', change: -4.1 },
                ggr: { value: 5.1, unit: 'млрд', change: 29.9 },
                ggr_margin: { value: 20.9, unit: '%', change: 4.57, changeKind: 'pp' },
                profit: { value: 3.99, unit: 'млрд', change: -2.8 },
                target_contributions: { value: 365.837, unit: 'млн', change: 1.4 },
                salaries: { value: 231.37, unit: 'млн', change: null }
            },
            '2022': {
                revenue: { value: 24.04, unit: 'млрд', change: 18.2 },
                market_share: { value: 2.73, unit: '%', change: -0.02, changeKind: 'pp' },
                winnings: { value: 20.12, unit: 'млрд', change: 27.2 },
                ggr: { value: 3.93, unit: 'млрд', change: -13.1 },
                ggr_margin: { value: 16.33, unit: '%', change: -5.9, changeKind: 'pp' },
                profit: { value: 4.1, unit: 'млрд', change: 69.7 },
                target_contributions: { value: 360.609, unit: 'млн', change: 501 },
                salaries: { value: 4.336, unit: 'млн', change: 262.5 }
            },
            '2021': {
                revenue: { value: 20.34, unit: 'млрд', change: 1073.2 },
                market_share: { value: 2.75, unit: '%', change: 2.02, changeKind: 'pp' },
                winnings: { value: 15.82, unit: 'млрд', change: 1089.3 },
                ggr: { value: 4.52, unit: 'млрд', change: 1020.4 },
                ggr_margin: { value: 22.23, unit: '%', change: -1.04, changeKind: 'pp' },
                profit: { value: 2.42, unit: 'млрд', change: 4795.3 },
                target_contributions: { value: 60, unit: 'млн', change: 0 },
                salaries: { value: 1.196, unit: 'млн', change: 93.5 }
            },
            '2020': {
                revenue: { value: 1.73, unit: 'млрд', change: null },
                market_share: { value: 0.73, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: 1.33, unit: 'млрд', change: null },
                ggr: { value: 0.4, unit: 'млрд', change: null },
                ggr_margin: { value: 23.27, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 0.05, unit: 'млрд', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 0.618, unit: 'млн', change: null }
            }
        }
    },
    'betboom': {
        name: 'BetBoom',
        logo: 'https://dumpster.cdn.sports.ru/3/e5/5f377db01eb4c060a6cc0c2b5ecaf.jpg',
        founded: '2011',
        entity: 'ООО Фирма «СТОМ»',
        financials: {
            '2019': {
                revenue: { value: 20.15, unit: 'млрд', change: null },
                profit: { value: 0.48, unit: 'млрд', change: null },
                ggr: { value: 5.36, unit: 'млрд', change: null },
                market_share: { value: 14.66, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': {
                revenue: { value: 19.33, unit: 'млрд', change: null },
                market_share: { value: 8.12, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: 13.69, unit: 'млрд', change: null },
                ggr: { value: 5.64, unit: 'млрд', change: null },
                ggr_margin: { value: 29.17, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 1.19, unit: 'млрд', change: null },
                target_contributions: { value: '—', unit: '', change: null },
                salaries: { value: 638.81, unit: 'млн', change: null },
                staff: { value: 2181, unit: 'чел.', change: null },
                commercial: { value: 279.03, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 36.06, unit: 'млрд', change: 86.6 },
                market_share: { value: 4.88, unit: '%', change: -3.24, changeKind: 'pp' },
                winnings: { value: 30.20, unit: 'млрд', change: 120.7 },
                ggr: { value: 5.85, unit: 'млрд', change: 3.7 },
                ggr_margin: { value: 16.24, unit: '%', change: -12.93, changeKind: 'pp' },
                profit: { value: -0.55, unit: 'млрд', change: null },
                target_contributions: { value: '—', unit: '', change: null },
                salaries: { value: 691.53, unit: 'млн', change: 8.3 },
                staff: { value: 2367, unit: 'чел.', change: null },
                commercial: { value: 813.91, unit: 'млн', change: 191.8 }
            },
            '2022': {
                revenue: { value: 58.67, unit: 'млрд', change: 62.7 },
                market_share: { value: 6.67, unit: '%', change: 1.79, changeKind: 'pp' },
                winnings: { value: 47.84, unit: 'млрд', change: 58.4 },
                ggr: { value: 10.83, unit: 'млрд', change: 85.1 },
                ggr_margin: { value: 18.46, unit: '%', change: 2.22, changeKind: 'pp' },
                profit: { value: 0.95, unit: 'млрд', change: null },
                target_contributions: { value: 880, unit: 'млн', change: null },
                salaries: { value: 758.18, unit: 'млн', change: 9.6 },
                staff: { value: 2409, unit: 'чел.', change: null },
                commercial: { value: 1.35, unit: 'млрд', change: 65.7 }
            },
            '2023': {
                revenue: { value: 135.21, unit: 'млрд', change: 130.4 },
                market_share: { value: 11.08, unit: '%', change: 4.41, changeKind: 'pp' },
                winnings: { value: 107.51, unit: 'млрд', change: 124.7 },
                ggr: { value: 27.70, unit: 'млрд', change: 155.8 },
                ggr_margin: { value: 20.49, unit: '%', change: 2.03, changeKind: 'pp' },
                profit: { value: 2.97, unit: 'млрд', change: 212.6 },
                target_contributions: { value: 2009, unit: 'млн', change: 128.3 },
                salaries: { value: 1.03, unit: 'млрд', change: 35.4 },
                staff: { value: 2453, unit: 'чел.', change: null },
                commercial: { value: 3.76, unit: 'млрд', change: 178.6 }
            },
            '2024': {
                revenue: { value: 227.18, unit: 'млрд', change: 68.0 },
                market_share: { value: 13.13, unit: '%', change: 2.05, changeKind: 'pp' },
                winnings: { value: 170.54, unit: 'млрд', change: 58.6 },
                ggr: { value: 56.64, unit: 'млрд', change: 104.5 },
                ggr_margin: { value: 24.93, unit: '%', change: 4.44, changeKind: 'pp' },
                profit: { value: 2.54, unit: 'млрд', change: -14.5 },
                target_contributions: { value: 4393, unit: 'млн', change: 118.7 },
                salaries: { value: 1.15, unit: 'млрд', change: 11.7 },
                staff: { value: 2408, unit: 'чел.', change: null },
                commercial: { value: 8.45, unit: 'млрд', change: 124.7 }
            },
            '2025': {
                revenue: { value: 238.42, unit: 'млрд', change: 4.9 },
                market_share: { value: 12.60, unit: '%', change: -0.53, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 1.32, unit: 'млрд', change: -48.0 },
                target_contributions: { value: 4768.43, unit: 'млн', change: 8.5 },
                salaries: { value: 1.40, unit: 'млрд', change: 21.7 },
                staff: { value: 2571, unit: 'чел.', change: null },
                commercial: { value: 12.84, unit: 'млрд', change: 51.9 }
            }
        }
    },
    'betcity': {
        name: 'БЕТСИТИ',
        logo: 'https://dumpster.cdn.sports.ru/6/5d/3e1621d0edebd2abb1ac8b059d867.jpg',
        founded: '2003',
        entity: 'ООО «Фортуна»',
        financials: {
            '2025': {
                revenue: { value: 70.58, unit: 'млрд', change: 5.1 },
                market_share: { value: 3.73, unit: '%', change: -0.15, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 2.041, unit: 'млрд', change: -59.8 },
                target_contributions: { value: 1407.154, unit: 'млн', change: 5.8 },
                salaries: { value: 1250.4, unit: 'млн', change: 27.1 },
                staff: { value: 538, unit: 'чел.', change: null }
            },
            '2024': {
                revenue: { value: 67.18, unit: 'млрд', change: 36.3 },
                market_share: { value: 3.88, unit: '%', change: -0.16, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 5.071, unit: 'млрд', change: -16.3 },
                target_contributions: { value: 1329.541, unit: 'млн', change: 71.6 },
                salaries: { value: 984.022, unit: 'млн', change: 59.5 },
                staff: { value: 657, unit: 'чел.', change: null }
            },
            '2023': {
                revenue: { value: 49.29, unit: 'млрд', change: 33.6 },
                market_share: { value: 4.04, unit: '%', change: -0.16, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 6.06, unit: 'млрд', change: 835.9 },
                target_contributions: { value: 774.97, unit: 'млн', change: 39.7 },
                salaries: { value: 616.906, unit: 'млн', change: 84.2 },
                staff: { value: 657, unit: 'чел.', change: null }
            },
            '2022': {
                revenue: { value: 36.9, unit: 'млрд', change: 25.2 },
                market_share: { value: 4.2, unit: '%', change: 0.21, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 0.647, unit: 'млрд', change: -43.6 },
                target_contributions: { value: 554.774, unit: 'млн', change: 109.5 },
                salaries: { value: 334.911, unit: 'млн', change: 75 },
                staff: { value: 610, unit: 'чел.', change: null }
            },
            '2021': {
                revenue: { value: 29.48, unit: 'млрд', change: 101.9 },
                market_share: { value: 3.99, unit: '%', change: -2.15, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 1.148, unit: 'млрд', change: 831.6 },
                target_contributions: { value: 264.779, unit: 'млн', change: 341.3 },
                salaries: { value: 191.407, unit: 'млн', change: 19.7 },
                staff: { value: 543, unit: 'чел.', change: null }
            },
            '2020': {
                revenue: { value: 14.6, unit: 'млрд', change: null },
                market_share: { value: 6.14, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: '—', unit: '', change: null },
                ggr: { value: '—', unit: '', change: null },
                ggr_margin: { value: '—', unit: '', change: null },
                profit: { value: 0.123, unit: 'млрд', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 159.848, unit: 'млн', change: null },
                staff: { value: 578, unit: 'чел.', change: null }
            }
        }
    },
    'pari': { 
        name: 'PARI', 
        logo: 'https://dumpster.cdn.sports.ru/d/ba/d2462eaba730d24c1b99b66b08c99.png', 
        founded: '2022', 
        entity: 'ООО «БК «Пари»', 
        financials: { 
            '2022': { 
                revenue: { value: 38.78, unit: 'млрд', change: null }, 
                profit: { value: 2.05, unit: 'млрд', change: null },
                ggr: { value: 5.79, unit: 'млрд', change: null },
                market_share: { value: 4.41, unit: '%', change: null },
                target_contributions: { value: 582, unit: 'млн', change: null }
            }, 
            '2023': { 
                revenue: { value: 93.76, unit: 'млрд', change: 141.7 }, 
                profit: { value: 10.60, unit: 'млрд', change: 417.1 },
                ggr: { value: 15.64, unit: 'млрд', change: 170.1 },
                market_share: { value: 7.69, unit: '%', change: 74.4 },
                target_contributions: { value: 1406, unit: 'млн', change: 141.6 }
            }, 
            '2024': { 
                revenue: { value: 133.24, unit: 'млрд', change: 42.1 }, 
                profit: { value: 8.31, unit: 'млрд', change: -21.6 },
                ggr: { value: 22.59, unit: 'млрд', change: 44.4 },
                market_share: { value: 7.70, unit: '%', change: 0.1 },
                target_contributions: { value: 2665, unit: 'млн', change: 89.6 }
            } 
        } 
    },
    'ligastavok': { 
        name: 'Лига Ставок', 
        logo: 'https://dumpster.cdn.sports.ru/c/b7/f124e513d8966ecd54db959a4227e.png', 
        founded: '2008', 
        entity: 'ООО «ПМБК»', 
        financials: { 
            '2019': { 
                revenue: { value: 49.46, unit: 'млрд', change: null }, 
                profit: { value: 1.33, unit: 'млрд', change: null },
                ggr: { value: 9.72, unit: 'млрд', change: null },
                market_share: { value: 0, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': { 
                revenue: { value: 41.82, unit: 'млрд', change: -15.4 }, 
                profit: { value: 1.10, unit: 'млрд', change: -17.3 },
                ggr: { value: 10.07, unit: 'млрд', change: 3.6 },
                market_share: { value: 0, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 69.17, unit: 'млрд', change: 65.4 }, 
                profit: { value: 1.17, unit: 'млрд', change: 6.4 },
                ggr: { value: 16.19, unit: 'млрд', change: 60.8 },
                market_share: { value: 9.37, unit: '%', change: -46.7 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2022': { 
                revenue: { value: 71.53, unit: 'млрд', change: 3.4 }, 
                profit: { value: -0.50, unit: 'млрд', change: -142.7 },
                ggr: { value: 18.61, unit: 'млрд', change: 14.9 },
                market_share: { value: 8.14, unit: '%', change: -13.1 },
                target_contributions: { value: 1073, unit: 'млн', change: null }
            }, 
            '2023': { 
                revenue: { value: 96.16, unit: 'млрд', change: 34.4 }, 
                profit: { value: -0.02, unit: 'млрд', change: -96.0 },
                ggr: { value: 24.51, unit: 'млрд', change: 31.7 },
                market_share: { value: 7.88, unit: '%', change: -3.2 },
                target_contributions: { value: 1442, unit: 'млн', change: 34.4 }
            }, 
            '2024': { 
                revenue: { value: 117.73, unit: 'млрд', change: 22.4 }, 
                profit: { value: 2.32, unit: 'млрд', change: 11700.0 },
                ggr: { value: 29.93, unit: 'млрд', change: 22.1 },
                market_share: { value: 6.81, unit: '%', change: -13.6 },
                target_contributions: { value: 2355, unit: 'млн', change: 63.3 }
            } 
        } 
    },
    'leon': {
        name: 'Leon',
        logo: 'https://dumpster.cdn.sports.ru/5/48/ea6b6533bf8c30bcdf8a9479111e4.png',
        founded: '2011',
        entity: 'ООО «Леон»',
        financials: {
            '2025': {
                revenue: { value: 19.5, unit: 'млрд', change: 19.9 },
                market_share: { value: 1.03, unit: '%', change: 0.09, changeKind: 'pp' },
                winnings: { value: 15.15, unit: 'млрд', change: 22.1 },
                ggr: { value: 4.35, unit: 'млрд', change: 12.9 },
                ggr_margin: { value: 22.3, unit: '%', change: -1.38, changeKind: 'pp' },
                profit: { value: -0.296, unit: 'млрд', change: null },
                target_contributions: { value: 390.074, unit: 'млн', change: 19.7 },
                salaries: { value: 521.715, unit: 'млн', change: 53.9 }
            },
            '2024': {
                revenue: { value: 16.27, unit: 'млрд', change: 40.1 },
                market_share: { value: 0.94, unit: '%', change: -0.01, changeKind: 'pp' },
                winnings: { value: 12.41, unit: 'млрд', change: 46.2 },
                ggr: { value: 3.85, unit: 'млрд', change: 23.4 },
                ggr_margin: { value: 23.68, unit: '%', change: -3.2, changeKind: 'pp' },
                profit: { value: 0.14, unit: 'млрд', change: 180.8 },
                target_contributions: { value: 325.846, unit: 'млн', change: 86.4 },
                salaries: { value: 339.072, unit: 'млн', change: 33.4 }
            },
            '2023': {
                revenue: { value: 11.61, unit: 'млрд', change: 41.5 },
                market_share: { value: 0.95, unit: '%', change: 0.02, changeKind: 'pp' },
                winnings: { value: 8.49, unit: 'млрд', change: 39.9 },
                ggr: { value: 3.12, unit: 'млрд', change: 46.1 },
                ggr_margin: { value: 26.88, unit: '%', change: 0.84, changeKind: 'pp' },
                profit: { value: 0.05, unit: 'млрд', change: null },
                target_contributions: { value: 174.788, unit: 'млн', change: 36 },
                salaries: { value: 254.183, unit: 'млн', change: 89.8 }
            },
            '2022': {
                revenue: { value: 8.21, unit: 'млрд', change: 10 },
                market_share: { value: 0.93, unit: '%', change: -0.08, changeKind: 'pp' },
                winnings: { value: 6.07, unit: 'млрд', change: 2.8 },
                ggr: { value: 2.14, unit: 'млрд', change: 37.3 },
                ggr_margin: { value: 26.04, unit: '%', change: 5.19, changeKind: 'pp' },
                profit: { value: 0.001, unit: 'млрд', change: -99.8 },
                target_contributions: { value: 128.53, unit: 'млн', change: 69.9 },
                salaries: { value: 133.931, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 7.46, unit: 'млрд', change: 92.8 },
                market_share: { value: 1.01, unit: '%', change: -0.62, changeKind: 'pp' },
                winnings: { value: 5.91, unit: 'млрд', change: 90.4 },
                ggr: { value: 1.56, unit: 'млрд', change: 102.8 },
                ggr_margin: { value: 20.85, unit: '%', change: 1.03, changeKind: 'pp' },
                profit: { value: 0.464, unit: 'млрд', change: null },
                target_contributions: { value: 75.634, unit: 'млн', change: 26.1 },
                salaries: { value: 2.989, unit: 'млн', change: -52.1 }
            },
            '2020': {
                revenue: { value: 3.87, unit: 'млрд', change: null },
                market_share: { value: 1.63, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: 3.1, unit: 'млрд', change: null },
                ggr: { value: 0.77, unit: 'млрд', change: null },
                ggr_margin: { value: 19.82, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 0, unit: 'млрд', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 6.241, unit: 'млн', change: null }
            }
        }
    },
    'marathon': { 
        name: 'Марафон', 
        logo: 'https://dumpster.cdn.sports.ru/0/77/c218bb3fc90ed6741005655afb7ea.png', 
        founded: '1997', 
        entity: 'ООО «БК «Марафон»', 
        financials: { 
            '2020': { 
                revenue: { value: 4.06, unit: 'млрд', change: null }, 
                profit: { value: 0.18, unit: 'млрд', change: null },
                ggr: { value: 0.56, unit: 'млрд', change: null },
                market_share: { value: 1.71, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 12.26, unit: 'млрд', change: 201.7 }, 
                profit: { value: 1.39, unit: 'млрд', change: 672.2 },
                ggr: { value: 2.59, unit: 'млрд', change: 360.7 },
                market_share: { value: 1.66, unit: '%', change: -2.9 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2022': { 
                revenue: { value: 13.64, unit: 'млрд', change: 11.3 }, 
                profit: { value: 0.51, unit: 'млрд', change: -63.3 },
                ggr: { value: 3.34, unit: 'млрд', change: 29.0 },
                market_share: { value: 1.55, unit: '%', change: -6.6 },
                target_contributions: { value: 204, unit: 'млн', change: 85.5 }
            }, 
            '2023': { 
                revenue: { value: 18.20, unit: 'млрд', change: 33.4 }, 
                profit: { value: 0.24, unit: 'млрд', change: -53.1 },
                ggr: { value: 4.28, unit: 'млрд', change: 28.1 },
                market_share: { value: 1.49, unit: '%', change: -3.9 },
                target_contributions: { value: 274, unit: 'млн', change: 34.3 }
            }, 
            '2024': { 
                revenue: { value: 18.73, unit: 'млрд', change: 2.9 }, 
                profit: { value: 0.79, unit: 'млрд', change: 229.2 },
                ggr: { value: 5.02, unit: 'млрд', change: 17.3 },
                market_share: { value: 1.08, unit: '%', change: -27.5 },
                target_contributions: { value: 374, unit: 'млн', change: 36.5 }
            } 
        } 
    },
    'tennisi': {
        name: 'Tennisi',
        logo: 'https://dumpster.cdn.sports.ru/0/cf/e01a6253d18a8ca8e957548282dad.png',
        founded: '1999',
        entity: 'ООО «Рус-Телетот»',
        financials: {
            '2019': {
                revenue: { value: 0.47, unit: 'млрд', change: null },
                profit: { value: 0.009, unit: 'млрд', change: null },
                ggr: { value: 0.16, unit: 'млрд', change: null },
                market_share: { value: 0.34, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': {
                revenue: { value: 0.46, unit: 'млрд', change: -2.1 },
                profit: { value: 0.07, unit: 'млрд', change: 677.8 },
                ggr: { value: 0.19, unit: 'млрд', change: 18.8 },
                market_share: { value: 0.19, unit: '%', change: -44.1 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 2.49, unit: 'млрд', change: 442.4 },
                profit: { value: 0.14, unit: 'млрд', change: 109.1 },
                ggr: { value: 0.66, unit: 'млрд', change: 253.8 },
                market_share: { value: 0.34, unit: '%', change: 78.9 },
                target_contributions: { value: 0, unit: 'млн', change: -100.0 }
            },
            '2022': {
                revenue: { value: 2.98, unit: 'млрд', change: 19.7 },
                profit: { value: 0.07, unit: 'млрд', change: -50.9 },
                ggr: { value: 0.70, unit: 'млрд', change: 6.1 },
                market_share: { value: 0.34, unit: '%', change: 0.0 },
                target_contributions: { value: 120, unit: 'млн', change: null }
            },
            '2023': {
                revenue: { value: 4.21, unit: 'млрд', change: 41.3 },
                profit: { value: 0.28, unit: 'млрд', change: 315.3 },
                ggr: { value: 0.93, unit: 'млрд', change: 32.6 },
                market_share: { value: 0.35, unit: '%', change: 2.9 },
                target_contributions: { value: 120, unit: 'млн', change: 0 }
            },
            '2024': {
                revenue: { value: 4.59, unit: 'млрд', change: 9.0 },
                profit: { value: 0.28, unit: 'млрд', change: -1.1 },
                ggr: { value: 1.08, unit: 'млрд', change: 16.1 },
                market_share: { value: 0.27, unit: '%', change: -22.9 },
                target_contributions: { value: 120, unit: 'млн', change: 0 }
            }
        }
    },
    'baltbet': { 
        name: 'Балтбет', 
        logo: 'https://dumpster.cdn.sports.ru/a/39/484ac69771fe52e294c85cbd56752.png', 
        founded: '2003', 
        entity: 'ООО «Санторин»', 
        financials: { 
            '2020': { 
                revenue: { value: 7.26, unit: 'млрд', change: null },
                market_share: { value: 3.05, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: 4.73, unit: 'млрд', change: null },
                ggr: { value: 2.54, unit: 'млрд', change: null },
                ggr_margin: { value: 34.93, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: -133.54, unit: 'млн', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 227.61, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 10.12, unit: 'млрд', change: 39.4 },
                market_share: { value: 1.37, unit: '%', change: -1.68, changeKind: 'pp' },
                winnings: { value: 6.71, unit: 'млрд', change: 41.9 },
                ggr: { value: 3.41, unit: 'млрд', change: 34.3 },
                ggr_margin: { value: 33.72, unit: '%', change: -1.21, changeKind: 'pp' },
                profit: { value: 54.96, unit: 'млн', change: null },
                target_contributions: { value: '—', unit: '', change: null },
                salaries: { value: 199.78, unit: 'млн', change: -12.2 }
            },
            '2022': { 
                revenue: { value: 11.83, unit: 'млрд', change: 16.9 },
                market_share: { value: 1.35, unit: '%', change: -0.02, changeKind: 'pp' },
                winnings: { value: 7.28, unit: 'млрд', change: 8.5 },
                ggr: { value: 4.55, unit: 'млрд', change: 33.4 },
                ggr_margin: { value: 38.43, unit: '%', change: 4.71, changeKind: 'pp' },
                profit: { value: 31.14, unit: 'млн', change: -43.3 },
                target_contributions: { value: 177.48, unit: 'млн', change: null },
                salaries: { value: 221.07, unit: 'млн', change: 10.7 }
            }, 
            '2023': { 
                revenue: { value: 13.98, unit: 'млрд', change: 18.2 },
                market_share: { value: 1.15, unit: '%', change: -0.2, changeKind: 'pp' },
                winnings: { value: 8.01, unit: 'млрд', change: 10.0 },
                ggr: { value: 5.97, unit: 'млрд', change: 31.2 },
                ggr_margin: { value: 42.70, unit: '%', change: 4.27, changeKind: 'pp' },
                profit: { value: 113.07, unit: 'млн', change: 263.1 },
                target_contributions: { value: 209.71, unit: 'млн', change: 18.2 },
                salaries: { value: 236.84, unit: 'млн', change: 7.1 }
            }, 
            '2024': { 
                revenue: { value: 17.33, unit: 'млрд', change: 24.0 },
                market_share: { value: 1.00, unit: '%', change: -0.15, changeKind: 'pp' },
                winnings: { value: 9.65, unit: 'млрд', change: 20.5 },
                ggr: { value: 7.68, unit: 'млрд', change: 28.6 },
                ggr_margin: { value: 44.34, unit: '%', change: 1.64, changeKind: 'pp' },
                profit: { value: 435.31, unit: 'млн', change: 285.0 },
                target_contributions: { value: 346.60, unit: 'млн', change: 65.3 },
                salaries: { value: 265.17, unit: 'млн', change: 12.0 }
            },
            '2025': {
                revenue: { value: 12.68, unit: 'млрд', change: -26.9 },
                market_share: { value: 0.68, unit: '%', change: -0.32, changeKind: 'pp' },
                winnings: { value: 9.60, unit: 'млрд', change: -0.5 },
                ggr: { value: 3.08, unit: 'млрд', change: -59.9 },
                ggr_margin: { value: 24.30, unit: '%', change: -20.04, changeKind: 'pp' },
                profit: { value: 154.85, unit: 'млн', change: -64.4 },
                target_contributions: { value: 253.54, unit: 'млн', change: -26.8 },
                salaries: { value: 283.25, unit: 'млн', change: 6.8 }
            } 
        } 
    },
    'zenit': {
        name: 'Zenit',
        logo: 'https://dumpster.cdn.sports.ru/1/b9/441fcd19db99e77d60537ec7fd44e.png',
        founded: '1998',
        entity: 'ООО «Инвест-Гарант»',
        financials: {
            '2025': {
                revenue: { value: 12.12, unit: 'млрд', change: 1.8 },
                market_share: { value: 0.64, unit: '%', change: -0.05, changeKind: 'pp' },
                profit: { value: 34.973, unit: 'млн', change: 133.4 },
                target_contributions: { value: 242.304, unit: 'млн', change: 1.8 },
                salaries: { value: 57.224, unit: 'млн', change: 5.6 },
                staff: { value: 238, unit: 'чел.', change: null }
            },
            '2024': {
                revenue: { value: 11.9, unit: 'млрд', change: 12.3 },
                market_share: { value: 0.69, unit: '%', change: -0.18, changeKind: 'pp' },
                profit: { value: 14.984, unit: 'млн', change: -66.8 },
                target_contributions: { value: 238.077, unit: 'млн', change: 49.7 },
                salaries: { value: 54.21, unit: 'млн', change: 9 },
                staff: { value: 256, unit: 'чел.', change: null }
            },
            '2023': {
                revenue: { value: 10.6, unit: 'млрд', change: 23.5 },
                market_share: { value: 0.87, unit: '%', change: -0.11, changeKind: 'pp' },
                profit: { value: 45.167, unit: 'млн', change: null },
                target_contributions: { value: 159.006, unit: 'млн', change: 23.5 },
                salaries: { value: 49.718, unit: 'млн', change: 7.9 },
                staff: { value: 280, unit: 'чел.', change: null }
            },
            '2022': {
                revenue: { value: 8.59, unit: 'млрд', change: 16.3 },
                market_share: { value: 0.98, unit: '%', change: -0.02, changeKind: 'pp' },
                profit: { value: 0.417, unit: 'млн', change: -32.9 },
                target_contributions: { value: 128.792, unit: 'млн', change: 53.4 },
                salaries: { value: 46.082, unit: 'млн', change: 31.3 },
                staff: { value: 294, unit: 'чел.', change: null }
            },
            '2021': {
                revenue: { value: 7.38, unit: 'млрд', change: 1771.9 },
                market_share: { value: 1, unit: '%', change: 0.83, changeKind: 'pp' },
                profit: { value: 0.621, unit: 'млн', change: -84.2 },
                target_contributions: { value: 83.969, unit: 'млн', change: 39.9 },
                salaries: { value: 35.104, unit: 'млн', change: 33.2 },
                staff: { value: 300, unit: 'чел.', change: null }
            },
            '2020': {
                revenue: { value: 0.39, unit: 'млрд', change: null },
                market_share: { value: 0.17, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 3.929, unit: 'млн', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 26.348, unit: 'млн', change: null },
                staff: { value: 296, unit: 'чел.', change: null }
            }
        }
    },
    'olimpbet': {
        name: 'Olimpbet',
        logo: 'https://dumpster.cdn.sports.ru/b/4b/09a1ae66b9dfe5d3b89b3e19a2483.png',
        founded: '2012',
        entity: 'ООО «БК «Олимп»',
        financials: {
            '2025': {
                revenue: { value: 72.27, unit: 'млрд', change: 4.4 },
                market_share: { value: 3.82, unit: '%', change: -0.18, changeKind: 'pp' },
                winnings: { value: 55.83, unit: 'млрд', change: 4 },
                ggr: { value: 16.44, unit: 'млрд', change: 5.6 },
                ggr_margin: { value: 22.74, unit: '%', change: 0.26, changeKind: 'pp' },
                profit: { value: 1.053, unit: 'млрд', change: -55.2 },
                target_contributions: { value: 1445.364, unit: 'млн', change: 4.2 },
                advertising: { value: 5.21, unit: 'млрд', change: 9.6 },
                salaries: { value: 2096.3, unit: 'млн', change: 73.9 },
                staff: { value: 424, unit: 'чел.', change: null }
            },
            '2024': {
                revenue: { value: 69.23, unit: 'млрд', change: 33.2 },
                market_share: { value: 4, unit: '%', change: -0.26, changeKind: 'pp' },
                winnings: { value: 53.66, unit: 'млрд', change: 34.2 },
                ggr: { value: 15.56, unit: 'млрд', change: 29.7 },
                ggr_margin: { value: 22.48, unit: '%', change: -0.61, changeKind: 'pp' },
                profit: { value: 2.349, unit: 'млрд', change: 27.3 },
                target_contributions: { value: 1386.474, unit: 'млн', change: 77.4 },
                advertising: { value: 4.75, unit: 'млрд', change: null },
                salaries: { value: 1205.234, unit: 'млн', change: 72.7 },
                staff: { value: 272, unit: 'чел.', change: null }
            },
            '2023': {
                revenue: { value: 51.97, unit: 'млрд', change: 58.8 },
                market_share: { value: 4.26, unit: '%', change: 0.54, changeKind: 'pp' },
                winnings: { value: 39.97, unit: 'млрд', change: 59.3 },
                ggr: { value: 12, unit: 'млрд', change: 57.2 },
                ggr_margin: { value: 23.09, unit: '%', change: -0.23, changeKind: 'pp' },
                profit: { value: 1.845, unit: 'млрд', change: null },
                target_contributions: { value: 781.572, unit: 'млн', change: 59.8 },
                advertising: { value: '—', unit: '', change: null },
                salaries: { value: 697.747, unit: 'млн', change: 0.7 },
                staff: { value: 197, unit: 'чел.', change: null }
            },
            '2022': {
                revenue: { value: 32.73, unit: 'млрд', change: 29.7 },
                market_share: { value: 3.72, unit: '%', change: 0.3, changeKind: 'pp' },
                winnings: { value: 25.1, unit: 'млрд', change: 30.3 },
                ggr: { value: 7.63, unit: 'млрд', change: 27.8 },
                ggr_margin: { value: 23.32, unit: '%', change: -0.36, changeKind: 'pp' },
                profit: { value: 0.008, unit: 'млрд', change: -44.5 },
                target_contributions: { value: 489.183, unit: 'млн', change: 89.8 },
                advertising: { value: '—', unit: '', change: null },
                salaries: { value: 693.119, unit: 'млн', change: 76.2 },
                staff: { value: '—', unit: '', change: null }
            },
            '2021': {
                revenue: { value: 25.23, unit: 'млрд', change: 85.6 },
                market_share: { value: 3.42, unit: '%', change: -2.29, changeKind: 'pp' },
                winnings: { value: 19.26, unit: 'млрд', change: 86.6 },
                ggr: { value: 5.97, unit: 'млрд', change: 82.5 },
                ggr_margin: { value: 23.68, unit: '%', change: -0.4, changeKind: 'pp' },
                profit: { value: 0.014, unit: 'млрд', change: -94 },
                target_contributions: { value: 257.763, unit: 'млн', change: 329.6 },
                advertising: { value: '—', unit: '', change: null },
                salaries: { value: 393.268, unit: 'млн', change: 127.2 },
                staff: { value: '—', unit: '', change: null }
            },
            '2020': {
                revenue: { value: 13.59, unit: 'млрд', change: null },
                market_share: { value: 5.71, unit: '%', change: null, changeKind: 'pp' },
                winnings: { value: 10.32, unit: 'млрд', change: null },
                ggr: { value: 3.27, unit: 'млрд', change: null },
                ggr_margin: { value: 24.08, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: 0.227, unit: 'млрд', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                advertising: { value: '—', unit: '', change: null },
                salaries: { value: 173.112, unit: 'млн', change: null },
                staff: { value: '—', unit: '', change: null }
            }
        }
    },
    'bettery': {
        name: 'Bettery',
        logo: 'https://dumpster.cdn.sports.ru/5/1f/5f974506f81a801da1acb5b9db558.jpg',
        founded: '2020',
        entity: 'ООО «Атлантис»',
        financials: {
            '2025': {
                revenue: { value: 5.428, unit: 'млрд', change: 343.2 },
                market_share: { value: 0.29, unit: '%', change: 0.22, changeKind: 'pp' },
                profit: { value: 0.401, unit: 'млрд', change: null },
                target_contributions: { value: 141.014, unit: 'млн', change: 36.6 },
                salaries: { value: 27.957, unit: 'млн', change: 61.3 },
                commercial: { value: 0.318, unit: 'млрд', change: 149.7 }
            },
            '2024': {
                revenue: { value: 1.225, unit: 'млрд', change: null },
                market_share: { value: 0.07, unit: '%', change: 0.07, changeKind: 'pp' },
                profit: { value: -0.079, unit: 'млрд', change: null },
                target_contributions: { value: 103.243, unit: 'млн', change: -31.2 },
                salaries: { value: 17.336, unit: 'млн', change: 2.3 },
                commercial: { value: 0.127, unit: 'млрд', change: null }
            },
            '2023': {
                revenue: { value: 0.003, unit: 'млрд', change: -98.3 },
                market_share: { value: 0, unit: '%', change: -0.02, changeKind: 'pp' },
                profit: { value: -0.119, unit: 'млрд', change: -37.7 },
                target_contributions: { value: 150, unit: 'млн', change: 51.8 },
                salaries: { value: 16.948, unit: 'млн', change: -8.8 },
                commercial: { value: '—', unit: '', change: null }
            },
            '2022': {
                revenue: { value: 0.165, unit: 'млрд', change: -70.3 },
                market_share: { value: 0.02, unit: '%', change: -0.06, changeKind: 'pp' },
                profit: { value: -0.191, unit: 'млрд', change: null },
                target_contributions: { value: 98.836, unit: 'млн', change: null },
                salaries: { value: 18.574, unit: 'млн', change: 23.7 },
                commercial: { value: '—', unit: '', change: null }
            },
            '2021': {
                revenue: { value: 0.554, unit: 'млрд', change: 547.1 },
                market_share: { value: 0.08, unit: '%', change: 0.04, changeKind: 'pp' },
                profit: { value: 0.028, unit: 'млрд', change: null },
                target_contributions: { value: '—', unit: '', change: null },
                salaries: { value: 15.015, unit: 'млн', change: 105.1 },
                commercial: { value: '—', unit: '', change: null }
            },
            '2020': {
                revenue: { value: 0.086, unit: 'млрд', change: null },
                market_share: { value: 0.04, unit: '%', change: null, changeKind: 'pp' },
                profit: { value: -0.028, unit: 'млрд', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null },
                salaries: { value: 7.321, unit: 'млн', change: null },
                commercial: { value: '—', unit: '', change: null }
            }
        }
    },
    'betm': {
        name: 'Бет-М',
        logo: 'https://dumpster.cdn.sports.ru/2/b3/842bfb5db6116469010f1ae6951e2.png',
        founded: '2025',
        entity: 'ООО «Бет-М»',
        financials: {
            '2025': {
                revenue: { value: 144, unit: 'млн', change: null },
                market_share: { value: 0.01, unit: '%', change: null },
                ggr: { value: 41.3, unit: 'млн', change: null },
                profit: { value: -268.4, unit: 'млн', change: null },
                target_contributions: { value: 120000, unit: 'тыс', change: null }
            }
        }
    }
};

// Текущий выбранный год
let selectedYear = '2025';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeYearTabs();
    renderCompanies();
});

// Инициализация табов с годами
function initializeYearTabs() {
    const tabs = document.querySelectorAll('.year-tab');
    
    // Устанавливаем первый таб активным
    tabs[0].classList.add('active');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс к текущему табу
            this.classList.add('active');
            
            // Обновляем выбранный год
            selectedYear = this.dataset.year;
            
            // Перерисовываем компании
            renderCompanies();
        });
    });
}

/** Выручка для сортировки: всё приводится к млрд (144 млн → 0,144). */
function revenueForSort(revenue) {
    if (!revenue || typeof revenue.value !== 'number' || Number.isNaN(revenue.value)) return 0;
    const v = revenue.value;
    const u = revenue.unit || 'млрд';
    if (u === 'млрд') return v;
    if (u === 'млн') return v / 1000;
    if (u === 'тыс') return v / 1e6;
    return v;
}

// Рендеринг компаний
function renderCompanies() {
    const container = document.getElementById('companiesData');
    
    // Сортируем компании по выручке выбранного года (убывание)
    const sortedCompanies = Object.entries(companiesData).sort((a, b) => {
        const aRev = revenueForSort(a[1].financials[selectedYear]?.revenue);
        const bRev = revenueForSort(b[1].financials[selectedYear]?.revenue);
        return bRev - aRev;
    });
    
    let html = '';
    
    sortedCompanies.forEach(([id, company]) => {
        // Бет-М существует только с 2025 года
        if (id === 'betm' && selectedYear !== '2025') return;

        const yearData = company.financials[selectedYear];

        html += createCompanyCard(company, yearData, selectedYear);
    });
    
    if (html === '') {
        html = '<div class="empty-state">Нет данных для выбранного года</div>';
    }
    
    container.innerHTML = html;
}

/** Изменение штата к прошлому году: разница в чел. (п.п. к штату не применяются — это не доля в %). */
function enrichStaffYearOverYear(staff, prevYearStaff) {
    if (!staff || staff.value === '—') return staff;
    if (typeof staff.value !== 'number') return staff;
    if (!prevYearStaff || prevYearStaff.value === '—' || typeof prevYearStaff.value !== 'number') {
        return staff;
    }
    const diff = staff.value - prevYearStaff.value;
    return { ...staff, change: diff, changeKind: 'people' };
}

// Создание карточки компании
function createCompanyCard(company, yearData, selectedYear) {
    if (!yearData) {
        return `
            <div class="company-card">
                <div class="company-header">
                    <div class="company-logo-wrapper">
                        <img src="${company.logo}" alt="${company.name}" class="company-logo" 
                             onerror="this.style.display='none'">
                        <div class="company-info">
                            <div class="company-name">${company.name}</div>
                            <div class="company-founded">Основана: ${company.founded}</div>
                            <div class="company-entity">${company.entity}</div>
                        </div>
                    </div>
                </div>
                <div class="company-body">
                    <div class="no-report-message">Не опубликовали финансовую очтетность</div>
                </div>
            </div>
        `;
    }

    const profitLabel = yearData.profit && yearData.profit.value < 0 ? 'Убыток' : 'Прибыль';

    const prevYear = String(Number(selectedYear) - 1);
    const prevYearData = company.financials[prevYear];
    const staffRow = enrichStaffYearOverYear(yearData.staff, prevYearData && prevYearData.staff);

    return `
        <div class="company-card">
            <div class="company-header">
                <div class="company-logo-wrapper">
                    <img src="${company.logo}" alt="${company.name}" class="company-logo" 
                         onerror="this.style.display='none'">
                    <div class="company-info">
                        <div class="company-name">${company.name}</div>
                        <div class="company-founded">Основана: ${company.founded}</div>
                        <div class="company-entity">${company.entity}</div>
                    </div>
                </div>
            </div>
            <div class="company-body">
                ${createMetricRow('Выручка', yearData.revenue)}
                ${createMetricRow('Доля рынка', yearData.market_share)}
                ${createMetricRow('Выигрыши', yearData.winnings)}
                ${createMetricRow('GGR', yearData.ggr)}
                ${createMetricRow('% GGR', yearData.ggr_margin)}
                ${createMetricRow(profitLabel, yearData.profit)}
                ${createMetricRow('Целевые отчисления', yearData.target_contributions)}
                ${createMetricRow('Реклама и спонсорство', yearData.advertising)}
                ${createMetricRow('Зарплаты', yearData.salaries)}
                ${createMetricRow('Штат сотрудников', staffRow)}
                ${createMetricRow('Коммерческие расходы', yearData.commercial)}
            </div>
        </div>
    `;
}

/** Единицы в скобках в названии строки, если нет своей из данных */
const METRIC_DEFAULT_UNITS = {
    Выручка: 'млрд',
    'Доля рынка': '%',
    Выигрыши: 'млрд',
    GGR: 'млрд',
    '% GGR': '%',
    Прибыль: 'млрд',
    Убыток: 'млрд',
    'Целевые отчисления': 'млн',
    'Реклама и спонсорство': 'млрд',
    Зарплаты: 'млрд',
    'Штат сотрудников': 'чел.',
    'Коммерческие расходы': 'млрд'
};

function buildMetricTitle(label, formattedMetric) {
    const u = formattedMetric.unit || METRIC_DEFAULT_UNITS[label] || '';
    return u ? `${label} (${u})` : label;
}

// Создание строки с метрикой
function createMetricRow(label, data) {
    if (!data) return '';

    if (data.value === '—') {
        const title = buildMetricTitle(label, { value: '—', unit: METRIC_DEFAULT_UNITS[label] || '' });
        return `
        <div class="metric-row">
            <span class="metric-label">${title}</span>
            <div class="metric-value-wrapper">
                <div class="metric-value-main">
                    <span class="metric-value">—</span>
                </div>
            </div>
        </div>`;
    }

    if (typeof data.value === 'number' && data.value === 0 && label === 'Целевые отчисления') {
        return '';
    }

    const formattedMetric = formatMetricValue(label, data);
    const value = formattedMetric.value;
    const change = data.change;
    const changeKind = data.changeKind;
    const title = buildMetricTitle(label, formattedMetric);

    let changeHtml = '';
    if (change !== null && change !== undefined) {
        const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
        const sign = change > 0 ? '+' : change < 0 ? '−' : '';
        if (changeKind === 'people') {
            const n = Math.abs(Math.round(change));
            /* ед. в названии строки «Штат сотрудников (чел.)» — в бейдже только число */
            changeHtml = `<span class="metric-change ${changeClass}">${sign}${n.toLocaleString('ru-RU')}</span>`;
        } else {
            const changeAbs = Math.abs(change).toLocaleString('ru-RU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
            if (changeKind === 'pp') {
                changeHtml = `<span class="metric-change ${changeClass}">${sign}${changeAbs} п.п.</span>`;
            } else {
                changeHtml = `<span class="metric-change ${changeClass}">${sign}${changeAbs}%</span>`;
            }
        }
    }

    return `
        <div class="metric-row">
            <span class="metric-label">${title}</span>
            <div class="metric-value-wrapper">
                <div class="metric-value-main">
                    <span class="metric-value">${value}</span>
                </div>
                ${changeHtml}
            </div>
        </div>
    `;
}

function formatMetricValue(label, data) {
    if (data.value === '—') {
        return { value: '—', unit: '' };
    }

    if (label === 'Штат сотрудников') {
        if (typeof data.value === 'number') {
            return {
                value: data.value.toLocaleString('ru-RU'),
                unit: 'чел.'
            };
        }
        return { value: String(data.value), unit: 'чел.' };
    }

    // Доля рынка и % GGR: число без «%» в значении — единица в названии строки
    if (label === 'Доля рынка' || label === '% GGR') {
        if (data.value === '—') {
            return { value: '—', unit: '%' };
        }
        if (typeof data.value === 'number') {
            return {
                value: data.value.toLocaleString('ru-RU', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                }),
                unit: '%'
            };
        }
        return { value: String(data.value), unit: '%' };
    }

    // Целевые отчисления: если больше 1 млрд, показываем в млрд (пример: 12,2 млрд)
    if (label === 'Целевые отчисления' && typeof data.value === 'number') {
        let valueInMln = data.value;

        if (data.unit === 'тыс') {
            valueInMln = data.value / 1000;
        }

        if (valueInMln >= 1000) {
            return {
                value: (valueInMln / 1000).toLocaleString('ru-RU', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2
                }),
                unit: 'млрд'
            };
        }

        return {
            value: valueInMln.toLocaleString('ru-RU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }),
            unit: 'млн'
        };
    }

    if (
        typeof data.value === 'number' &&
        (label === 'Выручка' ||
            label === 'Прибыль' ||
            label === 'Убыток' ||
            label === 'Выигрыши' ||
            label === 'GGR' ||
            label === 'Зарплаты' ||
            label === 'Коммерческие расходы' ||
            label === 'Реклама и спонсорство')
    ) {
        const abs = Math.abs(data.value);
        const sign = data.value < 0 ? '−' : '';
        let v = abs;
        let u = data.unit || '';
        if (u === 'млрд') {
            return {
                value: sign + v.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
                unit: 'млрд'
            };
        }
        if (u === 'млн') {
            return {
                value: sign + v.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
                unit: 'млн'
            };
        }
    }

    return {
        value: typeof data.value === 'number' ? data.value.toLocaleString('ru-RU') : data.value,
        unit: data.unit || ''
    };
}
