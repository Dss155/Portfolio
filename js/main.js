document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', function() {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close Mobile Menu When Clicking on a Link
  const navLinks = document.querySelectorAll('.nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  // Typed.js Effect
  if (document.querySelector('.typed-text')) {
    const typed = new Typed('.typed-text', {
      strings: ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Digital Creator'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  }

  // Portfolio Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      const filterValue = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Testimonial Slider
  if (document.querySelector('.testimonials-slider')) {
    const swiper = new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Scroll Animation
  const animateOnScroll = function() {
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };

  // Initial check and check on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});