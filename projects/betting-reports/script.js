// Данные компаний
const companiesData = {
    'fonbet': {
        name: 'FONBET',
        logo: 'Фонбет.png',
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
                revenue: { value: 52.19, unit: 'млрд', change: 37.1 },
                profit: { value: 23.30, unit: 'млрд', change: 20.1 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 21.93, unit: '%', change: -20.8 },
                target_contributions: { value: 818, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 264.40, unit: 'млрд', change: 406.5 },
                profit: { value: 29.71, unit: 'млрд', change: 27.5 },
                ggr: { value: 68.40, unit: 'млрд', change: null },
                market_share: { value: 35.81, unit: '%', change: 63.3 },
                target_contributions: { value: 3536, unit: 'млн', change: 332.3 }
            },
            '2022': {
                revenue: { value: 220.78, unit: 'млрд', change: -16.5 },
                profit: { value: 26.36, unit: 'млрд', change: -11.3 },
                ggr: { value: 53.87, unit: 'млрд', change: -21.2 },
                market_share: { value: 25.11, unit: '%', change: -29.9 },
                target_contributions: { value: 3233, unit: 'млн', change: -8.6 }
            },
            '2023': {
                revenue: { value: 435.64, unit: 'млрд', change: 97.3 },
                profit: { value: 59.20, unit: 'млрд', change: 124.6 },
                ggr: { value: 107.81, unit: 'млрд', change: 100.1 },
                market_share: { value: 35.71, unit: '%', change: 42.2 },
                target_contributions: { value: 6509, unit: 'млн', change: 101.3 }
            },
            '2024': {
                revenue: { value: 608.81, unit: 'млрд', change: 39.7 },
                profit: { value: 37.44, unit: 'млрд', change: -36.8 },
                ggr: { value: 140.83, unit: 'млрд', change: 30.6 },
                market_share: { value: 35.19, unit: '%', change: -1.5 },
                target_contributions: { value: 12122, unit: 'млн', change: 86.3 }
            }
        }
    },
    'winline': {
        name: 'WINLINE',
        logo: 'Винлайн.png',
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
        logo: 'Мелбет.jpg',
        founded: '2012',
        entity: 'ООО «Мелофон»',
        financials: {
            '2020': {
                revenue: { value: 1.73, unit: 'млрд', change: null },
                profit: { value: 0.05, unit: 'млрд', change: null },
                ggr: { value: 0.40, unit: 'млрд', change: null },
                market_share: { value: 0.73, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 20.34, unit: 'млрд', change: 1074.0 },
                profit: { value: 2.42, unit: 'млрд', change: 4740.0 },
                ggr: { value: 4.52, unit: 'млрд', change: 1030.0 },
                market_share: { value: 2.75, unit: '%', change: 276.7 },
                target_contributions: { value: 60, unit: 'млн', change: null }
            },
            '2022': {
                revenue: { value: 24.04, unit: 'млрд', change: 18.2 },
                profit: { value: 4.10, unit: 'млрд', change: 69.6 },
                ggr: { value: 3.93, unit: 'млрд', change: -13.1 },
                market_share: { value: 2.73, unit: '%', change: -0.7 },
                target_contributions: { value: 361, unit: 'млн', change: 501.7 }
            },
            '2023': {
                revenue: { value: 24.39, unit: 'млрд', change: 1.5 },
                profit: { value: 3.99, unit: 'млрд', change: -2.7 },
                ggr: { value: 5.10, unit: 'млрд', change: 29.8 },
                market_share: { value: 2.00, unit: '%', change: -26.7 },
                target_contributions: { value: 366, unit: 'млн', change: 1.4 }
            },
            '2024': {
                revenue: { value: 34.69, unit: 'млрд', change: 42.2 },
                profit: { value: 5.42, unit: 'млрд', change: 35.8 },
                ggr: { value: 9.75, unit: 'млрд', change: 91.2 },
                market_share: { value: 2.00, unit: '%', change: 0 },
                target_contributions: { value: 694, unit: 'млн', change: 89.6 }
            }
        }
    },
    'betboom': {
        name: 'BetBoom',
        logo: 'BetBoom.jpg',
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
                revenue: { value: 19.33, unit: 'млрд', change: -4.1 },
                profit: { value: 1.19, unit: 'млрд', change: 147.9 },
                ggr: { value: 5.64, unit: 'млрд', change: 5.2 },
                market_share: { value: 8.12, unit: '%', change: -44.6 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 36.06, unit: 'млрд', change: 86.5 },
                profit: { value: -0.55, unit: 'млрд', change: -146.1 },
                ggr: { value: 5.85, unit: 'млрд', change: 3.7 },
                market_share: { value: 4.88, unit: '%', change: -39.9 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2022': {
                revenue: { value: 58.67, unit: 'млрд', change: 62.7 },
                profit: { value: 0.95, unit: 'млрд', change: 272.7 },
                ggr: { value: 10.83, unit: 'млрд', change: 85.1 },
                market_share: { value: 6.67, unit: '%', change: 36.7 },
                target_contributions: { value: 880, unit: 'млн', change: null }
            },
            '2023': {
                revenue: { value: 135.21, unit: 'млрд', change: 130.4 },
                profit: { value: 2.97, unit: 'млрд', change: 212.6 },
                ggr: { value: 27.70, unit: 'млрд', change: 155.8 },
                market_share: { value: 11.08, unit: '%', change: 66.1 },
                target_contributions: { value: 2009, unit: 'млн', change: 128.3 }
            },
            '2024': {
                revenue: { value: 227.18, unit: 'млрд', change: 68.0 },
                profit: { value: 2.54, unit: 'млрд', change: -14.5 },
                ggr: { value: 56.64, unit: 'млрд', change: 104.5 },
                market_share: { value: 13.13, unit: '%', change: 18.5 },
                target_contributions: { value: 4393, unit: 'млн', change: 118.7 }
            }
        }
    },
    'betcity': {
        name: 'БЕТСИТИ',
        logo: 'БЕТСИТИ.jpg',
        founded: '2003',
        entity: 'ООО «Фортуна»',
        financials: {
            '2019': {
                revenue: { value: 15.81, unit: 'млрд', change: null },
                profit: { value: 0.86, unit: 'млрд', change: null },
                ggr: { value: 15.81, unit: 'млрд', change: null },
                market_share: { value: 11.50, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': {
                revenue: { value: 14.60, unit: 'млрд', change: -7.7 },
                profit: { value: 0.12, unit: 'млрд', change: -86.0 },
                ggr: { value: 14.60, unit: 'млрд', change: -7.7 },
                market_share: { value: 6.14, unit: '%', change: -46.6 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 29.48, unit: 'млрд', change: 101.9 },
                profit: { value: 1.15, unit: 'млрд', change: 831.8 },
                ggr: { value: 29.48, unit: 'млрд', change: 101.9 },
                market_share: { value: 3.99, unit: '%', change: -35.0 },
                target_contributions: { value: 265, unit: 'млн', change: 341.7 }
            },
            '2022': {
                revenue: { value: 36.90, unit: 'млрд', change: 25.2 },
                profit: { value: 0.65, unit: 'млрд', change: -43.5 },
                ggr: { value: 36.90, unit: 'млрд', change: 25.2 },
                market_share: { value: 4.20, unit: '%', change: 5.3 },
                target_contributions: { value: 555, unit: 'млн', change: 109.4 }
            },
            '2023': {
                revenue: { value: 49.29, unit: 'млрд', change: 33.6 },
                profit: { value: 6.06, unit: 'млрд', change: 835.4 },
                ggr: { value: 8.54, unit: 'млрд', change: -76.9 },
                market_share: { value: 4.04, unit: '%', change: -3.8 },
                target_contributions: { value: 775, unit: 'млн', change: 39.6 }
            },
            '2024': {
                revenue: { value: 67.18, unit: 'млрд', change: 36.3 },
                profit: { value: 5.07, unit: 'млрд', change: -16.3 },
                ggr: { value: 11.55, unit: 'млрд', change: 35.3 },
                market_share: { value: 3.88, unit: '%', change: -4.0 },
                target_contributions: { value: 1330, unit: 'млн', change: 71.6 }
            }
        }
    },
    'pari': { 
        name: 'PARI', 
        logo: 'Пари.png', 
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
        logo: 'Лига Ставок.jpeg', 
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
        logo: 'leon.png', 
        founded: '2011', 
        entity: 'ООО «Леон»', 
        financials: { 
            '2019': { 
                revenue: { value: 4.07, unit: 'млрд', change: null }, 
                profit: { value: 0.04, unit: 'млрд', change: null },
                ggr: { value: 0.68, unit: 'млрд', change: null },
                market_share: { value: 2.96, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': { 
                revenue: { value: 3.87, unit: 'млрд', change: -4.9 }, 
                profit: { value: 0.00, unit: 'млрд', change: -100.0 },
                ggr: { value: 0.77, unit: 'млрд', change: 13.2 },
                market_share: { value: 1.63, unit: '%', change: -44.9 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 7.46, unit: 'млрд', change: 92.8 }, 
                profit: { value: 0.46, unit: 'млрд', change: null },
                ggr: { value: 1.56, unit: 'млрд', change: 102.6 },
                market_share: { value: 1.01, unit: '%', change: -38.0 },
                target_contributions: { value: 76, unit: 'млн', change: 26.7 }
            },
            '2022': { 
                revenue: { value: 8.21, unit: 'млрд', change: 10.1 }, 
                profit: { value: 0.001, unit: 'млрд', change: -99.8 },
                ggr: { value: 2.14, unit: 'млрд', change: 37.2 },
                market_share: { value: 0.93, unit: '%', change: -7.9 },
                target_contributions: { value: 129, unit: 'млн', change: 69.7 }
            }, 
            '2023': { 
                revenue: { value: 11.61, unit: 'млрд', change: 41.4 }, 
                profit: { value: 0.05, unit: 'млрд', change: 4400.0 },
                ggr: { value: 3.12, unit: 'млрд', change: 45.8 },
                market_share: { value: 0.95, unit: '%', change: 2.2 },
                target_contributions: { value: 175, unit: 'млн', change: 35.7 }
            }, 
            '2024': { 
                revenue: { value: 16.27, unit: 'млрд', change: 40.1 }, 
                profit: { value: 0.14, unit: 'млрд', change: 180.8 },
                ggr: { value: 3.85, unit: 'млрд', change: 23.4 },
                market_share: { value: 0.94, unit: '%', change: -1.1 },
                target_contributions: { value: 326, unit: 'млн', change: 86.3 }
            } 
        } 
    },
    'marathon': { 
        name: 'Марафон', 
        logo: 'марафон.png', 
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
        logo: 'Тенниси.png',
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
        logo: 'Балтбет.png', 
        founded: '2003', 
        entity: 'ООО «Санторин»', 
        financials: { 
            '2019': { 
                revenue: { value: 11.31, unit: 'млрд', change: null }, 
                profit: { value: -0.03, unit: 'млрд', change: null },
                ggr: { value: 3.85, unit: 'млрд', change: null },
                market_share: { value: 8.23, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': { 
                revenue: { value: 7.26, unit: 'млрд', change: -35.8 }, 
                profit: { value: -0.13, unit: 'млрд', change: 324.7 },
                ggr: { value: 2.54, unit: 'млрд', change: -34.0 },
                market_share: { value: 3.05, unit: '%', change: -62.9 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 10.12, unit: 'млрд', change: 39.4 }, 
                profit: { value: 0.05, unit: 'млрд', change: 141.4 },
                ggr: { value: 3.41, unit: 'млрд', change: 34.3 },
                market_share: { value: 1.37, unit: '%', change: -55.1 },
                target_contributions: { value: 0, unit: 'млн', change: -100.0 }
            },
            '2022': { 
                revenue: { value: 11.83, unit: 'млрд', change: 16.9 }, 
                profit: { value: 0.03, unit: 'млрд', change: -43.4 },
                ggr: { value: 4.55, unit: 'млрд', change: 33.4 },
                market_share: { value: 1.35, unit: '%', change: -1.5 },
                target_contributions: { value: 177, unit: 'млн', change: null }
            }, 
            '2023': { 
                revenue: { value: 13.98, unit: 'млрд', change: 18.2 }, 
                profit: { value: 0.11, unit: 'млрд', change: 263.2 },
                ggr: { value: 5.97, unit: 'млрд', change: 31.2 },
                market_share: { value: 1.15, unit: '%', change: -14.8 },
                target_contributions: { value: 210, unit: 'млн', change: 18.6 }
            }, 
            '2024': { 
                revenue: { value: 17.33, unit: 'млрд', change: 24.0 }, 
                profit: { value: 0.44, unit: 'млрд', change: 285.0 },
                ggr: { value: 7.68, unit: 'млрд', change: 28.6 },
                market_share: { value: 1.00, unit: '%', change: -13.0 },
                target_contributions: { value: 347, unit: 'млн', change: 65.2 }
            } 
        } 
    },
    'zenit': { 
        name: 'Zenit', 
        logo: 'Зенит.png', 
        founded: '1998', 
        entity: 'ООО «Инвест-Гарант»', 
        financials: { 
            '2019': { 
                revenue: { value: 0.34, unit: 'млрд', change: null }, 
                profit: { value: 0.01, unit: 'млрд', change: null },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.25, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': { 
                revenue: { value: 0.39, unit: 'млрд', change: 14.7 }, 
                profit: { value: 0.004, unit: 'млрд', change: -66.7 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.17, unit: '%', change: -32.0 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 7.38, unit: 'млрд', change: 1770.9 }, 
                profit: { value: 0.0006, unit: 'млрд', change: -84.5 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 1.00, unit: '%', change: 488.2 },
                target_contributions: { value: 84, unit: 'млн', change: 40.0 }
            },
            '2022': { 
                revenue: { value: 8.59, unit: 'млрд', change: 16.4 }, 
                profit: { value: 0.0004, unit: 'млрд', change: -33.3 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.98, unit: '%', change: -2.0 },
                target_contributions: { value: 129, unit: 'млн', change: 53.6 }
            }, 
            '2023': { 
                revenue: { value: 10.60, unit: 'млрд', change: 23.4 }, 
                profit: { value: 0.05, unit: 'млрд', change: 11150.0 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.87, unit: '%', change: -11.2 },
                target_contributions: { value: 159, unit: 'млн', change: 23.3 }
            }, 
            '2024': { 
                revenue: { value: 11.90, unit: 'млрд', change: 12.3 }, 
                profit: { value: 0.01, unit: 'млрд', change: -66.8 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.69, unit: '%', change: -20.7 },
                target_contributions: { value: 238, unit: 'млн', change: 49.7 }
            } 
        } 
    },
    'olimpbet': { 
        name: 'Olimpbet', 
        logo: 'Olimpbet.png', 
        founded: '2012', 
        entity: 'ООО «БК «Олимп»', 
        financials: { 
            '2019': { 
                revenue: { value: 10.50, unit: 'млрд', change: null }, 
                profit: { value: 0.43, unit: 'млрд', change: null },
                ggr: { value: 1.94, unit: 'млрд', change: null },
                market_share: { value: 7.64, unit: '%', change: null },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2020': { 
                revenue: { value: 13.59, unit: 'млрд', change: 29.4 }, 
                profit: { value: 0.23, unit: 'млрд', change: -46.9 },
                ggr: { value: 3.27, unit: 'млрд', change: 68.6 },
                market_share: { value: 5.71, unit: '%', change: -25.3 },
                target_contributions: { value: 0, unit: 'млн', change: null }
            },
            '2021': { 
                revenue: { value: 25.23, unit: 'млрд', change: 85.6 }, 
                profit: { value: 0.01, unit: 'млрд', change: -94.0 },
                ggr: { value: 5.97, unit: 'млрд', change: 82.6 },
                market_share: { value: 3.42, unit: '%', change: -40.1 },
                target_contributions: { value: 258, unit: 'млн', change: 330.0 }
            },
            '2022': { 
                revenue: { value: 32.73, unit: 'млрд', change: 29.7 }, 
                profit: { value: 0.01, unit: 'млрд', change: -44.5 },
                ggr: { value: 7.63, unit: 'млрд', change: 27.8 },
                market_share: { value: 3.72, unit: '%', change: 8.8 },
                target_contributions: { value: 489, unit: 'млн', change: 89.5 }
            }, 
            '2023': { 
                revenue: { value: 51.97, unit: 'млрд', change: 58.8 }, 
                profit: { value: 1.85, unit: 'млрд', change: 24350.0 },
                ggr: { value: 12.00, unit: 'млрд', change: 57.2 },
                market_share: { value: 4.26, unit: '%', change: 14.5 },
                target_contributions: { value: 782, unit: 'млн', change: 59.9 }
            }, 
            '2024': { 
                revenue: { value: 69.23, unit: 'млрд', change: 33.2 }, 
                profit: { value: 2.35, unit: 'млрд', change: 27.0 },
                ggr: { value: 15.56, unit: 'млрд', change: 29.7 },
                market_share: { value: 4.00, unit: '%', change: -6.1 },
                target_contributions: { value: 1386, unit: 'млн', change: 77.2 }
            } 
        } 
    },
    'bettery': {
        name: 'Bettery',
        logo: 'Беттери.jpg',
        founded: '2020',
        entity: 'ООО «Атлантис»',
        financials: {
            '2020': {
                revenue: { value: 0.09, unit: 'млрд', change: null },
                profit: { value: -0.03, unit: 'млрд', change: null },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.04, unit: '%', change: null },
                target_contributions: { value: 60, unit: 'млн', change: null }
            },
            '2021': {
                revenue: { value: 0.55, unit: 'млрд', change: 547.1 },
                profit: { value: 0.03, unit: 'млрд', change: 198.2 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.08, unit: '%', change: 100.0 },
                target_contributions: { value: 0, unit: 'млн', change: -100.0 }
            },
            '2022': {
                revenue: { value: 0.16, unit: 'млрд', change: -70.3 },
                profit: { value: -0.19, unit: 'млрд', change: -787.5 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.02, unit: '%', change: -75.0 },
                target_contributions: { value: 99, unit: 'млн', change: null }
            },
            '2023': {
                revenue: { value: 0.003, unit: 'млрд', change: -98.3 },
                profit: { value: -0.12, unit: 'млрд', change: -37.7 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.00, unit: '%', change: -100.0 },
                target_contributions: { value: 150, unit: 'млн', change: 51.5 }
            },
            '2024': {
                revenue: { value: 1.22, unit: 'млрд', change: 40566.7 },
                profit: { value: -0.08, unit: 'млрд', change: -33.2 },
                ggr: { value: 0, unit: 'млрд', change: null },
                market_share: { value: 0.07, unit: '%', change: null },
                target_contributions: { value: 103, unit: 'млн', change: -31.3 }
            }
        }
    }
};

// Текущий выбранный год
let selectedYear = '2024';

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

// Рендеринг компаний
function renderCompanies() {
    const container = document.getElementById('companiesData');
    
    // Сортируем компании по выручке выбранного года
    const sortedCompanies = Object.entries(companiesData).sort((a, b) => {
        const aRevenue = a[1].financials[selectedYear]?.revenue?.value || 0;
        const bRevenue = b[1].financials[selectedYear]?.revenue?.value || 0;
        return bRevenue - aRevenue;
    });
    
    let html = '';
    
    sortedCompanies.forEach(([id, company]) => {
        const yearData = company.financials[selectedYear];
        
        // Если нет данных для выбранного года, пропускаем компанию
        if (!yearData) return;
        
        html += createCompanyCard(company, yearData);
    });
    
    if (html === '') {
        html = '<div class="empty-state">Нет данных для выбранного года</div>';
    }
    
    container.innerHTML = html;
}

// Создание карточки компании
function createCompanyCard(company, yearData) {
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
                ${createMetricRow('Прибыль', yearData.profit)}
                ${createMetricRow('GGR', yearData.ggr)}
                ${createMetricRow('Доля рынка', yearData.market_share)}
                ${createMetricRow('Целевые отчисления', yearData.target_contributions)}
            </div>
        </div>
    `;
}

// Создание строки с метрикой
function createMetricRow(label, data) {
    if (!data || data.value === 0) return '';
    
    // Для целевых отчислений показываем только если >= 120 млн
    if (label === 'Целевые отчисления' && data.value < 120) return '';
    
    const value = typeof data.value === 'number' ? data.value.toLocaleString('ru-RU') : data.value;
    const change = data.change;
    
    let changeHtml = '';
    if (change !== null && change !== undefined) {
        const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
        const changeSign = change > 0 ? '+' : '';
        changeHtml = `<span class="metric-change ${changeClass}">${changeSign}${change}%</span>`;
    }
    
    return `
        <div class="metric-row">
            <span class="metric-label">${label}</span>
            <div class="metric-value-wrapper">
                <span class="metric-value">${value}</span>
                <span class="metric-unit">${data.unit}</span>
                ${changeHtml}
            </div>
        </div>
    `;
}
