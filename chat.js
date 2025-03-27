
document.addEventListener('DOMContentLoaded', () => {
  // Initialize chat interface
  initChat();
});

// Chat variables
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];
let speechSynthesis = window.speechSynthesis;
let currentVoiceMessage = null;

function initChat() {
  // Chat input auto-resize
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message-btn');
  
  chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
    
    // Enable/disable send button based on input content
    sendButton.disabled = this.value.trim() === '';
  });

  // Send message on Enter (but allow Shift+Enter for new line)
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendButton.disabled) {
        sendMessage();
      }
    }
  });

  // Send button click
  sendButton.addEventListener('click', sendMessage);

  // Clear chat button
  const clearChatBtn = document.getElementById('clear-chat-btn');
  clearChatBtn.addEventListener('click', clearChat);

  // Voice input button
  const voiceInputBtn = document.getElementById('voice-input-btn');
  voiceInputBtn.addEventListener('click', showVoiceModal);

  // Voice modal handlers
  const voiceModal = document.getElementById('voice-modal');
  const recordBtn = document.getElementById('record-btn');
  const cancelRecordingBtn = document.getElementById('cancel-recording');
  const sendRecordingBtn = document.getElementById('send-recording');
  
  recordBtn.addEventListener('click', toggleRecording);
  cancelRecordingBtn.addEventListener('click', () => {
    resetRecording();
    voiceModal.classList.add('hidden');
  });
  
  sendRecordingBtn.addEventListener('click', () => {
    sendVoiceMessage();
    voiceModal.classList.add('hidden');
  });

  // Upload button
  const uploadBtn = document.getElementById('upload-btn');
  uploadBtn.addEventListener('click', () => {
    showToast('File upload is not available in the demo', 'info');
  });
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();
  
  if (message === '') return;
  
  // Add user message to chat
  addMessage(message, 'user');
  
  // Clear input and reset height
  chatInput.value = '';
  chatInput.style.height = 'auto';
  document.getElementById('send-message-btn').disabled = true;
  
  // Simulate AI response (with typing indicator)
  showTypingIndicator();
  
  // Generate AI response
  setTimeout(() => {
    removeTypingIndicator();
    generateAIResponse(message);
  }, 1500);
}

function addMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${sender}-message`;
  
  let avatarIcon;
  if (sender === 'user') {
    avatarIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  } else {
    avatarIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    `;
  }
  
  messageElement.innerHTML = `
    <div class="message-avatar">
      ${avatarIcon}
    </div>
    <div class="message-content">
      <div class="message-bubble">
        <p>${formatMessage(message)}</p>
      </div>
      <div class="message-actions">
        ${sender === 'ai' ? `
          <button class="message-action-btn" onclick="speakMessage(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        ` : ''}
        <button class="message-action-btn" onclick="copyMessage(this)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(messageElement);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(message) {
  // Replace newlines with <br>
  message = message.replace(/\n/g, '<br>');
  
  // Detect code blocks (simplified)
  message = message.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  
  return message;
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('chat-messages');
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-message ai-message typing-indicator';
  typingIndicator.innerHTML = `
    <div class="message-avatar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    </div>
    <div class="message-content">
      <div class="message-bubble">
        <div class="typing-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function generateAIResponse(userMessage) {
  // Simple AI response simulation
  let response;
  
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('quadratic') || lowerMessage.includes('equation')) {
    response = "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0.\n\nTo solve it, you can use the quadratic formula:\n\nx = (-b ± √(b² - 4ac)) / 2a\n\nWould you like me to walk through an example with you?";
  } else if (lowerMessage.includes('photosynthesis')) {
    response = "Photosynthesis is the process by which plants, some bacteria, and algae convert sunlight, water, and carbon dioxide into glucose and oxygen.\n\nThe simplified equation is:\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThis process happens in the chloroplasts, particularly in structures called thylakoids.";
  } else if (lowerMessage.includes('newton') || lowerMessage.includes('law of motion')) {
    response = "Newton's Three Laws of Motion:\n\n1. First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.\n\n2. Second Law: Force equals mass times acceleration (F = ma).\n\n3. Third Law: For every action, there is an equal and opposite reaction.";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = "Hello! I'm your AI Tutor. How can I help you with your studies today?";
  } else {
    response = "I'd be happy to help you learn about that topic. Could you provide a bit more context or specify what aspect you'd like to understand better?";
  }
  
  addMessage(response, 'ai');
  
  // Update suggested questions based on context
  updateSuggestedQuestions(userMessage);
}

function updateSuggestedQuestions(userMessage) {
  const suggestedQuestionsContainer = document.querySelector('.suggested-questions');
  let newQuestions = [];
  
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('quadratic') || lowerMessage.includes('equation')) {
    newQuestions = [
      "How do I factor quadratic equations?",
      "What's the discriminant?",
      "Show me a quadratic equation example"
    ];
  } else if (lowerMessage.includes('photosynthesis')) {
    newQuestions = [
      "What are the stages of photosynthesis?",
      "How do chloroplasts work?",
      "What factors affect photosynthesis rate?"
    ];
  } else if (lowerMessage.includes('newton') || lowerMessage.includes('law of motion')) {
    newQuestions = [
      "Explain inertia with examples",
      "How is F = ma applied in real life?",
      "What is the conservation of momentum?"
    ];
  } else {
    newQuestions = [
      "Explain the water cycle",
      "Help me understand fractions",
      "What is the periodic table?"
    ];
  }
  
  // Update suggested questions
  suggestedQuestionsContainer.innerHTML = '';
  newQuestions.forEach(question => {
    const button = document.createElement('button');
    button.className = 'suggested-question';
    button.textContent = question;
    button.onclick = () => sendSuggestedQuestion(button);
    suggestedQuestionsContainer.appendChild(button);
  });
}

function sendSuggestedQuestion(button) {
  const question = button.textContent;
  document.getElementById('chat-input').value = question;
  
  // Trigger input event to resize textarea and enable send button
  const inputEvent = new Event('input', { bubbles: true });
  document.getElementById('chat-input').dispatchEvent(inputEvent);
  
  // Send message
  sendMessage();
}

function clearChat() {
  const chatMessages = document.getElementById('chat-messages');
  
  // Remove all messages except the first (welcome message)
  while (chatMessages.children.length > 1) {
    chatMessages.removeChild(chatMessages.lastChild);
  }
  
  // Reset suggested questions
  const suggestedQuestionsContainer = document.querySelector('.suggested-questions');
  suggestedQuestionsContainer.innerHTML = `
    <button class="suggested-question" onclick="sendSuggestedQuestion(this)">How do I solve quadratic equations?</button>
    <button class="suggested-question" onclick="sendSuggestedQuestion(this)">Explain photosynthesis</button>
    <button class="suggested-question" onclick="sendSuggestedQuestion(this)">What are Newton's laws of motion?</button>
  `;
  
  showToast('Chat history cleared', 'info');
}

function copyMessage(button) {
  const messageBubble = button.closest('.message-content').querySelector('.message-bubble');
  const messageText = messageBubble.textContent.trim();
  
  navigator.clipboard.writeText(messageText)
    .then(() => {
      showToast('Message copied to clipboard', 'success');
    })
    .catch(err => {
      showToast('Failed to copy message', 'error');
      console.error('Failed to copy: ', err);
    });
}

function speakMessage(button) {
  if (speechSynthesis) {
    // If already speaking, stop it
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (currentVoiceMessage === button) {
        currentVoiceMessage = null;
        return;
      }
    }
    
    const messageBubble = button.closest('.message-content').querySelector('.message-bubble');
    const messageText = messageBubble.textContent.trim();
    
    const utterance = new SpeechSynthesisUtterance(messageText);
    
    // Try to find a good voice
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en') && voice.name.includes('Female'));
    utterance.voice = englishVoice || voices[0];
    
    speechSynthesis.speak(utterance);
    currentVoiceMessage = button;
    
    utterance.onend = () => {
      currentVoiceMessage = null;
    };
  } else {
    showToast('Text-to-speech is not supported in your browser', 'error');
  }
}

function showVoiceModal() {
  const voiceModal = document.getElementById('voice-modal');
  voiceModal.classList.remove('hidden');
  
  // Reset recording state
  resetRecording();
}

function toggleRecording() {
  const recordButton = document.getElementById('record-btn');
  const recordingStatus = document.getElementById('recording-status');
  const sendRecordingBtn = document.getElementById('send-recording');
  
  if (!isRecording) {
    // Start recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          // Enable send button when recording is complete
          sendRecordingBtn.disabled = false;
        };
        
        mediaRecorder.start();
        isRecording = true;
        recordButton.classList.add('recording');
        recordingStatus.textContent = 'Recording... Click to stop';
      })
      .catch(error => {
        showToast('Could not access microphone', 'error');
        console.error('Error accessing microphone:', error);
      });
  } else {
    // Stop recording
    mediaRecorder.stop();
    isRecording = false;
    recordButton.classList.remove('recording');
    recordingStatus.textContent = 'Recording complete';
  }
}

function resetRecording() {
  if (isRecording && mediaRecorder) {
    mediaRecorder.stop();
  }
  
  isRecording = false;
  mediaRecorder = null;
  audioChunks = [];
  
  const recordButton = document.getElementById('record-btn');
  const recordingStatus = document.getElementById('recording-status');
  const sendRecordingBtn = document.getElementById('send-recording');
  
  recordButton.classList.remove('recording');
  recordingStatus.textContent = 'Click to start recording';
  sendRecordingBtn.disabled = true;
}

function sendVoiceMessage() {
  if (audioChunks.length === 0) return;
  
  // In a real app, you would send the audio to a speech-to-text service
  // For this demo, we'll just simulate it
  
  // Add user message
  addMessage("🎤 [Voice message]", 'user');
  
  // Simulate AI processing voice
  showTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator();
    
    // Simulate random transcription based on suggested questions
    const suggestedQuestions = document.querySelectorAll('.suggested-question');
    const randomQuestion = suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)].textContent;
    
    // Add AI response acknowledging voice message and responding to simulated question
    addMessage(`I received your voice message asking: "${randomQuestion}"\n\nLet me answer that for you...`, 'ai');
    
    // Simulate generating proper response
    setTimeout(() => {
      generateAIResponse(randomQuestion);
    }, 1000);
  }, 1500);
  
  resetRecording();
}

// Toast notification system
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slide-out-right 0.3s forwards';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}
