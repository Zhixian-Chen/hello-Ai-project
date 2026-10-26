// Resume extracted from the supplied portfolio; GitHub uses the repository owner profile.
const profile = { resume: 'assets/chen-zhixian-resume.pdf', github: 'https://github.com/Zhixian-Chen' };
const projects = [{"title": "共享社区活动中心", "description": "以邯郸社区为场地，从不同人群的活动需求与共享程度出发，结合自然采光、通风与绿植，探索社区公共空间的连接方式。", "pages": ["assets/page-07.webp?v=original3", "assets/page-08.webp?v=original3", "assets/page-09.webp?v=original3", "assets/page-10.webp?v=original3", "assets/page-11.webp?v=original3", "assets/page-12.webp?v=original3", "assets/page-13.webp?v=original3", "assets/page-14.webp?v=original3", "assets/page-15.webp?v=original3", "assets/page-16.webp?v=original3", "assets/page-17.webp?v=original3", "assets/page-18.webp?v=original3", "assets/page-19.webp?v=original3"], "sourcePages": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}, {"title": "农产品批发市场", "description": "回应路边摊位、交通拥挤与市场容量问题，通过功能分区、共享阶梯与无障碍流线，连接日常交易和地方文化活动。", "pages": ["assets/page-20.webp?v=original3", "assets/page-21.webp?v=original3", "assets/page-22.webp?v=original3", "assets/page-23.webp?v=original3", "assets/page-24.webp?v=original3", "assets/page-25.webp?v=original3", "assets/page-26.webp?v=original3", "assets/page-27.webp?v=original3", "assets/page-28.webp?v=original3", "assets/page-29.webp?v=original3", "assets/page-30.webp?v=original3", "assets/page-31.webp?v=original3", "assets/page-32.webp?v=original3"], "sourcePages": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]}, {"title": "促进自闭儿童社交能力的空间", "description": "从儿童社交需求与空间体验出发，运用弧形空间、活动场景与体块推演，探索支持交流和互动的环境设计。", "pages": ["assets/page-33.webp?v=original3", "assets/page-34.webp?v=original3", "assets/page-35.webp?v=original3", "assets/page-36.webp?v=original3", "assets/page-37.webp?v=original3", "assets/page-38.webp?v=original3", "assets/page-39.webp?v=original3", "assets/page-40.webp?v=original3", "assets/page-41.webp?v=original3", "assets/page-42.webp?v=original3", "assets/page-43.webp?v=original3", "assets/page-44.webp?v=original3", "assets/page-45.webp?v=original3"], "sourcePages": [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]}, {"title": "共享办公空间", "description": "针对校园临时办公与用地紧张的问题，采用钢结构与大面积玻璃，兼顾空间通透性、拆卸和后续扩建的可能。", "pages": ["assets/page-46.webp?v=original3", "assets/page-47.webp?v=original3", "assets/page-48.webp?v=original3", "assets/page-49.webp?v=original3", "assets/page-50.webp?v=original3", "assets/page-51.webp?v=original3", "assets/page-52.webp?v=original3", "assets/page-53.webp?v=original3", "assets/page-54.webp?v=original3", "assets/page-55.webp?v=original3", "assets/page-56.webp?v=original3"], "sourcePages": [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]}, {"title": "木梁观岩茶器馆", "description": "以木构为主体、茶韵为内核，将实木梁柱、自然石材和暖调灯光融入展示与品茶空间。通过 AI 辅助推演空间形态、视角与材质表达。", "pages": ["assets/page-57.webp?v=original3", "assets/page-58.webp?v=original3", "assets/page-59.webp?v=original3", "assets/page-60.webp?v=original3", "assets/page-61.webp?v=original3", "assets/page-62.webp?v=original3", "assets/page-63.webp?v=original3", "assets/page-64.webp?v=original3", "assets/page-65.webp?v=original3", "assets/page-66.webp?v=original3", "assets/page-67.webp?v=original3", "assets/page-68.webp?v=original3", "assets/page-69.webp?v=original3"], "sourcePages": [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69]}, {"title": "德州水路驿站复原图", "description": "以德州水路驿站为主题，开展 AI 辅助复原图与航拍视角视频生成探索。此处展示作品集中的复原视觉与过程图。", "pages": ["assets/page-70.webp?v=original3", "assets/page-71.webp?v=original3", "assets/page-72.webp?v=original3", "assets/page-73.webp?v=original3"], "sourcePages": [70, 71, 72, 73]}, {"title": "手绘与平面作品", "description": "从黑白构成、手绘表现到平面编排，记录视觉语言、色彩与空间表达的持续练习。", "pages": ["assets/page-74.webp?v=original3", "assets/page-75.webp?v=original3", "assets/page-76.webp?v=original3", "assets/page-77.webp?v=original3", "assets/page-78.webp?v=original3", "assets/page-79.webp?v=original3"], "sourcePages": [74, 75, 76, 77, 78, 79]}];
const hero = document.querySelector('.hero');
if (matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 36}px`);
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 28}px`);
  });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--mx', '0px'); hero.style.setProperty('--my', '0px'); });
}
document.querySelectorAll('[data-filter]').forEach(button => {
  button.setAttribute('aria-pressed', button.classList.contains('active'));
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', item === button); });
    document.querySelectorAll('.project').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; });
  });
});
const dialog = document.querySelector('#project-dialog');
const viewerImage = document.querySelector('#viewer-image');
let currentProject = 0;
let currentPage = 0;
let savedScroll = 0;
function renderPage() {
  const project = projects[currentProject];
  const total = project.pages.length;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-number').textContent = String(currentProject + 1).padStart(2, '0') + ' / 07';
  document.querySelector('#viewer-count').textContent = `${String(currentPage + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  document.querySelector('#viewer-caption').textContent = `原作品集 · 第 ${project.sourcePages[currentPage]} 页`;
  const slider = document.querySelector('#viewer-slider');
  slider.max = total; slider.value = currentPage + 1;
  document.querySelector('#viewer-prev').disabled = currentPage === 0;
  document.querySelector('#viewer-next').disabled = currentPage === total - 1;
  document.querySelector('#viewer-next-project').textContent = currentProject === projects.length - 1 ? '回到首个项目 ↗' : '下个项目 ↗';
  document.querySelector('.viewer-progress span').style.width = `${(currentPage + 1) / total * 100}%`;
  viewerImage.classList.add('is-loading');
  document.querySelector('#viewer-loading').hidden = false;
  viewerImage.alt = `${project.title}，第 ${currentPage + 1} 页，共 ${total} 页`;
  viewerImage.src = project.pages[currentPage];
  if (currentPage + 1 < total) { const next = new Image(); next.src = project.pages[currentPage + 1]; }
}
viewerImage.addEventListener('load', () => { viewerImage.classList.remove('is-loading'); document.querySelector('#viewer-loading').hidden = true; });
viewerImage.addEventListener('error', () => { document.querySelector('#viewer-loading').textContent = '图片暂时无法加载，请切换页面后重试'; });
function openProject(index) {
  currentProject = index; currentPage = 0; renderPage();
  if (!dialog.open) { savedScroll = window.scrollY; dialog.showModal(); document.body.style.overflow = 'hidden'; }
}
function stepPage(step) { const next = currentPage + step; if (next >= 0 && next < projects[currentProject].pages.length) { currentPage = next; renderPage(); } }
document.querySelectorAll('.project').forEach(card => card.addEventListener('click', () => openProject(Number(card.dataset.number) - 1)));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {}); window.scrollTo({ top: savedScroll, behavior: 'instant' }); });
document.querySelector('#viewer-prev').addEventListener('click', () => stepPage(-1));
document.querySelector('#viewer-next').addEventListener('click', () => stepPage(1));
document.querySelector('#viewer-slider').addEventListener('input', event => { currentPage = Number(event.target.value) - 1; renderPage(); });
document.querySelector('#viewer-next-project').addEventListener('click', () => openProject((currentProject + 1) % projects.length));
document.querySelector('#viewer-fullscreen').addEventListener('click', async () => {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else await dialog.requestFullscreen(); }
  catch { document.querySelector('#viewer-caption').textContent = '当前浏览器不支持系统全屏，作品已铺满浏览器窗口'; }
});
dialog.addEventListener('keydown', event => {
  if (event.target.matches('input')) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); stepPage(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); stepPage(-1); }
  if (event.key === 'Home') { event.preventDefault(); currentPage = 0; renderPage(); }
  if (event.key === 'End') { event.preventDefault(); currentPage = projects[currentProject].pages.length - 1; renderPage(); }
});
let touchStart = null;
viewerImage.addEventListener('touchstart', event => { if (event.touches.length === 1) touchStart = event.touches[0].clientX; else touchStart = null; }, { passive: true });
viewerImage.addEventListener('touchend', event => { if (touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 60) stepPage(delta < 0 ? 1 : -1); touchStart = null; }, { passive: true });
for (const key of ['resume', 'github']) document.querySelector(`#${key}-button`).addEventListener('click', () => {
  if (profile[key]) window.open(profile[key], '_blank', 'noopener,noreferrer');
  else document.querySelector('#contact-status').textContent = key === 'resume' ? '简历文件待上传，完成后可在这里查看。' : '个人 GitHub 地址待补充。';
});
