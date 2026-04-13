/**
 * MERGED - Premium Website JavaScript
 * GSAP Animations, Custom Cursor, Smooth Scroll
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    initPreloader();
    
    // Custom Cursor
    initCustomCursor();
    
    // Navigation
    initNavigation();
    
    // Hero Animations
    initHeroAnimations();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Magnetic Elements
    initMagneticElements();
    
    // Video Modal
    initVideoModal();
    
    // Parallax Effects
    initParallax();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Simulate loading
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Start hero animations after preloader
        setTimeout(() => {
            animateHero();
        }, 500);
    }, 2000);
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth animation loop
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Follower with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work__image-wrapper, .service-card, .team-member__image-wrapper');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    // Split text for animation
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.hero__title-line');
        lines.forEach(line => {
            const text = line.textContent;
            line.innerHTML = `<span>${text}</span>`;
        });
    }
}

function animateHero() {
    const tl = gsap.timeline();
    
    // Label
    tl.to('.hero__label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    // Title lines
    .to('.hero__title-line span', {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.4')
    // Subtitle
    .to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    // CTA
    .to('.hero__cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    // Marquee
    .to('.hero__marquee', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.4')
    // Scroll indicator
    .to('.hero__scroll', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4');
    
    // Video scale animation
    gsap.from('.hero__video', {
        scale: 1.2,
        duration: 2,
        ease: 'power2.out'
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Work items
    gsap.utils.toArray('.work__item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Image parallax within work item
        const image = item.querySelector('.work__image');
        if (image) {
            gsap.to(image, {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    });
    
    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Team members
    gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.fromTo(member,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: member,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Contact section
    const contactElements = document.querySelectorAll('.contact__label, .contact__title, .contact__text, .contact__actions, .contact__info');
    contactElements.forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Magnetic Elements
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// Video Modal
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const showreelBtn = document.getElementById('showreelBtn');
    const closeBtn = document.getElementById('videoModalClose');
    const iframe = modal?.querySelector('iframe');
    
    if (!modal || !showreelBtn) return;
    
    // YouTube video URL - replace with actual showreel
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    
    showreelBtn.addEventListener('click', () => {
        if (iframe) iframe.src = videoUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    const closeModal = () => {
        modal.classList.remove('active');
        if (iframe) iframe.src = '';
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('video-modal__overlay')) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Parallax Effects
function initParallax() {
    // Hero video parallax
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
        gsap.to(heroVideo, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// Smooth reveal for elements with data-scroll attribute
document.querySelectorAll('[data-scroll]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });
});

// Console log
console.log('%c🎬 MERGED', 'font-size: 24px; font-weight: bold; color: #ff3d00;');
console.log('%cPremium content agency website loaded', 'font-size: 14px; color: #888;');
