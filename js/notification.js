document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  //const raw = params.get('email_sent');
  const raw = 'success'
  if (!raw) return; // параметр отсутствует или пустой — ничего не показываем

  const val = raw.trim().toLowerCase();
  const banner = document.getElementById('email-sent-banner');
  const textEl = document.getElementById('email-sent-banner-text');

  const lang = localStorage.getItem('lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
  const texts = {
    'notifySuccessText': {
        'ru': 'Спасибо, ваша заявка отправлена! Мы свяжемся с вами в самое ближайшее время!',
        'en': 'Thank you, your request has been sent! We will contact you shortly!'
    },
    'notifyFailText': {
        'ru': 'Что-то пошло не так, попробуйте позже или напишите нам ',
        'en': 'Something went wrong, please try again later or contact us in '
    }
  }

  const notifySuccessText = texts['notifySuccessText'][lang];
  const notifyFailText = texts['notifyFailText'][lang];
  const tgLink = '<a href="https://telegram.me/real_in_bot?start=0786f2c9-9421-400b-bcdb-b570aca84898" target="_blank" rel="noopener noreferrer">Telegram</a>'

  // Поддерживаем только два значения: success / fail
  if (val === 'success') {
    banner.classList.add('alert-success');
    textEl.innerHTML = notifySuccessText;
  } else if (val === 'fail') {
    banner.classList.add('alert-danger');
    textEl.innerHTML = notifyFailText + tgLink;
  } else {
    return; // неизвестное значение — ничего не показываем
  }

  // Показать плашку (с анимацией)
  // небольшой forced reflow для корректного запуска transition
  void banner.offsetWidth;
  banner.classList.add('show');

  // Через 5 секунд скрыть; после завершения анимации уберём класс и очистим текст
  setTimeout(() => {
    banner.classList.remove('show');
    banner.addEventListener('transitionend', function handler() {
      // очистка
      banner.classList.remove('alert-success', 'alert-danger');
      textEl.textContent = '';
      banner.removeEventListener('transitionend', handler);
    });
  }, 5000);
});