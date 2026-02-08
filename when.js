// February 2026 Calendar Data
const february2026 = {
  year: 2026,
  month: 1,
  monthName: 'February',
  daysInMonth: 28, // 2026 is not a leap year
  firstDay: 0, // February 1, 2026 is Sunday (0 = Sunday)
  valentinesDay: 14
};

// Available time slots
const timeSlots = [
  { time: "10:00", label: "Morning", period: "AM" },
  { time: "11:00", label: "Morning", period: "AM" },
  { time: "12:00", label: "Noon", period: "PM" },
  { time: "13:00", label: "Afternoon", period: "PM" },
  { time: "14:00", label: "Afternoon", period: "PM" },
  { time: "15:00", label: "Afternoon", period: "PM" },
  { time: "16:00", label: "Late Afternoon", period: "PM" },
  { time: "17:00", label: "Evening", period: "PM" },
  { time: "18:00", label: "Evening", period: "PM" },
  { time: "19:00", label: "Evening", period: "PM" },
  { time: "20:00", label: "Night", period: "PM" },
  { time: "21:00", label: "Night", period: "PM" }
];

let selectedDate = null;
let selectedTime = null;

function initCalendar() {
  displayLocation();
  generateCalendar();
  generateTimeSlots();
  updateSelectionSummary();
  updateConfirmButton();
}

function displayLocation() {
  const locationId = localStorage.getItem('selectedLocation');
  const locationName = localStorage.getItem('selectedLocationName') || 'Unknown Location';
  
  document.getElementById('locationDisplay').innerHTML = `
    <h3>Selected Location</h3>
    <p>${locationName}</p>
  `;
}

function generateCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // For 2026, disable all past dates relative to current date (2024/2025)
  const isYearInPast = currentYear < 2026;
  
  // Add empty cells for days before February 1, 2026 (Sunday)
  for (let i = 0; i < february2026.firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'empty-date';
    calendarGrid.appendChild(emptyCell);
  }
  
  // Create buttons for each day of February 2026
  for (let day = 1; day <= february2026.daysInMonth; day++) {
    const dateButton = document.createElement('button');
    dateButton.className = 'date-button';
    dateButton.type = 'button';
    dateButton.dataset.day = day;
    
    // Check if this date is in the past (for 2024/2025)
    const isPast = isYearInPast || 
                   (currentYear === 2026 && currentMonth === 1 && day < currentDay) ||
                   (currentYear === 2026 && currentMonth < 1);
    
    // Check if this is Valentine's Day
    const isValentines = day === february2026.valentinesDay;
    
    // Add appropriate classes
    if (isPast) {
      dateButton.classList.add('disabled', 'past');
      dateButton.disabled = true;
    } else if (isValentines) {
      dateButton.classList.add('valentines');
    }
    
    // Check if this is the selected date
    if (selectedDate === day) {
      dateButton.classList.add('selected');
    }
    
    // Add day number
    const daySpan = document.createElement('span');
    daySpan.className = 'date-day';
    daySpan.textContent = day;
    
    // Add weekday label
    const weekdayIndex = (february2026.firstDay + day - 1) % 7;
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayLabel = document.createElement('span');
    weekdayLabel.className = 'date-label';
    weekdayLabel.textContent = weekdays[weekdayIndex];
    
    if (isValentines) {
      const valentineLabel = document.createElement('span');
      valentineLabel.className = 'date-label';
      valentineLabel.textContent = 'Valentine\'s';
      valentineLabel.style.color = 'white';
      valentineLabel.style.fontWeight = 'bold';
      
      dateButton.appendChild(daySpan);
      dateButton.appendChild(valentineLabel);
    } else {
      dateButton.appendChild(daySpan);
      dateButton.appendChild(weekdayLabel);
    }
    
    // Add click event for selectable dates (only future dates in 2026)
    if (!isPast) {
      dateButton.onclick = () => selectDate(day);
    }
    
    calendarGrid.appendChild(dateButton);
  }
}

function generateTimeSlots() {
  const timeContainer = document.getElementById('timeSlots');
  timeContainer.innerHTML = '';
  
  timeSlots.forEach((slot, index) => {
    const timeButton = document.createElement('div');
    timeButton.className = 'time-slot';
    timeButton.dataset.index = index;
    
    // Check if this time is selected
    if (selectedTime === index) {
      timeButton.classList.add('selected');
    }
    
    // For 2026 dates, all times should be available (since it's in the future)
    // Only disable if it's a past date in 2026 (which won't happen since we're in 2024)
    const shouldDisable = shouldDisableTimeSlot(slot.time, selectedDate);
    if (shouldDisable) {
      timeButton.classList.add('disabled');
      timeButton.title = 'This time is not available';
    }
    
    // Format time display
    const formattedTime = formatTimeDisplay(slot.time);
    
    timeButton.innerHTML = `
      <div class="time-display">${formattedTime}</div>
      <div class="time-label">${slot.label}</div>
    `;
    
    // Add click event only if not disabled
    if (!timeButton.classList.contains('disabled')) {
      timeButton.onclick = () => selectTime(index);
    }
    
    timeContainer.appendChild(timeButton);
  });
}

