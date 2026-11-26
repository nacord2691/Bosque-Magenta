document.querySelectorAll("[data-local-src],[data-local-href]").forEach(e=>{if(e.dataset.localSrc)e.src=e.dataset.localSrc;if(e.dataset.localHref)e.href=e.dataset.localHref;});



const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
}

const viewer = document.getElementById('viewer');
if (viewer && viewer.showModal) {
  let previous = null;
  document.querySelectorAll('.zoom').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      previous = link;
      const image = link.querySelector('img');
      viewer.querySelector('img').src = link.href;
      viewer.querySelector('img').alt = image?.alt || '';
      viewer.querySelector('p').textContent = image?.alt || '';
      viewer.showModal();
    });
  });
  viewer.querySelector('.close')?.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', e => {
    if (e.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => previous?.focus());
}

document.querySelectorAll('.book-view').forEach(book => {
  let pages = [];
  try { pages = JSON.parse(book.dataset.pages || '[]'); } catch (e) {}
  if (!pages.length) return;
  const left = book.querySelector('.book-left');
  const right = book.querySelector('.book-right');
  const prev = book.querySelector('.prev');
  const next = book.querySelector('.next');
  const count = book.querySelector('.book-count');
  let i = 0;
  const render = () => {
    left.src = pages[i];
    left.alt = `Página ${i + 1}`;
    const hasRight = i !== 0 && i + 1 < pages.length;
    right.hidden = !hasRight;
    if (hasRight) {
      right.src = pages[i + 1];
      right.alt = `Página ${i + 2}`;
    }
    count.textContent = i === 0 ? `Portada · ${pages.length} páginas` : `Páginas ${i + 1}${hasRight ? '–' + (i + 2) : ''} de ${pages.length}`;
    prev.disabled = i === 0;
    next.disabled = i === 0 ? pages.length <= 1 : i + 2 >= pages.length;
  };
  prev?.addEventListener('click', () => { i = Math.max(0, i - 2); render(); });
  next?.addEventListener('click', () => { i = i === 0 ? 1 : Math.min(pages.length - 1, i + 2); render(); });
  render();
});

document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project').forEach(card => {
      const show = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !show;
    });
  });
});

function route(){let h=location.hash.slice(1);let target=document.getElementById(h);let view=target?.closest('[data-view]');if(!view)view=document.getElementById('home-view');document.querySelectorAll('[data-view]').forEach(x=>x.hidden=x!==view);if(h.startsWith('view-'))window.scrollTo(0,0);else if(target)requestAnimationFrame(()=>target.scrollIntoView());}window.addEventListener('hashchange',route);route();document.querySelectorAll('.zoom').forEach(a=>a.addEventListener('click',()=>{let v=document.getElementById('viewer');v.classList.toggle('full-art',a.closest('[data-view="comunicacion-corporativa"]')!==null);v.classList.toggle('brand-white',a.closest('[data-view="identidad-visual"]')!==null);v.querySelector('.original-open').href=a.href}));