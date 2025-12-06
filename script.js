// ============================================
// GLOBAL VARIABLES
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const profileImage = document.getElementById('profileImage');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

// ============================================
// MOBILE MENU TOGGLE
// ============================================
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================
// Profile image zoom
if (profileImage) {
    profileImage.addEventListener('click', () => {
        modalImage.src = profileImage.src;
        modalImage.alt = profileImage.alt;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

// Close modal when clicking X
modalClose.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'flex') {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// GOOGLE MAPS LINKS FOR EDUCATION IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // University of Strasbourg image click
    const universityImage = document.getElementById('universityImage');
    if (universityImage) {
        universityImage.addEventListener('click', () => {
            window.open('https://www.google.com/maps?q=Université+Marc+Bloch+Strasbourg+II', '_blank');
        });
    }
    
    // AFPA Saint-Avold image click
    const afpaImage = document.getElementById('afpaImage');
    if (afpaImage) {
        afpaImage.addEventListener('click', () => {
            window.open('https://www.google.com/maps?q=AFPA+Saint-Avold+France', '_blank');
        });
    }
    
    // CCI Colmar image click
    const cciImage = document.getElementById('cciImage');
    if (cciImage) {
        cciImage.addEventListener('click', () => {
            window.open('https://www.google.com/maps?q=CCI+Colmar+France', '_blank');
        });
    }
    
    // Contact icons functionality
    const addressIcon = document.getElementById('addressIcon');
    if (addressIcon) {
        addressIcon.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://www.google.com/maps?q=38+Lotissement+du+Parc,+57730+Petit-Ebersviller', '_blank');
        });
    }
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only apply smooth scroll for anchor links on the same page
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// ANIMATION ON SCROLL
// ============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .talent-card, .skill-card, .experience-item, .education-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .talent-card, .skill-card, .experience-item, .education-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const updateActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'christophe-muller-responsive/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
};

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);