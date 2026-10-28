// Contact form -> Google Forms. The form posts in no-cors mode, so the
// response is opaque: a resolved fetch is the best signal we get.
const GOOGLE_FORM = {
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSeZWYmbSCFMsxnpZ7cao2t_6oM0VA_WBWJVq3i8jPdg6tU_Aw/formResponse',
  fields: {
    name: 'entry.1715458988',
    email: 'entry.262878736',
    topic: 'entry.1972632556',
    message: 'entry.1584596513',
  },
};

const MAIL_TO = 'gestware.app@gmail.com';

const TEXT = {
  hu: {
    sending: 'Küldés…',
    sent: 'Köszönjük, megkaptuk! Hamarosan válaszolunk.',
    missing: 'Kérjük, adja meg a nevét, az e-mail-címét és az üzenetet.',
    badEmail: 'Ez az e-mail-cím nem tűnik érvényesnek.',
    failed: `Valami nem sikerült. Kérjük, írjon közvetlenül: ${MAIL_TO}`,
    mailSubject: 'Ajánlatkérés a weboldalról',
  },
  en: {
    sending: 'Sending…',
    sent: "Thanks, got it! We'll get back to you soon.",
    missing: 'Please fill in your name, email and message.',
    badEmail: "That email address doesn't look right.",
    failed: `Something went wrong. Email us directly: ${MAIL_TO}`,
    mailSubject: 'Project enquiry from the website',
  },
};

const form = document.getElementById('contact-form');

if (form) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'hu';
  const t = TEXT[lang];
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('[type="submit"]');
  const isConfigured = !GOOGLE_FORM.action.includes('FORM_ID');

  const say = (message, kind = '') => {
    status.textContent = message;
    status.className = `form-status ${kind ? `is-${kind}` : ''}`;
  };

  const openMail = (data) => {
    const body = `${data.message}\n\n— ${data.name} <${data.email}>\n(${data.topic})`;
    window.location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(data)) data[key] = data[key].trim();

    // honeypot: bots fill every field, people never see this one
    if (data.website) {
      form.reset();
      say(t.sent, 'ok');
      return;
    }

    if (!data.name || !data.email || !data.message) {
      say(t.missing, 'error');
      return;
    }
    if (!form.elements.email.checkValidity()) {
      say(t.badEmail, 'error');
      form.elements.email.focus();
      return;
    }

    if (!isConfigured) {
      openMail(data);
      return;
    }

    const body = new URLSearchParams();
    for (const [key, entry] of Object.entries(GOOGLE_FORM.fields)) {
      body.set(entry, data[key] ?? '');
    }

    submit.disabled = true;
    say(t.sending);

    try {
      await fetch(GOOGLE_FORM.action, { method: 'POST', mode: 'no-cors', body });
      form.reset();
      say(t.sent, 'ok');
    } catch {
      say(t.failed, 'error');
    } finally {
      submit.disabled = false;
    }
  });
}

// Demo strip on phones: keep the "1 / 6" counter in step with the swipe position.
const demoList = document.querySelector('.demo-list');
const demoCount = document.querySelector('.demo-count span');

if (demoList && demoCount) {
  demoList.addEventListener('scroll', () => {
    const cards = demoList.children;
    const step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(demoList).columnGap);
    const atEnd = demoList.scrollLeft >= demoList.scrollWidth - demoList.clientWidth - 2;
    demoCount.textContent = atEnd ? cards.length : Math.round(demoList.scrollLeft / step) + 1;
  }, { passive: true });
}
