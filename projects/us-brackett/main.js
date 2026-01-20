// US Open 2025 - Modern Tournament Bracket

class ModernTournamentBracket {
    constructor() {
        this.currentRound = 1;
        this.completedMatches = new Set();
        this.winners = new Map();
        this.roundData = new Map();
        
        this.init();
    }

    init() {
        this.setupRoundData();
        this.generateFirstRound();
        this.initializeAllRounds();
        this.attachEventListeners();
        this.updateUI();
    }

    initializeAllRounds() {
        // Инициализируем пустые матчи для всех раундов кроме первого
        for (let round = 2; round <= 7; round++) {
            this.generateRoundMatches(round);
        }
    }

    setupRoundData() {
        const rounds = [
            { id: 1, name: 'Первый раунд', matches: 64, prizeMoneyText: '$110,000 за победу' },
            { id: 2, name: 'Второй раунд', matches: 32, prizeMoneyText: '$154,000 за победу' },
            { id: 3, name: 'Третий раунд', matches: 16, prizeMoneyText: '$237,000 за победу' },
            { id: 4, name: 'Четвертый раунд', matches: 8, prizeMoneyText: '$375,000 за победу' },
            { id: 5, name: 'Четвертьфинал', matches: 4, prizeMoneyText: '$650,000 за победу' },
            { id: 6, name: 'Полуфинал', matches: 2, prizeMoneyText: '$1,100,000 за победу' },
            { id: 7, name: 'Финал', matches: 1, prizeMoneyText: '$3,600,000 за победу' }
        ];

        rounds.forEach(round => {
            this.roundData.set(round.id, round);
        });
    }

    generateFirstRound() {
        // Generate for desktop bracket view
        const bracketRound1Container = document.getElementById('bracket-round-1-matches');
        if (bracketRound1Container) {
            tournamentData.firstRoundMatches.forEach((match, index) => {
                const matchElement = this.createBracketMatchElement(match, 1, index + 1);
                bracketRound1Container.appendChild(matchElement);
            });
        }
        
        // Generate for mobile view
        const round1Container = document.getElementById('round-1-matches');
        if (round1Container) {
            tournamentData.firstRoundMatches.forEach((match, index) => {
                const matchElement = this.createMatchElement(match, 1, index + 1);
                round1Container.appendChild(matchElement);
            });
        }
    }

    createMatchElement(match, round, matchNumber) {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-block';
        matchDiv.setAttribute('data-match-id', match.id);
        matchDiv.setAttribute('data-round', round);
        
        // Match header
        const matchHeader = document.createElement('div');
        matchHeader.className = 'match-header';
        
        const matchNumberSpan = document.createElement('span');
        matchNumberSpan.className = 'match-number';
        matchNumberSpan.textContent = `Матч ${matchNumber}`;
        
        matchHeader.appendChild(matchNumberSpan);
        
        // Match content
        const matchContent = document.createElement('div');
        matchContent.className = 'match-content';
        
        match.players.forEach(player => {
            const playerRow = this.createPlayerRow(player);
            matchContent.appendChild(playerRow);
        });
        
        matchDiv.appendChild(matchHeader);
        matchDiv.appendChild(matchContent);
        
        return matchDiv;
    }

    createBracketMatchElement(match, round, matchNumber) {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-block';
        matchDiv.setAttribute('data-match-id', match.id);
        matchDiv.setAttribute('data-round', round);
        
        // Match content (no header for bracket view to save space)
        const matchContent = document.createElement('div');
        matchContent.className = 'match-content';
        
        match.players.forEach(player => {
            const playerRow = this.createPlayerRow(player);
            matchContent.appendChild(playerRow);
        });
        
        matchDiv.appendChild(matchContent);
        
        return matchDiv;
    }

    createEmptyBracketMatchElement(matchId, round, matchNumber) {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-block';
        matchDiv.setAttribute('data-match-id', matchId);
        matchDiv.setAttribute('data-round', round);
        
        // Match content with empty slots (no header for bracket view)
        const matchContent = document.createElement('div');
        matchContent.className = 'match-content';
        
        for (let i = 0; i < 2; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'empty-slot';
            matchContent.appendChild(emptySlot);
        }
        
        matchDiv.appendChild(matchContent);
        
        return matchDiv;
    }

