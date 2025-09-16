from bottle import Bottle, run, request, template
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

# Чтение секретов из файла
with open('secrets.json', 'r') as f:
    secrets = json.load(f)

EMAIL_ADDRESS = secrets['email']
EMAIL_PASSWORD = secrets['password']

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

app = Bottle()

@app.route('/')
def index():
    return template('''
        <form action="/send" method="post">
            To: <input name="to" type="email" required/><br/>
            Subject: <input name="subject" type="text" required/><br/>
            Message:<br/>
            <textarea name="message" rows="5" cols="40" required></textarea><br/>
            <input value="Send" type="submit" />
        </form>
    ''')

@app.route('/send', method='POST')
def send_email():
    to_address = request.forms.get('to')
    subject = request.forms.get('subject')
    message_body = request.forms.get('message')

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_address
    msg['Subject'] = subject
    msg.attach(MIMEText(message_body, 'plain'))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return "Email sent successfully!"
    except Exception as e:
        return f"Failed to send email: {e}"

if __name__ == "__main__":
    run(app, host='localhost', port=8080, debug=True)
