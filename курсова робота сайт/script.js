document.addEventListener("DOMContentLoaded", () => {
    // Плавна прокрутка до секцій
    document.querySelectorAll(".navbar ul li a").forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const section = document.querySelector(href);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  
    // Анімація при скролі
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, { threshold: 0.2 });
  
    document.querySelectorAll("section").forEach(sec => {
      sec.classList.add("fade");
      observer.observe(sec);
    });
  
    // Валідація форми
    const form = document.querySelector(".booking form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector("textarea").value.trim();
  
        if (!name || !email || !message) {
          alert("Будь ласка, заповніть усі поля.");
          return;
        }
  
        console.log("Форма надіслана:", { name, email, message });
        alert("Запит на бронювання надіслано!");
        form.reset();
      });
    }
  
    // Поточний рік
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Кнопка скролу вгору
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "↑";
    scrollBtn.className = "scroll-top";
    document.body.appendChild(scrollBtn);
  
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
  
    // Анімація лічильників
    const counterElements = document.querySelectorAll('.counters > div');
  
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterElements.forEach(el => {
            const number = parseInt(el.dataset.count);
            animateCount(el, number);
          });
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
  
    counterElements.forEach(el => {
      el.dataset.count = el.textContent.replace('+', '').trim();
      el.textContent = '0+';
      counterObserver.observe(el);
    });
  
    // Темна тема
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
      });
    }
  
    // Бургер-меню
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");
  
    if (burger && navLinks) {
      burger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  
    // Неонові заголовки
    document.querySelectorAll("h1, h2, h3").forEach(h => {
      h.classList.add("neon-title");
    });
  });
  
  function animateCount(el, end, duration = 2000) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      el.textContent = `${start}+`;
      if (start >= end) clearInterval(timer);
    }, stepTime);
  }
  