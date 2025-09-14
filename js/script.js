// ====================
// Elements
// ====================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const openLogin = document.getElementById("openLogin");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeButtons = document.querySelectorAll(".close");
const contactForm = document.getElementById("contactForm");
const loginForm = document.getElementById("loginForm");

// ====================
// Mobile Navigation
// ====================
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ====================
// Modals (Login & Signup)
// ====================
if (openLogin && loginModal) {
  openLogin.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("active");
  });
}

if (signupModal) {
  document.addEventListener("click", (e) => {
    if (e.target.id === "openSignup") {
      e.preventDefault();
      loginModal.classList.remove("active");
      signupModal.classList.add("active");
    }
  });
}

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (modal) modal.classList.remove("active");
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});

// ====================
// Hero Slider
// ====================
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;
let slideInterval = null;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startSlider() {
  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 10000);
  }
}

function resetInterval() {
  clearInterval(slideInterval);
  startSlider();
}

document.getElementById("nextSlide")?.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

document.getElementById("prevSlide")?.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

startSlider();

// ====================
// Contact Form Validation
// ====================
if (contactForm) {
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[A-Za-z\s]+$/i.test(value);
  }, "Letters only please");

  $("#contactForm").validate({
    rules: {
      name: { required: true, minlength: 3, lettersonly: true },
      email: { required: true, email: true },
      phone: { required: true, digits: true, minlength: 8 }
    },
    messages: {
      name: "Please enter a valid name (letters only, min 3 characters)",
      email: "Enter a valid email",
      phone: "Enter a valid phone number (digits only)"
    },
    submitHandler: function(form) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });
}

// ====================
// Login Form
// ====================
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Login form submitted! (Backend integration coming soon)");
  });
}

// ====================
// Social Login Placeholders
// ====================
[".btn-google", ".btn-apple", ".btn-facebook", ".btn-linkedin"].forEach(selector => {
  const btn = document.querySelector(selector);
  if (btn) {
    btn.addEventListener("click", () => {
      alert(`${selector} login coming soon!`);
    });
  }
});

document.getElementById("openSignupFromLogin").addEventListener("click", () => {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("signupModal").classList.add("active");
});

document.getElementById("openLoginFromSignup").addEventListener("click", () => {
  document.getElementById("signupModal").classList.remove("active");
  document.getElementById("loginModal").classList.add("active");
});
