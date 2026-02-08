// Color palettes
const shirtColors = [
  { name: "Classic White", hex: "#FFFFFF", text: "dark" },
  { name: "Navy Blue", hex: "#1e3a8a", text: "light" },
  { name: "Valentine Red", hex: "#dc2626", text: "light" },
  { name: "Soft Pink", hex: "#fecdd3", text: "dark" },
  { name: "Black", hex: "#000000", text: "light" },
  { name: "Pastel Blue", hex: "#bfdbfe", text: "dark" },
  { name: "Lavender", hex: "#ddd6fe", text: "dark" },
  { name: "Mint Green", hex: "#a7f3d0", text: "dark" },
  { name: "Cream", hex: "#fef3c7", text: "dark" },
  { name: "Burgundy", hex: "#7f1d1d", text: "light" }
];

const pantsColors = [
  { name: "Dark Jeans", hex: "#1e293b", text: "light" },
  { name: "Light Jeans", hex: "#64748b", text: "light" },
  { name: "Black Pants", hex: "#171717", text: "light" },
  { name: "Khaki", hex: "#d97706", text: "light" },
  { name: "Beige", hex: "#fef3c7", text: "dark" },
  { name: "Gray", hex: "#6b7280", text: "light" },
  { name: "Navy", hex: "#1e3a8a", text: "light" },
  { name: "Olive", hex: "#4d7c0f", text: "light" },
  { name: "White", hex: "#f8fafc", text: "dark" },
  { name: "Brown", hex: "#78350f", text: "light" }
];

let selectedShirtColor = null;
let selectedPantsColor = null;

function initWhatPage() {
  // Load summary information
  loadSummaryInfo();
  
  // Initialize color selections
  initializeColorSelections();
  
  // Generate color options
  generateColorOptions();
  
  // Set default selections
  setDefaultSelections();
}

function loadSummaryInfo() {
  const dateInfo = JSON.parse(localStorage.getItem('selectedDate') || '{}');
  const locationName = localStorage.getItem('selectedLocationName') || 'Not selected';
  const locationDesc = localStorage.getItem('selectedLocationDesc') || '';
  
  let dateText = 'Not selected';
  if (dateInfo.day) {
    dateText = `${dateInfo.monthName || 'February'} ${dateInfo.day}, ${dateInfo.year || '2024'}`;
  }
  
  document.getElementById('summaryInfo').innerHTML = `
    <h3>OUR VALENTINE'S PLAN</h3>
    <div class="summary-details">
      <div class="detail-item">
        <div class="detail-label">LOCATION</div>
        <div class="detail-value">${locationName}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">DATE</div>
        <div class="detail-value">${dateText}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">TIME</div>
        <div class="detail-value">6:00 PM</div>
      </div>
    </div>
  `;
}

function generateColorOptions() {
  generateShirtColors();
  generatePantsColors();
}

function generateShirtColors() {
  const container = document.getElementById('shirtColors');
  container.innerHTML = '';
  
  shirtColors.forEach((color, index) => {
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    if (selectedShirtColor === index) {
      colorOption.classList.add('selected');
    }
    
    colorOption.innerHTML = `
      <div class="color-display" style="background-color: ${color.hex}"></div>
      <div class="color-name">${color.name}</div>
    `;
    
    colorOption.onclick = () => {
      selectShirtColor(index);
    };
    
    container.appendChild(colorOption);
  });
}

function generatePantsColors() {
  const container = document.getElementById('pantsColors');
  container.innerHTML = '';
  
  pantsColors.forEach((color, index) => {
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    if (selectedPantsColor === index) {
      colorOption.classList.add('selected');
    }
    
    colorOption.innerHTML = `
      <div class="color-display" style="background-color: ${color.hex}"></div>
      <div class="color-name">${color.name}</div>
    `;
    
    colorOption.onclick = () => {
      selectPantsColor(index);
    };
    
    container.appendChild(colorOption);
  });
}

