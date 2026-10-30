(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const video = document.getElementById('logo-reveal');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (video) {
    const stage = video.parentElement;
    const showStatic = () => {
      video.classList.remove('is-playing');
      video.pause();
      stage.classList.add('show-still');
    };
    video.addEventListener('ended', showStatic);
    video.addEventListener('error', showStatic);
    // With multiple <source> elements, failures can fire only on the sources.
    const sources = Array.from(video.querySelectorAll('source'));
    let failedSources = 0;
    sources.forEach(source => source.addEventListener('error', () => {
      failedSources += 1;
      if (failedSources === sources.length) showStatic();
    }));
    video.addEventListener('waiting', () => video.classList.remove('is-playing'));
    video.addEventListener('playing', () => {
      if (motion.matches) showStatic();
      else video.classList.add('is-playing');
    });
    motion.addEventListener('change', event => { if (event.matches) showStatic(); });
    if (motion.matches) showStatic();
    else {
      video.muted = true;
      video.play().catch(showStatic);
    }
  }

  const list = document.getElementById('game-list');
  const games = window.DUNKSTONE_GAMES || [];
  if (!list || !games.length) return;

  const storeLinks = game => {
    const links = document.createElement('div');
    links.className = 'store-links';
    for (const [key, name] of [['appStoreUrl', 'App Store'], ['playStoreUrl', 'Google Play']]) {
      if (!game[key]) continue;
      try {
        const url = new URL(game[key]);
        if (url.protocol !== 'https:') continue;
        const link = document.createElement('a');
        link.href = url.href;
        link.className = 'development';
        link.textContent = name;
        link.setAttribute('aria-label', `${game.title} on ${name}`);
        links.append(link);
      } catch { /* Omit invalid links until corrected. */ }
    }
    return links;
  };

  const entries = games.map(game => {
    // Reuse the accessible, server-readable feature instead of duplicating it.
    const featured = Array.from(list.children).find(article =>
      article.querySelector('h3')?.textContent.trim() === game.title);
    const article = featured || document.createElement('article');
    article.classList.add('game-entry');
    if (!featured) {
      if (game.artwork) {
        const image = document.createElement('img');
        image.className = 'catalogue-artwork';
        image.src = game.artwork;
        image.alt = `${game.title} game artwork`;
        image.loading = 'lazy';
        article.append(image);
      }
      const details = document.createElement('div');
      details.className = 'game-details';
      const title = document.createElement('h3');
      title.textContent = game.title;
      const description = document.createElement('p');
      description.className = 'game-description';
      description.textContent = game.description || '';
      details.append(title, description);
      const platforms = document.createElement('div');
      platforms.className = 'game-platforms';
      details.append(platforms);
      article.append(details);
    }
    const details = article.querySelector('.game-details');
    details.querySelector('h3').textContent = game.title;
    details.querySelector('.game-description').textContent = game.description || '';
    const artwork = article.querySelector('img');
    if (artwork && game.artwork) artwork.src = game.artwork;
    const platforms = article.querySelector('.game-platforms');
    const status = document.createElement('span');
    status.className = 'development';
    status.textContent = game.status || 'In development';
    platforms.replaceChildren(status);
    if (Array.isArray(game.platforms) && game.platforms.length) {
      const text = document.createElement('p');
      text.textContent = `Planned for ${game.platforms.join(', ')}`;
      platforms.append(text);
    }
    const links = storeLinks(game);
    if (links.childElementCount) platforms.append(links);
    return article;
  });
  list.replaceChildren(...entries);
})();
