/* Lili Monaco — réservation en ligne : prestations → date et heure → coordonnées → acompte.
   Réglages dans config.js ; contrats Make et Stripe : RESERVATION-AGENDA.md et worker/README.md. */
(() => {
  'use strict';

  const CFG = window.LILI || {};
  const LM = window.LM || { groups: [], hours: {} };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const pad = n => String(n).padStart(2, '0');
  const eur = n => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const DAY = 864e5;
  const root = $('#reserver');
  if (!root) return;

  /* ---------- données ---------- */
  const ITEMS = {};
  LM.groups.forEach(g => g.items.forEach(i => { ITEMS[i.id] = Object.assign({ group: g.id, groupTitle: g.title }, i); }));
  const POL = Object.assign({ depositPct: 40, lateCancelHours: 48, lateCancelHoursPackage: 168, lateArrivalMin: 15 }, LM.policy);
  /* Prix en euros entiers : l'acompte (40 % chez Planity) est exact en centimes, ex. 499 € → 199,60 €. */
  const depositCents = price => Math.round(price * POL.depositPct);
  const eurC = c => (c % 100 ? (c / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : eur(c / 100));
  const fmtDelay = h => (h % 24 === 0 && h >= 72 ? h / 24 + ' jours' : h + ' h');
  const fmtDur = m => (m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + pad(m % 60) : ''));

  /* ---------- dates (chaînes AAAA-MM-JJ, calculs à midi) ---------- */
  const keyOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parse = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  const addDays = (k, n) => { const d = parse(k); d.setDate(d.getDate() + n); return keyOf(d); };
  const monthStart = k => k.slice(0, 8) + '01';
  const addMonths = (k, n) => { const d = parse(k); d.setDate(1); d.setMonth(d.getMonth() + n); return keyOf(d); };
  const fmtLong = k => parse(k).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = k => parse(k).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtHour = t => Math.floor(t / 60) + ' h ' + pad(t % 60);
  const todayKey = keyOf(new Date());
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

  /* ---------- état ---------- */
  const S = { group: LM.groups[0] ? LM.groups[0].id : '', cart: [], date: null, time: null, step: 1, month: monthStart(todayKey), busy: null, sending: false, ref: '' };
  const total = () => S.cart.reduce((a, id) => a + ITEMS[id].price, 0);
  const totalMin = () => S.cart.reduce((a, id) => a + ITEMS[id].min, 0);
  const lateHours = () => (S.cart.some(id => ITEMS[id].cancelH >= POL.lateCancelHoursPackage) ? POL.lateCancelHoursPackage : POL.lateCancelHours);
  const hasPackage = () => S.cart.some(id => ITEMS[id].pkg);
  /* Perfect Blend : option à ajouter à une pose complète d'extensions, jamais seule */
  const needsPose = () => S.cart.some(id => ITEMS[id].addon) && !S.cart.some(id => ITEMS[id].group === 'extensions' && ITEMS[id].main);
  const PHONE = CFG.PHONE_DISPLAY || '', TEL = CFG.PHONE_TEL || '';

  /* ---------- étape 1 : carte des prestations ---------- */
  const tabs = $('#tabs'), list = $('#menuList');
  function buildMenu() {
    tabs.innerHTML = LM.groups.map(g => '<button type="button" class="tab' + (g.id === S.group ? ' is-on' : '') + '" role="tab" data-g="' + g.id + '" aria-selected="' + (g.id === S.group) + '">' + g.title + '<sup data-n="' + g.id + '"></sup></button>').join('');
    list.innerHTML = LM.groups.map(g => {
      const main = g.items.filter(i => !i.retouche), ret = g.items.filter(i => i.retouche);
      const callNote = g.items.some(i => i.call) ? '<p class="mgroup__call">Les prestations « sur appel » se réservent par téléphone : <a href="tel:' + TEL + '">' + PHONE + '</a>.</p>' : '';
      return '<section class="mgroup' + (g.id === S.group ? ' is-on' : '') + '" data-g="' + g.id + '" aria-label="' + g.title + '">' +
        '<div class="mgroup__head"><span class="mgroup__k">' + g.kicker + '</span><h3>' + g.title + '</h3><p>' + g.intro + '</p>' + callNote + '</div>' +
        main.map(row).join('') +
        (ret.length ? '<details class="mgroup__ret"><summary><svg aria-hidden="true"><use href="#i-chev"/></svg>Retouches' + (g.id === 'extensions' ? ' et remplissages' : '') + ' (' + ret.length + ')</summary>' + (g.retNote ? '<p class="mgroup__retnote">' + g.retNote + '</p>' : '') + ret.map(i => row(i, true)).join('') + '</details>' : '') +
        '</section>';
    }).join('');
  }
  function row(i, ret) {
    const action = i.call
      ? '<a class="mrow__call" href="tel:' + TEL + '" aria-label="Réserver par téléphone : ' + i.name.replace(/"/g, '') + '"><svg aria-hidden="true"><use href="#i-phone"/></svg>Sur appel</a>'
      : '<button type="button" class="mrow__add" aria-pressed="false" aria-label="Ajouter : ' + i.name.replace(/"/g, '') + '"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>';
    return '<article class="mrow' + (ret ? ' mrow--ret' : '') + (i.call ? ' mrow--call' : '') + '" data-id="' + i.id + '">' +
      '<div><h4 class="mrow__name">' + i.name + '</h4>' + (i.desc ? '<button type="button" class="mrow__more" aria-expanded="false">En savoir plus</button>' : '') + '</div>' +
      '<div class="mrow__right"><div class="mrow__meta"><span>' + fmtDur(i.min) + '</span><span class="mrow__price">' + eur(i.price) + '</span></div>' + action + '</div>' +
      (i.desc ? '<p class="mrow__desc">' + i.desc.replace(/</g, '&lt;') + '</p>' : '') + '</article>';
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) setGroup(b.dataset.g); });
  function setGroup(id) {
    S.group = id;
    $$('.tab', tabs).forEach(t => { const on = t.dataset.g === id; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', String(on)); });
    $$('.mgroup', list).forEach(g => g.classList.toggle('is-on', g.dataset.g === id));
  }
  list.addEventListener('click', e => {
    const more = e.target.closest('.mrow__more');
    if (more) { const r = more.closest('.mrow'); const open = r.classList.toggle('is-open'); more.setAttribute('aria-expanded', String(open)); more.textContent = open ? 'Réduire' : 'En savoir plus'; return; }
    const add = e.target.closest('.mrow__add'); if (!add) return;
    toggle(add.closest('.mrow').dataset.id);
  });
  let warnTimer;
  function toggle(id) {
    if (ITEMS[id].call) return;                 // prestation réservable uniquement par téléphone
    const i = S.cart.indexOf(id);
    if (i >= 0) S.cart.splice(i, 1);
    else {
      if (totalMin() + ITEMS[id].min > (CFG.MAX_TOTAL_MIN || 360)) { warn('Un rendez-vous ne peut pas dépasser ' + fmtDur(CFG.MAX_TOTAL_MIN || 360) + '. Retirez une prestation ou réservez un second rendez-vous.'); return; }
      S.cart.push(id);
    }
    // le créneau choisi n'est peut-être plus valable (durée différente)
    if (S.date && S.time != null && !slotsFor(S.date).includes(S.time)) { S.time = null; }
    refresh();
  }
  function warn(msg) {
    const el = $('#sumList'); let w = $('#sumWarn');
    if (!w) { w = document.createElement('li'); w.id = 'sumWarn'; w.className = 'sum__empty'; w.style.color = '#ffb4a8'; el.appendChild(w); }
    w.textContent = msg; clearTimeout(warnTimer); warnTimer = setTimeout(() => w.remove(), 5000);
  }

  /* ---------- récapitulatif ---------- */
  function refresh() {
    $$('.mrow:not(.mrow--call)', list).forEach(r => {
      const on = S.cart.includes(r.dataset.id);
      r.classList.toggle('is-sel', on);
      const b = $('.mrow__add', r); b.setAttribute('aria-pressed', String(on));
      b.innerHTML = '<svg aria-hidden="true"><use href="#' + (on ? 'i-check' : 'i-plus') + '"/></svg>';
    });
    LM.groups.forEach(g => { const n = S.cart.filter(id => ITEMS[id].group === g.id).length; const s = $('[data-n="' + g.id + '"]', tabs); if (s) s.textContent = n ? n : ''; });
    const ul = $('#sumList');
    ul.innerHTML = S.cart.length ? S.cart.map(id => '<li><span>' + ITEMS[id].name + '<br><small style="opacity:.6">' + fmtDur(ITEMS[id].min) + '</small></span><span><b>' + eur(ITEMS[id].price) + '</b><button type="button" data-rm="' + id + '" aria-label="Retirer">×</button></span></li>').join('') + (needsPose() ? '<li class="sum__empty sum__warn">Le Perfect Blend s’ajoute à une pose complète : choisissez-en une dans « Extensions de cils ».</li>' : '') : '<li class="sum__empty">Aucune prestation sélectionnée.</li>';
    $('#sumDur').textContent = fmtDur(totalMin()) || '0 min';
    if (!S.cart.length) $('#sumDur').textContent = '0 min';
    $('#sumTotal').textContent = eur(total());
    $('#sumDeposit').textContent = eurC(depositCents(total()));
    $$('[data-delay]').forEach(el => { el.textContent = fmtDelay(lateHours()); });
    $$('[data-pct]').forEach(el => { el.textContent = POL.depositPct; });
    const when = $('#sumWhenRow');
    if (S.date && S.time != null) { when.hidden = false; $('#sumWhen').textContent = fmtShort(S.date) + ' · ' + fmtHour(S.time); } else when.hidden = true;
    nav();
  }
  $('#sumList').addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) toggle(b.dataset.rm); });

  /* ---------- navigation entre étapes ---------- */
  const btnNext = $('#btnNext'), btnBack = $('#btnBack'), btnLabel = $('#btnNextLabel');
  function nav() {
    const s = S.step;
    btnBack.hidden = s === 1 || s === 5;
    $('#flowSide').hidden = s === 5;
    const labels = { 1: 'Choisir la date', 2: 'Mes informations', 3: 'Passer à l’acompte', 4: '' };
    btnLabel.textContent = labels[s] || '';
    btnNext.hidden = s === 4 || s === 5;
    btnNext.disabled = (s === 1 && (!S.cart.length || needsPose())) || (s === 2 && (S.time == null || !S.date));
  }
  function go(step, scroll = true) {
    S.step = step;
    $$('.step').forEach(sec => { const on = +sec.dataset.step === step; sec.hidden = !on; sec.classList.toggle('is-on', on); });
    $$('#stepper li').forEach(li => { const n = +li.dataset.s; li.classList.toggle('is-on', n === step); li.classList.toggle('is-done', n < step); });
    $('#stepper').hidden = step === 5;
    if (step === 2) { buildCal(); buildSlots(); }
    if (step === 4) preparePay();
    nav(); refresh();
    if (scroll) { const top = $('#stepper').getBoundingClientRect().top + scrollY - 110; scrollTo({ top: Math.max(0, top), behavior: 'smooth' }); }
  }
  btnNext.addEventListener('click', () => {
    if (S.step === 1 && S.cart.length && !needsPose()) go(2);
    else if (S.step === 2 && S.time != null) go(3);
    else if (S.step === 3 && validateInfos()) go(4);
  });
  btnBack.addEventListener('click', () => go(Math.max(1, S.step - 1)));

  /* ---------- étape 2 : calendrier et créneaux ---------- */
  const calDays = $('#calDays'), calTitle = $('#calTitle'), prev = $('#calPrev'), next = $('#calNext');
  const minStartMs = () => Date.now() + (CFG.MIN_NOTICE_HOURS || 24) * 3600e3;
  const maxKey = () => addDays(todayKey, CFG.MAX_DAYS_AHEAD || 90);
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const demoCache = {};
  function demoBusy(k) {
    if (demoCache[k]) return demoCache[k];
    const d = parse(k), h = LM.hours[d.getDay()]; if (!h) return (demoCache[k] = []);
    const seed = Number(k.replace(/-/g, '')); const r = mulberry(seed);
    const open = toMin(h[0]), close = toMin(h[1]); const blocks = [];
    const n = r() < .1 ? 99 : (r() < .55 ? 1 : 2);         // quelques jours complets, sinon 1 à 2 rendez-vous déjà pris
    if (n === 99) blocks.push([open, close]);
    else for (let i = 0; i < n; i++) { const dur = [60, 90, 120][Math.floor(r() * 3)]; const st = open + Math.floor(r() * Math.max(1, (close - open - dur) / 30)) * 30; blocks.push([st, Math.min(close, st + dur)]); }
    return (demoCache[k] = blocks);
  }
  function isBusy(k, start, end) {
    if (S.busy) {       // créneaux réels (agenda)
      const a = parse(k); a.setHours(0, start, 0, 0); const b = parse(k); b.setHours(0, end, 0, 0);
      return S.busy.some(([x, y]) => a < y && b > x);
    }
    return demoBusy(k).some(([x, y]) => start < y && end > x);
  }
  function slotsFor(k) {
    const d = parse(k), h = LM.hours[d.getDay()]; if (!h || !S.cart.length) return [];
    if (k > maxKey()) return [];
    const open = toMin(h[0]), close = toMin(h[1]), dur = totalMin(), step = CFG.SLOT_STEP_MIN || 30, out = [];
    for (let t = open; t + dur <= close; t += step) {
      const st = parse(k); st.setHours(0, t, 0, 0);
      if (st.getTime() < minStartMs()) continue;
      if (isBusy(k, t, t + dur)) continue;
      out.push(t);
    }
    return out;
  }
  function buildCal() {
    const first = parse(S.month);
    calTitle.textContent = first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    prev.disabled = S.month <= monthStart(todayKey);
    next.disabled = addMonths(S.month, 1) > monthStart(maxKey());
    const lead = (first.getDay() + 6) % 7, dim = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    let h = '';
    for (let b = 0; b < lead; b++) h += '<span class="cday is-blank"></span>';
    for (let n = 1; n <= dim; n++) {
      const k = first.getFullYear() + '-' + pad(first.getMonth() + 1) + '-' + pad(n);
      const ok = slotsFor(k).length > 0;
      h += '<button type="button" class="cday' + (ok ? ' is-open' : '') + (k === todayKey ? ' is-today' : '') + (k === S.date ? ' is-sel' : '') + '" data-k="' + k + '"' + (ok ? '' : ' disabled') + ' aria-label="' + fmtLong(k) + (ok ? ', créneaux disponibles' : ', indisponible') + '">' + n + '</button>';
    }
    calDays.innerHTML = h;
  }
  prev.addEventListener('click', () => { S.month = addMonths(S.month, -1); buildCal(); });
  next.addEventListener('click', () => { S.month = addMonths(S.month, 1); buildCal(); });
  calDays.addEventListener('click', e => {
    const b = e.target.closest('.cday[data-k]'); if (!b || b.disabled) return;
    S.date = b.dataset.k; S.time = null; buildCal(); buildSlots(); refresh();
    if (innerWidth < 900) $('#slotsTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  const slotsGrid = $('#slotsGrid');
  function buildSlots() {
    const t = $('#slotsTitle'), sub = $('#slotsSub');
    if (!S.date) { t.textContent = 'Choisissez un jour'; sub.textContent = 'Durée de votre rendez-vous : ' + fmtDur(totalMin()) + '. Les horaires proposés en tiennent compte.'; slotsGrid.innerHTML = ''; return; }
    t.textContent = fmtShort(S.date);
    sub.textContent = 'Rendez-vous de ' + fmtDur(totalMin()) + ' · choisissez l’heure d’arrivée.';
    const s = slotsFor(S.date);
    slotsGrid.innerHTML = s.length ? s.map(m => '<button type="button" class="slot' + (m === S.time ? ' is-sel' : '') + '" role="option" aria-selected="' + (m === S.time) + '" data-t="' + m + '">' + fmtHour(m) + '</button>').join('') : '<p class="slots__empty">Plus de créneau ce jour-là pour cette durée. Essayez un autre jour.</p>';
  }
  slotsGrid.addEventListener('click', e => { const b = e.target.closest('.slot'); if (!b) return; S.time = +b.dataset.t; buildSlots(); refresh(); });

  async function loadAvailability() {
    if (!CFG.AVAILABILITY_URL) return;
    try {
      const u = CFG.AVAILABILITY_URL + (CFG.AVAILABILITY_URL.includes('?') ? '&' : '?') + 'from=' + todayKey + '&to=' + maxKey();
      const r = await fetch(u, { cache: 'no-store' }); if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      S.busy = (j.busy || []).map(b => [new Date(Array.isArray(b) ? b[0] : b.start), new Date(Array.isArray(b) ? b[1] : b.end)]).filter(x => !isNaN(x[0]) && !isNaN(x[1]));
    } catch (e) { S.busy = null; }
    if (S.step === 2) { buildCal(); buildSlots(); }
  }

  /* ---------- étape 3 : coordonnées ---------- */
  const F = { first: $('#fFirst'), last: $('#fLast'), email: $('#fEmail'), phone: $('#fPhone'), cgv: $('#fCgv') };
  const rules = {
    first: v => (v.trim().length >= 2 ? '' : 'Indiquez votre prénom.'),
    last: v => (v.trim().length >= 2 ? '' : 'Indiquez votre nom.'),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Adresse e-mail invalide.'),
    phone: v => { const d = v.replace(/\D/g, ''); return d.length >= 9 && d.length <= 15 ? '' : 'Numéro de téléphone invalide.'; },
    cgv: () => (F.cgv.checked ? '' : 'Merci de cocher cette case pour continuer.')
  };
  function check(n) {
    const msg = rules[n](n === 'cgv' ? '' : F[n].value);
    const slot = $('[data-err="' + n + '"]'); if (slot) slot.textContent = msg;
    if (n !== 'cgv') F[n].classList.toggle('is-bad', !!msg);
    return msg;
  }
  ['first', 'last', 'email', 'phone'].forEach(n => { F[n].addEventListener('blur', () => check(n)); F[n].addEventListener('input', () => { if (F[n].classList.contains('is-bad')) check(n); }); });
  function validateInfos() {
    let bad = ''; ['first', 'last', 'email', 'phone', 'cgv'].forEach(n => { if (check(n) && !bad) bad = n; });
    if (bad) { F[bad].focus(); return false; }
    return true;
  }

  /* ---------- étape 4 : acompte et paiement ---------- */
  const payBtn = $('#payBtn'), payMsg = $('#payMsg'), modal = $('#payModal');
  function preparePay() {
    const dc = depositCents(total());
    $('#payAmount').textContent = eurC(dc);
    $('#payRest').textContent = 'Solde de ' + eurC(total() * 100 - dc) + (hasPackage() ? ' réparti entre le jour de la prestation et la retouche, à régler au studio : chèque, espèces ou virement.' : ' à régler au studio : chèque, espèces ou virement.');
    payMsg.textContent = '';
    const label = payBtn.querySelector('span');
    label.textContent = CFG.PAYMENT_MODE === 'none' ? 'Confirmer le rendez-vous' : 'Payer l’acompte de ' + eurC(dc);
  }
  function makeRef() { return 'LM-' + S.date.replace(/-/g, '').slice(2) + '-' + Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join(''); }
  function booking() {
    const items = S.cart.map(id => ({ id, name: ITEMS[id].name, min: ITEMS[id].min, price: ITEMS[id].price }));
    const dc = depositCents(total());
    const hhmm = m => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
    return { ref: S.ref || (S.ref = makeRef()), date: S.date, start: fmtHour(S.time).replace(' h ', ':'), startMin: S.time, durationMin: totalMin(),
      timezone: 'Europe/Paris', startLocal: S.date + 'T' + hhmm(S.time) + ':00', endLocal: S.date + 'T' + hhmm(S.time + totalMin()) + ':00',
      items, total: total(), depositCents: dc, deposit: dc / 100, package: hasPackage(), cancelHours: lateHours(),
      first: F.first.value.trim(), last: F.last.value.trim(), email: F.email.value.trim(), phone: F.phone.value.trim(), visit: ($('input[name=visit]:checked') || {}).value || 'new', message: $('#fMsg').value.trim(), locale: 'fr', page: location.href.split('?')[0], sentAt: new Date().toISOString() };
  }
  payBtn.addEventListener('click', async () => {
    if (S.sending) return;
    if ($('#fHp').value) { finish(booking(), { demo: true }); return; }          // pot de miel
    const mode = CFG.PAYMENT_MODE || 'demo', b = booking();
    if (mode === 'demo') { $('#payModalAmount').textContent = eurC(b.depositCents); openModal(); return; }
    S.sending = true; payBtn.disabled = true; payMsg.textContent = '';
    try {
      if (mode === 'stripe') {
        if (!CFG.CHECKOUT_ENDPOINT) throw new Error('config');
        sessionStorage.setItem('lm-pending', JSON.stringify(b));
        const r = await fetch(CFG.CHECKOUT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !j.url) throw new Error(j.error || 'checkout');
        location.href = j.url; return;
      }
      if (mode === 'none') {
        const ok = await sendBooking(b);
        if (!ok.ok) throw new Error(ok.conflict ? 'conflict' : 'send');
        finish(b, { unpaid: true });
      }
    } catch (err) {
      payMsg.textContent = err.message === 'conflict' ? 'Ce créneau vient d’être pris. Merci d’en choisir un autre.' : 'Le paiement n’a pas pu être lancé. Appelez le ' + (CFG.PHONE_DISPLAY || '') + ' ou réessayez dans un instant.';
      if (err.message === 'conflict') { S.time = null; go(2); }
    } finally { S.sending = false; payBtn.disabled = false; }
  });
  async function sendBooking(b) {
    if (!CFG.BOOKING_WEBHOOK) return { ok: true, demo: true };
    try {
      const r = await fetch(CFG.BOOKING_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(b) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) return { ok: false, conflict: !!j.conflict };
      return { ok: true };
    } catch (e) { return { ok: false }; }
  }
  function openModal() { modal.hidden = false; document.body.classList.add('modal-open'); $('#payModalOk').focus(); }
  function closeModal() { modal.hidden = true; document.body.classList.remove('modal-open'); }
  $('#payModalCancel').addEventListener('click', closeModal);
  $('#payModalOk').addEventListener('click', () => { closeModal(); finish(booking(), { demo: true }); });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------- confirmation + agenda de la cliente ---------- */
  const icsEsc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const stamp = (k, min) => k.replace(/-/g, '') + 'T' + pad(Math.floor(min / 60)) + pad(min % 60) + '00';
  function fold(line) { const out = []; while (line.length > 72) { out.push(line.slice(0, 72)); line = ' ' + line.slice(72); } out.push(line); return out.join('\r\n'); }
  function finish(b, opt) {
    opt = opt || {};
    S.step = 5;
    $$('.step').forEach(sec => { const on = +sec.dataset.step === 5; sec.hidden = !on; sec.classList.toggle('is-on', on); });
    $('#stepper').hidden = true; $('#flowSide').hidden = true;
    $('#doneTitle').textContent = opt.demo ? 'Rendez-vous préparé' : 'Rendez-vous confirmé';
    const when = fmtLong(b.date) + ' à ' + b.start.replace(':', ' h ');
    $('#doneText').textContent = opt.demo
      ? 'Merci ' + b.first + ' ! Voici le récapitulatif de votre rendez-vous du ' + when + '. Une fois la page reliée à l’agenda et à Stripe, ce même parcours enregistre le créneau et encaisse l’acompte.'
      : 'Merci ' + b.first + ' ! ' + (CFG.OWNER || 'Aurélie') + ' vous attend le ' + when + (opt.unpaid ? '. L’acompte se règle au studio.' : '. Votre acompte est bien reçu.') + ' Un e-mail de confirmation vous a été envoyé.';
    if (b.package) $('#doneText').textContent += ' La retouche à 6 semaines sera planifiée avec ' + (CFG.OWNER || 'Aurélie') + '.';
    $('#doneSum').innerHTML = [['Date', fmtShort(b.date)], ['Heure', b.start.replace(':', ' h ')], ['Durée', fmtDur(b.durationMin)], ['Acompte', eurC(b.depositCents)], ['Adresse', CFG.ADDRESS || ''], ['Référence', b.ref]].map(r => '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>').join('');
    $('#doneDemo').hidden = !opt.demo;
    const names = b.items.map(i => i.name).join(', ');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lili Monaco//Reservation//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT', 'UID:' + b.ref + '@lili-monaco', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''),
      'DTSTART:' + stamp(b.date, b.startMin), 'DTEND:' + stamp(b.date, b.startMin + b.durationMin), 'SUMMARY:' + icsEsc('Rendez-vous Lili Monaco'), 'LOCATION:' + icsEsc(CFG.ADDRESS || ''),
      'DESCRIPTION:' + icsEsc(names + ' · Réf. ' + b.ref + ' · ' + (CFG.PHONE_DISPLAY || '') + ' · Annulation ou déplacement gratuits jusqu’à ' + fmtDelay(b.cancelHours || POL.lateCancelHours) + ' avant, sinon l’acompte n’est pas restitué.'), 'END:VEVENT', 'END:VCALENDAR'];
    const a = $('#btnIcs'); if (a.dataset.u) URL.revokeObjectURL(a.dataset.u);
    a.href = URL.createObjectURL(new Blob([lines.map(fold).join('\r\n')], { type: 'text/calendar;charset=utf-8' })); a.dataset.u = a.href; a.download = 'rendez-vous-lili-monaco-' + b.date + '.ics';
    $('#btnGcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Rendez-vous Lili Monaco') + '&dates=' + stamp(b.date, b.startMin) + '/' + stamp(b.date, b.startMin + b.durationMin) + '&location=' + encodeURIComponent(CFG.ADDRESS || '') + '&details=' + encodeURIComponent(names + ' · Réf. ' + b.ref) + '&ctz=Europe/Paris';
    $('#btnRoute').href = 'https://www.google.com/maps/dir/?api=1&destination=' + (CFG.LAT || 43.9011) + ',' + (CFG.LNG || 5.77751);
    $('#done').hidden = false; $('#done').focus && $('#done').setAttribute('tabindex', '-1');
    const top = $('#reserver').getBoundingClientRect().top + scrollY + 180; scrollTo({ top, behavior: 'smooth' });
  }
  $('#doneNew').addEventListener('click', () => { S.cart = []; S.date = null; S.time = null; S.ref = ''; $('#done').hidden = true; $('#flowSide').hidden = false; go(1, true); });

  /* ---------- API publique + démarrage ---------- */
  function openGroup(id) {
    setGroup(id);
    if (S.step !== 1) go(1, false);
    setTimeout(() => { const top = $('#stepper').getBoundingClientRect().top + scrollY - 110; scrollTo({ top, behavior: 'smooth' }); }, 60);
  }
  window.LiliBooking = { openGroup };

  if (CFG.DEMO_MODE) { const b = $('#demoBanner'); if (b) b.hidden = false; }
  buildMenu(); refresh(); nav(); loadAvailability();

  // retour de Stripe
  const qs = new URLSearchParams(location.search);
  if (qs.get('paiement') === 'ok') {
    let b = null; try { b = JSON.parse(sessionStorage.getItem('lm-pending') || 'null'); } catch (e) { /* aucune */ }
    if (b && b.ref === qs.get('ref')) { sessionStorage.removeItem('lm-pending'); finish(b, {}); }
  } else if (qs.get('paiement') === 'annule') {
    let b = null; try { b = JSON.parse(sessionStorage.getItem('lm-pending') || 'null'); } catch (e) { /* aucune */ }
    if (b) { S.cart = b.items.map(i => i.id).filter(id => ITEMS[id]); S.date = b.date; S.time = b.startMin; F.first.value = b.first; F.last.value = b.last; F.email.value = b.email; F.phone.value = b.phone; F.cgv.checked = true; go(4, false); payMsg.textContent = 'Le paiement a été annulé. Vous pouvez réessayer.'; }
  }
})();