function selectShirtColor(index) {
  selectedShirtColor = index;
  generateShirtColors();
  updateOutfitPreview();
  
  // Add selection animation
  const selectedOption = document.querySelectorAll('#shirtColors .color-option')[index];
  selectedOption.style.animation = 'pulse 0.5s ease';
  setTimeout(() => {
    selectedOption.style.animation = '';
  }, 500);
}

function selectPantsColor(index) {
  selectedPantsColor = index;
  generatePantsColors();
  updateOutfitPreview();
  
  // Add selection animation
  const selectedOption = document.querySelectorAll('#pantsColors .color-option')[index];
  selectedOption.style.animation = 'pulse 0.5s ease';
  setTimeout(() => {
    selectedOption.style.animation = '';
  }, 500);
}

function setDefaultSelections() {
  // Set random default selections if none
  if (selectedShirtColor === null) {
    selectedShirtColor = 1; // Navy Blue
  }
  if (selectedPantsColor === null) {
    selectedPantsColor = 0; // Dark Jeans
  }
  
  generateShirtColors();
  generatePantsColors();
  updateOutfitPreview();
}

function updateOutfitPreview() {
  // Update Person 1 (You)
  if (selectedShirtColor !== null) {
    const shirt1 = document.getElementById('previewShirt1');
    shirt1.style.background = shirtColors[selectedShirtColor].hex;
    shirt1.style.color = shirtColors[selectedShirtColor].text === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)';
  }
  
  if (selectedPantsColor !== null) {
    const pants1 = document.getElementById('previewPants1');
    pants1.style.background = pantsColors[selectedPantsColor].hex;
    pants1.style.color = pantsColors[selectedPantsColor].text === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)';
  }
  
  // Update Person 2 (Me) - Same colors for matching outfits
  if (selectedShirtColor !== null) {
    const shirt2 = document.getElementById('previewShirt2');
    shirt2.style.background = shirtColors[selectedShirtColor].hex;
    shirt2.style.color = shirtColors[selectedShirtColor].text === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)';
  }
  
  if (selectedPantsColor !== null) {
    const pants2 = document.getElementById('previewPants2');
    pants2.style.background = pantsColors[selectedPantsColor].hex;
    pants2.style.color = pantsColors[selectedPantsColor].text === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)';
  }
}

function initializeColorSelections() {
  // Load previously selected colors from localStorage if available
  const savedShirt = localStorage.getItem('selectedShirtColor');
  const savedPants = localStorage.getItem('selectedPantsColor');
  
  if (savedShirt !== null) {
    selectedShirtColor = parseInt(savedShirt);
  }
  
  if (savedPants !== null) {
    selectedPantsColor = parseInt(savedPants);
  }
}

function goBackToCalendar() {
  window.location.href = 'when.html';
}

function proceedToFinal() {
  // Save selected colors
  localStorage.setItem('selectedShirtColor', selectedShirtColor);
  localStorage.setItem('selectedPantsColor', selectedPantsColor);
  
  // Save color details
  localStorage.setItem('selectedShirtName', shirtColors[selectedShirtColor].name);
  localStorage.setItem('selectedShirtHex', shirtColors[selectedShirtColor].hex);
  localStorage.setItem('selectedPantsName', pantsColors[selectedPantsColor].name);
  localStorage.setItem('selectedPantsHex', pantsColors[selectedPantsColor].hex);
  
  // Show loading animation
  const nextBtn = document.getElementById('nextBtn');
  const originalText = nextBtn.innerHTML;
  nextBtn.innerHTML = 'Saving...';
  nextBtn.disabled = true;
  
  // Add loading animation
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
  const style = document.createElement('style');
  style.textContent = `
    @keyframes loading {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Redirect to final confirmation page
  setTimeout(() => {
    window.location.href = 'confirmed.html';
  }, 1200);
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWhatPage);
} else {
  initWhatPage();
}