const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

if (!prefersReducedMotion.matches && window.Lenis) {
  const lenis = new Lenis({
    anchors: true,
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (window.gsap && !prefersReducedMotion.matches) {
          window.gsap.to(entry.target, {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            ease: "power2.out",
            clearProps: "transform,visibility,opacity"
          });
        } else {
          entry.target.classList.add("visible");
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const revealElements = document.querySelectorAll(".reveal");

if (window.gsap && !prefersReducedMotion.matches) {
  window.gsap.set(revealElements, { autoAlpha: 0, y: 28 });
  window.gsap.from(".hero-sticker", {
    autoAlpha: 0,
    scale: 0.82,
    rotation: -18,
    duration: 0.8,
    delay: 0.25,
    ease: "back.out(1.6)"
  });
  window.gsap.to(".hero-sticker", {
    y: -8,
    rotation: -5,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

revealElements.forEach((element) => observer.observe(element));
