// Epoch Chronicles Hub - Main JavaScript with Tab Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Show home section by default
    showSection('home');
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize animations
    initializeAnimations();
    
    // Load dynamic content
    loadDynamicContent();
}

// Section navigation functionality - make it global
window.showSection = function(sectionName) {
    console.log('showSection called with:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    console.log('Found sections:', sections.length);
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(`section-${sectionName}`);
    console.log('Target section:', targetSection);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section activated:', sectionName);
    } else {
        console.error('Section not found:', sectionName);
    }
    
    // Update navigation buttons
    updateNavigation(sectionName);
}

function updateNavigation(activeSection) {
    // Reset all navigation buttons
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(btn => {
        btn.className = btn.className.replace('btn-primary', 'btn-ghost');
    });
    
    // Activate the current section button
    const activeButton = document.getElementById(`nav-${activeSection}`);
    if (activeButton) {
        activeButton.className = activeButton.className.replace('btn-ghost', 'btn-primary');
    }
}

// Article detail functionality
window.showArticle = function(articleId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show article detail section
    const articleSection = document.getElementById('article-detail');
    if (articleSection) {
        articleSection.classList.add('active');
    }
    
    // Load article content based on articleId
    loadArticleContent(articleId);
}

function loadArticleContent(articleId) {
    // This would load specific article content
    // For now, we'll use the default "Miracle on Ice" content
    console.log('Loading article:', articleId);
    
    // You could add dynamic content loading here
    showNotification(`Загружается статья: ${articleId}`, 'info');
}

// Book detail functionality
window.showBook = function(bookId) {
    console.log('Showing book:', bookId);
    showNotification(`Открывается книга: ${bookId}`, 'info');
    // This would show book detail view
}

// Movie detail functionality
window.showMovie = function(movieId) {
    console.log('Showing movie:', movieId);
    showNotification(`Открывается фильм: ${movieId}`, 'info');
    // This would show movie detail view
}

function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[placeholder*="Поиск"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                console.log('Searching for:', query);
                // Implement search functionality here
                performSearch(query);
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value;
                if (query.trim()) {
                    performSearch(query);
                }
            }
        });
    });
}

function performSearch(query) {
    showNotification(`Поиск: ${query}`, 'info');
    // Here you would implement actual search functionality
    // For example, filter cards based on the query
    filterContent(query);
}

function filterContent(query) {
    // Get current active section
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return;
    
    // Find all cards in the active section
    const cards = activeSection.querySelectorAll('.card, .group');
    
    cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Navigation helper functions
function navigateToSection(section) {
    showSection(section);
}

// Category filtering functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn.btn-secondary.rounded-full, .btn.btn-primary.rounded-full')) {
        // Handle category button clicks
        const categoryButtons = e.target.parentNode.querySelectorAll('.btn.rounded-full');
        categoryButtons.forEach(btn => {
            btn.className = btn.className.replace('btn-primary', 'btn-secondary');
        });
        e.target.className = e.target.className.replace('btn-secondary', 'btn-primary');
        
        const category = e.target.textContent.trim();
        console.log('Category selected:', category);
        filterByCategory(category);
    }
});

