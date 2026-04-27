// ===== THEME =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
themeToggle.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
});
if (localStorage.getItem('theme')) html.dataset.theme = localStorage.getItem('theme');

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#FF9933', '#138808', '#ffffff', '#FF6600'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      opacity:${Math.random()*0.4+0.1};
      animation-duration:${Math.random()*15+8}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count.toLocaleString('en-IN');
      if (count >= target) clearInterval(timer);
    }, 25);
  });
}
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.3 });
statsObserver.observe(document.querySelector('.stats-strip'));

// ===== TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ===== UPCOMING ELECTIONS =====
function renderUpcomingElections() {
  const grid = document.getElementById('upcomingElections');
  grid.innerHTML = UPCOMING_ELECTIONS.map(e => `
    <div class="election-card">
      <div class="election-state">${e.state}</div>
      <div class="election-type">${e.type}</div>
      <div class="election-date">📅 ${e.date}</div>
      <div class="election-seats">🏛️ ${e.seats} seats</div>
      <span class="election-badge badge-${e.status}">${e.status.toUpperCase()}</span>
    </div>
  `).join('');
}
renderUpcomingElections();

// ===== PROCESS ACCORDION =====
function renderAccordion() {
  const container = document.getElementById('processAccordion');
  container.innerHTML = PROCESS_FAQS.map((item, i) => `
    <div class="accordion-item" id="acc${i}">
      <button class="accordion-header" onclick="toggleAccordion(${i})">
        <span>${item.q}</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">${item.a}</div>
    </div>
  `).join('');
}
renderAccordion();

function toggleAccordion(i) {
  const item = document.getElementById('acc' + i);
  item.classList.toggle('open');
}

// ===== STATES GRID =====
function renderStates(filter = '') {
  const grid = document.getElementById('statesGrid');
  const filtered = STATES.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.capital.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = filtered.map(s => `
    <div class="state-card ${s.color}" onclick="openStateModal('${s.id}')">
      <div class="state-name">${s.name}</div>
      <div class="state-capital">🏙️ ${s.capital}</div>
      <div class="state-cm">👤 ${s.cm}</div>
      <span class="state-party-tag">${s.party}</span>
    </div>
  `).join('');
}
renderStates();

document.getElementById('stateSearch').addEventListener('input', e => renderStates(e.target.value));

// ===== STATE MODAL =====
function openStateModal(id) {
  const s = STATES.find(x => x.id === id);
  if (!s) return;
  const partyColors = { BJP:'#FF9933', INC:'#138808', AAP:'#0066CC', TMC:'#22AADD' };
  const pColor = partyColors[s.party.split('+')[0]] || '#8855CC';
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-state-header">
      <div class="modal-state-name">${s.name}</div>
      <div class="modal-state-capital">🏙️ Capital: ${s.capital} &nbsp;|&nbsp; 📅 Founded: ${s.founded}</div>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Chief Minister</div><div class="modal-info-value">👤 ${s.cm}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Governor</div><div class="modal-info-value">🏛️ ${s.gov}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Party in Power</div><div class="modal-info-value" style="color:${pColor}">${s.party}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Lok Sabha Seats</div><div class="modal-info-value">🗳️ ${s.ls} seats</div></div>
    </div>
    <div class="modal-section-title">Vidhan Sabha Seats – ${s.seats} Total</div>
    <div class="modal-seats-bar"><div class="modal-seats-fill" style="width:${Math.min((s.seats/403)*100,100).toFixed(0)}%">${s.seats}</div></div>
    <div class="modal-section-title">About</div>
    <p style="font-size:.88rem;color:var(--text2);line-height:1.7;margin-bottom:16px">${s.desc}</p>
    <div class="modal-section-title">Quick Tags</div>
    <div>
      <span class="modal-tag">🏙️ ${s.capital}</span>
      <span class="modal-tag">🗳️ ${s.seats} MLA seats</span>
      <span class="modal-tag">📡 ${s.ls} MP seats</span>
      <span class="modal-tag" style="color:${pColor}">${s.party}</span>
    </div>
  `;
  document.getElementById('stateModal').classList.add('open');
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('stateModal').classList.remove('open');
});
document.getElementById('stateModal').addEventListener('click', e => {
  if (e.target === document.getElementById('stateModal'))
    document.getElementById('stateModal').classList.remove('open');
});

function openStateExplorer() {
  document.getElementById('states').scrollIntoView({ behavior: 'smooth' });
}

// ===== CM GRID =====
function renderCMs() {
  const grid = document.getElementById('cmGrid');
  grid.innerHTML = STATES.map(s => {
    const initials = s.cm.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    return `
      <div class="cm-card" onclick="openStateModal('${s.id}')">
        <div class="cm-avatar">${initials}</div>
        <div class="cm-name">${s.cm}</div>
        <div class="cm-state">${s.name}</div>
        <div class="cm-party">${s.party}</div>
      </div>
    `;
  }).join('');
}
renderCMs();

// ===== PORTALS =====
function renderPortals() {
  const grid = document.getElementById('portalsGrid');
  grid.innerHTML = PORTALS.map(p => `
    <div class="portal-card">
      <div class="portal-icon">${p.icon}</div>
      <div class="portal-name">${p.name}</div>
      <div class="portal-desc">${p.desc}</div>
      <a class="portal-btn" href="${p.url}" target="_blank" rel="noopener">Visit Portal ↗</a>
    </div>
  `).join('');
}
renderPortals();

// ===== AI CHATBOT =====
const chatWidget = document.getElementById('chatbotWidget');
const chatFab = document.getElementById('chatbotFab');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
let chatOpen = false;

chatFab.addEventListener('click', () => toggleChat(true));
document.getElementById('chatMinimize').addEventListener('click', () => toggleChat(false));

function toggleChat(open) {
  chatOpen = open;
  chatWidget.classList.toggle('open', open);
  if (open && chatMessages.children.length === 0) {
    addBotMessage("🙏 Namaste! I'm SahyogBaba, your civic guide. Ask me anything about Indian elections, ministers, voting, Vidhan Sabha, or democracy!");
  }
}

document.getElementById('chatSend').addEventListener('click', () => sendChat(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(chatInput.value); });

function sendChat(msg) {
  msg = msg.trim();
  if (!msg) return;
  chatInput.value = '';
  if (!chatOpen) toggleChat(true);
  addUserMessage(msg);
  showTyping();
  setTimeout(() => {
    removeTyping();
    const answer = getAIResponse(msg);
    addBotMessage(answer);
  }, 800 + Math.random() * 600);
}

function getAIResponse(query) {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(AI_KB)) {
    const keywords = key.split(' ');
    if (keywords.some(kw => q.includes(kw))) return val;
  }
  // State lookup
  const stateMatch = STATES.find(s => q.includes(s.name.toLowerCase()) || q.includes(s.id.toLowerCase()));
  if (stateMatch) {
    return `**${stateMatch.name}**\n🏙️ Capital: ${stateMatch.capital}\n👤 CM: ${stateMatch.cm}\n🏛️ Governor: ${stateMatch.gov}\n🗳️ Party: ${stateMatch.party}\n📊 Vidhan Sabha: ${stateMatch.seats} seats | Lok Sabha: ${stateMatch.ls} seats`;
  }
  return AI_KB.default;
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div><div class="chat-time">${getTime()}</div>`;
  chatMessages.appendChild(div);
  scrollChat();
}

function addBotMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `<div class="chat-bubble">${formatBotText(text)}</div><div class="chat-time">SahyogBaba · ${getTime()}</div>`;
  chatMessages.appendChild(div);
  scrollChat();
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(div);
  scrollChat();
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function formatBotText(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function getTime() { return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}); }
function scrollChat() { chatMessages.scrollTop = chatMessages.scrollHeight; }

// ===== HERO SEARCH =====
function askQuestion(q) {
  document.getElementById('heroSearch').value = q;
  toggleChat(true);
  setTimeout(() => sendChat(q), 300);
}

document.getElementById('heroSearchBtn').addEventListener('click', () => {
  const val = document.getElementById('heroSearch').value.trim();
  if (val) askQuestion(val);
});

document.getElementById('heroSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val) askQuestion(val);
  }
});

// ===== VOICE SEARCH =====
const voiceBtn = document.getElementById('voiceBtn');
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  voiceBtn.addEventListener('click', () => {
    voiceBtn.classList.add('listening');
    recognition.start();
  });
  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('heroSearch').value = transcript;
    voiceBtn.classList.remove('listening');
    askQuestion(transcript);
  };
  recognition.onerror = () => voiceBtn.classList.remove('listening');
  recognition.onend = () => voiceBtn.classList.remove('listening');
} else {
  voiceBtn.title = 'Voice not supported in this browser';
}

// ===== LANGUAGE TOGGLE =====
const langs = ['EN', 'HI', 'BN'];
let langIdx = 0;
const langLabel = document.getElementById('langLabel');
document.getElementById('langToggle').addEventListener('click', () => {
  langIdx = (langIdx + 1) % langs.length;
  langLabel.textContent = langs[langIdx];
  if (langs[langIdx] === 'HI') {
    document.getElementById('heroSearch').placeholder = 'चुनाव के बारे में कुछ भी पूछें…';
  } else if (langs[langIdx] === 'BN') {
    document.getElementById('heroSearch').placeholder = 'নির্বাচন সম্পর্কে যেকোনো প্রশ্ন করুন…';
  } else {
    document.getElementById('heroSearch').placeholder = 'Ask anything about Indian Elections…';
  }
});

