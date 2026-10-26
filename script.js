'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pad = n => String(n).padStart(2, '0');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const caseDialog = $('#project-dialog');
const imageDialog = $('#image-dialog');
const menu = $('#site-menu');
const wechatDialog = $('#wechat-dialog');
const viewerImage = $('#viewer-image');
const viewerStage = $('#viewer-stage');
let projects = [];
let currentProject = 0;
let currentPage = 0;
let heroSlide = 0;
let viewerRequest = 0;
let previousHash = '#work';
let originFocus = null;
let toastTimer;
const heroProjects = [4, 0, 2];
const syncScroll = () => document.body.classList.toggle('has-dialog', $$('dialog[open]').length > 0);
const showDialog = dialog => { if (!dialog.open) dialog.showModal(); syncScroll(); };
function notify(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('is-visible'), 3000);
}

// Data comes from the portfolio; no external APIs, fonts or runtime dependencies.
async function loadProjects() {
  try {
    const response = await fetch('assets/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length !== 7) throw new Error('Invalid project data');
    projects = data;
    renderProjects();
    routeProject();
  } catch (error) {
    $('#project-grid').innerHTML = '<p class="load-error">作品暂时未能加载。<button class="text-link" id="retry-projects">重新加载 ↗</button></p>';
    $('#retry-projects').addEventListener('click', loadProjects);
    console.error('Portfolio loading failed:', error);
  }
}
function renderProjects() {
  const order = [4, 0, 2, 1, 3, 5, 6];
  $('#project-grid').innerHTML = order.map(index => {
    const p = projects[index];
    return `<button class="project-card" data-project="${index}" data-category="${p.category}" aria-label="查看${escapeHTML(p.title)}项目详情"><div class="project-image"><img src="${p.cover}" alt="${escapeHTML(p.title)}设计作品" width="1305" height="923" loading="lazy"><span class="card-index">${pad(index + 1)}</span><span class="card-open" aria-hidden="true">↗</span></div><div class="project-caption"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.en)}</p></div><span class="project-type">${escapeHTML(p.type)}</span></div></button>`;
  }).join('');
  $$('.project-card').forEach(card => card.addEventListener('click', () => openProject(Number(card.dataset.project))));
  filterProjects($('.filters .is-active').dataset.filter);
}
function filterProjects(category) {
  let count = 0;
  $$('.project-card').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  $('#filter-status').textContent = `显示 ${count} 个作品`;
  // Keep filtered groups in a balanced two-column arrangement.
  $('#project-grid').classList.toggle('is-filtered', category !== 'all');
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(b => {
    b.classList.toggle('is-active', b === button);
    b.setAttribute('aria-pressed', String(b === button));
  });
  filterProjects(button.dataset.filter);
}));
$$('[data-view]').forEach(button => button.addEventListener('click', () => {
  $$('[data-view]').forEach(b => {
    b.classList.toggle('is-active', b === button);
    b.setAttribute('aria-pressed', String(b === button));
  });
  $('#project-grid').classList.toggle('is-list', button.dataset.view === 'list');
}));

