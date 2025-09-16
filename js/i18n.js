let polyglot;

// Загрузка переводов и применение их к элементам с data-i18n
async function loadTranslations(lang) {
    const response = await fetch(`i18n/${lang}.json`);
    const phrases = await response.json();
    polyglot = new Polyglot({ phrases });

    // Применяем переводы для текстов
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        // Проверка на placeholder
        if (key.startsWith('[placeholder]')) {
            const realKey = key.replace('[placeholder]', '');
            el.placeholder = polyglot.t(realKey);
        } else {
            el.innerHTML = polyglot.t(key);
        }
    });

    // Меняем картинку mobile-app
    const mobileApp = document.querySelector('.mobile-app img');
    if(mobileApp){
        mobileApp.src = lang === 'ru' ? 'images/mobile-app-ru.png' : 'images/mobile-app-en.png';
    }

    restartTyping();
}

// Установка языка: сохраняем и применяем
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    loadTranslations(lang);
}

// Языковой toggle
const btnEn = document.getElementById('lang-en');
const btnRu = document.getElementById('lang-ru');

function setActiveLang(lang) {
    if(lang === 'en') {
        btnEn.classList.add('active');
        btnRu.classList.remove('active');
    } else {
        btnRu.classList.add('active');
        btnEn.classList.remove('active');
    }
    setLanguage(lang);
}

// Инициализация языка при загрузке
const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
setActiveLang(savedLang);

// События клика для toggle
btnEn.addEventListener('click', () => setActiveLang('en'));
btnRu.addEventListener('click', () => setActiveLang('ru'));
