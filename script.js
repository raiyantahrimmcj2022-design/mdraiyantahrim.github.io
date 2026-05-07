// =====================
// DOM Elements
// =====================
const html = document.documentElement;
const darkToggle = document.getElementById("dark-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const filterButtons = document.querySelectorAll(".filter-btn");
const articles = document.querySelectorAll(".article-card");
const searchInput = document.getElementById("article-search");
const noResults = document.getElementById("no-results");
const backTop = document.getElementById("back-top");

// =====================
// Theme Toggle (Dark/Light)
// =====================
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
}

darkToggle?.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// =====================
// Mobile Navigation Toggle
// =====================
menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.hasAttribute("hidden");

  if (isOpen) {
    mobileNav.removeAttribute("hidden");
    menuToggle.setAttribute("aria-expanded", "true");
  } else {
    mobileNav.setAttribute("hidden", "");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Close mobile nav on link click
mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.setAttribute("hidden", "");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// =====================
// Portfolio Filter System
// =====================
function filterArticles(category) {
  let visibleCount = 0;

  articles.forEach(article => {
    const cat = article.getAttribute("data-cat") || "";

    if (category === "all" || cat.includes(category)) {
      article.style.display = "block";
      visibleCount++;
    } else {
      article.style.display = "none";
    }
  });

  if (noResults) {
    noResults.hidden = visibleCount !== 0;
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.getAttribute("data-filter");
    filterArticles(filter);
  });
});

// =====================
// Search Filter
// =====================
searchInput?.addEventListener("input", e => {
  const query = e.target.value.toLowerCase().trim();
  let visibleCount = 0;

  articles.forEach(article => {
    const text = article.getAttribute("data-title")?.toLowerCase() || "";
    const title = article.querySelector(".article-title")?.textContent.toLowerCase() || "";
    const deck = article.querySelector(".article-deck")?.textContent.toLowerCase() || "";

    const match = text.includes(query) || title.includes(query) || deck.includes(query);

    if (match) {
      article.style.display = "block";
      visibleCount++;
    } else {
      article.style.display = "none";
    }
  });

  if (noResults) {
    noResults.hidden = visibleCount !== 0;
  }
});

// =====================
// Smooth Scroll for Anchor Links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =====================
// Back to Top Button
// =====================
window.addEventListener("scroll", () => {
  if (!backTop) return;

  if (window.scrollY > 600) {
    backTop.hidden = false;
  } else {
    backTop.hidden = true;
  }
});

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =====================
// Optional: Pause ticker on hover (better UX)
// =====================
const ticker = document.getElementById("ticker-track");

ticker?.addEventListener("mouseenter", () => {
  ticker.style.animationPlayState = "paused";
});

ticker?.addEventListener("mouseleave", () => {
  ticker.style.animationPlayState = "running";
});