    createEmptyMatchElement(matchId, round, matchNumber) {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-block';
        matchDiv.setAttribute('data-match-id', matchId);
        matchDiv.setAttribute('data-round', round);
        
        // Match header
        const matchHeader = document.createElement('div');
        matchHeader.className = 'match-header';
        
        const matchNumberSpan = document.createElement('span');
        matchNumberSpan.className = 'match-number';
        matchNumberSpan.textContent = `Матч ${matchNumber}`;
        
        const matchStatus = document.createElement('span');
        matchStatus.className = 'match-status upcoming';
        matchStatus.textContent = 'Ожидание';
        
        matchHeader.appendChild(matchNumberSpan);
        matchHeader.appendChild(matchStatus);
        
        // Match content with empty slots
        const matchContent = document.createElement('div');
        matchContent.className = 'match-content';
        
        for (let i = 0; i < 2; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'empty-slot';
            matchContent.appendChild(emptySlot);
        }
        
        matchDiv.appendChild(matchHeader);
        matchDiv.appendChild(matchContent);
        
        return matchDiv;
    }

    createPlayerRow(player) {
        const playerRow = document.createElement('div');
        playerRow.className = 'player-row';
        
        // Player photo or placeholder
        if (player.photo && player.photo.trim() !== '') {
            const photo = document.createElement('img');
            photo.className = 'player-photo';
            photo.alt = player.fullName || player.name;
            photo.loading = 'lazy';
            photo.src = player.photo;
            
            // Add error handling for broken images
            photo.onerror = () => {
                // If image fails to load, show placeholder
                const placeholder = this.createPlayerPlaceholder(player);
                photo.replaceWith(placeholder);
            };
            
            playerRow.appendChild(photo);
        } else {
            const placeholder = this.createPlayerPlaceholder(player);
            playerRow.appendChild(placeholder);
        }
        
        const flag = document.createElement('span');
        flag.className = 'country-flag';
        flag.textContent = player.countryFlag;
        
        const name = document.createElement('span');
        name.className = 'player-name';
        name.textContent = player.name;
        
        playerRow.appendChild(flag);
        playerRow.appendChild(name);
        
        if (player.seed) {
            const seed = document.createElement('span');
            seed.className = 'seed-number';
            seed.textContent = player.seed;
            playerRow.appendChild(seed);
        }
        
        return playerRow;
    }

    createPlayerPlaceholder(player) {
        const placeholder = document.createElement('div');
        placeholder.className = 'player-photo-placeholder';
        
        // Use first letter of player's name as placeholder
        const initials = player.name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();
            
        placeholder.textContent = initials;
        return placeholder;
    }

