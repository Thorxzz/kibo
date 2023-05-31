const apiKey = '3345375149msh4119821b832ae3dp174f0djsn5a3a902e67c1';

async function sendMessage(message) {
  const url = 'https://chatgpt53.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const botResponse = data.choices[0].message.content;
    appendMessage('bot', botResponse);
  } catch (error) {
    console.error(error);
    appendMessage('bot', 'Error: Unable to process the request.');
  }
}

function appendMessage(sender, message) {
  const chatLog = document.getElementById('chat-log');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-box', sender);
  
  const iconElement = document.createElement('div');
  iconElement.classList.add('icon');
  
  const icon = document.createElement('i');
  if (sender === 'user') {
    icon.classList.add('fa-regular', 'fa-user');
    iconElement.setAttribute('id', 'user-icon');
  } else {
    icon.classList.add('fa-solid', 'fa-robot');
    iconElement.setAttribute('id', 'bot-icon');
  }
  
  iconElement.appendChild(icon);
  messageElement.appendChild(iconElement);
  
  const textElement = document.createElement('div');
  textElement.classList.add('message');
  messageElement.appendChild(textElement);
  
  chatLog.appendChild(messageElement);
  typeMessage(textElement, message);
}

function typeMessage(element, message) {
  const characters = message.split('');
  let index = 0;

  const typingInterval = setInterval(() => {
    element.textContent += characters[index];
    index++;

    if (index >= characters.length) {
      clearInterval(typingInterval);
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, 100);
}

const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message !== '') {
    appendMessage('user', message);
    userInput.value = '';
    sendMessage(message);
  }
});

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = userInput.value.trim();
    if (message !== '') {
      appendMessage('user', message);
      userInput.value = '';
      sendMessage(message);
    }
  }
});

appendMessage('bot', 'Hai, ini Kibo. Ada yang bisa saya bantu?');
