export function showDateSelection(clickCount) {
  document.body.innerHTML = `
    <div class="date-selection-container">
      <div class="date-card">
        <h1>Great! Now choose where 💖</h1>
        <p class="subtitle">Pick your perfect Valentine's date location:</p>
        
        <div class="date-options">
          <button class="date-option" onclick="showCalendar('Calaca')">
            <div class="option-icon">🌴</div>
            <div class="option-content">
              <h3>Calaca</h3>
              <p>Beach sunset date with ocean view</p>
            </div>
          </button>
          
          <button class="date-option" onclick="showCalendar('Binondo')">
            <div class="option-icon">🥢</div>
            <div class="option-content">
              <h3>Binondo</h3>
              <p>Food adventure in Chinatown</p>
            </div>
          </button>
          
          <button class="date-option" onclick="showCalendar('Nasugbu')">
            <div class="option-icon">🏖️</div>
            <div class="option-content">
              <h3>Nasugbu</h3>
              <p>Resort getaway by the beach</p>
            </div>
          </button>
        </div>
        
        <div class="click-counter">
          You clicked "No" ${clickCount} time${clickCount !== 1 ? 's' : ''} before saying yes!
        </div>
      </div>
    </div>
  `;
  
  // Add global functions
  window.showCalendar = showCalendar;
}

export function showCalendar(location) {
  const overlay = document.createElement('div');
  overlay.className = 'calendar-overlay';
  overlay.innerHTML = `
    <div class="calendar-popup">
      <div class="calendar-header">
        <h2>WHEN? 📅</h2>
        <p>Pick a date for our ${location} date</p>
        <button class="close-calendar" onclick="this.closest('.calendar-overlay').remove()">×</button>
      </div>
      
      <div class="calendar-month">
        <div class="month-header">
          <button class="nav-btn prev">←</button>
          <h3>February 2024</h3>
          <button class="nav-btn next">→</button>
        </div>
        
        <div class="weekdays">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        
        <div class="calendar-days">
          ${generateCalendarDays()}
        </div>
      </div>
      
      <div class="calendar-footer">
        <button class="confirm-btn" onclick="confirmDate('${location}')">
          Confirm Date 💝
        </button>
        <button class="cancel-btn" onclick="this.closest('.calendar-overlay').remove()">
          Choose Different Place
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add global functions
  window.selectDate = selectDate;
  window.confirmDate = (loc) => confirmDate(loc, overlay);
  
  // Add calendar navigation
  setTimeout(() => {
    overlay.querySelector('.prev')?.addEventListener('click', () => {
      alert('Previous month - calendar logic can be expanded here!');
    });
    
    overlay.querySelector('.next')?.addEventListener('click', () => {
      alert('Next month - calendar logic can be expanded here!');
    });
  }, 10);
}

function generateCalendarDays() {
  let daysHTML = '';
  // Add empty days for Feb 1, 2024 (Thursday)
  for (let i = 0; i < 4; i++) {
    daysHTML += '<div class="empty-day"></div>';
  }
  
  // Add days 1-29 (February 2024 has 29 days)
  for (let day = 1; day <= 29; day++) {
    const isValentines = day === 14;
    const isWeekend = (day + 3) % 7 === 0 || (day + 4) % 7 === 0;
    const isPast = day < 14;
    
    daysHTML += `
      <div class="calendar-day ${isValentines ? 'valentines-day' : ''} ${isWeekend ? 'weekend' : ''} ${isPast ? 'past-day' : ''}"
           onclick="${!isPast ? `selectDate(${day}, 'February')` : ''}">
        ${day}
        ${isValentines ? '<div class="heart">💖</div>' : ''}
        ${isWeekend ? '<div class="weekend-indicator">✓</div>' : ''}
      </div>
    `;
  }
  
  return daysHTML;
}

function selectDate(day, month) {
  const days = document.querySelectorAll('.calendar-day');
  days.forEach(d => d.classList.remove('selected'));
  
  const selectedDay = Array.from(days).find(d => d.textContent.includes(day.toString()));
  selectedDay?.classList.add('selected');
  
  window.selectedDate = { day, month };
}

function confirmDate(location, overlay) {
  if (!window.selectedDate) {
    alert('Please select a date first!');
    return;
  }
  
  overlay.innerHTML = `
    <div class="calendar-popup success-popup">
      <div class="success-icon">🎉</div>
      <h2>Date Confirmed! 💝</h2>
      <p class="success-message">
        Our ${location} date is set for<br>
        <strong>${window.selectedDate.month} ${window.selectedDate.day}, 2024</strong>
      </p>
      <p class="success-note">I'll pick you up at 6:00 PM! Can't wait! 💖</p>
      <button class="final-btn" onclick="showFinalMessage()">
        Yay! Can't Wait! 💞
      </button>
    </div>
  `;
  
  // Add global function
  window.showFinalMessage = () => showFinalMessage();
}

function showFinalMessage() {
  document.body.innerHTML = `
    <div class="final-container">
      <div class="final-message">
        <h1>Perfect! 💘</h1>
        <div class="heart-animation">💖</div>
        <p class="final-text">
          I'm so excited for our date!<br>
          This is going to be the best Valentine's Day ever!
        </p>
        <p class="final-note">
          See you soon, my Valentine! 💕
        </p>
        <button class="restart-btn" onclick="location.reload()">
          Start Over 🔄
        </button>
      </div>
    </div>
  `;
}