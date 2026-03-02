class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getColorForNumber(parseInt(number, 10));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          animation: appear 0.5s ease-out forwards;
          animation-delay: ${this.getAttribute('delay') || '0s'};
          transform: scale(0);
        }
        @keyframes appear {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .ball {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8rem;
          font-weight: bold;
          color: #fff;
          background: radial-gradient(circle at 20px 20px, ${color.bg}, #222);
          box-shadow: inset -5px -5px 15px rgba(0,0,0,0.4), 0 5px 15px rgba(0, 0, 0, 0.3);
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
         @media (max-width: 600px) {
          .ball {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
          }
        }
      </style>
      <div class="ball">
        ${number}
      </div>
    `;
  }

  getColorForNumber(num) {
    if (num <= 10) return { bg: '#fbc400' }; // Yellow
    if (num <= 20) return { bg: '#69c8f2' }; // Blue
    if (num <= 30) return { bg: '#ff7272' }; // Red
    if (num <= 40) return { bg: '#aaaaaa' }; // Gray
    return { bg: '#b0d840' };                // Green
  }
}

customElements.define('lotto-ball', LottoBall);

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// Theme Logic
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
    themeText.textContent = '라이트 모드';
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.textContent = '🌙';
    themeText.textContent = '다크 모드';
  }
}

themeToggle.addEventListener('click', () => {
  const isLightMode = document.body.classList.toggle('light-mode');
  if (isLightMode) {
    localStorage.setItem('theme', 'light');
    themeIcon.textContent = '☀️';
    themeText.textContent = '라이트 모드';
  } else {
    localStorage.setItem('theme', 'dark');
    themeIcon.textContent = '🌙';
    themeText.textContent = '다크 모드';
  }
});

// Lotto Generation Logic
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = ''; 
  const newNumbers = generateLottoNumbers();

  newNumbers.forEach((number, index) => {
    const lottoBall = document.createElement('lotto-ball');
    lottoBall.setAttribute('number', number);
    lottoBall.setAttribute('delay', `${index * 100}ms`);
    lottoNumbersContainer.appendChild(lottoBall);
  });
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    generateBtn.click();
});
