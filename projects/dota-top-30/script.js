// Generate player cards
function generatePlayerCards() {
    const playersGrid = document.getElementById('playersGrid');
    
    playersData.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="player-rank">#${player.rank}</div>
            <img src="${player.image}" alt="${player.nickname}" class="player-image" onerror="this.src='https://via.placeholder.com/300x400/323232/00c78b?text=${player.nickname}'">
            <div class="player-info">
                <div class="player-nickname">${player.nickname}</div>
                <div class="player-realname">${player.realName}</div>
            </div>
        `;
        
        card.addEventListener('click', () => openPlayerModal(player));
        playersGrid.appendChild(card);
    });
}

// Open player modal
function openPlayerModal(player) {
    const modal = document.getElementById('playerModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-player-header">
            <div class="modal-player-nickname">${player.nickname}</div>
            <div class="modal-player-realname">${player.realName}</div>
        </div>
        <div class="modal-player-stats">
            <div class="stat-item">
                <span class="stat-label">Рейтинг</span>
                <span class="stat-value">#${player.rank}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Команда</span>
                <span class="stat-value">${player.team}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Страна</span>
                <span class="stat-value">${player.country}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Достижения</span>
                <span class="stat-value">${player.achievements.join(', ')}</span>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('playerModal');
    modal.style.display = 'none';
}

// Jury tabs functionality
let currentJuryTab = 'experts';

function generateJuryMembers(category) {
    const juryGrid = document.getElementById('juryGrid');
    juryGrid.innerHTML = '';
    
    const members = juryData[category] || [];
    
    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'jury-member';
        
        const initials = member.name.split(' ').map(word => word[0]).join('').substring(0, 2);
        
        memberDiv.innerHTML = `
            <div class="jury-avatar">${initials}</div>
            <div class="jury-name">${member.name}</div>
            <div class="jury-role">${member.role}</div>
        `;
        
        juryGrid.appendChild(memberDiv);
    });
}

function setupJuryTabs() {
    const tabs = document.querySelectorAll('.jury-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get category and generate members
            const category = tab.getAttribute('data-tab');
            currentJuryTab = category;
            generateJuryMembers(category);
        });
    });
    
    // Generate initial jury members
    generateJuryMembers(currentJuryTab);
}

// Custom top button
function setupCustomTopButton() {
    const button = document.querySelector('.custom-top-button');
    
    button.addEventListener('click', () => {
        alert('Функция создания собственного топа будет доступна в ближайшее время!');
    });
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    generatePlayerCards();
    setupJuryTabs();
    setupCustomTopButton();
    
    // Close modal on X click
    const closeButton = document.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close modal on outside click
    const modal = document.getElementById('playerModal');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect sound (optional)
    const cards = document.querySelectorAll('.player-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrolled / 500);
    }
});

// Intersection Observer for card animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards when they're created
    setTimeout(() => {
        document.querySelectorAll('.player-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }, 100);
}















