const locations = [
  {
    id: 'calaca',
    name: 'Calaca Our Home Town',
    description: 'Lumeng lume na ako oh',
    icon: ''
  },
  {
    id: 'binondo',
    name: 'Binondo Food Tour',
    description: 'Food trip mga itik',
    icon: ''
  },
  {
    id: 'nasugbu',
    name: 'Nasugbu',
    description: 'Samgyupsal us sa nasugbu?',
    icon: ''
  },
  {
    id: 'manila',
    name: 'Manila',
    description: 'Gala Gala tau tas sabay uwi calaca?',
    icon: ''
  },
];

let selectedLocation = null;

function initWherePage() {
  const clickCount = localStorage.getItem('noClickCount') || 0;
  
  // Update stats display
  document.getElementById('clickCount').textContent = clickCount;
  
  if (clickCount == 1) {
    document.getElementById('plural').style.display = 'none';
  } else {
    document.getElementById('plural').style.display = 'inline';
  }
  
  renderLocationOptions();
  updateNextButton();
  
  // Add confetti effect if they clicked a lot
  if (clickCount > 5) {
    createConfettiEffect();
  }
}

function renderLocationOptions() {
  const container = document.getElementById('locationOptions');
  container.innerHTML = '';
  
  locations.forEach(location => {
    const option = document.createElement('div');
    option.className = 'location-option';
    if (selectedLocation === location.id) {
      option.classList.add('selected');
    }
    
    option.innerHTML = `
      <div class="location-icon">${location.icon}</div>
      <div class="location-name">${location.name}</div>
      <div class="location-description">${location.description}</div>
    `;
    
    option.onclick = () => {
      if (selectedLocation === location.id) return;
      
      // Deselect previous
      const previousSelected = document.querySelector('.location-option.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected');
      }
      
      // Select new
      selectedLocation = location.id;
      option.classList.add('selected');
      
      // Add selection animation
      option.style.animation = 'none';
      setTimeout(() => {
        option.style.animation = 'pulse 0.3s ease';
      }, 10);
      
      updateNextButton();
      
      // Play selection sound (optional)
      playSelectionSound();
    };
    
    container.appendChild(option);
  });
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

function updateNextButton() {
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = !selectedLocation;
  
  if (selectedLocation) {
    const location = locations.find(l => l.id === selectedLocation);
    nextBtn.innerHTML = `Next: ${location.name} <span class="btn-icon">→</span>`;
  } else {
    nextBtn.innerHTML = 'Next: Choose Date <span class="btn-icon">→</span>';
  }
}

function proceedToCalendar() {
  if (!selectedLocation) return;
  
  localStorage.setItem('selectedLocation', selectedLocation);
  
  const location = locations.find(l => l.id === selectedLocation);
  localStorage.setItem('selectedLocationName', location.name);
  localStorage.setItem('selectedLocationDesc', location.description);
  
  // Show loading state
  const nextBtn = document.getElementById('nextBtn');
  const originalText = nextBtn.innerHTML;
  nextBtn.innerHTML = 'Loading...';
  nextBtn.disabled = true;
  
  // Add loading animation
  nextBtn.style.background = 'linear-gradient(135deg, #ff758c 0%, #ff4d6d 100%)';
  nextBtn.style.position = 'relative';
  nextBtn.style.overflow = 'hidden';
  
  const loadingBar = document.createElement('div');
  loadingBar.style.position = 'absolute';
  loadingBar.style.top = '0';
  loadingBar.style.left = '-100%';
  loadingBar.style.width = '100%';
  loadingBar.style.height = '100%';
  loadingBar.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)';
  loadingBar.style.animation = 'loading 1s infinite';
  nextBtn.appendChild(loadingBar);
  
  // Add loading animation style
  const loadingStyle = document.createElement('style');
  loadingStyle.textContent = `
    @keyframes loading {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `;
  document.head.appendChild(loadingStyle);
  
  setTimeout(() => {
    window.location.href = 'when.html';
  }, 1200);
}

function goBack() {
  window.location.href = 'index.html';
}

function showCancelMessage() {
  document.getElementById('cancelModal').style.display = 'flex';
}

function hideCancelMessage() {
  document.getElementById('cancelModal').style.display = 'none';
}

function showFakeCancel() {
  const modal = document.getElementById('cancelModal');
  modal.innerHTML = `
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-icon" style="color: #ff4d6d; animation: heartbeat 1s infinite">❤️</div>
        <h3>Just Kidding!</h3>
        <p>You can't cancel Valentine's Day! I'm not letting you escape that easily. 😉</p>
        <div class="modal-buttons">
          <button class="modal-btn primary" onclick="window.location.href='where.html'">
            Continue Planning Our Date
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add heartbeat animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes heartbeat {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

function createConfettiEffect() {
  const confettiCount = 20;
  const colors = ['#ff4d6d', '#ff758c', '#ffafbd', '#ffc3a0'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = '0.8';
    
    document.body.appendChild(confetti);
    
    // Animate confetti
    const animation = confetti.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
    });
    
    animation.onfinish = () => confetti.remove();
  }
}

function playSelectionSound() {
  // Create a simple click sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {
    // Audio context not supported, silent fail
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWherePage);
} else {
  initWherePage();
}