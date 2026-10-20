'use strict';

const translations = {
  fr: {
    openingMusic:'Ouvrez l’invitation en musique.',
    skip:'Aller à l’invitation',navDate:'30 OCTOBRE 2026 · SFAX',heroEyebrow:'LE BONHEUR SE PARTAGE',tagline:'Un soir pour toujours.',heroDescription:'Nous nous disons oui. Et nous aimerions tant partager cet instant avec vous.',monthYear:'OCTOBRE 2026',dayTime:'Vendredi · 21 heures · Sfax',open:'Ouvrir l’invitation',guestPrefix:'Une invitation pour',photoCaption:'La beauté d’être ensemble.',saveDate:'RÉSERVEZ CETTE DATE',note:'Le début d’un toujours.',scroll:'FAITES DÉFILER, L’HISTOIRE CONTINUE',invitationEyebrow:'AVEC TOUT NOTRE AMOUR',invitationTitle:'Une place à nos côtés.',letterEyebrow:'VOUS ÊTES INVITÉ',families:'Les familles de',and:'et',letterBody:'ont la joie de vous inviter au mariage de leurs enfants',letterClosing:'Votre présence rendra cette soirée encore plus belle.',countdownEyebrow:'CHAQUE INSTANT NOUS RAPPROCHE',countdownTitle:'Bientôt, ensemble.',days:'JOURS',hours:'HEURES',minutes:'MINUTES',seconds:'SECONDES',timeNote:'Le 30 octobre 2026, à 21 h · Heure de Tunisie',friday:'VENDREDI',october:'octobre',artFooter:'UNE DATE À GARDER PRÈS DU CŒUR',locationEyebrow:'LE RENDEZ-VOUS',locationTitle:'Là où l’on célèbre.',reception:'RÉCEPTION DE MARIAGE',address:'Route de Sidi Mansour, km 1,5\nSfax, Tunisie',venueTime:'Vendredi 30 octobre · 21 h',directions:'Voir l’itinéraire',calendar:'Ajouter à mon calendrier',closingTitle:'Les plus beaux moments\nse vivent ensemble.',share:'Partager l’invitation',backTop:'Retour en haut ↑',shareLabel:'Le lien de l’invitation',copy:'Copier le lien',copied:'Le lien de l’invitation est copié.',copyManual:'Sélectionnez le lien pour le copier.',soundOn:'Désactiver l’ambiance musicale',soundOff:'Activer l’ambiance musicale',soundError:'L’ambiance musicale n’est pas disponible sur ce navigateur.',arrived:'Le grand jour est arrivé !',timer:'Compte à rebours avant le mariage',photoAlt:'Fleurs et table dressée pour une réception de mariage',close:'Fermer',shareText:'Ali & Amal vous invitent à leur mariage, le 30 octobre 2026, à Sfax.'
  },
  ar: {
    openingMusic:'افتح الدعوة مع الموسيقى.',
    skip:'الانتقال إلى الدعوة',navDate:'٣٠ أكتوبر ٢٠٢٦ · صفاقس',heroEyebrow:'تكتمل فرحتنا بحضوركم',tagline:'ليلة تبدأ معها حكاية العمر.',heroDescription:'نبدأ معًا فصلًا جديدًا من حكايتنا، ونسعد أن تشاركونا هذه اللحظة.',monthYear:'أكتوبر ٢٠٢٦',dayTime:'الجمعة · التاسعة مساءً · صفاقس',open:'افتح الدعوة',guestPrefix:'دعوة خاصة إلى',photoCaption:'ما أجمل أن نجتمع.',saveDate:'احفظوا هذا الموعد',note:'بداية العمر معًا.',scroll:'مرّر للأسفل لاكتشاف الدعوة',invitationEyebrow:'بكل الحب ندعوكم',invitationTitle:'مكانكم إلى جانبنا.',letterEyebrow:'نتشرّف بدعوتكم',families:'يتشرف السيدان',and:'و',letterBody:'بدعوتكم لحضور حفل زفاف نجليهما',letterClosing:'بحضوركم تكتمل فرحتنا وتزداد ليلتنا جمالًا.',countdownEyebrow:'كل لحظة تقرّبنا من اللقاء',countdownTitle:'قريبًا، نجتمع.',days:'يوم',hours:'ساعة',minutes:'دقيقة',seconds:'ثانية',timeNote:'٣٠ أكتوبر ٢٠٢٦ · التاسعة مساءً بتوقيت تونس',friday:'الجمعة',october:'أكتوبر',artFooter:'موعد يبقى قريبًا من القلب',locationEyebrow:'موعد الفرح',locationTitle:'هنا نحتفل معًا.',reception:'حفل الزفاف',address:'طريق سيدي منصور، كلم ١٫٥\nصفاقس، تونس',venueTime:'الجمعة ٣٠ أكتوبر · التاسعة مساءً',directions:'الموقع على الخريطة',calendar:'إضافة إلى التقويم',closingTitle:'أجمل اللحظات\nنعيشها معًا.',share:'مشاركة الدعوة',backTop:'العودة إلى الأعلى ↑',shareLabel:'رابط الدعوة',copy:'نسخ الرابط',copied:'تم نسخ رابط الدعوة.',copyManual:'حدّد الرابط لنسخه.',soundOn:'إيقاف الموسيقى',soundOff:'تشغيل الموسيقى',soundError:'الموسيقى غير متاحة في هذا المتصفح.',arrived:'حلّ موعد فرحتنا!',timer:'العد التنازلي لحفل الزفاف',photoAlt:'زهور وطاولة مجهّزة لحفل زفاف',close:'إغلاق',shareText:'علي وأمل يدعوانكم لحضور حفل زفافهما يوم ٣٠ أكتوبر ٢٠٢٦ بصفاقس.'
  }
};