// ===== INDIA MAP (Simplified SVG) =====
function renderIndiaMap() {
  const wrapper = document.getElementById('indiaMapWrapper');
  // Simplified schematic map using colored regions
  wrapper.innerHTML = `
    <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF9933" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#138808" stop-opacity="0.8"/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <!-- India simplified outline -->
      <path d="M160,20 L200,15 L240,25 L270,40 L285,70 L290,100 L300,130 L310,160 L320,190 L315,220 L300,250 L280,280 L260,310 L240,340 L220,370 L200,400 L185,420 L175,440 L165,420 L150,395 L135,365 L120,335 L105,305 L95,275 L90,245 L95,215 L100,185 L110,155 L120,125 L125,95 L130,65 L145,40 Z"
        fill="url(#mapGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" filter="url(#glow)" opacity="0.9" onclick="openStateModal('IN')" style="cursor:pointer"/>
      <!-- State regions as clickable blobs -->
      <ellipse cx="185" cy="80" rx="30" ry="18" fill="#FF9933" opacity="0.7" onclick="openStateModal('PB')" style="cursor:pointer"><title>Punjab</title></ellipse>
      <ellipse cx="225" cy="75" rx="22" ry="15" fill="#FF9933" opacity="0.7" onclick="openStateModal('HR')" style="cursor:pointer"><title>Haryana</title></ellipse>
      <ellipse cx="250" cy="90" rx="25" ry="18" fill="#FF9933" opacity="0.8" onclick="openStateModal('UP')" style="cursor:pointer"><title>Uttar Pradesh</title></ellipse>
      <ellipse cx="200" cy="105" rx="20" ry="14" fill="#FF9933" opacity="0.7" onclick="openStateModal('RJ')" style="cursor:pointer"><title>Rajasthan</title></ellipse>
      <ellipse cx="195" cy="140" rx="22" ry="15" fill="#FF9933" opacity="0.75" onclick="openStateModal('GJ')" style="cursor:pointer"><title>Gujarat</title></ellipse>
      <ellipse cx="230" cy="135" rx="20" ry="14" fill="#FF9933" opacity="0.7" onclick="openStateModal('MP')" style="cursor:pointer"><title>Madhya Pradesh</title></ellipse>
      <ellipse cx="220" cy="170" rx="22" ry="16" fill="#FF9933" opacity="0.8" onclick="openStateModal('MH')" style="cursor:pointer"><title>Maharashtra</title></ellipse>
      <ellipse cx="265" cy="145" rx="18" ry="12" fill="#FF9933" opacity="0.7" onclick="openStateModal('BR')" style="cursor:pointer"><title>Bihar</title></ellipse>
      <ellipse cx="290" cy="155" rx="16" ry="11" fill="#22AADD" opacity="0.8" onclick="openStateModal('WB')" style="cursor:pointer"><title>West Bengal</title></ellipse>
      <ellipse cx="195" cy="210" rx="18" ry="13" fill="#138808" opacity="0.7" onclick="openStateModal('KA')" style="cursor:pointer"><title>Karnataka</title></ellipse>
      <ellipse cx="225" cy="225" rx="16" ry="12" fill="#138808" opacity="0.7" onclick="openStateModal('AP')" style="cursor:pointer"><title>Andhra Pradesh</title></ellipse>
      <ellipse cx="210" cy="255" rx="15" ry="10" fill="#138808" opacity="0.75" onclick="openStateModal('TN')" style="cursor:pointer"><title>Tamil Nadu</title></ellipse>
      <ellipse cx="185" cy="245" rx="14" ry="10" fill="#138808" opacity="0.8" onclick="openStateModal('KL')" style="cursor:pointer"><title>Kerala</title></ellipse>
      <ellipse cx="255" cy="180" rx="15" ry="10" fill="#138808" opacity="0.7" onclick="openStateModal('OD')" style="cursor:pointer"><title>Odisha</title></ellipse>
      <ellipse cx="245" cy="165" rx="14" ry="9" fill="#138808" opacity="0.7" onclick="openStateModal('JH')" style="cursor:pointer"><title>Jharkhand</title></ellipse>
      <!-- Labels -->
      <text x="185" y="84" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">PB</text>
      <text x="250" y="94" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">UP</text>
      <text x="230" y="139" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">MP</text>
      <text x="220" y="174" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">MH</text>
      <text x="290" y="159" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">WB</text>
      <text x="195" y="214" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">KA</text>
      <text x="210" y="259" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">TN</text>
      <text x="185" y="249" text-anchor="middle" fill="white" font-size="6" font-weight="600" pointer-events="none">KL</text>
      <!-- Ashoka Chakra center symbol -->
      <circle cx="200" cy="165" r="12" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <circle cx="200" cy="165" r="3" fill="rgba(255,255,255,0.6)"/>
      <!-- Decorative dots for Northeast -->
      <circle cx="310" cy="115" r="8" fill="#8855CC" opacity="0.7" onclick="openStateModal('AS')" style="cursor:pointer"><title>Assam</title></circle>
      <circle cx="325" cy="108" r="5" fill="#8855CC" opacity="0.6" onclick="openStateModal('MN')" style="cursor:pointer"><title>Manipur</title></circle>
      <circle cx="320" cy="100" r="5" fill="#8855CC" opacity="0.6" onclick="openStateModal('MG')" style="cursor:pointer"><title>Meghalaya</title></circle>
    </svg>
  `;
}
renderIndiaMap();

// ===== SMOOTH SCROLL NAV =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navLinks').classList.remove('open');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ===== SCROLL SPY =====
const sections = ['home','elections','states','ministers','portals'];
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
    }
  });
});

// ===== INTERSECTION OBSERVER ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step-card, .state-card, .cm-card, .portal-card, .election-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
