// scriptsIndex.js - Versión optimizada y corregida

// ==================== CONSTANTES ====================
const MAIN_CAROUSEL_INTERVAL = 5000; // 5 segundos para el carrusel principal
const PROMO_CAROUSEL_INTERVAL = 3000; // 3 segundos para el carrusel promocional

// ==================== VARIABLES GLOBALES ====================
let mainCarouselInterval;
let promoCarouselInterval;

// ==================== CARRUSEL PRINCIPAL ====================
function initMainCarousel() {
    let mainCarouselIndex = 0;
    const mainCarousel = document.getElementById('mainCarousel');
    const mainCarouselImages = document.querySelectorAll('.main-carousel img');

    function moveMainCarousel() {
        mainCarouselIndex = (mainCarouselIndex + 1) % mainCarouselImages.length;
        mainCarousel.style.transform = `translateX(-${mainCarouselIndex * 100}%)`;
    }

    // Iniciar el carrusel
    mainCarouselInterval = setInterval(moveMainCarousel, MAIN_CAROUSEL_INTERVAL);
}

// ==================== CARRUSEL PROMOCIONAL ====================
function initPromoCarousel() {
    let promoCarouselIndex = 0;
    const promoCarousel = document.getElementById('promoCarousel');
    const promoImages = document.querySelectorAll('.promo-carousel img');

    function movePromoCarousel() {
        promoCarouselIndex = (promoCarouselIndex + 1) % promoImages.length;
        promoCarousel.style.transform = `translateY(-${promoCarouselIndex * 300}px)`;
    }

    // Iniciar el carrusel
    promoCarouselInterval = setInterval(movePromoCarousel, PROMO_CAROUSEL_INTERVAL);
}

// ==================== SISTEMA DE FILTRADO ====================
function initFilterSystem() {
    const filterBtn = document.getElementById('filterBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterOptions = document.querySelectorAll('.filter-option');
    const movieCards = document.querySelectorAll('.movie-card');

    // Verificar que los elementos existen
    if (!filterBtn || !filterDropdown || filterOptions.length === 0 || movieCards.length === 0) {
        console.error('Elementos del filtro no encontrados');
        return;
    }

    // Mostrar/ocultar dropdown al hacer clic en el botón
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterDropdown.classList.toggle('show');
    });

    // Ocultar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
            filterDropdown.classList.remove('show');
        }
    });

    // Manejar selección de opciones
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const genre = this.dataset.genre;
            const filterName = this.textContent;
            applyFilter(genre, filterName);
            filterDropdown.classList.remove('show');
        });
    });
}

// En tu scriptsIndex.js, la función applyFilter debe manejar estos nuevos géneros
function applyFilter(genre, filterName) {
  const filterBtn = document.getElementById('filterBtn');
  const movieCards = document.querySelectorAll('.movie-card');
  
  filterBtn.innerHTML = genre === 'all' 
      ? 'Filtrar por género ▼' 
      : `${filterName} ▼`;
  
  movieCards.forEach(card => {
      const cardGenres = card.dataset.genre?.split(',').map(g => g.trim().toLowerCase()) || [];
      
      if (genre === 'all' || cardGenres.includes(genre)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar carruseles
    initMainCarousel();
    initPromoCarousel();
    
    // Iniciar sistema de filtrado
    initFilterSystem();
});

// ==================== LIMPIEZA ====================
window.addEventListener('beforeunload', function() {
    clearInterval(mainCarouselInterval);
    clearInterval(promoCarouselInterval);
});