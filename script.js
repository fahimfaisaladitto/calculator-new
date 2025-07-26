const display = document.querySelector('.display');
let currentInput = '';

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (['mc', 'm+', 'm-', 'mr'].includes(value)) return;

    if (value === 'C') {
      currentInput = '';
      display.textContent = '0';
    } else if (value === '=') {
      // Clear input and show full video
      currentInput = '';
      display.innerHTML = `
        <video 
          autoplay 
          playsinline 
          muted 
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 9px;
          ">
          <source src="files/file.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;

      // Unmute programmatically if possible
      const video = display.querySelector('video');
      video.muted = false;
      video.play().catch(err => {
        console.warn('Autoplay with sound blocked by browser:', err);
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
