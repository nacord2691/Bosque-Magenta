// Textos editables en Pages CMS. El HTML original queda como respaldo.
(() => {
  const groups = new Map();
  document.querySelectorAll('[data-cms-text]').forEach(el => {
    const [group, key] = el.dataset.cmsText.split('.');
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push([el, key]);
  });
  for (const [group, entries] of groups) {
    fetch('content/' + encodeURIComponent(group) + '.json', {cache:'no-cache'})
      .then(response => { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); })
      .then(data => { for (const [el, key] of entries) { if (typeof data[key] === 'string' && el.textContent.trim() !== data[key]) el.textContent = data[key]; } })
      .catch(error => console.warn('Bosque Magenta: se conserva el texto original de ' + group, error));
  }
})();