const WEDDING_TIMESTAMP = new Date('2026-10-30T21:00:00+01:00').getTime();
const params = new URLSearchParams(window.location.search);
const customGuest = (params.get('invite') || '').trim().slice(0, 80);
let language = params.get('lang') === 'ar' ? 'ar' : 'fr';
let musicPlaying = false;
let musicLoading = false;
let musicWanted = false;
let toastTimeout;

function updateCountdown(now = Date.now()) {
  const remaining = Math.max(0, Math.floor((WEDDING_TIMESTAMP - now) / 1000));
  const parts = { days:Math.floor(remaining/86400), hours:Math.floor(remaining/3600)%24, minutes:Math.floor(remaining/60)%60, seconds:remaining%60 };
  for (const [id,value] of Object.entries(parts)) document.getElementById(id).textContent = String(value).padStart(2,'0');
  if (now >= WEDDING_TIMESTAMP) document.getElementById('time-note').textContent = translations[language].arrived;
  return parts;
}

function setLanguage(next) {
  language = next === 'ar' ? 'ar' : 'fr';
  const copy = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('couple-names').setAttribute('aria-label',language === 'ar' ? 'علي وأمل' : 'Ali et Amal');
  document.querySelectorAll('[data-i18n]').forEach(el => { if (copy[el.dataset.i18n]) el.textContent = copy[el.dataset.i18n]; });
  document.getElementById('name-ali').textContent = language === 'ar' ? 'علي' : 'Ali';
  document.getElementById('name-amal').textContent = language === 'ar' ? 'أمل' : 'Amal';
  document.querySelectorAll('.short-ali').forEach(el => { el.textContent = language === 'ar' ? 'علي' : 'Ali'; });
  document.querySelectorAll('.short-amal').forEach(el => { el.textContent = language === 'ar' ? 'أمل' : 'Amal'; });
  document.querySelectorAll('.guest-name').forEach(el => { el.textContent = customGuest || (language === 'ar' ? 'السيد رفيق بن عياد' : 'Monsieur Rafik Ben Ayed'); });
  document.querySelectorAll('.language-button').forEach(button => { const active = button.dataset.lang === language; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
  document.getElementById('hero-photo').alt = copy.photoAlt;
  document.getElementById('countdown').setAttribute('aria-label',copy.timer);
  document.getElementById('close-dialog').setAttribute('aria-label',copy.close);
  document.getElementById('sound-toggle').setAttribute('aria-label',musicPlaying ? copy.soundOn : copy.soundOff);
  document.title = language === 'ar' ? 'علي وأمل — دعوة زفاف' : 'Ali & Amal — Un soir pour toujours';
  updateCountdown();
}

document.querySelectorAll('.language-button').forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.lang)));
setLanguage(language);
setInterval(updateCountdown,1000);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('open-invitation').addEventListener('click',event => {
  event.preventDefault();
  void startMusic();
  const letter = document.getElementById('invitation-letter');
  letter.classList.remove('opened');
  document.getElementById('invitation').scrollIntoView({behavior:reducedMotion ? 'instant':'smooth',block:'start'});
  document.getElementById('invitation-title').focus({preventScroll:true});
  requestAnimationFrame(() => requestAnimationFrame(() => letter.classList.add('opened')));
});

