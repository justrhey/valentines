const noBtn = document.getElementById("noBtn");
const yesBtn = document.querySelector('.yes');
const card = document.querySelector('.card');
const container = document.querySelector('.container');
let clickCount = 0;
let patternInterval = null;
let shouldMoveOnHover = false; // Flag to control hover movement

// Array of placeholder image URLs
const imageUrls = [
  'https://i.pinimg.com/736x/79/f1/f7/79f1f73bc70ac49426515f9580d1eecd.jpg',
  'https://i.pinimg.com/736x/96/35/96/963596ec8dbbe369a9a8972d4f604d02.jpg',
  'https://i.pinimg.com/736x/87/86/46/878646982a6d6c5e4541354d499019e2.jpg',
  'https://i.pinimg.com/736x/fb/40/8f/fb408f37fbef4ec3b0fda715fd3c4fb1.jpg',
  'https://i.pinimg.com/736x/ec/5c/d8/ec5cd86ac24ec3f1caff1e39bb0ce980.jpg',
  'https://i.pinimg.com/736x/07/f5/e4/07f5e49dc2f9ca03c55695e3123c68a4.jpg',
  'https://i.pinimg.com/736x/52/c9/ee/52c9ee5c1be4011d73374fb2984cd580.jpg',
  'https://i.pinimg.com/1200x/85/2b/5e/852b5e3e496b878cfaa4c2e96b0f863a.jpg',
  'https://i.pinimg.com/1200x/85/2b/5e/852b5e3e496b878cfaa4c2e96b0f863a.jpg',
  'https://i.pinimg.com/736x/96/da/f5/96daf5db046fdbde68b62dd163c9c873.jpg',
  'https://i.pinimg.com/736x/5a/54/ae/5a54ae3b3f2a3aa7a3f6f31bea332d58.jpg',
  'https://i.pinimg.com/736x/c3/a0/14/c3a01415c29d9e8850ce4fc669c5328b.jpg'
];

// Initial mouseover handler (no movement for first 2 clicks)
function handleNoButtonMouseover() {
  if (!shouldMoveOnHover) {
    // Don't move for first 2 clicks - just change color
    noBtn.style.transform = 'translate(0, 0)';
    noBtn.style.background = '#d0d0d0';
    return;
  }
  
  // After 2 clicks, move the button
  const movementRange = 100 + (clickCount * 20);
  const x = Math.random() * (movementRange * 2) - movementRange;
  const y = Math.random() * (movementRange) - (movementRange / 2);
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.style.transition = 'transform 0.2s ease';
}

// Set up initial mouseover event
noBtn.addEventListener("mouseover", handleNoButtonMouseover);

// Mouseout handler to reset color
noBtn.addEventListener("mouseout", () => {
  // Reset background color on mouseout
  updateButtonStyle();
});

noBtn.addEventListener("click", () => {
  clickCount++;
  
  // Check if we should enable hover movement after 2 clicks
  if (clickCount >= 3) {
    shouldMoveOnHover = true;
  }
  
  // Stop any existing pattern
  if (patternInterval) {
    clearInterval(patternInterval);
    patternInterval = null;
  }
  
  // Create images for all clicks (or you can limit this too)
  if (!patternInterval) {
    createImagePattern();
  }
  
  
  // Move button on click (regardless of click count)
  const movementRange = 150 + (clickCount * 30);
  const x = Math.random() * (movementRange * 2) - movementRange;
  const y = Math.random() * (movementRange) - (movementRange / 2);
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  
  // Update button text and appearance
  updateNoButtonText();
  
  // Make button move faster with more clicks (only affects click movement, not hover)
  noBtn.style.transition = `transform ${0.3 - (clickCount * 0.02)}s ease`;
});

function createImagePattern() {
  // Only create images for first 5 clicks if you want to limit it
  if (clickCount > 5) {
    return; // Stop creating images after 5 clicks
  }
  
  patternInterval = setInterval(() => {
    // Create images based on click count
    const numImages = Math.min(Math.floor(clickCount / 2) + 1, 3);
    
    for (let i = 0; i < numImages; i++) {
      createPoppingImage();
    }
    
  }, 800 - (clickCount * 100));
}

