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

class PartnerForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 50px;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left;
        }
        h2 {
          color: var(--accent-color);
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.8;
        }
        input, textarea {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(0, 0, 0, 0.2);
          color: var(--text-color);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        :host-context(body.light-mode) input, :host-context(body.light-mode) textarea {
          background-color: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #333;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 8px rgba(255, 64, 129, 0.3);
        }
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        button[type="submit"] {
          background-color: var(--accent-color);
          color: #fff;
          border: none;
          padding: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--button-glow);
          margin-top: 10px;
        }
        button[type="submit"]:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        button[type="submit"]:active {
          transform: translateY(0);
        }
        .status-message {
          margin-top: 15px;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          font-size: 0.9rem;
          display: none;
        }
        .status-message.success {
          display: block;
          background-color: rgba(76, 175, 80, 0.2);
          color: #4caf50;
          border: 1px solid #4caf50;
        }
        .status-message.error {
          display: block;
          background-color: rgba(244, 67, 54, 0.2);
          color: #f44336;
          border: 1px solid #f44336;
        }
      </style>
      <div class="partner-form-container">
        <h2>제휴 문의하기</h2>
        <form id="partner-form" action="https://formspree.io/f/mykngpaj" method="POST">
          <div class="form-group">
            <label for="name">이름 / 업체명</label>
            <input type="text" id="name" name="name" placeholder="홍길동" required>
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" name="email" placeholder="example@email.com" required>
          </div>
          <div class="form-group">
            <label for="message">문의 내용</label>
            <textarea id="message" name="message" placeholder="제휴 관련 문의 내용을 입력해주세요." required></textarea>
          </div>
          <button type="submit">문의 보내기</button>
          <div id="status" class="status-message"></div>
        </form>
      </div>
    `;

    const form = this.shadowRoot.getElementById('partner-form');
    const status = this.shadowRoot.getElementById('status');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      
      try {
        const response = await fetch(event.target.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status.textContent = "문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!";
          status.className = "status-message success";
          form.reset();
        } else {
          const result = await response.json();
          if (Object.hasOwn(result, 'errors')) {
            status.textContent = result.errors.map(error => error.message).join(", ");
          } else {
            status.textContent = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          }
          status.className = "status-message error";
        }
      } catch (error) {
        status.textContent = "네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.";
        status.className = "status-message error";
      }
    });
  }
}

customElements.define('partner-form', PartnerForm);

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
