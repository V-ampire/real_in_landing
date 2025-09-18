from bottle import Bottle, run, request, redirect
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import logging


# Чтение секретов
with open('secrets.json', 'r') as f:
    secrets = json.load(f)

EMAIL_ADDRESS = secrets['email']
TARGET_ADDRESS = secrets['target_email']
EMAIL_PASSWORD = secrets['password']
SMTP_SERVER = secrets.get('smtp_server', 'smtp.gmail.com')
SMTP_PORT = secrets.get('smtp_port', 587)

logger = logging.getLogger(__name__)

app = Bottle()


# Обработчик отправки формы
@app.route('/send_email', method='POST')
def send_email():
    name = request.forms.get('name')
    contact = request.forms.get('contact')
    subject = request.forms.get('_subject', 'Новая заявка с сайта')
    from_broker_page = request.forms.get('from_broker_page', 'не указано')

    # Текст письма
    message_body = f"""Новая заявка:
Имя: {name}
Контакт: {contact}
Источник страницы (from_broker_page): {from_broker_page}"""

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = TARGET_ADDRESS
    msg['Subject'] = subject
    msg.attach(MIMEText(message_body, 'plain'))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        # Сообщение пользователю
        return redirect('/?email_sent=success')
    except Exception as e:
        logger.exception(e)
        return redirect('/?email_sent=fail')

if __name__ == "__main__":
    run(app, host='localhost', port=8080, debug=True)
