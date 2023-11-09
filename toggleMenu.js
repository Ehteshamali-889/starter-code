function toggleMenu() {
    var mobileMenu = document.querySelector(".menumobile");
    var hamburger = document.querySelector(".hamburger");
    var hamburgerclose = document.querySelector(".hamburgerclose");

    hamburger.style.display = (window.getComputedStyle(hamburger).display === "flex") ? "none" : "flex";
    hamburgerclose.style.display = (window.getComputedStyle(hamburgerclose).display === "flex") ? "none" : "flex";
    mobileMenu.style.display = (mobileMenu.style.display === "none" || mobileMenu.style.display === "") ? "flex" : "none";
  }