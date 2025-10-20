document.addEventListener("DOMContentLoaded", function () {
  // Select all nav links in header and offcanvas modal
  const navLinks = document.querySelectorAll(
    ".header-section .nav-link, #offcanvasMenu .nav-link"
  );
  const header = document.querySelector(".header-section");
  const navbar = document.querySelector(".main-navbar");
  const topBar = document.querySelector(".top-bar");

  // Smooth scroll function
  function smoothScroll(target) {
    const targetSection = document.querySelector(target);
    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Add click event for navigation links
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Remove active from header nav links only
      document
        .querySelectorAll(".header-section .nav-link")
        .forEach(function (navLink) {
          navLink.classList.remove("active");
        });

      // Add active only if link is inside header
      if (this.closest(".header-section")) {
        this.classList.add("active");
      }

      smoothScroll(targetId);

      // Hide menus: modal for offcanvas, collapse for header
      if (this.closest("#offcanvasMenu")) {
        $("#offcanvasMenu").modal("hide");
      } else {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });

  // Scroll event handler
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.pageYOffset + headerHeight + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document
          .querySelectorAll(".header-section .nav-link")
          .forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
      }
    });

    // Toggle header scrolled classes and top bar visibility
    if (window.pageYOffset > 50) {
      header.classList.add("scrolled");
      navbar.classList.add("scrolled");
      if (topBar) {
        topBar.classList.add("hidden");
        topBar.classList.add("p-0");
      }
    } else {
      header.classList.remove("scrolled");
      navbar.classList.remove("scrolled");
      if (topBar) {
        topBar.classList.remove("hidden");
        topBar.classList.remove("p-0");
      }
    }
  });
});

// about counter
document.addEventListener("DOMContentLoaded", function () {
  let hasCounted = false;

  function startCounters() {
    if (hasCounted) return;

    document.querySelectorAll(".counter.odometer").forEach((el) => {
      const count = el.getAttribute("data-count");
      el.innerHTML = count;
    });

    hasCounted = true;
  }

  window.addEventListener("scroll", function () {
    const aboutSection = document.querySelector("#about");
    if (!aboutSection) return;

    const sectionTop = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;
    if (sectionTop < triggerPoint) startCounters();
  });
});
// Example: toggle button to open offcanvas modal on md and mobile only
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    if (window.innerWidth <= 991.98) {
      // md breakpoint and below
      $("#offcanvasMenu").modal("toggle");
    }
  });
function setupMobileHeaderAutoHide() {
  const header = document.querySelector(".header-section");
  if (!header) return; // Header not found, no action

  let lastScrollTop = 0;
  const mobileMaxWidth = 767.98;

  window.addEventListener("scroll", function () {
    // Only on mobile width
    if (window.innerWidth <= mobileMaxWidth) {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scrolling down, hide entire header
        header.style.transform = "translateY(-100%)";
        header.style.transition = "transform 0.3s ease";
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up, show entire header
        header.style.transform = "translateY(0)";
        header.style.transition = "transform 0.3s ease";
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    } else {
      // Reset header style if screen resized larger
      header.style.transform = "translateY(0)";
      header.style.transition = "transform 0.3s ease";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileHeaderAutoHide();
});
