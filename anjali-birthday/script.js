/* ===== EDITABLE CONTENT (personal messages) ===== */
const C = birthdayConfig;
const letter = [
 "Dear {name},",
 "Some people enter our lives and simply become part of our everyday conversations.",
 "And then there are people who slowly become a little more important than they probably realize.",
 "You're one of those people.",
 "Today, I just want you to know how genuinely special you are. Not because it's your birthday, but because of the way you make ordinary days feel a little warmer.",
 "Thank you for being someone I can talk to, laugh with, and simply be myself around. That means more than I usually say out loud.",
 "I hope this year is gentle with you, and generous. You deserve both."
]; // <- replace/add your own lines
const wishCards = [ // [emoji, title, personal wish shown on tap]
 ["🌸","Happiness","I wish your days are full of small joys that turn into big ones."],
 ["✨","Success","May your hard work finally meet the recognition it deserves."],
 ["🌙","Peace","May your mind be calm, even on the loudest days."],
 ["💫","Confidence","I hope you see yourself the way the people who care about you do."],
 ["❤️","Love","May you always be surrounded by people who value you."],
 ["🌎","Beautiful adventures","May life take you to places that make your heart feel big."],
 ["🌷","Beautiful memories","May every year add stories you'll love retelling."],
 ["⭐","Dreams coming true","May the dreams you quietly carry find their way to you."]
];
const giveCards = [
 ["🌠","One wish","That every wish you've kept to yourself comes true, one by one."],
 ["📷","One memory","A memory so warm you'd smile just thinking about it for years."],
 ["😊","One smile","The kind that starts small and takes over your whole face."],
 ["☁️","One peaceful day","No rushing, no worry. Just a soft, quiet, perfect day."],
 ["🧭","One adventure","A trip you'll talk about forever, with people who feel like home."],
 ["♾️","One unlimited supply of happiness","Because you'd share it anyway, and it should never run out."]
];
const admire = [
 ["😊","Your smile"],["🌷","Your kindness"],["🤝","The way you make people comfortable"],
 ["💪","Your strength"],["🌟","Your personality"],["🎀","Your little habits"],["✨","How you make ordinary moments memorable"]
];
const wishes = [
 "May every dream you quietly carry find its way to you.",
 "May this year introduce you to the happiest version of yourself.",
 "May your smile always have more reasons behind it.",
 "May your mornings be peaceful and your nights full of stars.",
 "May the right people stay and the right doors open.",
 "May you never doubt how much you matter.",
 "May this year be softer on your heart and kinder to your plans.",
 "May laughter find you in the most unexpected places.",
 "May you feel proud of how far you've come.",
 "May your courage grow louder than your fears.",
 "May good news arrive when you least expect it.",
 "May every ordinary day hold one small miracle for you.",
 "May you be loved exactly as you are.",
 "May this year be the one you look back on and say, 'That's when it all began to shine.'",
 "May your heart always have a place to rest and a reason to hope.",
 "May life surprise you with better things than you planned."
];
const deserve = ["You deserve good things.","You deserve genuine people.","You deserve peace.","You deserve to chase your dreams.","You deserve to be proud of how far you've come.","And most importantly...","You deserve to be happy."];
const finalLines = [
 "I don't know where life takes us from here.",
 "But I'm genuinely grateful that somewhere along the way, I got to know someone like you.",
 "So today, I don't just wish you a happy birthday.",
 "I wish you a beautiful life.",
 "A life full of laughter, peaceful mornings, exciting adventures, meaningful people and dreams that actually come true.",
 "Keep being you, {name}.",
 "Because you're already pretty special.",
 "Happy Birthday, {name} ❤️"
];

/* ===== HELPERS ===== */
const $ = s => document.querySelector(s), wait = ms => new Promise(r => setTimeout(r, ms));
const fill = t => t.replace(/{name}/g, C.name);
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelectorAll('.n').forEach(e => e.textContent = C.name);
document.title = "For " + C.name + " ✨";
function once(el, fn, th = .4) {
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold: th });
  io.observe(el);
}
function cardGrid(id, data, expand) {
  const g = $(id);
  data.forEach((d, i) => {
    const c = document.createElement('div');
    c.className = 'card' + (expand ? '' : ' static');
    c.innerHTML = `<span class="e">${d[0]}</span><b>${d[1]}</b>` + (d[2] ? `<span class="more">${d[2]}</span>` : '');
    if (expand) c.onclick = () => { const o = c.classList.contains('open'); g.querySelectorAll('.open').forEach(x => x.classList.remove('open')); if (!o) c.classList.add('open'); };
    g.appendChild(c);
    once(c, () => setTimeout(() => c.classList.add('in'), (i % 4) * 100), .2);
  });
}
cardGrid('#wishGrid', wishCards, true);
cardGrid('#giveGrid', giveCards, true);
cardGrid('#admGrid', admire, false);
document.querySelectorAll('.reveal').forEach(e => once(e, () => e.classList.add('in'), .2));

