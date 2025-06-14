const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const slideCounter = document.getElementById('slideCounter');
let currentSlide = 0;
let isScrolling = false;

let touchStartY = 0;
let touchEndY = 0;

    function updateSlide(index) {
        slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
        });
        slideCounter.textContent = `${index + 1} / ${slides.length}`;
    }

    function scrollNext() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    function scrollPrev() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    function handleScroll(e) {
        // Prevent page scroll
        e.preventDefault();
        e.stopPropagation();
        if (isScrolling) return;

        isScrolling = true;

        if (e.deltaY < 0) {
        scrollNext(); // scroll up
        } else {
        scrollPrev(); // scroll down
        }

        setTimeout(() => {
        isScrolling = false;
        }, 700);
    }

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        e.preventDefault(); // Prevent page scroll on touch
    }

    function handleTouchEnd(e) {
        touchEndY = e.changedTouches[0].clientY;
        const distance = touchStartY - touchEndY;

        if (Math.abs(distance) < 30 || isScrolling) return;

        isScrolling = true;

        if (distance > 0) {
        scrollNext(); // swipe up
        } else {
        scrollPrev(); // swipe down
        }

        setTimeout(() => {
        isScrolling = false;
        }, 700);
    }

    // Desktop
slider.addEventListener('wheel', handleScroll, { passive: false });

// Mobile
slider.addEventListener('touchstart', handleTouchStart, { passive: true });
slider.addEventListener('touchmove', handleTouchMove, { passive: false });
slider.addEventListener('touchend', handleTouchEnd, { passive: true });