    attachEventListeners() {
        // Round tab navigation
        document.querySelectorAll('.round-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const round = parseInt(tab.getAttribute('data-round'));
                if (!tab.disabled) {
                    this.switchToRound(round);
                }
            });
        });

        // Player selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.player-row') && !e.target.closest('.empty-slot')) {
                const playerRow = e.target.closest('.player-row');
                const matchBlock = playerRow.closest('.match-block');
                this.selectWinner(playerRow, matchBlock);
            }
        });
    }

    switchToRound(round) {
        // Update current round
        this.currentRound = round;
        
        // Update active tab
        document.querySelectorAll('.round-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-round="${round}"]`).classList.add('active');
        
        // Update active round view
        document.querySelectorAll('.round-view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`round-${round}-view`).classList.add('active');
        
        // Generate matches for this round if not already generated
        this.generateRoundMatches(round);
        
        // Update progress
        this.updateProgress();
    }

    generateRoundMatches(round) {
        if (round === 1) return; // First round is already generated
        
        // Generate for mobile view
        const container = document.getElementById(`round-${round}-matches`);
        if (container && container.children.length === 0) {
            const roundInfo = this.roundData.get(round);
            const matchCount = roundInfo.matches;
            
            for (let i = 1; i <= matchCount; i++) {
                const matchId = `r${round}-${i}`;
                const matchElement = this.createEmptyMatchElement(matchId, round, i);
                container.appendChild(matchElement);
            }
        }
        
        // Generate for desktop bracket view
        const bracketContainer = document.getElementById(`bracket-round-${round}-matches`);
        if (bracketContainer && bracketContainer.children.length === 0) {
            const roundInfo = this.roundData.get(round);
            const matchCount = roundInfo.matches;
            
            for (let i = 1; i <= matchCount; i++) {
                const matchId = `r${round}-${i}`;
                const matchElement = this.createEmptyBracketMatchElement(matchId, round, i);
                bracketContainer.appendChild(matchElement);
            }
        }
    }

    selectWinner(playerRow, matchBlock) {
        const round = parseInt(matchBlock.getAttribute('data-round'));
        const matchId = matchBlock.getAttribute('data-match-id');
        
        console.log('Выбран победитель:', {
            matchId,
            round,
            player: playerRow.querySelector('.player-name').textContent
        });
        
        // Remove winner class from all players in this match
        const allPlayersInMatch = matchBlock.querySelectorAll('.player-row');
        allPlayersInMatch.forEach(row => {
            row.classList.remove('winner');
        });

        // Add winner class to selected player
        playerRow.classList.add('winner');
        
        // Update match status (only if status element exists - mobile version)
        const statusElement = matchBlock.querySelector('.match-status');
        if (statusElement) {
            statusElement.textContent = 'Завершен';
            statusElement.className = 'match-status completed';
        }
        matchBlock.classList.add('completed');

        // Store winner data
        const winnerData = {
            name: playerRow.querySelector('.player-name').textContent,
            flag: playerRow.querySelector('.country-flag').textContent,
            seed: playerRow.querySelector('.seed-number')?.textContent || null,
            photo: playerRow.querySelector('.player-photo')?.src || null
        };
        
        this.winners.set(matchId, winnerData);
        this.completedMatches.add(matchId);

        console.log('Данные победителя:', winnerData);

        // Advance player to next round if not final
        if (round < 7) {
            this.advanceToNextRound(winnerData, matchBlock, round);
        }

        // Check if round is completed
        this.checkRoundCompletion(round);

        // Update UI
        this.updateUI();
    }

    advanceToNextRound(winnerData, currentMatchBlock, currentRound) {
        const nextRound = currentRound + 1;
        
        console.log('Продвижение в следующий раунд:', {
            currentRound,
            nextRound,
            winner: winnerData.name
        });
        
        // Generate next round matches if not already done
        this.generateRoundMatches(nextRound);
        
        // Find the correct match in next round
        const currentMatchIndex = this.getMatchIndex(currentMatchBlock);
        const nextMatchIndex = Math.floor(currentMatchIndex / 2) + 1; // +1 because match IDs start from 1
        
        console.log('Индексы матчей:', {
            currentMatchIndex,
            nextMatchIndex
        });
        
        // Update both mobile and desktop versions
        this.updateNextRoundMatch(`round-${nextRound}-matches`, `r${nextRound}-${nextMatchIndex}`, winnerData);
        this.updateNextRoundMatch(`bracket-round-${nextRound}-matches`, `r${nextRound}-${nextMatchIndex}`, winnerData);
    }

    updateNextRoundMatch(containerId, matchId, winnerData) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Контейнер не найден: ${containerId}`);
            return;
        }
        
        console.log(`Поиск матча ${matchId} в контейнере ${containerId}`);
        
        const nextMatch = container.querySelector(`[data-match-id="${matchId}"]`);
        if (!nextMatch) {
            console.warn(`Матч не найден: ${matchId} в контейнере ${containerId}`);
            console.log('Доступные матчи:', Array.from(container.querySelectorAll('.match-block')).map(m => m.getAttribute('data-match-id')));
            return;
        }
        
        const emptySlots = nextMatch.querySelectorAll('.empty-slot');
        console.log(`Найдено пустых слотов: ${emptySlots.length}`);
        
        if (emptySlots.length > 0) {
            // Replace empty slot with winner
            const newPlayerRow = this.createPlayerRow(winnerData);
            newPlayerRow.classList.add('animated');
            
            emptySlots[0].replaceWith(newPlayerRow);
            console.log(`Игрок ${winnerData.name} добавлен в ${matchId}`);
        } else {
            console.warn(`Нет пустых слотов в матче ${matchId}`);
        }
    }

    getMatchIndex(matchBlock) {
        const parentContainer = matchBlock.parentElement;
        const allMatches = parentContainer.querySelectorAll('.match-block');
        return Array.from(allMatches).indexOf(matchBlock);
    }

    checkRoundCompletion(round) {
        const roundInfo = this.roundData.get(round);
        const completedInRound = Array.from(this.completedMatches).filter(matchId => 
            matchId.startsWith(`r${round}-`)
        ).length;
        
        if (completedInRound === roundInfo.matches) {
            // Round completed - enable next round tab
            const nextRoundTab = document.querySelector(`[data-round="${round + 1}"]`);
            if (nextRoundTab) {
                nextRoundTab.disabled = false;
                nextRoundTab.classList.add('completed');
            }
            
            // Auto-switch to next round if not final
            if (round < 7) {
                setTimeout(() => {
                    this.switchToRound(round + 1);
                }, 1000);
            }
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const progressPercentage = (this.currentRound / 7) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `Раунд ${this.currentRound} из 7`;
    }

    updateUI() {
        // Update round info
        const currentRoundView = document.querySelector('.round-view.active');
        if (currentRoundView) {
            const roundInfo = this.roundData.get(this.currentRound);
            const completedInRound = Array.from(this.completedMatches).filter(matchId => 
                matchId.startsWith(`r${this.currentRound}-`)
            ).length;
            const remainingMatches = roundInfo.matches - completedInRound;
            
            const matchesRemainingElement = currentRoundView.querySelector('.matches-remaining');
            if (matchesRemainingElement) {
                if (remainingMatches === 0) {
                    matchesRemainingElement.textContent = 'Раунд завершен';
                    matchesRemainingElement.style.background = 'rgba(5, 150, 105, 0.1)';
                    matchesRemainingElement.style.color = 'var(--us-open-green)';
                } else {
                    matchesRemainingElement.textContent = `${remainingMatches} ${this.getMatchWord(remainingMatches)}`;
                }
            }
        }
        
        this.updateProgress();
    }

    getMatchWord(count) {
        if (count === 1) return 'матч';
        if (count >= 2 && count <= 4) return 'матча';
        return 'матчей';
    }

    resetTournament() {
        // Clear all data
        this.completedMatches.clear();
        this.winners.clear();
        this.currentRound = 1;
        
        // Reset UI
        document.querySelectorAll('.round-tab').forEach((tab, index) => {
            tab.classList.remove('active', 'completed');
            tab.disabled = index > 0;
        });
        
        document.querySelector('[data-round="1"]').classList.add('active');
        
        // Reset round views
        document.querySelectorAll('.round-view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById('round-1-view').classList.add('active');
        
        // Clear all matches except first round
        for (let round = 2; round <= 7; round++) {
            const container = document.getElementById(`round-${round}-matches`);
            if (container) container.innerHTML = '';
            
            const bracketContainer = document.getElementById(`bracket-round-${round}-matches`);
            if (bracketContainer) bracketContainer.innerHTML = '';
        }
        
        // Reset first round matches (mobile version)
        document.querySelectorAll('#round-1-matches .match-block').forEach(matchBlock => {
            matchBlock.classList.remove('completed');
            
            matchBlock.querySelectorAll('.player-row').forEach(row => {
                row.classList.remove('winner');
            });
        });
        
        // Reset first round matches (desktop bracket version)
        document.querySelectorAll('#bracket-round-1-matches .match-block').forEach(matchBlock => {
            matchBlock.classList.remove('completed');
            
            matchBlock.querySelectorAll('.player-row').forEach(row => {
                row.classList.remove('winner');
            });
        });
        
        this.updateUI();
        console.log('Турнир сброшен');
    }
}

// Initialize the modern tournament bracket
document.addEventListener('DOMContentLoaded', () => {
    console.log('Инициализация современной турнирной сетки US Open 2025...');
    window.modernBracket = new ModernTournamentBracket();
    
    // Add reset button for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Сбросить турнир';
        resetButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 12px 20px;
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            transition: all 0.2s;
        `;
        
        resetButton.addEventListener('mouseenter', () => {
            resetButton.style.transform = 'translateY(-2px)';
            resetButton.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        });
        
        resetButton.addEventListener('mouseleave', () => {
            resetButton.style.transform = 'translateY(0)';
            resetButton.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        });
        
        resetButton.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите сбросить турнир?')) {
                window.modernBracket.resetTournament();
            }
        });
        
        document.body.appendChild(resetButton);
    }
});