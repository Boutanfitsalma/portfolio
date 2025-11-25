// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
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

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Mobile menu toggle (à implémenter si nécessaire)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Animate hero stats on page load
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        const increment = target / 50;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current) + (stat.innerText.includes('+') ? '+' : '');
                setTimeout(updateStat, 30);
            } else {
                stat.innerText = target + (stat.innerText.includes('+') ? '+' : '');
            }
        };
        
        updateStat();
    });
});

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerText;
    heroTitle.innerText = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.innerText += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 500);
}
// ==================== LIGHTBOX POUR IMAGES ==================== 
let currentImageIndex = 0;
let allImages = [];

function openLightbox(imageSrc, caption) {
    console.log('🔍 Opening lightbox for:', imageSrc); // Debug
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (!lightbox || !lightboxImage) {
        console.error('❌ Lightbox elements not found!');
        return;
    }
    
    // Récupérer toutes les images - CORRECTION ICI
    allImages = Array.from(document.querySelectorAll('.exp-gallery-item img')).map(img => {
        const captionElement = img.closest('.exp-gallery-item')?.querySelector('.exp-image-caption span');
        return {
            src: img.src,
            caption: captionElement ? captionElement.textContent : 'Image'
        };
    });
    
    console.log('📸 All images:', allImages.length); // Debug
    
    // Trouver l'index de l'image cliquée
    currentImageIndex = allImages.findIndex(img => img.src.includes(imageSrc));
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Lightbox opened successfully'); // Debug
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    // Boucle circulaire
    if (currentImageIndex >= allImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = allImages.length - 1;
    }
    
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImage && lightboxCaption && allImages[currentImageIndex]) {
        lightboxImage.src = allImages[currentImageIndex].src;
        lightboxCaption.textContent = allImages[currentImageIndex].caption;
    }
}

// Fermer avec la touche Escape
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (event.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});

// Console easter egg
console.log('%c👋 Salut recruteur!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cTu fouilles dans le code ? J\'adore ça ! 🚀', 'color: #ec4899; font-size: 16px;');
console.log('%cContacts moi: boutanfitsalma1@gmail.com', 'color: #10b981; font-size: 14px;');