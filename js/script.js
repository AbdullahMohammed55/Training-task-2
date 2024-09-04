const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const totalSlides = slideImages.length;
const dotsContainer = document.querySelector('.pagination');

let currentSlide = 0;
let autoSlideInterval = setInterval(nextSlide, 4000);

function showSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Create pagination dots
const dots = Array.from({ length: totalSlides }, (_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        showSlide(i);
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
    return dot;
});
dots[0].classList.add('active');

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
}

document.querySelector('.slider').addEventListener('mouseover', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.slider').addEventListener('mouseout', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        prevSlide();
    }
}

document.querySelector('.slider').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetAutoSlide();
});
