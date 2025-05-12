const navLinks = document.querySelectorAll(".nav-links a");

// Get the current page URL
const currentPage = window.location.pathname.split("/").pop();

// Loop through the links and check if the href matches the current page
navLinks.forEach((link) => {
  const linkHref = link.getAttribute("href");
  if (linkHref === currentPage) {
    link.classList.add("active");
  }
});


const hamburger = document.querySelector('.hamburger');
const navLinks2 = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks2.classList.toggle('active');
});
