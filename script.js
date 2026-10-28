
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const dropdownBtn = document.getElementById("servicesDropdownBtn");
  const dropdownMenu = document.getElementById("servicesDropdown");

  // Mobile navigation
  function closeMobileMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Services dropdown
  function closeDropdown() {
    if (!dropdownMenu || !dropdownBtn) return;

    dropdownMenu.classList.remove("show");
    dropdownBtn.setAttribute("aria-expanded", "false");
  }

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = dropdownMenu.classList.toggle("show");
      dropdownBtn.setAttribute("aria-expanded", String(isOpen));
    });

    dropdownMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // Close menu after selecting a navigation link
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
        closeDropdown();
      });
    });
  }

  // Close dropdown on outside click
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-dropdown")) {
      closeDropdown();
    }
  });

  // Close menus with Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDropdown();
      closeMobileMenu();
    }
  });

  // Close mobile menu if screen becomes desktop-sized
  window.addEventListener("resize", function () {
    if (window.innerWidth > 850) {
      closeMobileMenu();
    }
  });

  // Automatically update copyright year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Highlight active section in navbar
  const sections = document.querySelectorAll("main section[id]");
  const pageLinks = document.querySelectorAll('.navbar nav > a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          pageLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px"
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