/* ===== BACKGROUND PARTICLES (stars + hearts) ===== */
const bg = $('#bg'), bx = bg.getContext('2d'); let W, H, ps = [];
function size() { W = bg.width = fx.width = innerWidth; H = bg.height = fx.height = innerHeight; }
const fx = $('#fx'), fxc = fx.getContext('2d'); size(); addEventListener('resize', size);
const N = innerWidth < 700 ? 40 : 80;
for (let i = 0; i < N; i++) ps.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .4, s: Math.random() * .3 + .05, h: Math.random() < .15, a: Math.random() });
(function loop() {
  bx.clearRect(0, 0, W, H);
  ps.forEach(p => {
    p.y -= p.s; p.a += .02; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
    bx.globalAlpha = .4 + Math.sin(p.a) * .35;
    if (p.h) { bx.font = '14px serif'; bx.fillText('❤', p.x, p.y); }
    else { bx.fillStyle = '#e8dcff'; bx.beginPath(); bx.arc(p.x, p.y, p.r, 0, 7); bx.fill(); }
  });
  if (!reduce) requestAnimationFrame(loop);
})();
if (reduce) { /* draw once */ }

/* ===== NAV / PROGRESS / CURSOR ===== */
$('#burger').onclick = () => $('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a => a.onclick = () => $('#menu').classList.remove('open'));
addEventListener('scroll', () => { $('#progress').style.width = scrollY / (document.body.scrollHeight - innerHeight) * 100 + '%'; }, { passive: true });
addEventListener('pointermove', e => { const g = $('#glow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });

/* ===== OPENING ===== */
document.body.style.overflow = 'hidden';
(async () => {
  for (const id of ['#i1', '#i2', '#i3', '#i4', '#begin']) { $(id).classList.add('on'); await wait(id === '#i4' ? 1400 : 2000); }
})();
$('#begin').onclick = () => {
  $('#intro').classList.add('out'); document.body.style.overflow = '';
  $('#music').style.display = 'block'; scrollTo(0, 0);
};

/* ===== MUSIC (never autoplays) ===== */
const au = $('#audio'); au.src = C.musicFile; let playing = false;
$('#music').onclick = () => {
  if (playing) { au.pause(); playing = false; $('#music span').textContent = 'Play our little soundtrack'; }
  else au.play().then(() => { playing = true; $('#music span').textContent = 'Pause'; }).catch(() => { $('#music span').textContent = 'Add music/birthday.mp3'; });
};

/* ===== LETTER (typewriter) ===== */
once($('#letter .paper'), async () => {
  for (const line of letter) {
    const p = document.createElement('p'); $('#lt').appendChild(p);
    const t = fill(line);
    if (reduce) p.textContent = t; else for (const ch of t) { p.textContent += ch; await wait(28); }
    await wait(250);
  }
  $('#sig').textContent = '— From someone who is really lucky to know you ❤️  ' + C.senderName;
  $('#sig').classList.add('on');
}, .25);

/* ===== GIFT + EFFECTS ===== */
$('#openGift').onclick = async e => {
  e.target.style.display = 'none'; $('#gift').classList.add('on');
  burst(innerWidth / 2, innerHeight / 2, 60); await wait(1200);
  $('#g1').classList.add('on'); await wait(2500); $('#g2').classList.add('on'); burst(innerWidth / 2, innerHeight / 3, 50);
};
let wi = -1;
$('#newWish').onclick = () => {
  let n; do { n = Math.floor(Math.random() * wishes.length); } while (n === wi); wi = n;
  const o = $('#wishOut'); o.classList.add('sw');
  setTimeout(() => { o.textContent = wishes[n]; o.classList.remove('sw'); }, 350);
};

/* ===== GALLERY ===== */
C.photos.forEach((p, i) => {
  const f = document.createElement('figure'), im = new Image();
  f.innerHTML = `<div class="ph">Add your photo:<br>${p.src}</div>`;
  im.loading = 'lazy'; im.alt = p.caption; im.src = p.src;
  im.onload = () => f.insertBefore(im, f.firstChild);
  const c = document.createElement('figcaption'); c.textContent = p.caption; f.appendChild(c);
  f.onclick = () => { if (!im.parentNode) return; $('#lb img').src = p.src; $('#lb p').textContent = p.caption; $('#lb').classList.add('on'); };
  $('#galGrid').appendChild(f);
});
$('#lb').onclick = () => $('#lb').classList.remove('on');
addEventListener('keydown', e => e.key === 'Escape' && $('#lb').classList.remove('on'));

/* ===== DESERVE ===== */
deserve.forEach(t => { const p = document.createElement('p'); p.textContent = t; $('#deserve').appendChild(p); });
once($('#deserve'), async () => { for (const p of $('#deserve').children) { p.classList.add('on'); await wait(2200); } }, .15);

/* ===== NIGHT SKY ===== */
const sk = $('#skyc'), sx = sk.getContext('2d'); let stars = [], shoot = [], clicks = [];
function skySize() { sk.width = sk.offsetWidth; sk.height = sk.offsetHeight; stars = Array.from({ length: 110 }, () => ({ x: Math.random() * sk.width, y: Math.random() * sk.height, r: Math.random() * 1.5 + .3, t: Math.random() * 6 })); }
skySize(); addEventListener('resize', skySize);
sk.parentNode.addEventListener('pointerdown', e => { const r = sk.getBoundingClientRect(); clicks.push({ x: e.clientX - r.left, y: e.clientY - r.top, a: 1, r: 2 }); });
let skyVis = false; new IntersectionObserver(es => skyVis = es[0].isIntersecting).observe(sk);
(function sky() {
  if (skyVis) {
    sx.clearRect(0, 0, sk.width, sk.height);
    stars.forEach(s => { s.t += .03; sx.globalAlpha = .5 + Math.sin(s.t) * .5; sx.fillStyle = '#fff'; sx.beginPath(); sx.arc(s.x, s.y, s.r, 0, 7); sx.fill(); });
    sx.globalAlpha = 1; const mx = sk.width * .8, my = sk.height * .18;
    sx.shadowColor = '#fff6d6'; sx.shadowBlur = 40; sx.fillStyle = '#fff6d6'; sx.beginPath(); sx.arc(mx, my, 28, 0, 7); sx.fill();
    sx.shadowBlur = 0; sx.fillStyle = '#140b3d'; sx.beginPath(); sx.arc(mx + 14, my - 6, 25, 0, 7); sx.fill();
    if (Math.random() < .006) shoot.push({ x: Math.random() * sk.width * .7, y: Math.random() * sk.height * .4, l: 1 });
    shoot = shoot.filter(s => s.l > 0); shoot.forEach(s => { s.x += 9; s.y += 4; s.l -= .02; sx.strokeStyle = `rgba(255,255,255,${s.l})`; sx.lineWidth = 2; sx.beginPath(); sx.moveTo(s.x, s.y); sx.lineTo(s.x - 60, s.y - 27); sx.stroke(); });
    clicks.forEach(c => { c.a -= .006; c.r += .05; sx.globalAlpha = Math.max(c.a, 0); sx.fillStyle = '#ffb3de'; sx.shadowColor = '#ff8fc7'; sx.shadowBlur = 20; sx.beginPath(); sx.arc(c.x, c.y, Math.min(c.r, 5), 0, 7); sx.fill(); }); sx.shadowBlur = 0; sx.globalAlpha = 1;
  }
  requestAnimationFrame(sky);
})();
once($('#sky'), () => { $('#s1').classList.add('on'); $('#s2').classList.add('on'); }, .5);

/* ===== FINAL + CELEBRATION ===== */
finalLines.forEach(l => { const p = document.createElement('p'); p.textContent = fill(l); $('#fl').appendChild(p); });
once($('#fl'), async () => {
  for (const p of $('#fl').children) { p.classList.add('on'); await wait(2000); }
  await wait(800); $('#ol').classList.add('on');
  await wait(2000); $('#pr').classList.add('on'); celebrate(); $('#again').classList.add('on');
}, .2);
$('#again').onclick = () => location.reload(); // restarts the whole experience

let parts = [], running = false;
const cols = ['#ff8fc7', '#a78bfa', '#7dd3fc', '#ffe3a3', '#fff'];
function burst(x, y, n) {
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = Math.random() * 6 + 2; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, c: cols[i % 5], g: .08, k: 'd' }); }
  run();
}
function celebrate() {
  for (let i = 0; i < 90; i++) parts.push({ x: Math.random() * W, y: -20, vx: Math.random() * 2 - 1, vy: Math.random() * 3 + 2, l: 2, c: cols[i % 5], g: .02, k: 'c' });
  for (let i = 0; i < 14; i++) parts.push({ x: Math.random() * W, y: H + 20, vx: 0, vy: -(Math.random() * 1.5 + 1), l: 3, c: '', g: 0, k: 'h' });
  for (let i = 0; i < 4; i++) setTimeout(() => burst(Math.random() * W, Math.random() * H * .5 + 60, 55), i * 700);
  run();
}
function run() {
  if (running) return; running = true;
  (function f() {
    fxc.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.l > 0 && p.y < H + 40 && p.y > -60 || p.k === 'c' && p.y < H + 40 && p.l > 0);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.k === 'd' ? .014 : .004;
      fxc.globalAlpha = Math.min(p.l, 1);
      if (p.k === 'h') { fxc.font = '22px serif'; fxc.fillText('❤️', p.x, p.y); }
      else { fxc.fillStyle = p.c; fxc.fillRect(p.x, p.y, p.k === 'c' ? 7 : 3, p.k === 'c' ? 4 : 3); }
    });
    fxc.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(f); else { running = false; fxc.clearRect(0, 0, W, H); }
  })();
}
