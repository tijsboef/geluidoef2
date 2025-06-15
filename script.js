let score = 0;
let agentName = '';

window.addEventListener('DOMContentLoaded', initIntroduction);

function initIntroduction() {
  const c = document.getElementById('game-container');
  c.innerHTML = `
    <div class="question">
      <p>Welkom, rekruut! Je codenaam, alstublieft:</p>
      <input type="text" id="agent-name" placeholder="Jouw codenaam">
      <button id="start-btn" class="btn">Start Missie</button>
    </div>
  `;
  document.getElementById('start-btn').onclick = () => {
    const val = document.getElementById('agent-name').value.trim();
    if (!val) return alert('Voer een codenaam in.');
    agentName = val;
    localStorage.setItem('agentName', agentName);
    score = 0;
    initLevel1();
  };
}

function initLevel1() {
  const c = document.getElementById('game-container');
  c.innerHTML = `
    <h2>Level 1: De Tussenstof</h2>
    <div class="question">
      <p>1) Je zwemt onder water en hoort de stem van een dolfijn. Welke tussenstof brengt het geluid naar jou?</p>
      <ul class="options">
        <li><button class="option btn" data-correct="false">A) Lucht</button></li>
        <li><button class="option btn" data-correct="false">B) Aarde</button></li>
        <li><button class="option btn" data-correct="true">C) Water</button></li>
        <li><button class="option btn" data-correct="false">D) Vacuüm</button></li>
      </ul>
    </div>
    <div id="sonar-game">
      <p>Minigame: Onderzeeër Sonar. Vind drie verborgen doelwitten met jouw sonar!</p>
      <canvas id="submarine-canvas" width="600" height="300"></canvas>
      <button id="sonar-ping" class="btn">Zend Sonar Ping</button>
    </div>
  `;
  c.querySelectorAll('.option').forEach(b => b.onclick = () => handleMCQ1(b));
  setupSonarGame();
}

function handleMCQ1(btn) {
  if (btn.dataset.correct === 'true') {
    score += 100;
    alert('+100 punten');
  } else {
    alert('Niet correct.');
  }
  btn.disabled = true;
}

// Sonar minigame: drie doelwitten zoeken
function setupSonarGame() {
  const canvas = document.getElementById('submarine-canvas');
  const ctx = canvas.getContext('2d');
  const targets = Array.from({length:3}, () => ({
    x: Math.random() * 580 + 10,
    y: Math.random() * 280 + 10,
    found: false
  }));
  let pings = 0;

  function draw() {
    ctx.clearRect(0, 0, 600, 300);
    ctx.fillStyle = '#32CD32';
    ctx.fillRect(270, 140, 60, 20); // submarine
    targets.forEach(t => {
      if (t.found) {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = '#32CD32';
        ctx.stroke();
      }
    });
  }

  document.getElementById('sonar-ping').onclick = () => {
    pings++;
    targets.forEach(t => {
      const d = Math.hypot(300 - t.x, 150 - t.y);
      if (d < pings * 60 && !t.found) t.found = true;
    });
    draw();
    if (targets.every(t => t.found)) {
      score += 250;
      alert('Doelen gevonden! +250 punten.');
      initLevel2();
    }
  };

  draw();
}

function initLevel2() {
  const c = document.getElementById('game-container');
  c.innerHTML = `
    <h2>Level 2: Frequentie & Toonhoogte</h2>
    <div class="question">
      <p>1) Tijdbasis oscilloscoop = 2 ms/div. Wat betekent 'div'?</p>
      <ul class="options">
        <li><button class="option btn" data-correct="false">A) Totale tijd</button></li>
        <li><button class="option btn" data-correct="false">B) Hoogte golf</button></li>
        <li><button class="option btn" data-correct="true">C) Eén hokje</button></li>
        <li><button class="option btn" data-correct="false">D) Frequentie</button></li>
      </ul>
    </div>
    <canvas id="osc" width="600" height="200"></canvas>
    <div class="question">
      <p>2) Oscillogram: 2 trillingen over 8 hokjes, 2ms/div.<br>Bereken frequentie (Hz).</p>
      <input type="number" id="freq-input" placeholder="Hz">
      <button id="freq-submit" class="btn">Verstuur</button>
    </div>
  `;
  c.querySelectorAll('.option').forEach(b => b.onclick = () => {
    if (b.dataset.correct === 'true') {
      score += 100;
      alert('+100 punten');
    } else {
      alert('Niet correct.');
    }
    b.disabled = true;
  }));
  drawSine('osc', 2, 0.005, 100);
  document.getElementById('freq-submit').onclick = () => {
    const val = parseFloat(document.getElementById('freq-input').value);
    if (Math.abs(val - 125) < 1) {
      score += 250;
      alert('+250 punten');
    } else {
      alert('Fout. 125Hz');
    }
    initLevel3();
  };
}

// Hergebruik drawSine() en varAccent()
function drawSine(id, cycles, dt, amp) {
  const c = document.getElementById(id),
        ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.strokeStyle = varAccent();
  ctx.beginPath();
  for (let x = 0; x < c.width; x++) {
    const t = x * dt;
    const y = c.height / 2 - amp * Math.sin(2 * Math.PI * cycles * t);
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}
function varAccent() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim();
}

// Vervolg met Level 3, Level 4 en Highscores...
function initLevel3() { /* ... */ }
function initLevel3Minigame() { /* ... */ }
function initLevel4() { /* ... */ }
function setupDrag() { /* ... */ }
function showHighscores() { /* ... */ }
