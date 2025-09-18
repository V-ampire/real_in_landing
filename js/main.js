const p = document.getElementById('animated-text');
const typingSpeed = 100; // скорость набора в миллисекундах
const delayBetween = 2000; // пауза между повтором в мс

let typingTimeout;


function typeText() {
    const text = polyglot ? polyglot.t('hero.animated_text') : p.textContent;

    // Разбиваем на предложения
    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean)
        .map(s => s.trim());

    let sentenceIndex = 0;
    let charIndex = 0;

    function typeChar() {
        const currentSentence = sentences[sentenceIndex];

        if (charIndex < currentSentence.length) {
            p.textContent = currentSentence.slice(0, charIndex + 1) + '│'; // курсор
            charIndex++;
            typingTimeout = setTimeout(typeChar, typingSpeed);
        } else {
            // закончили предложение — оставляем курсор в конце
            p.textContent = currentSentence + '│';
            sentenceIndex++;
            charIndex = 0;

            if (sentenceIndex < sentences.length) {
                typingTimeout = setTimeout(() => {
                    p.textContent = ''; // очищаем перед следующим предложением
                    typeChar();
                }, delayBetween);
            } else {
                typingTimeout = setTimeout(typeText, delayBetween);
            }
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
