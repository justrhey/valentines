function initConfirmedPage() {
  // Load all summary data
  loadCompleteSummary();
  loadCopyPasteContent();
  loadFunStats();
}

function loadCompleteSummary() {
  // Get all stored data
  const dateInfo = JSON.parse(localStorage.getItem('selectedDate') || '{}');
  const locationName = localStorage.getItem('selectedLocationName') || 'Not selected';
  const shirtName = localStorage.getItem('selectedShirtName') || 'Not selected';
  const pantsName = localStorage.getItem('selectedPantsName') || 'Not selected';
  
  // Format date
  let dateText = 'Not selected';
  if (dateInfo.day) {
    dateText = `${dateInfo.monthName || 'February'} ${dateInfo.day}, ${dateInfo.year || '2024'}`;
  }
  
  // Get time
  let timeText = '6:00 PM';
  try {
    const timeInfo = JSON.parse(localStorage.getItem('selectedTime') || '{}');
    if (timeInfo && timeInfo.formatted) {
      timeText = timeInfo.formatted;
    } else if (timeInfo && timeInfo.time12) {
      timeText = timeInfo.time12;
    }
  } catch (e) {
    console.log('Time parsing error:', e);
  }
  
  // Create summary HTML
  document.getElementById('completeSummary').innerHTML = `
    <h3 class="summary-title">OUR COMPLETE VALENTINE'S PLAN</h3>
    <div class="summary-grid">
      <div class="summary-item">
        <div class="item-label">Date</div>
        <div class="item-value">${dateText}</div>
      </div>
      <div class="summary-item">
        <div class="item-label">Time</div>
        <div class="item-value">${timeText}</div>
      </div>
      <div class="summary-item">
        <div class="item-label">Location</div>
        <div class="item-value">${locationName}</div>
      </div>
      <div class="summary-item">
        <div class="item-label">T-Shirt</div>
        <div class="item-value">${shirtName}</div>
      </div>
      <div class="summary-item">
        <div class="item-label">Pants</div>
        <div class="item-value">${pantsName}</div>
      </div>
    </div>
  `;
}

function loadCopyPasteContent() {
  // Collect all plan data
  const planData = collectAllPlanData();
  
  // Create formatted text for copying
  const copyText = formatCopyText(planData);
  
  // Display in the copy box
  const copyContent = document.getElementById('copyContent');
  if (copyContent) {
    copyContent.textContent = copyText;
  }
}

function formatCopyText(planData) {
  // Get time from localStorage
  let timeText = '6:00 PM';
  try {
    const timeInfo = JSON.parse(localStorage.getItem('selectedTime'));
    if (timeInfo && timeInfo.formatted) {
      timeText = timeInfo.formatted;
    } else if (timeInfo && timeInfo.time12) {
      timeText = timeInfo.time12;
    }
  } catch (e) {
    console.log('Error parsing time:', e);
  }
  
  return `🎉 VALENTINE'S DATE PLAN 🎉

📅 DATE & TIME:
${planData.date} at ${timeText}

📍 LOCATION:
${planData.location}

👕 MATCHING OUTFIT:
• T-Shirt: ${planData.shirtColor}
• Pants: ${planData.pantsColor}

📊 FUN STATS:
• Number of times "No" was clicked: ${planData.clickCount}
• Created on: ${new Date().toLocaleDateString()}

💝 REMINDERS:
• Meeting Time: ${timeText} sharp
• Dress Code: Matching outfits as chosen above
• What to bring: Your wonderful self and excitement!

⚠️ IMPORTANT NOTES:
• Plan created and confirmed
• Both parties have agreed to all details
• This is our official Valentine's Day plan

💌 Save this plan and let's make it happen!
Looking forward to our special date! ❤️`;
}

function collectAllPlanData() {
  // Get date info
  let dateText = 'Not selected';
  try {
    const dateInfo = JSON.parse(localStorage.getItem('selectedDate') || '{}');
    if (dateInfo && dateInfo.day) {
      dateText = `${dateInfo.monthName || 'February'} ${dateInfo.day}, ${dateInfo.year || '2024'}`;
    }
  } catch (e) {
    console.log('Error parsing date:', e);
  }
  
  // Get location
  const locationName = localStorage.getItem('selectedLocationName') || 'Not selected';
  
  // Get outfit colors
  const shirtName = localStorage.getItem('selectedShirtName') || 'Not selected';
  const pantsName = localStorage.getItem('selectedPantsName') || 'Not selected';
  
  // Get click count
  const clickCount = localStorage.getItem('noClickCount') || '0';
  
  return {
    date: dateText,
    location: locationName,
    shirtColor: shirtName,
    pantsColor: pantsName,
    clickCount: clickCount
  };
}

