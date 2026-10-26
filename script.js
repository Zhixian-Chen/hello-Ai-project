// Resume extracted from the supplied portfolio; GitHub uses the repository owner profile.
const profile = { resume: 'assets/chen-zhixian-resume.pdf', github: 'https://github.com/Zhixian-Chen' };
const projects = [{"title": "共享社区活动中心", "description": "以邯郸社区为场地，从不同人群的活动需求与共享程度出发，结合自然采光、通风与绿植，探索社区公共空间的连接方式。", "pages": ["assets/page-18.webp", "assets/page-16.webp", "assets/page-19.webp", "assets/page-12.webp", "assets/page-13.webp"]}, {"title": "农产品批发市场", "description": "回应路边摊位、交通拥挤与市场容量问题，通过功能分区、共享阶梯与无障碍流线，连接日常交易和地方文化活动。", "pages": ["assets/page-30.webp", "assets/page-27.webp", "assets/page-31.webp", "assets/page-25.webp", "assets/page-26.webp"]}, {"title": "促进自闭儿童社交能力的空间", "description": "从儿童社交需求与空间体验出发，运用弧形空间、活动场景与体块推演，探索支持交流和互动的环境设计。", "pages": ["assets/page-43.webp", "assets/page-40.webp", "assets/page-44.webp", "assets/page-37.webp", "assets/page-39.webp"]}, {"title": "共享办公空间", "description": "针对校园临时办公与用地紧张的问题，采用钢结构与大面积玻璃，兼顾空间通透性、拆卸和后续扩建的可能。", "pages": ["assets/page-55.webp", "assets/page-53.webp", "assets/page-56.webp", "assets/page-51.webp", "assets/page-52.webp"]}, {"title": "木梁观岩茶器馆", "description": "以木构为主体、茶韵为内核，将实木梁柱、自然石材和暖调灯光融入展示与品茶空间。通过 AI 辅助推演空间形态、视角与材质表达。", "pages": ["assets/page-61.webp", "assets/page-62.webp", "assets/page-64.webp", "assets/page-65.webp", "assets/page-66.webp", "assets/page-67.webp", "assets/page-58.webp", "assets/page-60.webp"]}, {"title": "德州水路驿站复原图", "description": "以德州水路驿站为主题，开展 AI 辅助复原图与航拍视角视频生成探索。此处展示作品集中的复原视觉与过程图。", "pages": ["assets/page-71.webp", "assets/page-72.webp", "assets/page-73.webp"]}, {"title": "手绘与平面作品", "description": "从黑白构成、手绘表现到平面编排，记录视觉语言、色彩与空间表达的持续练习。", "pages": ["assets/page-77.webp", "assets/page-75.webp", "assets/page-76.webp", "assets/page-78.webp", "assets/page-79.webp"]}];
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
document.querySelectorAll('.project').forEach(project => project.addEventListener('click', () => {
  document.querySelector('#modal-title').textContent = project.querySelector('h3').textContent;
  document.querySelector('#modal-number').textContent = project.dataset.number;
  const artwork = project.querySelector('.project-image').cloneNode(true);
  artwork.setAttribute('aria-hidden', 'true');
  document.querySelector('#modal-art').replaceChildren(artwork);
  const detail = projects[Number(project.dataset.number) - 1];
  document.querySelector('#modal-description').textContent = detail.description;
  document.querySelector('#modal-gallery').replaceChildren(...detail.pages.slice(1).map((src, i) => { const img = new Image(); img.src = src; img.alt = `${detail.title} · 作品集图 ${i + 2}`; img.loading = 'lazy'; return img; }));
  dialog.showModal();
}));
document.querySelectorAll('.close-dialog,.text-close').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
for (const key of ['resume', 'github']) document.querySelector(`#${key}-button`).addEventListener('click', () => {
  if (profile[key]) window.open(profile[key], '_blank', 'noopener,noreferrer');
  else document.querySelector('#contact-status').textContent = key === 'resume' ? '简历文件待上传，完成后可在这里查看。' : '个人 GitHub 地址待补充。';
});
