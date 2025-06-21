
const portfolioData = {
  flat: [
    {id: 1, img: 'slider/жк балтийский.png', title: 'ЖК Балтийский', desc: 'Описание квартиры 1', size: 'short'},
    {id: 2, img: 'slider/жк саморкад.jpg', title: 'ЖК Саморкад', desc: 'Описание квартиры 2', size: 'short'},
    {id: 3, img: 'slider/iron speedy.png', title: 'Iron Speedy', desc: 'Описание квартиры 3', size: 'short'},
    {id: 4, img: 'slider/batmansity.png', title: 'Batmansity', desc: 'Описание квартиры 4', size: 'short'},
    {id: 5, img: 'slider/green pool.jpg', title: 'Green Pool', desc: 'Описание квартиры 5', size: 'short'},
    {id: 6, img: 'slider/2.jpg', title: 'Современный лофт', desc: 'Описание квартиры 6', size: 'short'},
    {id: 7, img: 'slider/3.png', title: 'Минимализм', desc: 'Описание квартиры 7', size: 'short'}
  ],
  house: [
    {id: 8, img: 'slider/1.jpg', title: 'Дом у озера', desc: 'Описание дома 1', size: 'short'},
    {id: 9, img: 'slider/4.jpg', title: 'Коттедж', desc: 'Описание дома 2', size: 'short'},
    {id: 10, img: 'slider/green pool.jpg', title: 'Вилла', desc: 'Описание дома 3', size: 'short'},
    {id: 11, img: 'slider/batmansity.png', title: 'Шале', desc: 'Описание дома 4', size: 'short'},
    {id: 12, img: 'slider/iron speedy.png', title: 'Таунхаус', desc: 'Описание дома 5', size: 'short'},
    {id: 13, img: 'slider/жк саморкад.jpg', title: 'Дача', desc: 'Описание дома 6', size: 'short'},
    {id: 14, img: 'slider/жк балтийский.png', title: 'Особняк', desc: 'Описание дома 7', size: 'short'}
  ],
  commercial: [
    {id: 15, img: 'slider/5.png', title: 'Офис 1', desc: 'Описание офиса 1', size: 'short'},
    {id: 16, img: 'slider/4.jpg', title: 'Офис 2', desc: 'Описание офиса 2', size: 'short'},
    {id: 17, img: 'slider/3.png', title: 'Офис 3', desc: 'Описание офиса 3', size: 'short'},
    {id: 18, img: 'slider/2.jpg', title: 'Офис 4', desc: 'Описание офиса 4', size: 'short'},
    {id: 19, img: 'slider/1.jpg', title: 'Офис 5', desc: 'Описание офиса 5', size: 'short'},
    {id: 20, img: 'slider/green pool.jpg', title: 'Офис 6', desc: 'Описание офиса 6', size: 'short'},
    {id: 21, img: 'slider/batmansity.png', title: 'Офис 7', desc: 'Описание офиса 7', size: 'short'}
  ]
};

const sliderImages = [
  'slider/1.jpg',
  'slider/2.jpg',
  'slider/3.png',
  'slider/4.jpg'
];
const sliderLabels = ['ЖК Балтийский', 'ЖК Саморкад', 'Iron Speedy', 'Batmansity'];

const faqData = [
  {q: 'знакомство и заполнение анкеты', a: 'Ответ на вопрос про анкету.'},
  {q: 'заключение договора', a: 'Ответ на вопрос про договор.'},
  {q: 'разработка планировочного решения', a: 'Ответ на вопрос про планировку.'},
  {q: 'составление коллажей концепции', a: 'Ответ на вопрос про коллажи.'}
];

