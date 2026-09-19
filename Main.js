/* =============================================================
   COMPASS & INK — site script
   -------------------------------------------------------------
   Small, framework-free JavaScript. Each block below is wrapped
   in a check for the element it needs, so this one file can be
   safely included on every page even if that page doesn't have
   a filter rail, a form, etc.
   ============================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Close the menu when a link is tapped, so it doesn't stay
       open after navigating on a small screen. */
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Blog category filter (blog.html) ----------
     Every post card carries a data-category attribute. Every
     filter button carries a matching data-filter attribute.
     Clicking a button shows only the matching cards. */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var postCards = document.querySelectorAll("[data-category]");

  if (filterButtons.length && postCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var choice = button.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.setAttribute("aria-pressed", "false");
        });
        button.setAttribute("aria-pressed", "true");

        postCards.forEach(function (card) {
          var matches = choice === "all" || card.getAttribute("data-category") === choice;
          card.style.display = matches ? "" : "none";
        });
      });
    });
  }

  /* ---------- Newsletter / contact forms ----------
     These forms have no backend yet, so submitting just shows a
     friendly confirmation message instead of sending anywhere.
     Swap this out once you've connected a form service (Formspree,
     Netlify Forms, a Google Sheet, etc. — see the README). */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Thanks — this is a demo form, so nothing was sent yet.";
      }
      form.reset();
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
