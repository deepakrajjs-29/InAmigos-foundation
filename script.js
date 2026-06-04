/*
 * InAmigos Foundation NGO Awareness Webpage - Core Interactivity Script
 * Minimal Vanilla Javascript, zero heavy framework dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set current year in footer copyright automatically
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Inject background floating blobs dynamically for visual depth
  const blob1 = document.createElement('div');
  blob1.className = 'bg-blob blob-1';
  const blob2 = document.createElement('div');
  blob2.className = 'bg-blob blob-2';
  const blob3 = document.createElement('div');
  blob3.className = 'bg-blob blob-3';
  document.body.appendChild(blob1);
  document.body.appendChild(blob2);
  document.body.appendChild(blob3);

  // Tag card elements dynamically with .stagger-card for scroll-reveal
  document.querySelectorAll('.pillar-card, .impact-card, .project-card, .gallery-item, .testimonial-card, .info-card, .vol-roles-box, .cert-item').forEach(el => {
    el.classList.add('stagger-card');
  });

  // Reset progress bar widths to 0% dynamically and set data-progress attributes
  document.querySelectorAll('.progress-bar-fill').forEach(fill => {
    const targetWidth = fill.style.width || '0%';
    fill.setAttribute('data-progress', targetWidth);
    fill.style.width = '0%';
  });

  // Stagger reveal observer for cards and progress bars
  const revealCards = document.querySelectorAll('.stagger-card');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger progress bar animations if this is a project card
        const progressBar = entry.target.querySelector('.progress-bar-fill');
        if (progressBar) {
          const progressVal = progressBar.getAttribute('data-progress');
          setTimeout(() => {
            progressBar.style.width = progressVal;
          }, 150);
        }
        
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealCards.forEach(card => revealObserver.observe(card));

  /* ==========================================================================
     Theme Manager (Light / Dark Mode Toggle)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Re-trigger icon updates if needed (since theme icons alternate)
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  /* ==========================================================================
     Mobile Navigation Menu Controls
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinksList = document.querySelectorAll('.nav-menu .nav-link, .nav-menu a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    // Close drawer when link clicked
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     Sticky & Auto-Hiding Navigation Bar
     ========================================================================== */
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (!header) return;
    
    // Add shadow when scrolled
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Auto-hide header when scrolling down, show when scrolling up
    if (window.scrollY > 150) {
      if (window.scrollY > lastScrollY && (!navMenu || !navMenu.classList.contains('active'))) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
    } else {
      header.classList.remove('hide');
    }
    
    lastScrollY = window.scrollY;
  });

  /* ==========================================================================
     Scroll-triggered Count-Up Statistics Counter
     ========================================================================== */
  const statsElements = document.querySelectorAll('.counter, .stat-num');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;
    
    // Determine increment value based on target magnitude
    let increment = 1;
    if (target > 1000) increment = Math.ceil(target / 100);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = current.toLocaleString();
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(stat => counterObserver.observe(stat));

  /* ==========================================================================
     Active Link Highlight Tracking on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollY = window.scrollY + 100; // Offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  /* ==========================================================================
     Interactive Category Filter for Media Gallery
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button highlight
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        // Toggle item display with fade effect
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     Modal Image Lightbox Slider
     ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  let currentGalleryIndex = 0;
  // Build a list of active (currently visible) gallery items
  let activeGalleryItems = Array.from(galleryItems);

  const updateActiveGalleryItems = () => {
    activeGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
  };

  const showLightboxImage = (index) => {
    if (activeGalleryItems.length === 0) return;
    
    // Bounds wrapping
    if (index >= activeGalleryItems.length) currentGalleryIndex = 0;
    else if (index < 0) currentGalleryIndex = activeGalleryItems.length - 1;
    else currentGalleryIndex = index;
    
    const targetItem = activeGalleryItems[currentGalleryIndex];
    const imgSource = targetItem.querySelector('img').getAttribute('src');
    const imgAlt = targetItem.querySelector('img').getAttribute('alt');
    const captionText = targetItem.querySelector('.gallery-overlay h4').textContent;
    const tagText = targetItem.querySelector('.gallery-overlay .gallery-tag').textContent;

    lightboxImg.setAttribute('src', imgSource);
    lightboxImg.setAttribute('alt', imgAlt);
    lightboxCaption.innerHTML = `<strong>${tagText}</strong> &bull; ${captionText}`;
  };

  // Open Lightbox
  galleryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // Prevent click triggers on children buttons specifically if any
      updateActiveGalleryItems();
      const index = activeGalleryItems.indexOf(item);
      
      if (index !== -1) {
        currentGalleryIndex = index;
        showLightboxImage(currentGalleryIndex);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      }
    });
  });

  // Close Lightbox
  const closeLightboxFunc = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxFunc);
  }

  // Click outside image to close
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxFunc();
      }
    });
  }

  // Lightbox Navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateActiveGalleryItems();
      showLightboxImage(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateActiveGalleryItems();
      showLightboxImage(currentGalleryIndex + 1);
    });
  }

  // Keyboard navigation inside Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    
    if (e.key === 'Escape') {
      closeLightboxFunc();
    } else if (e.key === 'ArrowLeft') {
      updateActiveGalleryItems();
      showLightboxImage(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateActiveGalleryItems();
      showLightboxImage(currentGalleryIndex + 1);
    }
  });

  /* ==========================================================================
     Inquiry Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const phoneInput = document.getElementById('form-phone');
  const messageInput = document.getElementById('form-message');

  const setError = (element, messageElementId) => {
    const parent = element.closest('.form-group') || element.parentElement;
    parent.classList.add('has-error');
  };

  const clearErrors = () => {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('has-error'));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone validation if field is filled
    if (!phone) return true; 
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    return phoneRegex.test(phone);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      
      let isValid = true;
      
      // 1. Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput);
        isValid = false;
      }
      
      // 2. Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setError(emailInput);
        isValid = false;
      }
      
      // 3. Validate Phone (optional but must be correct if filled)
      if (phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
        setError(phoneInput);
        isValid = false;
      }
      
      // 4. Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput);
        isValid = false;
      }

      if (isValid) {
        // Disable submit button during mock sending
        const submitBtn = contactForm.querySelector('.submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        
        submitBtn.setAttribute('disabled', 'true');
        submitBtnText.textContent = 'Sending Message...';

        // Mock network delay (1.5 seconds)
        setTimeout(() => {
          // Reset form fields
          contactForm.reset();
          submitBtn.removeAttribute('disabled');
          submitBtnText.textContent = 'Submit Inquiry';
          
          // Display success modal overlay
          if (successBanner) {
            successBanner.classList.add('show');
            
            // Auto hide success banner after 4 seconds
            setTimeout(() => {
              successBanner.classList.remove('show');
            }, 4000);
          }
        }, 1500);
      }
    });
  }

  /* ==========================================================================
     ADVANCED INTERACTIONS: Progress Bar, Back-To-Top & 3D Hover Tilt
     ========================================================================== */

  // 1. Scroll Progress Bar
  const progressContainer = document.createElement('div');
  progressContainer.className = 'scroll-progress';
  progressContainer.id = 'scroll-progress';
  document.body.appendChild(progressContainer);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressContainer.style.width = scrolled + '%';
    }
  });

  // 2. Back To Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to Top');
  backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  // Initialize Lucide for the newly inserted back-to-top icon
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. 3D Magnetic Card Tilt with Cursor Shine Follower
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    // Inject shine overlay dynamically
    const shine = document.createElement('div');
    shine.className = 'shine-overlay';
    card.appendChild(shine);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      // Calculate rotation angles (up to 8 degrees)
      const angleX = (yc - y) / 20;
      const angleY = (x - xc) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`;
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      shine.style.background = 'transparent';
    });
  });
});