// --- Слайдер ---
function createSlider({containerId, images, labels = []}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="slider">
      <div class="slider-title">Дизайн-проекты студии</div>
      <div class="slider-label"></div>
      <img class="slider-img" src="${images[0]}" alt="Слайд 1">
      <div class="slider-indicators"></div>
      <div class="slider-thumbs"></div>
    </div>
  `;
  let current = 0;
  const img = container.querySelector('.slider-img');
  const label = container.querySelector('.slider-label');
  const indicators = container.querySelector('.slider-indicators');
  const thumbs = container.querySelector('.slider-thumbs');

  function renderIndicators() {
    indicators.innerHTML = '';
    images.forEach((_, idx) => {
      const bar = document.createElement('div');
      bar.className = 'slider-bar' + (idx === current ? ' active' : '');
      bar.addEventListener('click', () => showSlide(idx));
      indicators.appendChild(bar);
    });
  }
  function renderThumbs() {
    thumbs.innerHTML = '';
    images.forEach((src, idx) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'slider-thumb' + (idx === current ? ' active' : '');
      thumb.addEventListener('click', () => showSlide(idx));
      thumbs.appendChild(thumb);
    });
  }
  function showSlide(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    img.classList.add('fade');
    setTimeout(() => {
      img.src = images[index];
      img.classList.remove('fade');
    }, 350);
    current = index;
    label.textContent = labels[index] || '';
    renderIndicators();
    renderThumbs();
  }
  renderIndicators();
  renderThumbs();
  label.textContent = labels[0] || '';
}

// --- Карточки работ ---
function renderPortfolioCards(type = 'flat') {
  console.log('renderPortfolioCards', type, portfolioData[type]);
  const cards = portfolioData[type] || [];
  const container = document.getElementById('portfolioCards');
  if (!container) return;
  // Формируем нужные группы карточек
  let filledCards = [];
  while (filledCards.length < 8) {
    filledCards = filledCards.concat(cards);
  }
  filledCards = filledCards.slice(0, 8);
  // 1 столбец: 2 карточки по 900px
  const col1 = filledCards.slice(0, 2);
  // 2 столбец: 3 карточки (верхняя short)
  const col2 = [
    { ...filledCards[2], short: true },
    filledCards[3],
    filledCards[4]
  ];
  // 3 столбец: 3 карточки (нижняя short)
  const col3 = [
    filledCards[5],
    filledCards[6],
    { ...filledCards[7], short: true }
  ];
  container.innerHTML = `
    <div class="portfolio-column first">
      ${col1.map(card => `
        <div class="portfolio-item">
          <img src="${card.img}" alt="${card.title}">
          <div class="portfolio-title portfolio-title-top">${card.title}</div>
          <div class="portfolio-desc">${card.desc}</div>
          <button class="portfolio-plus" data-id="${card.id}">+</button>
        </div>
      `).join('')}
    </div>
    <div class="portfolio-column">
      ${col2.map((card, idx) => `
        <div class="portfolio-item${card.short ? ' short' : ''}">
          <img src="${card.img}" alt="${card.title}">
          <div class="portfolio-title portfolio-title-top">${card.title}</div>
          <div class="portfolio-desc">${card.desc}</div>
          <button class="portfolio-plus" data-id="${card.id}">+</button>
        </div>
      `).join('')}
    </div>
    <div class="portfolio-column">
      ${col3.map((card, idx) => `
        <div class="portfolio-item${card.short ? ' short' : ''}">
          <img src="${card.img}" alt="${card.title}">
          <div class="portfolio-title portfolio-title-top">${card.title}</div>
          <div class="portfolio-desc">${card.desc}</div>
          <button class="portfolio-plus" data-id="${card.id}">+</button>
        </div>
      `).join('')}
    </div>
  `;

  // Обработчик клика на плюс
  container.querySelectorAll('.portfolio-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      // Переход на детальную страницу (заглушка)
      window.location.href = `portfolio-detail.html?id=${id}`;
    });
  });
}

// --- Фильтр ---
document.addEventListener('DOMContentLoaded', () => {
  // Слайдер
  createSlider({containerId: 'portfolio-slider', images: sliderImages, labels: sliderLabels});

  // Фильтр
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  let currentType = 'flat';
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      renderPortfolioCards(currentType);
    });
  });
  renderPortfolioCards(currentType);
 

  // Этапы работы (используем локальную функцию для portfolio)
  if (document.getElementById('workStepsList')) {
    portfolioRenderWorkSteps([
      'знакомство и заполнение анкеты',
      'заключение договора',
      'разработка планировочного решения',
      'составление коллажей концепции',
      '3д визуализация',
      'разработка полного пакета чертежей',
      'подготовка сметы чистовых материалов',
      'сдача проекта для реализации'
    ], 'steps/', [
      'жк балтийский.png',
      'green pool.jpg',
      'batmansity.png',
      'iron speedy.png',
      'жк саморкад.jpg',
      'надеждой и сергеем бойко.jpg',
      'бегущая строка.png',
      '1.jpg'
    ]);
  }

  // FAQ
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = '';
    faqData.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'faq-question';
      li.textContent = item.q;
      li.style.cursor = 'pointer';
      li.addEventListener('click', function() {
        // Удалить старый ответ, если есть
        const old = faqList.querySelector('.faq-answer');
        if (old) old.remove();
        // Вставить ответ под этим вопросом
        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.textContent = item.a;
        li.insertAdjacentElement('afterend', answer);
      });
      faqList.appendChild(li);
    });
  }

  // Отзывы (адаптивно)
  setTimeout(() => {
    let visible = getVisibleReviewsCount();
    if (visible >= portfolioReviewsData.length) visible = portfolioReviewsData.length - 1;
    window.initReviewsSliderLoop('reviewsSlider', visible);
    // Пересоздаём слайдер при ресайзе
    window.addEventListener('resize', () => {
      let newVisible = getVisibleReviewsCount();
      if (newVisible >= portfolioReviewsData.length) newVisible = portfolioReviewsData.length - 1;
      window.initReviewsSliderLoop('reviewsSlider', newVisible);
    });
  }, 0);

  renderReviewsMarquee();
});

// --- Этапы работы (Work Steps) для portfolio ---
function portfolioRenderWorkSteps(steps, imagesFolder, imagesArr) {
  const list = document.getElementById('workStepsList');
  const image = document.getElementById('workStepsImage');
  if (!list || !image) return;
  list.innerHTML = '';
  let activeIdx = 0;
  function getImage(idx) {
    // Повторяем картинки по кругу
    const imgIdx = idx % imagesArr.length;
    return imagesFolder + imagesArr[imgIdx];
  }
  function showImage(idx) {
    image.innerHTML = `<img src="${getImage(idx)}" alt="${steps[idx]}">`;
    list.querySelectorAll('.work-step').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
  steps.forEach((step, idx) => {
    const li = document.createElement('li');
    li.className = 'work-step' + (idx === 0 ? ' active' : '');
    li.textContent = step;
    li.addEventListener('mouseenter', () => li.classList.add('active'));
    li.addEventListener('mouseleave', () => {
      if (activeIdx !== idx) li.classList.remove('active');
    });
    li.addEventListener('click', () => {
      activeIdx = idx;
      showImage(idx);
    });
    list.appendChild(li);
  });
  showImage(0);
}

// --- Отзывы (Reviews Slider) ---
// Используем reviewsData из script.js, если доступно, иначе создаем локальную версию
const portfolioReviewsData = window.reviewsData || [
  {
    photo: 'images/Group 2.svg',
    name: 'Алексей Ковалёв',
    date: '17.11.2024',
    text: 'Институт дизайна стал для меня важным этапом в профессиональном развитии. Программа курса была очень насыщенной: от основ графического дизайна до продвинутых техник работы с современными...'
  },
  {
    photo: 'images/Group 4.svg',
    name: 'Марина Смирнова',
    date: '17.11.2024',
    text: 'Занятия в институте не просто интересные — они действительно полезные. Каждая лекция и мастер-класс продуманы до мелочей, давая возможность погрузиться в профессию. Структура курса позволяет...'
  },
  {
    photo: 'images/textalign-left.svg',
    name: 'Михаил Фёдоров',
    date: '17.11.2024',
    text: 'Институт стал для меня не только местом обучения, но и площадкой для нетворкинга. Прекрасная возможность познакомиться с людьми, которые помогут в будущем профессиональном росте.'
  },
  {
    photo: 'images/Group 2.svg',
    name: 'Екатерина Иванова',
    date: '16.11.2024',
    text: 'Очень благодарна преподавателям за индивидуальный подход и поддержку на каждом этапе обучения. Полученные знания уже применяю в работе!'
  },
  {
    photo: 'images/Group 4.svg',
    name: 'Денис Петров',
    date: '15.11.2024',
    text: 'Курс помог мне раскрыть творческий потенциал и научил мыслить как дизайнер. Отличная атмосфера и много практики!'
  },
  {
    photo: 'images/textalign-left.svg',
    name: 'Светлана Орлова',
    date: '14.11.2024',
    text: 'Современная программа, интересные проекты и поддержка кураторов — всё это сделало обучение незабываемым.'
  }
];

function createReviewCard({photo, name, date, text}) {
  return `
    <div class="review-card">
      <div class="review-card-header">
        <img class="review-card-photo" src="${photo}" alt="${name}">
        <div class="review-card-info">
          <div class="review-card-name">${name}</div>
          <div class="review-card-date">${date}</div>
        </div>
      </div>
      <div class="review-card-text">${text}</div>
    </div>
  `;
}

function renderReviewsSliderLoop(data, visible) {
  const slider = document.getElementById('reviewsSlider');
  if (!slider) return;
  // Для бесконечного слайдера: дублируем последние visible и первые visible карточек
  const extended = [
    ...data.slice(-visible),
    ...data,
    ...data.slice(0, visible)
  ];
  slider.innerHTML = extended.map(createReviewCard).join('');
  return extended;
}

window.createReviewCard = createReviewCard;
window.renderReviewsSliderLoop = renderReviewsSliderLoop;
// Не переопределяем reviewsData если она уже существует
if (!window.reviewsData) {
  window.reviewsData = portfolioReviewsData;
}
window.initReviewsSliderLoop = function(selector = 'reviewsSlider', visible = 3) {
  const slider = document.getElementById(selector);
  if (!slider) return;
  let current = visible;
  let animating = false;
  const leftBtn = document.querySelector('.reviews-arrow-left');
  const rightBtn = document.querySelector('.reviews-arrow-right');
  let extended = renderReviewsSliderLoop(portfolioReviewsData, visible);
  function updateSlider(animate = true) {
    const cards = slider.querySelectorAll('.review-card');
    cards.forEach(card => card.classList.remove('slide-in-left', 'slide-in-right'));
    slider.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
    const cardWidth = cards[0]?.offsetWidth || 400;
    const gap = 32;
    slider.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
  }
  function slide(dir) {
    if (animating) return;
    animating = true;
    current += dir;
    updateSlider();
    setTimeout(() => {
      // Если ушли за край — мгновенно перескакиваем на начало/конец
      if (current <= 0) {
        current = portfolioReviewsData.length;
        updateSlider(false);
      }
      if (current >= portfolioReviewsData.length - visible + 1) {
        current = visible;
        updateSlider(false);
      }
      animating = false;
    }, 600);
  }
  if (leftBtn && rightBtn) {
    leftBtn.onclick = () => slide(-1);
    rightBtn.onclick = () => slide(1);
  }
  updateSlider(false);
};

function getVisibleReviewsCount() {
  const wrapper = document.querySelector('.reviews-slider-wrapper');
  const card = document.querySelector('.review-card');
  if (!wrapper || !card) return 1;
  const wrapperWidth = wrapper.offsetWidth;
  const cardWidth = card.offsetWidth;
  let gap = 32;
  const cards = document.querySelectorAll('.review-card');
  if (cards.length > 1) {
    gap = cards[1].offsetLeft - cards[0].offsetLeft - cardWidth;
    if (gap < 0) gap = 32;
  }
  let visible = Math.max(1, Math.floor((wrapperWidth + gap) / (cardWidth + gap)));
  if (visible >= portfolioReviewsData.length) visible = portfolioReviewsData.length - 1;
  return visible;
}

function renderReviewsMarquee() {
  const track = document.getElementById('reviewsMarqueeTrack');
  if (!track) return;
  // Дублируем отзывы минимум 2 раза для бесконечной ленты
  let cards = '';
  for (let i = 0; i < 2; i++) {
    portfolioReviewsData.forEach(r => {
      cards += createReviewCard(r);
    });
  }
  track.innerHTML = cards;
}