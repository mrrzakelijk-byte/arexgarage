if (sessionStorage.getItem('arex-garage-preview') !== 'yes') {
  const page = location.pathname.split('/').pop() || 'home.html';
  location.replace(`index.html?next=${encodeURIComponent(page)}`);
}
