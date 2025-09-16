const p = document.getElementById('animated-text');
const typingSpeed = 100; // скорость набора в миллисекундах
const delayBetween = 5000; // пауза между повтором в мс

let typingTimeout;

function typeText() {
    // Берем текущий текст из polyglot
    const text = polyglot ? polyglot.t('hero.animated_text') : p.textContent;
    p.textContent = ''; // очистка текста
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            p.textContent += text[i];
            i++;
            typingTimeout = setTimeout(typeChar, typingSpeed);
        } else {
            // через delayBetween мс снова запускаем анимацию
            typingTimeout = setTimeout(typeText, delayBetween);
        }
    }

    typeChar();
}

// Перезапуск анимации при смене языка
function restartTyping() {
    clearTimeout(typingTimeout);
    typeText();
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