function filterByCategory(category) {
    if (category === 'Все') {
        // Show all items
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            const cards = activeSection.querySelectorAll('.card, .group');
            cards.forEach(card => {
                card.style.display = '';
            });
        }
        return;
    }
    
    // Filter by specific category
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return;
    
    const cards = activeSection.querySelectorAll('.card, .group');
    cards.forEach(card => {
        const badge = card.querySelector('.badge');
        if (badge && badge.textContent.trim() === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Animation initialization
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all animatable elements
    document.querySelectorAll('.card, .group').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--sports-primary-color, #00c78b);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-weight: 500;
        font-size: 0.875rem;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const activeSection = document.querySelector('.section.active');
        const searchInput = activeSection?.querySelector('input[placeholder*="Поиск"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to clear search and show all content
    if (e.key === 'Escape') {
        if (e.target.matches('input')) {
        e.target.value = '';
        e.target.blur();
            // Reset filters
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                const cards = activeSection.querySelectorAll('.card, .group');
                cards.forEach(card => {
                    card.style.display = '';
                });
                // Reset category buttons
                const categoryButtons = activeSection.querySelectorAll('.btn.rounded-full');
                categoryButtons.forEach(btn => {
                    btn.className = btn.className.replace('btn-primary', 'btn-secondary');
                });
                const allButton = activeSection.querySelector('.btn.rounded-full');
                if (allButton) {
                    allButton.className = allButton.className.replace('btn-secondary', 'btn-primary');
                }
            }
        }
    }
    
    // Number keys for quick navigation
    const sectionMap = {
        '1': 'home',
        '2': 'wikipedia', 
        '3': 'library',
        '4': 'cinema'
    };
    
    if (sectionMap[e.key] && !e.target.matches('input, textarea')) {
        e.preventDefault();
        showSection(sectionMap[e.key]);
    }
});

// Dynamic content loading
function loadDynamicContent() {
    loadWikipediaArticles();
    loadLibraryBooks();
    loadCinemaMovies();
}

function loadWikipediaArticles() {
    const grid = document.getElementById('wikipedia-articles-grid');
    if (!grid || !window.wikipediaArticles) return;
    
    grid.innerHTML = '';
    
    window.wikipediaArticles.forEach(article => {
        const articleCard = createArticleCard(article);
        grid.appendChild(articleCard);
    });
}

function loadLibraryBooks() {
    const grid = document.getElementById('library-books-grid');
    if (!grid || !window.libraryBooks) return;
    
    grid.innerHTML = '';
    
    window.libraryBooks.forEach(book => {
        const bookCard = createBookCard(book);
        grid.appendChild(bookCard);
    });
}

function loadCinemaMovies() {
    const grid = document.getElementById('cinema-movies-grid');
    if (!grid || !window.cinemaMovies) return;
    
    grid.innerHTML = '';
    
    window.cinemaMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        grid.appendChild(movieCard);
    });
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer';
    card.onclick = () => showArticle(article.id);
    
    card.innerHTML = `
        <div class="card h-full transition-all duration-300 hover:shadow-hover border border-border">
            <div class="aspect-video overflow-hidden bg-muted">
                <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
            </div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <span class="badge badge-primary">${article.category}</span>
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                        <span class="flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            ${article.views}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            ${article.likes}
                        </span>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">${article.title}</h3>
                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${article.description}</p>
                <div class="flex items-center justify-between text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${article.date}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${article.readTime}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer';
    card.onclick = () => showBook(book.id);
    
    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));
    
    // Создаем теги если они есть
    const tagsHTML = book.tags ? book.tags.map(tag => 
        `<span class="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs mr-1">${tag}</span>`
    ).join('') : '';
    
    card.innerHTML = `
        <div class="card h-full transition-all duration-300 hover:shadow-hover border border-border">
            <div class="book-cover-wrapper overflow-hidden bg-muted" style="aspect-ratio: 2/3;">
                <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            </div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <span class="badge badge-primary">${book.category}</span>
                    <div class="flex items-center gap-1 text-xs text-yellow-500">
                        <span>${stars}</span>
                        <span class="text-muted-foreground ml-1">${book.rating}</span>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">${book.title}</h3>
                ${book.titleEn ? `<p class="text-xs text-muted-foreground mb-1 italic">${book.titleEn}</p>` : ''}
                <p class="text-sm text-muted-foreground mb-2 font-medium">${book.author}</p>
                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${book.description}</p>
                ${tagsHTML ? `<div class="mb-3">${tagsHTML}</div>` : ''}
                <div class="flex items-center justify-between text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${book.publishYear}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        ${book.pages} стр.
                    </span>
                    <span class="flex items-center gap-1" title="Язык">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                        </svg>
                        ${book.language}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer';
    card.onclick = () => showMovie(movie.id);
    
    card.innerHTML = `
        <div class="card h-full transition-all duration-300 hover:shadow-hover border border-border">
            <div class="aspect-video overflow-hidden bg-muted">
                <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
            </div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <span class="badge badge-primary">${movie.category}</span>
                    <div class="flex items-center gap-1 text-xs">
                        <span class="text-yellow-500">★</span>
                        <span class="text-muted-foreground">${movie.rating}</span>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">${movie.title}</h3>
                <p class="text-sm text-muted-foreground mb-2 font-medium">${movie.director}</p>
                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${movie.description}</p>
                <div class="flex items-center justify-between text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${movie.year}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"></path>
                        </svg>
                        ${movie.duration}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        // Change hamburger to X
        menuBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
    } else {
        mobileMenu.classList.add('hidden');
        // Change X back to hamburger
        menuBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
    }
}

// Enhanced navigation update for both desktop and mobile
function updateNavigation(activeSection) {
    // Reset all desktop navigation buttons
    const navButtons = document.querySelectorAll('nav button[id^="nav-"]');
    navButtons.forEach(btn => {
        btn.className = btn.className.replace('btn-primary', 'btn-ghost');
    });
    
    // Reset all mobile navigation buttons
    const mobileNavButtons = document.querySelectorAll('nav button[id^="mobile-nav-"]');
    mobileNavButtons.forEach(btn => {
        btn.className = btn.className.replace('btn-primary', 'btn-ghost justify-start gap-2');
    });
    
    // Activate the current section button (desktop)
    const activeButton = document.getElementById(`nav-${activeSection}`);
    if (activeButton) {
        activeButton.className = activeButton.className.replace('btn-ghost', 'btn-primary');
    }
    
    // Activate the current section button (mobile)
    const activeMobileButton = document.getElementById(`mobile-nav-${activeSection}`);
    if (activeMobileButton) {
        activeMobileButton.className = activeMobileButton.className.replace('btn-ghost justify-start gap-2', 'btn-primary justify-start gap-2');
    }
}

// Library filtering function
function filterLibraryByCategory(category) {
    const grid = document.getElementById('library-books-grid');
    if (!grid || !window.libraryBooks) return;
    
    // Update button states
    const librarySection = document.getElementById('section-library');
    if (librarySection) {
        const buttons = librarySection.querySelectorAll('.btn.rounded-full');
        buttons.forEach(btn => {
            if (btn.textContent.trim() === category) {
                btn.className = 'btn btn-primary rounded-full px-4 py-2';
            } else {
                btn.className = 'btn btn-secondary rounded-full px-4 py-2';
            }
        });
    }
    
    // Filter and display books
    grid.innerHTML = '';
    
    const filteredBooks = category === 'Все книги' 
        ? window.libraryBooks 
        : window.libraryBooks.filter(book => book.category === category);
    
    filteredBooks.forEach(book => {
        const bookCard = createBookCard(book);
        grid.appendChild(bookCard);
    });
    
    // Show notification if no books found
    if (filteredBooks.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-muted-foreground py-12">Книги не найдены в этой категории</div>';
    }
}

// Export functions for global access
window.showSection = showSection;
window.showArticle = showArticle;
window.showBook = showBook;
window.showMovie = showMovie;
window.navigateToSection = navigateToSection;
window.showNotification = showNotification;
window.loadDynamicContent = loadDynamicContent;
window.toggleMobileMenu = toggleMobileMenu;
window.filterLibraryByCategory = filterLibraryByCategory;