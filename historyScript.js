var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) ||
    (rect.bottom >= windowHeight * 0.25 && rect.top <= windowHeight)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if (!items[i].classList.contains("in-view")) {
        items[i].classList.add("in-view");
      }
    } else if (items[i].classList.contains("in-view")) {
      items[i].classList.remove("in-view");
    }
  }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);
