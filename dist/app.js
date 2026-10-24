(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const video = document.getElementById('logo-reveal');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const showStatic = () => { video.classList.remove('is-playing'); video.pause(); };
  video.addEventListener('ended', showStatic);
  video.addEventListener('error', showStatic);
  video.addEventListener('waiting', () => video.classList.remove('is-playing'));
  video.addEventListener('playing', () => { if (!motion.matches) video.classList.add('is-playing'); });
  motion.addEventListener('change', event => { if (event.matches) showStatic(); });
  if (!motion.matches) {
    video.muted = true;
    video.play().catch(showStatic);
  }
  const games = window.DUNKSTONE_GAMES || [];
  if (!games.length) return;
  const list = document.getElementById('game-list');
  list.replaceChildren();
  for (const game of games) {
    const article = document.createElement('article');
    article.className = 'game-entry';
    const symbol = document.createElement('div');
    symbol.className = 'game-symbol';
    if (game.artwork) {
      const img = document.createElement('img'); img.src = game.artwork; img.alt = ''; img.loading = 'lazy'; symbol.append(img);
    } else {
      symbol.setAttribute('aria-hidden', 'true');
      symbol.innerHTML = '<div class="stone"><i></i><i></i></div>';
    }
    const details = document.createElement('div'); details.className = 'game-details';
    const label = document.createElement('p'); label.className = 'eyebrow'; label.textContent = game.status || 'In development';
    const title = document.createElement('h3'); title.textContent = game.title;
    const description = document.createElement('p'); description.textContent = game.description || '';
    details.append(label, title, description);
    const platforms = document.createElement('div'); platforms.className = 'game-platforms';
    for (const [key, name] of [['appStoreUrl', 'App Store'], ['playStoreUrl', 'Google Play']]) {
      if (!game[key]) continue;
      try {
        const url = new URL(game[key]);
        if (url.protocol !== 'https:') continue;
        const link = document.createElement('a'); link.href = url.href; link.className = 'development'; link.textContent = name; link.setAttribute('aria-label', `${game.title} on ${name}`); platforms.append(link);
      } catch { /* An invalid link is omitted until corrected. */ }
    }
    article.append(symbol, details, platforms); list.append(article);
  }
})();
