const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.primary-nav');

document.querySelectorAll('.logout-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    sessionStorage.removeItem('arex-garage-preview');
    location.assign('index.html');
  });
});

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menu openen');
  }));
}

document.querySelectorAll('[data-year]').forEach(node => {
  node.textContent = new Date().getFullYear();
});

if (matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}

const form = document.querySelector('[data-whatsapp-form]');
if (form) {
  const subject = new URLSearchParams(location.search).get('onderwerp');
  if (subject && ['bezichtiging', 'inruil', 'vraag'].includes(subject)) {
    form.elements.onderwerp.value = subject;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const labels = {bezichtiging: 'Een auto bekijken', inruil: 'Auto verkopen / inruilen', vraag: 'Algemene vraag'};
    const message = `Hallo Arex Garage,\n\nNaam: ${data.get('naam')}\nOnderwerp: ${labels[data.get('onderwerp')]}\n\n${data.get('vraag')}`;
    window.open(`https://wa.me/31639819074?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}
