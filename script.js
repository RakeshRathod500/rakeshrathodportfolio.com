// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const kpiButton = document.getElementById("kpi-button");
const kpiModal = document.getElementById("kpiModal");
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
});
// Open modal
kpiButton.addEventListener("click", () => {
  kpiModal.classList.add("open");
  document.body.style.overflow = "hidden"; // Prevent background scroll
});

// Close modal when clicking Close button OR outside modal
document.addEventListener("click", (e) => {
  if (
    e.target.matches(".close-modal-btn") ||
    e.target === kpiModal
  ) {
    kpiModal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && kpiModal.classList.contains("open")) {
    kpiModal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});
// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Testimonials Carousel
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= testimonials.length) currentSlide = 0;
    if (index < 0) currentSlide = testimonials.length - 1;

    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function currentTestimonial(index) {
    currentSlide = index;
    showTestimonial(currentSlide);
}

// Auto rotate testimonials
setInterval(() => {
    currentSlide++;
    showTestimonial(currentSlide);
}, 5000);

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
// Toggle Project Details (Expand/Collapse)
function toggleProjectDetails(button) {
  const content = button.nextElementSibling
  content.classList.toggle("open")
  button.classList.toggle("open")
}

// Filter Projects by Category
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter")

    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter projects
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.add("show")
      } else {
        card.classList.remove("show")
      }
    })
  })
})
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Change hamburger to X and back
  if (navLinks.classList.contains('active')) {
    mobileMenuBtn.textContent = '☰';
  } else {
    mobileMenuBtn.textContent = 'X';
  }
});

// Close menu when clicking any link (mobile friendly)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
  });
});
// On page load: show all projects
document.addEventListener("DOMContentLoaded", () => {
  projectCards.forEach((card) => card.classList.add("show"))
})
console.log('Portfolio loaded successfully!');

           