if ('IntersectionObserver' in window && !reducedMotion) {
  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }),{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'),3500);
}

const shareDialog = document.getElementById('share-dialog');
function openShareDialog() {
  document.getElementById('share-url').value = window.location.href;
  shareDialog.showModal();
}
document.getElementById('share-invitation').addEventListener('click',async () => {
  if (navigator.share) {
    try { await navigator.share({title:document.title,text:translations[language].shareText,url:window.location.href}); }
    catch (error) { if(error.name !== 'AbortError') openShareDialog(); }
  } else openShareDialog();
});
document.getElementById('close-dialog').addEventListener('click',() => shareDialog.close());
shareDialog.addEventListener('click',event => { if (event.target === shareDialog) { const r=shareDialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) shareDialog.close(); } });
document.getElementById('copy-link').addEventListener('click',async () => {
  const input = document.getElementById('share-url');
  try { await navigator.clipboard.writeText(input.value); shareDialog.close(); showToast(translations[language].copied); }
  catch (_) { input.focus(); input.select(); if(document.execCommand('copy')) { shareDialog.close(); showToast(translations[language].copied); } else showToast(translations[language].copyManual); }
});

// Direct playback of the MP3 supplied for this invitation.
const musicTrack = document.getElementById('wedding-audio');
const soundButton = document.getElementById('sound-toggle');
const hasMusic = Boolean(musicTrack.getAttribute('src'));
soundButton.hidden = !hasMusic;
document.getElementById('opening-music-note').hidden = !hasMusic;

function updateSoundButton() {
  soundButton.classList.toggle('playing',musicPlaying);
  soundButton.setAttribute('aria-pressed',String(musicPlaying));
  soundButton.setAttribute('aria-busy',String(musicLoading));
  soundButton.setAttribute('aria-label',translations[language][musicPlaying?'soundOn':'soundOff']);
  soundButton.title = translations[language][musicPlaying?'soundOn':'soundOff'];
}

async function startMusic() {
  if(!hasMusic || musicPlaying || musicWanted) return;
  musicWanted=true;musicLoading=true;musicTrack.volume=.45;updateSoundButton();
  try {
    await musicTrack.play();
    if(!musicWanted || document.hidden) musicTrack.pause();
  } catch (_) {
    musicWanted=false;musicPlaying=false;musicLoading=false;updateSoundButton();
    showToast(translations[language].soundError);
  }
}
function stopMusic() {
  musicWanted=false;musicPlaying=false;musicLoading=false;musicTrack.pause();updateSoundButton();
}
async function toggleMusic() {
  if(musicPlaying || musicWanted) stopMusic();
  else await startMusic();
}
musicTrack.addEventListener('play',() => {
  if(!musicWanted || document.hidden) { musicTrack.pause();return; }
  musicPlaying=true;musicLoading=false;updateSoundButton();
});
musicTrack.addEventListener('pause',() => { musicWanted=false;musicPlaying=false;musicLoading=false;updateSoundButton(); });
musicTrack.addEventListener('error',() => {
  musicWanted=false;musicPlaying=false;musicLoading=false;updateSoundButton();
  if(hasMusic) showToast(translations[language].soundError);
});
soundButton.addEventListener('click',toggleMusic);
document.addEventListener('visibilitychange',() => { if(document.hidden && (musicPlaying || musicWanted)) stopMusic(); });