function createPoppingImage() {
  const img = document.createElement('img');
  
  // Select random image from array
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  img.src = imageUrls[randomIndex];
  img.alt = "No";
  img.className = 'valentine-image';
  
  // Size based on click count
  const baseSize = 80 + (clickCount * 10);
  const size = Math.random() * 40 + baseSize;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.objectFit = 'cover';
  img.style.borderRadius = '50%';
  img.style.border = `${2 + Math.floor(clickCount/2)}px solid #ff4d6d`;
  img.style.boxShadow = '0 10px 25px rgba(255, 77, 109, 0.4)';
  img.style.cursor = 'pointer';
  
  // Random position within viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  const x = Math.random() * (viewportWidth - size);
  const y = Math.random() * (viewportHeight - size);
  
  img.style.position = 'fixed';
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.zIndex = '1000';
  img.style.opacity = '0';
  img.style.transform = 'scale(0) rotate(0deg)';
  img.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  
  // Add pop-in animation
  setTimeout(() => {
    img.style.opacity = '1';
    img.style.transform = 'scale(1) rotate(360deg)';
  }, 10);
  
  // Add hover effect to images
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.2) rotate(5deg)';
    img.style.boxShadow = '0 15px 35px rgba(255, 77, 109, 0.6)';
    
    // Add slight movement on hover
    const moveX = (Math.random() * 20 - 10);
    const moveY = (Math.random() * 20 - 10);
    img.style.transform = `scale(1.2) rotate(5deg) translate(${moveX}px, ${moveY}px)`;
  });
  
  img.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1) rotate(0deg)';
    img.style.boxShadow = '0 10px 25px rgba(255, 77, 109, 0.4)';
  });
  
  // Add click effect - image disappears
  // Add to body
  img.addEventListener('click', () => {
    img.style.transform = 'scale(0) rotate(720deg)';
    img.style.opacity = '0';
    img.style.transition = 'all 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
    
    setTimeout(() => {
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    }, 400);
  });
  
  document.body.appendChild(img);
  
  // Auto-remove after some time
  const autoRemoveTime = 6000 - (clickCount * 500);
  setTimeout(() => {
    if (img.parentNode && img.style.opacity !== '0') {
      img.style.opacity = '0';
      img.style.transform = 'scale(0) rotate(-360deg)';
      img.style.transition = 'all 0.8s ease';
      
      setTimeout(() => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      }, 800);
    }
  }, Math.max(2000, autoRemoveTime));
}

function removeAllImages() {
  const images = document.querySelectorAll('img.valentine-image');
  images.forEach((img, index) => {
    setTimeout(() => {
      img.style.transition = 'all 0.5s ease';
      img.style.transform = 'scale(0) rotate(720deg)';
      img.style.opacity = '0';
      
      setTimeout(() => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      }, 500);
    }, index * 50);
  });
}

function updateNoButtonText() {
  const messages = [
    "luh?",           // Click 1
    "Think again bebe!",            // Click 2
    "Mahaaaal Pretty please?",          // Click 3
    "naku bilang sakin to",            // Click 4
    "You're hurting the baby!!", // Click 5
    "Who's the baby? me ofc",    // Click 6
    "Please don't do this!",   // Click 7
    "My heart can't take it!", // Click 8
    "You're being mean!",      // Click 9
    "Just say yes already!"    // Click 10
  ];
  
  if (clickCount <= messages.length) {
    noBtn.textContent = messages[clickCount - 1];
  } else {
    noBtn.textContent = `No (${clickCount}x)`;
  }
  
  updateButtonStyle();
}

function updateButtonStyle() {
  // Change button style based on click count
  if (clickCount <= 2) {
    // First 2 clicks - no movement on hover
    noBtn.style.background = `hsl(0, 70%, 85%)`;
    noBtn.style.color = `hsl(0, 70%, 30%)`;
    noBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
  } else if (clickCount <= 5) {
    // Clicks 3-5 - mild movement
    const hue = 0 + (clickCount * 10);
    noBtn.style.background = `hsl(${hue}, 70%, 85%)`;
    noBtn.style.color = `hsl(${hue}, 70%, 30%)`;
    noBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
  } else {
    // After 5 clicks - angry style
    noBtn.style.background = 'linear-gradient(45deg, #ff3333, #ff6666)';
    noBtn.style.color = 'white';
    noBtn.style.boxShadow = '0 10px 25px rgba(255, 51, 51, 0.5)';
    noBtn.style.fontWeight = 'bold';
    noBtn.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';
    
    // Add shaking animation for clicks 6+
    noBtn.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      noBtn.style.animation = '';
    }, 500);
  }
}

function resetNoButton() {
  noBtn.style.transform = 'translate(0, 0)';
  noBtn.style.transition = 'transform 0.3s ease';
  noBtn.textContent = 'No';
  noBtn.style.background = '#eaeaea';
  noBtn.style.color = '#555';
  noBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
  noBtn.style.animation = '';
  shouldMoveOnHover = false;
}

function sayYes() {
  // Clear any running pattern
  if (patternInterval) {
    clearInterval(patternInterval);
    patternInterval = null;
  }
  
  // Remove all images
  removeAllImages();
  
  // Reset no button
  resetNoButton();
  
    window.location.href = 'where.html';
  
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);