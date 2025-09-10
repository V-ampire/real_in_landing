const p = document.getElementById('animated-text');
const text = p.textContent;
const typingSpeed = 100; // скорость набора в миллисекундах
const delayBetween = 5000; // пауза между повтором в мс

function typeText() {
    p.textContent = ''; // очистка текста
    let i = 0;

    const interval = setInterval(() => {
        p.textContent += text[i];
        i++;
        if (i === text.length) {
        clearInterval(interval);
        // через delayBetween мс снова запускаем анимацию
        setTimeout(typeText, delayBetween);
        }
    }, typingSpeed);
}



document.addEventListener("DOMContentLoaded", () => {
const sections = document.querySelectorAll('.section-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // добавляем класс для анимации
        observer.unobserve(entry.target);       // отключаем наблюдение после появления
    }
    });
}, {
    threshold: 0.1 // секция считается видимой, когда 10% блока в viewport
});

sections.forEach(section => observer.observe(section));
});