function shouldDisableTimeSlot(timeString, selectedDay) {
  if (!selectedDay) {
    // If no date is selected, don't disable any times
    return false;
  }
  
  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const selectedHour = parseInt(timeString.split(':')[0]);
  
  // For 2026 dates, only check if it's "today" in 2026 (which won't happen)
  // So essentially, all times for 2026 dates should be available
  if (currentYear === 2026 && currentMonth === 1 && selectedDay === today) {
    const currentHour = now.getHours();
    return selectedHour < currentHour;
  }
  
  // For future years, all times are available
  return false;
}

function selectDate(day) {
  selectedDate = parseInt(day);
  
  // If a time was selected that's now invalid, clear it
  if (selectedTime !== null) {
    const slot = timeSlots[selectedTime];
    if (shouldDisableTimeSlot(slot.time, selectedDate)) {
      selectedTime = null;
    }
  }
  
  generateCalendar();
  generateTimeSlots();
  updateSelectionSummary();
  updateConfirmButton();
  
  // Add selection animation
  const selectedBtn = document.querySelector(`.date-button[data-day="${day}"]`);
  if (selectedBtn) {
    selectedBtn.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
      selectedBtn.style.animation = '';
    }, 500);
  }
}

function selectTime(index) {
  selectedTime = index;
  generateTimeSlots();
  updateSelectionSummary();
  updateConfirmButton();
  
  // Add selection animation
  const selectedBtn = document.querySelector(`.time-slot[data-index="${index}"]`);
  if (selectedBtn) {
    selectedBtn.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
      selectedBtn.style.animation = '';
    }, 500);
  }
}

function formatTimeDisplay(time24) {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  
  if (hour === 12) return `12:${minutes} PM`;
  if (hour === 0) return `12:${minutes} AM`;
  
  if (hour > 12) {
    return `${hour - 12}:${minutes} PM`;
  } else {
    return `${hour}:${minutes} AM`;
  }
}

function updateSelectionSummary() {
  const summaryDiv = document.getElementById('selectionSummary');
  const locationName = localStorage.getItem('selectedLocationName') || 'Unknown Location';
  
  if (!selectedDate && selectedTime === null) {
    summaryDiv.innerHTML = '<div class="no-selection">No date or time selected yet</div>';
    return;
  }
  
  let dateText = 'No date selected';
  let timeText = 'No time selected';
  
  if (selectedDate) {
    const dateObj = new Date(february2026.year, february2026.month, selectedDate);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    dateText = dateObj.toLocaleDateString('en-US', options);
  }
  
  if (selectedTime !== null) {
    const slot = timeSlots[selectedTime];
    timeText = `${formatTimeDisplay(slot.time)} (${slot.label})`;
  }
  
  summaryDiv.innerHTML = `
    <div class="selection-details">
      <h3>Selected Date & Time</h3>
      <div class="selection-date">${dateText}</div>
      <div class="selection-time">${timeText}</div>
      <div class="selection-location">For: ${locationName}</div>
    </div>
  `;
}

function updateConfirmButton() {
  const confirmBtn = document.getElementById('confirmBtn');
  
  if (selectedDate !== null && selectedTime !== null) {
    confirmBtn.disabled = false;
    
    const slot = timeSlots[selectedTime];
    const formattedTime = formatTimeDisplay(slot.time);
    confirmBtn.textContent = `Confirm: Feb ${selectedDate}, 2026 at ${formattedTime}`;
  } else {
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Confirm Date & Time';
  }
}

function goBackToLocation() {
  window.location.href = 'where.html';
}

function confirmDateTime() {
  if (selectedDate === null || selectedTime === null) {
    alert('Please select both a date and time');
    return;
  }
  
  // Save date information for 2026
  const dateInfo = {
    day: selectedDate,
    month: february2026.month,
    monthName: february2026.monthName,
    year: february2026.year,
    formatted: `February ${selectedDate}, ${february2026.year}`
  };
  
  // Save time information
  const timeSlot = timeSlots[selectedTime];
  const timeInfo = {
    time24: timeSlot.time,
    time12: formatTimeDisplay(timeSlot.time),
    period: timeSlot.period,
    label: timeSlot.label,
    formatted: `${formatTimeDisplay(timeSlot.time)} (${timeSlot.label})`
  };
  
  // Save to localStorage
  localStorage.setItem('selectedDate', JSON.stringify(dateInfo));
  localStorage.setItem('selectedTime', JSON.stringify(timeInfo));
  
  // Show confirmation animation
  const confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.innerHTML = '✓ Confirmed!';
  confirmBtn.style.background = '#4CAF50';
  confirmBtn.disabled = true;
  
  // Add success animation to summary
  const summary = document.getElementById('selectionSummary');
  summary.style.animation = 'pulse 0.5s ease';
  
  // Redirect to outfit selection page after delay
  setTimeout(() => {
    window.location.href = 'what.html';
  }, 1500);
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .empty-date {
    aspect-ratio: 1;
    background: transparent;
  }
`;
document.head.appendChild(style);

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalendar);
} else {
  initCalendar();
}