function setHero(step) {
  heroSlide = (heroSlide + step + heroProjects.length) % heroProjects.length;
  $$('.hero-background').forEach((img, index) => img.classList.toggle('is-active', index === heroSlide));
  const index = heroProjects[heroSlide];
  const title = projects[index]?.title || ['共享社区活动中心','','促进自闭儿童社交能力的空间','','木梁观岩茶器馆'][index];
  $('.hero-project-number').textContent = `${pad(index + 1)} — FEATURED PROJECT`;
  $('.hero-project-title').innerHTML = `${escapeHTML(title)} <span>↗</span>`;
  $('#hero-counter').innerHTML = `${pad(heroSlide + 1)} <i>/ 03</i>`;
}
$('#hero-prev').addEventListener('click', () => setHero(-1));
$('#hero-next').addEventListener('click', () => setHero(1));
$('#hero-project').addEventListener('click', () => { if (projects.length) openProject(heroProjects[heroSlide]); });
const heroWindow = $('#hero-window');
heroWindow.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
  const rect = heroWindow.getBoundingClientRect();
  heroWindow.style.setProperty('--mx', `${(event.clientX / rect.width - .5) * -10}px`);
  heroWindow.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * -8}px`);
});
heroWindow.addEventListener('pointerleave', () => { heroWindow.style.setProperty('--mx', '0px'); heroWindow.style.setProperty('--my', '0px'); });

$('.menu-toggle').addEventListener('click', () => {
  showDialog(menu);
  $('.menu-toggle').setAttribute('aria-expanded', 'true');
});
$('.menu-close').addEventListener('click', () => menu.close());
$$('a[href^="#"]', menu).forEach(a => a.addEventListener('click', () => menu.close()));
menu.addEventListener('close', () => { $('.menu-toggle').setAttribute('aria-expanded', 'false'); syncScroll(); });
menu.addEventListener('click', event => { if (event.target === menu && event.clientX < menu.getBoundingClientRect().left) menu.close(); });

function renderCase() {
  const p = projects[currentProject];
  const nextIndex = (currentProject + 1) % projects.length;
  const preview = url => url.replace('assets/', 'assets/previews/');
  const pagePath = number => `assets/previews/page-${pad(number)}.webp`;
  $('#case-header-label').textContent = `PROJECT ${pad(currentProject + 1)} / 07`;
  $('#case-content').innerHTML = `
    <div class="case-intro"><div class="case-kicker"><span>SELECTED PROJECT / ${pad(currentProject + 1)}</span><span>${escapeHTML(p.type)}</span></div><h2 id="case-title">${escapeHTML(p.title)}</h2><p class="case-en">${escapeHTML(p.en)}</p><div class="case-meta"><div><p><span>CONTEXT</span>${escapeHTML(p.location)}</p><p><span>DISCIPLINE</span>${escapeHTML(p.type)}</p><p><span>PORTFOLIO</span>${p.pages.length} 页完整作品</p></div><button class="solid-button" data-open-page="0">进入大图阅览 <span>↗</span></button></div></div>
    <div class="case-cover"><img src="${p.cover}" alt="${escapeHTML(p.title)}主视觉" width="1305" height="923"></div>
    <section class="case-story"><div><p class="case-story-label">THE QUESTION / 设计从何开始</p><h3>${escapeHTML(p.question)}</h3></div><div class="case-story-text"><p>${escapeHTML(p.approach)}</p><div class="skill-tags" aria-label="项目体现的能力">${p.skills.map(s => `<span>${escapeHTML(s)}</span>`).join('')}</div></div></section>
    <section class="case-process"><div class="case-process-heading"><h3>从思考，到表达。</h3><span>RESEARCH → PROCESS → OUTCOME</span></div><div class="process-grid">${p.stages.map((stage, index) => `<div class="process-item"><button class="process-image" data-open-page="${p.sourcePages.indexOf(stage.page)}" aria-label="查看${escapeHTML(stage.title)}作品页"><img src="${pagePath(stage.page)}" alt="${escapeHTML(stage.title)}设计过程" loading="lazy" width="1000" height="707"></button><span class="process-number">0${index + 1}</span><h4>${escapeHTML(stage.title)}</h4><p>${escapeHTML(stage.text)}</p></div>`).join('')}</div></section>
    <section class="case-gallery"><div class="gallery-heading"><div><h3>完整作品，一页页看。</h3><p>${p.pages.length} PAGES / 点击页面进入大图阅览</p></div><button data-open-page="0">沉浸阅览 ↗</button></div><div class="gallery-grid">${p.pages.map((page, index) => `<button class="gallery-page" data-open-page="${index}" aria-label="打开${escapeHTML(p.title)}第 ${index + 1} 页"><div><img src="${preview(page)}" alt="${escapeHTML(p.title)}，原作品集第 ${p.sourcePages[index]} 页" loading="lazy" decoding="async" width="1000" height="707"></div><span><span>${pad(index + 1)} / ${pad(p.pages.length)}</span><span>原作品集 P.${pad(p.sourcePages[index])} ↗</span></span></button>`).join('')}</div></section>
    <button class="case-next" data-next-project="${nextIndex}"><div><small>NEXT EXPLORATION / ${pad(nextIndex + 1)}</small><h3>${escapeHTML(projects[nextIndex].title)}</h3></div><span aria-hidden="true">↗</span></button>`;
  $$('[data-open-page]', $('#case-content')).forEach(b => b.addEventListener('click', () => openViewer(Number(b.dataset.openPage))));
  $('[data-next-project]', $('#case-content')).addEventListener('click', () => openProject(nextIndex, true));
  $('#case-scroll').scrollTo({ top: 0, behavior: 'instant' });
  document.title = `${p.title} — 陈智贤 CHEN ZHIXIAN`;
}
function openProject(index, replace = false, fromRoute = false) {
  if (!projects[index]) return;
  if (!caseDialog.open) {
    originFocus = document.activeElement;
    if (!location.hash.startsWith('#project/')) previousHash = location.hash || '#work';
  }
  currentProject = index;
  renderCase();
  if (!fromRoute) {
    const method = replace ? 'replaceState' : 'pushState';
    history[method]({ portfolioCase: true }, '', `#project/${projects[index].id}`);
  }
  showDialog(caseDialog);
  $('.case-close').focus({preventScroll:true});
}
function closeProject() {
  if (imageDialog.open) imageDialog.close();
  if (caseDialog.open) caseDialog.close();
  if (location.hash.startsWith('#project/')) {
    if (history.state?.portfolioCase) history.back();
    else history.replaceState(null, '', previousHash);
  }
}
function routeProject() {
  if (!projects.length) return;
  const match = location.hash.match(/^#project\/([a-z-]+)$/);
  const index = match ? projects.findIndex(p => p.id === match[1]) : -1;
  if (index >= 0) openProject(index, false, true);
  else if (caseDialog.open) { if (imageDialog.open) imageDialog.close(); caseDialog.close(); }
}
window.addEventListener('popstate', routeProject);
window.addEventListener('hashchange', routeProject);
$('.case-close').addEventListener('click', closeProject);
$('.case-brand').addEventListener('click', event => { event.preventDefault(); closeProject(); });
caseDialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
caseDialog.addEventListener('close', () => {
  syncScroll();
  document.title = '陈智贤 CHEN ZHIXIAN — 空间 · 研究 · 视觉';
  if (originFocus?.isConnected) originFocus.focus({preventScroll:true});
});

function openViewer(page) {
  currentPage = Math.max(0, Math.min(projects[currentProject].pages.length - 1, page));
  const p = projects[currentProject];
  $('#viewer-project').textContent = p.title;
  $('#viewer-thumbnails').innerHTML = p.pages.map((src, index) => `<button class="viewer-thumbnail" data-viewer-page="${index}" aria-label="第 ${index + 1} 页" aria-pressed="false"><img src="${src.replace('assets/', 'assets/thumbs/')}" alt="" loading="lazy" width="220" height="156"></button>`).join('');
  $$('.viewer-thumbnail').forEach(b => b.addEventListener('click', () => { currentPage = Number(b.dataset.viewerPage); renderPage(); }));
  resetZoom();
  showDialog(imageDialog);
  renderPage();
  $('#viewer-close').focus({preventScroll:true});
}
function resetZoom() {
  viewerStage.classList.remove('is-zoomed');
  $('#viewer-zoom').setAttribute('aria-pressed', 'false');
  $('#viewer-zoom').textContent = '放大 +';
  viewerStage.scrollTo(0, 0);
}
function renderPage() {
  const p = projects[currentProject];
  const token = ++viewerRequest;
  resetZoom();
  viewerStage.classList.add('is-loading');
  $('#viewer-loading').hidden = false;
  $('#viewer-loading').textContent = '正在加载作品…';
  viewerImage.alt = `${p.title}，第 ${currentPage + 1} 页，共 ${p.pages.length} 页`;
  viewerImage.onload = () => {
    if (token !== viewerRequest) return;
    viewerStage.classList.remove('is-loading');
    $('#viewer-loading').hidden = true;
  };
  viewerImage.onerror = () => {
    if (token !== viewerRequest) return;
    $('#viewer-loading').textContent = '图片加载失败，请切换页面后重试';
  };
  viewerImage.src = p.pages[currentPage];
  $('#viewer-caption').textContent = `原作品集 · 第 ${p.sourcePages[currentPage]} 页`;
  $('#viewer-count').textContent = `${pad(currentPage + 1)} / ${pad(p.pages.length)}`;
  $('#viewer-slider').max = p.pages.length;
  $('#viewer-slider').value = currentPage + 1;
  $('#viewer-prev').disabled = currentPage === 0;
  $('#viewer-next').disabled = currentPage === p.pages.length - 1;
  $$('.viewer-thumbnail').forEach((thumb, index) => {
    thumb.classList.toggle('is-active', index === currentPage);
    thumb.setAttribute('aria-pressed', String(index === currentPage));
  });
  const active = $('.viewer-thumbnail.is-active');
  if (active) $('#viewer-thumbnails').scrollTo({left:active.offsetLeft - $('#viewer-thumbnails').clientWidth / 2 + active.clientWidth / 2,behavior:reducedMotion.matches ? 'instant' : 'smooth'});
  if (currentPage + 1 < p.pages.length) { const next = new Image(); next.src = p.pages[currentPage + 1]; }
}
function stepPage(step) {
  const next = currentPage + step;
  if (next >= 0 && next < projects[currentProject].pages.length) { currentPage = next; renderPage(); }
}
$('#viewer-prev').addEventListener('click', () => stepPage(-1));
$('#viewer-next').addEventListener('click', () => stepPage(1));
$('#viewer-slider').addEventListener('input', event => { currentPage = Number(event.target.value) - 1; renderPage(); });
$('#viewer-close').addEventListener('click', () => imageDialog.close());
$('#viewer-zoom').addEventListener('click', () => {
  const zoomed = viewerStage.classList.toggle('is-zoomed');
  $('#viewer-zoom').textContent = zoomed ? '适应窗口 −' : '放大 +';
  $('#viewer-zoom').setAttribute('aria-pressed', String(zoomed));
});
$('#viewer-fullscreen').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await $('#viewer-shell').requestFullscreen();
  } catch { notify('当前浏览器暂不支持系统全屏'); }
});
imageDialog.addEventListener('close', () => {
  viewerRequest++;
  syncScroll();
  resetZoom();
  if (document.fullscreenElement === $('#viewer-shell')) document.exitFullscreen().catch(() => {});
});
// Capture here so navigation still works when a focused arrow becomes disabled.
document.addEventListener('keydown', event => {
  if (!imageDialog.open || event.target.matches('input')) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); stepPage(1); }
  else if (event.key === 'ArrowLeft') { event.preventDefault(); stepPage(-1); }
  else if (event.key === 'Home') { event.preventDefault(); currentPage = 0; renderPage(); }
  else if (event.key === 'End') { event.preventDefault(); currentPage = projects[currentProject].pages.length - 1; renderPage(); }
}, true);
let touchStart = null;
viewerStage.addEventListener('touchstart', event => {
  if (event.touches.length === 1 && !viewerStage.classList.contains('is-zoomed')) touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY};
  else touchStart = null;
}, {passive:true});
viewerStage.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) stepPage(dx < 0 ? 1 : -1);
  touchStart = null;
}, {passive:true});
viewerStage.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});

