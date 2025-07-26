const display = document.querySelector('.display');
let currentInput = '';

// Create and preload video
const preloadedVideo = document.createElement('video');
preloadedVideo.src = 'files/file.mp4';
preloadedVideo.preload = 'auto';
preloadedVideo.muted = false;
preloadedVideo.playsInline = true;
preloadedVideo.style.position = 'absolute';
preloadedVideo.style.top = '0';
preloadedVideo.style.left = '0';
preloadedVideo.style.width = '100%';
preloadedVideo.style.height = '100%';
preloadedVideo.style.objectFit = 'cover';
preloadedVideo.style.borderRadius = '12px';
preloadedVideo.style.display = 'none'; // hidden until used

document.body.appendChild(preloadedVideo); // preload off-screen

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (['mc', 'm+', 'm-', 'mr'].includes(value)) return;

    if (value === 'C') {
      currentInput = '';
      display.textContent = '0';
    } else if (value === '=') {
      currentInput = '';

      // Reset video in case it already played
      preloadedVideo.currentTime = 0;
      preloadedVideo.style.display = 'block';

      // Clear display and insert the video
      display.innerHTML = '';
      display.style.position = 'relative';
      display.appendChild(preloadedVideo);

      // Try to play with sound (may still require user gesture)
      preloadedVideo.muted = false;
      preloadedVideo.play().catch(err => {
        console.warn('Autoplay with sound might be blocked:', err);
      });

    } else {
      const symbolMap = {
        '×': '*',
        '÷': '/',
        '+': '+',
        '-': '-'
      };

      if (value === '±') {
        if (currentInput) {
          if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
          } else {
            currentInput = '-' + currentInput;
          }
          display.textContent = currentInput;
        }
      } else {
        let evalValue = symbolMap[value] || value;
        currentInput += evalValue;

        const visualDisplay = currentInput.replace(/\*/g, '×').replace(/\//g, '÷');
        display.textContent = visualDisplay;
      }
    }
  });
});
