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
          color: var(--text-color, #fff);
          background: radial-gradient(circle at 20px 20px, ${color.bg}, #333);
          box-shadow: inset -5px -5px 15px ${color.shadow}, 0 10px 20px rgba(0, 0, 0, 0.6);
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
    if (num <= 10) return { bg: '#fbc400', shadow: 'rgba(0,0,0,0.3)' }; // Yellow
    if (num <= 20) return { bg: '#69c8f2', shadow: 'rgba(0,0,0,0.3)' }; // Blue
    if (num <= 30) return { bg: '#ff7272', shadow: 'rgba(0,0,0,0.3)' }; // Red
    if (num <= 40) return { bg: '#aaaaaa', shadow: 'rgba(0,0,0,0.3)' }; // Gray
    return { bg: '#b0d840', shadow: 'rgba(0,0,0,0.3)' };          // Green
  }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

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

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
    generateBtn.click();
})