function copyPlanToClipboard() {
  const copyContent = document.getElementById('copyContent');
  const copyBtn = document.getElementById('copyBtn');
  const statusDiv = document.getElementById('copyStatus');
  
  // If content is empty, regenerate it
  if (!copyContent || !copyContent.textContent || copyContent.textContent.trim().length < 10) {
    const planData = collectAllPlanData();
    const copyText = formatCopyText(planData);
    if (copyContent) {
      copyContent.textContent = copyText;
    }
  }
  
  // Create a textarea for copying
  const textarea = document.createElement('textarea');
  textarea.value = copyContent ? copyContent.textContent : '';
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    
    if (successful) {
      // Show success
      if (statusDiv) {
        statusDiv.textContent = '✅ Copied to clipboard! Paste it anywhere to save.';
        statusDiv.className = 'copy-status success';
      }
      
      // Update button temporarily
      if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="btn-icon">✅</span> Copied!';
        copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.background = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)';
        }, 2000);
      }
      
      // Add confetti effect
      createConfettiEffect();
      
      // Hide status after 4 seconds
      if (statusDiv) {
        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 4000);
      }
      
    } else {
      throw new Error('Copy command failed');
    }
    
  } catch (err) {
    console.error('Copy error:', err);
    
    if (statusDiv) {
      // Show error with manual instructions
      statusDiv.innerHTML = `
        <div style="text-align: center;">
          <div style="margin-bottom: 10px;">❌ Could not copy automatically.</div>
          <div style="margin-bottom: 15px; font-size: 0.9em;">Please select and copy the text below manually:</div>
          <button onclick="selectAllText()" style="
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            margin: 10px 0;
            cursor: pointer;
          ">Select All Text</button>
          <div style="margin-top: 15px; font-size: 0.9em;">
            Then press Ctrl+C (Windows) or Cmd+C (Mac) to copy
          </div>
        </div>
      `;
      statusDiv.className = 'copy-status error';
    }
    
  } finally {
    document.body.removeChild(textarea);
  }
}

function selectAllText() {
  const copyContent = document.getElementById('copyContent');
  if (copyContent) {
    const range = document.createRange();
    range.selectNodeContents(copyContent);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function loadFunStats() {
  // Get click count
  const clickCount = localStorage.getItem('noClickCount') || '0';
  const noClickCountElement = document.getElementById('noClickCount');
  if (noClickCountElement) {
    noClickCountElement.textContent = clickCount;
  }
  
  // Calculate total selections
  let totalSelections = 0;
  if (localStorage.getItem('selectedLocation')) totalSelections++;
  if (localStorage.getItem('selectedDate')) totalSelections++;
  if (localStorage.getItem('selectedShirtColor')) totalSelections++;
  if (localStorage.getItem('selectedPantsColor')) totalSelections++;
  
  const totalSelectionsElement = document.getElementById('totalSelections');
  if (totalSelectionsElement) {
    totalSelectionsElement.textContent = totalSelections;
  }
}

function createConfettiEffect() {
  const confettiCount = 30;
  const colors = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444'];
  
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

function startOver() {
  // Clear localStorage
  localStorage.clear();
  
  // Show loading
  const restartBtn = document.querySelector('.restart-btn');
  if (restartBtn) {
    restartBtn.innerHTML = '<span class="btn-icon">⏳</span> Restarting...';
    restartBtn.disabled = true;
  }
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function sharePlan() {
  const planData = collectAllPlanData();
  
  // Get time
  let timeText = '6:00 PM';
  try {
    const timeInfo = JSON.parse(localStorage.getItem('selectedTime'));
    if (timeInfo && timeInfo.formatted) {
      timeText = timeInfo.formatted;
    } else if (timeInfo && timeInfo.time12) {
      timeText = timeInfo.time12;
    }
  } catch (e) {
    console.log('Error parsing time:', e);
  }
  
  const shareText = `Our Valentine's Date Plan! 📅\n\n` +
                   `📍 ${planData.location}\n` +
                   `📅 ${planData.date} at ${timeText}\n` +
                   `👕 Matching Outfit: ${planData.shirtColor} shirt with ${planData.pantsColor} pants\n` +
                   `📊 Fun fact: I had to ask ${planData.clickCount} times before you said yes! 😉\n` +
                   `💝 Can't wait for our special date!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Our Valentine\'s Date Plan',
      text: shareText,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      const statusDiv = document.getElementById('copyStatus');
      if (statusDiv) {
        statusDiv.textContent = '📋 Plan copied! Share it with friends via WhatsApp, Messenger, etc.';
        statusDiv.className = 'copy-status success';
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 3000);
      }
    });
  }
}

// Debug function to check localStorage
function debugLocalStorage() {
  console.log('=== LOCALSTORAGE CONTENTS ===');
  console.log('selectedDate:', localStorage.getItem('selectedDate'));
  console.log('selectedTime:', localStorage.getItem('selectedTime'));
  console.log('selectedLocation:', localStorage.getItem('selectedLocation'));
  console.log('selectedLocationName:', localStorage.getItem('selectedLocationName'));
  console.log('selectedShirtColor:', localStorage.getItem('selectedShirtColor'));
  console.log('selectedShirtName:', localStorage.getItem('selectedShirtName'));
  console.log('selectedPantsColor:', localStorage.getItem('selectedPantsColor'));
  console.log('selectedPantsName:', localStorage.getItem('selectedPantsName'));
  console.log('noClickCount:', localStorage.getItem('noClickCount'));
  console.log('=== END ===');
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConfirmedPage);
} else {
  initConfirmedPage();
}

// Run debug on load to check data
setTimeout(debugLocalStorage, 500);