async function copyWechat() {
  const number = '18831181378';
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(number);
    else {
      const text = document.createElement('textarea');
      text.value = number;
      text.style.cssText = 'position:fixed;opacity:0;left:0;top:0';
      wechatDialog.append(text); text.select();
      const copied = document.execCommand('copy'); text.remove();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    $('#wechat-status').textContent = '微信号已复制，打开微信搜索即可添加。';
    $('#copy-wechat').innerHTML = '已复制微信号 <span>✓</span>';
  } catch {
    $('#wechat-status').textContent = '请长按或选中上方号码复制，在微信中搜索添加。';
    const selection = window.getSelection();
    const range = document.createRange(); range.selectNodeContents($('.wechat-number')); selection.removeAllRanges(); selection.addRange(range);
  }
}
$('#wechat-button').addEventListener('click', () => { showDialog(wechatDialog); copyWechat(); });
$('#copy-wechat').addEventListener('click', copyWechat);
$('.wechat-close').addEventListener('click', () => wechatDialog.close());
wechatDialog.addEventListener('close', syncScroll);
wechatDialog.addEventListener('click', event => {
  const r = wechatDialog.getBoundingClientRect();
  if (event.target === wechatDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) wechatDialog.close();
});
loadProjects();

// Adapt the reference's chapter transitions, magnetic controls and process disclosure.
$$('.method-step').forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  $$('.method-step').forEach(other => { if (other !== detail) other.open = false; });
  $('#method-image').src = `assets/previews/page-${detail.dataset.methodImage}.webp`;
  $('#method-image').alt = detail.dataset.methodAlt;
  $('#method-image-label').textContent = detail.dataset.methodLabel;
}));
function updateLocalTime() {
  $('#local-time').textContent = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
}
updateLocalTime();
setInterval(updateLocalTime, 60000);
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
  }), {threshold:0.1});
  $$('.intro h2, .work-heading, .method-heading, .about-content h2, .capability, .contact h2').forEach(el => { el.classList.add('reveal-element'); observer.observe(el); });
}
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion.matches) {
  const cursor = $('#custom-cursor');
  let cursorFrame;
  document.addEventListener('pointermove', event => {
    if (cursorFrame) cancelAnimationFrame(cursorFrame);
    cursorFrame = requestAnimationFrame(() => {
      cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest('a,button,summary,input')));
    });
  }, {passive:true});
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  $$('.hero-controls button, .menu-toggle').forEach(el => {
    el.addEventListener('pointermove', event => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.15}px,${(event.clientY-r.top-r.height/2)*.15}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

document.addEventListener('fullscreenchange', () => { $('#viewer-fullscreen').textContent = document.fullscreenElement === $('#viewer-shell') ? '退出全屏 ↙' : '全屏 ↗'; });
