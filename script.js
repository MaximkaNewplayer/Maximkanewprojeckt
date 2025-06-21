// Получаем все фото из services_photos
const servicePhotos = [
  'services_photos/жк балтийский.png',
  'services_photos/надеждой и сергеем бойко.jpg',
  'services_photos/green pool.jpg',
  'services_photos/batmansity.png',
  'services_photos/iron speedy.png',
  'services_photos/жк саморкад.jpg',
  'services_photos/бегущая строка.png',
  'services_photos/5.png',
  'services_photos/3.png',
  'services_photos/2.jpg',
  'services_photos/1.jpg',
  'services_photos/4.jpg'
];

function getPhotosForService(startIdx) {
  // Возвращает 5 фото подряд, с повторением если не хватает
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(servicePhotos[(startIdx + i) % servicePhotos.length]);
  }
  return arr;
}

const servicesData = {
  start: {
    title: "Проект для старта ремонта",
    items: getPhotosForService(0).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для старта ремонта.`,
      price: `от ${1500 + i*500} ₽/м²`,
      image: img
    }))
  },
  express: {
    title: "Экспресс проект",
    items: getPhotosForService(1).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для экспресс проекта.`,
      price: `от ${1800 + i*400} ₽/м²`,
      image: img
    }))
  },
  full: {
    title: "Полный дизайн проект",
    items: getPhotosForService(2).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для полного дизайн проекта.`,
      price: `от ${3000 + i*600} ₽/м²`,
      image: img
    }))
  },
  supervision: {
    title: "Авторский надзор",
    items: getPhotosForService(3).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для авторского надзора.`,
      price: `от ${1000 + i*700} ₽/м²`,
      image: img
    }))
  },
  completion: {
    title: "Комплектация объекта",
    items: getPhotosForService(4).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для комплектации объекта.`,
      price: `от ${1500 + i*800} ₽/м²`,
      image: img
    }))
  },
  day: {
    title: "День с дизайнером",
    items: getPhotosForService(5).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для дня с дизайнером.`,
      price: `от ${15000 + i*2000} ₽/день`,
      image: img
    }))
  },
  homestaging: {
    title: "Хоумстейджинг",
    items: getPhotosForService(6).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для хоумстейджинга.`,
      price: `от ${50000 + i*10000} ₽`,
      image: img
    }))
  }
};

function createServiceThumbs(items, activeIdx) {
  return items.map((item, idx) =>
    `<img src="${item.image}" class="service-thumb${idx === activeIdx ? ' active' : ''}" data-idx="${idx}" alt="thumb">`
  ).join('');
}

function createServiceMainContent(service, itemIdx) {
  const item = service.items[itemIdx];
  return `
    <div>
      <div class="service-main-title">${service.title}</div>
      <div class="service-main-description">${item.description}</div>
      <div class="service-main-price">${item.price}</div>
      <button class="service-main-btn">Заказать</button>
    </div>
  `;
}

function updateServiceBlock(serviceType, itemIdx = 0) {
  const service = servicesData[serviceType];
  if (!service) return;
  const thumbs = document.getElementById('servicesThumbs');
  if (thumbs) thumbs.innerHTML = createServiceThumbs(service.items, itemIdx);
  const mainContent = document.getElementById('serviceMainContent');
  if (mainContent) mainContent.innerHTML = createServiceMainContent(service, itemIdx);
  const mainImage = document.getElementById('serviceMainImage');
  if (mainImage) mainImage.innerHTML = `<img src="${service.items[itemIdx].image}" alt="main">`;

  // События для миниатюр
  if (thumbs) {
    thumbs.querySelectorAll('.service-thumb').forEach(thumb => {
      thumb.addEventListener('click', e => {
        updateServiceBlock(serviceType, +thumb.dataset.idx);
      });
    });
  }
}

// Скролл меню при наведении
function scrollNavItemIntoView(item) {
  const navScroll = document.querySelector('.services-nav-scroll');
  if (!navScroll) return;
  const navRect = navScroll.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  // Если элемент левее видимой области
  if (itemRect.left < navRect.left) {
    navScroll.scrollLeft -= (navRect.left - itemRect.left) + 16; // 16 — запас
  }
  // Если элемент правее видимой области
  else if (itemRect.right > navRect.right) {
    navScroll.scrollLeft += (itemRect.right - navRect.right) + 16;
  }
}

// Массив этапов работ для script.js
const scriptWorkStepsTitles = [
  'знакомство и заполнение анкеты',
  'заключение договора',
  'разработка планировочного решения',
  'составление коллажей концепции',
  '3д визуализация',
  'разработка полного пакета чертежей',
  'подготовка сметы чистовых материалов',
  'сдача проекта для реализации'
];
const scriptWorkStepsImagesFolder = 'steps/';
const scriptWorkStepsImages = [
  'жк балтийский.png',
  'green pool.jpg',
  'batmansity.png',
  'iron speedy.png',
  'жк саморкад.jpg',
  'надеждой и сергеем бойко.jpg',
  'бегущая строка.png',
  '1.jpg'
];

function renderWorkStepsAuto(steps, imagesFolder, imagesArr) {
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

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.service-nav-item');
  let currentService = 'start';
  let currentIdx = 0;
  let scrollInterval = null;
  const navScroll = document.querySelector('.services-nav-scroll');

  function isLeftMost(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return Math.abs(rect.left - parentRect.left) < 5;
  }
  function isRightMost(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return Math.abs(rect.right - parentRect.right) < 5;
  }
  function isFullyVisible(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return rect.left >= parentRect.left && rect.right <= parentRect.right;
  }
  function startAutoScroll(direction, item) {
    stopAutoScroll();
    scrollInterval = setInterval(() => {
      if ((direction < 0 && navScroll.scrollLeft <= 0) ||
          (direction > 0 && navScroll.scrollLeft >= navScroll.scrollWidth - navScroll.clientWidth - 1)) {
        stopAutoScroll();
        return;
      }
      if (isFullyVisible(item)) {
        stopAutoScroll();
        return;
      }
      navScroll.scrollLeft += direction * 12;
    }, 16);
  }
  function stopAutoScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = null;
  }

  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('hovered');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('hovered');
    });
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentService = item.dataset.service;
      currentIdx = 0;
      updateServiceBlock(currentService, currentIdx);
      // Скроллим выбранный пункт в видимую область только по горизонтали
      scrollNavItemIntoView(item);
    });
    item.onfocus = null;
    item.onblur = null;
  });

  // Инициализация
  updateServiceBlock(currentService, currentIdx);

  // Слайдеры (только если есть контейнер)
  if (document.getElementById('main-slider')) {
    createSlider({
      containerId: 'main-slider',
      images: [
        'slider/1.jpg',
        'slider/2.jpg',
        'slider/3.png',
        'slider/4.jpg'
      ],
      labels: ['ЖК Балтийский', 'ЖК Саморкад', 'Iron Speedy', 'Batmansity']
    });
  }
  if (document.getElementById('main-slider-bottom')) {
    createSlider({
      containerId: 'main-slider-bottom',
      images: [
        'slider/1.jpg',
        'slider/2.jpg',
        'slider/3.png',
        'slider/4.jpg'
      ],
      labels: ['ЖК Балтийский', 'ЖК Саморкад', 'Iron Speedy', 'Batmansity']
    });
  }
  if (document.getElementById('vershina-slider')) {
    createSlider({
      containerId: 'vershina-slider',
      images: [
        'services_photos/жк балтийский.png',
        'services_photos/green pool.jpg',
        'services_photos/batmansity.png',
        'services_photos/iron speedy.png'
      ],
      labels: ['Vershina 1', 'Vershina 2', 'Vershina 3', 'Vershina 4'],
      withLogo: true,
      logoSrc: 'services_photos/Group 19.svg'
    });
  }

  // Блок услуг (только если есть servicesThumbs)
  if (document.getElementById('servicesThumbs')) {
    let currentService = 'start';
    let currentIdx = 0;
    updateServiceBlock(currentService, currentIdx);
  }

  // Этапы работы (только если есть workStepsList)
  if (document.getElementById('workStepsList')) {
    renderWorkStepsAuto(scriptWorkStepsTitles, scriptWorkStepsImagesFolder, scriptWorkStepsImages);
  }

  // Отзывы (только если есть reviewsMarqueeTrack)
  if (document.getElementById('reviewsMarqueeTrack')) {
    renderReviewsMarquee();
  }

  // Блог (только если есть blogSlider)
  if (document.getElementById('blogSlider')) {
    (function initBlogSlider() {
      const visible = 2;
      let current = 0;
      const total = blogData.length;
      const slider = document.getElementById('blogSlider');
      const btn = document.getElementById('blogNextBtn');
      const btnText = btn.querySelector('.blog-next-btn-text');
      function render() {
        slider.innerHTML = '';
        for (let i = 0; i < total; i++) {
          slider.innerHTML += createBlogCard(blogData[i]);
        }
        updateTransform(false);
        updateBtn();
        // Переход на all-blocks.html по нажатию клавиши '1'
        window.addEventListener('keydown', function(e) {
          if (e.key === '1') {
            window.location.href = 'all-blocks.html';
          }
        });
      }
      function updateTransform(animate = true) {
        slider.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
        const cardWidth = 725 + 48; // ширина карточки + gap
        slider.style.transform = `translateX(-${current * cardWidth}px)`;
      }
      function updateBtn() {
        if (current + visible >= total) {
          btn.classList.add('to-start');
          btnText.textContent = 'Вначало';
        } else {
          btn.classList.remove('to-start');
          btnText.textContent = 'Дальше';
        }
      }
      btn.addEventListener('click', () => {
        if (current + visible >= total) {
          current = 0;
        } else {
          current++;
        }
        updateTransform();
        updateBtn();
      });
      render();
    })();
  }

  // Вставка SVG в hero-блок
  const heroVectorsContainer = document.getElementById('heroVectors');
  if (heroVectorsContainer) {
    heroVectors.forEach(svg => {
      const div = document.createElement('div');
      div.innerHTML = svg;
      // Меняем цвет заливки на черный
      const svgEl = div.firstChild;
      if (svgEl && svgEl.querySelector) {
        const path = svgEl.querySelector('path');
        if (path) path.setAttribute('fill', '#222');
      }
      heroVectorsContainer.appendChild(div.firstChild);
    });
  }

  // Анимация появления векторов при скролле
  function handleHeroVectorsScroll() {
    const vectors = document.querySelector('.hero-vectors');
    if (!vectors) return;
    const rect = vectors.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      vectors.classList.add('reveal');
    } else {
      vectors.classList.remove('reveal');
    }
  }
  window.addEventListener('scroll', handleHeroVectorsScroll);
  handleHeroVectorsScroll();
  
  // Обработчик клика по .portfolio-col
  document.querySelectorAll('.portfolio-col').forEach(col => {
    col.addEventListener('click', function() {
      // Определяем тип (можно добавить data-type на .portfolio-col)
      const type = this.dataset.type || 'all';
      window.location.href = `portfolio.html?type=${type}`;
    });
  });

  const whyBtn = document.querySelector('.why-play-btn');
  if (whyBtn) {
    whyBtn.addEventListener('click', function() {
      window.location.href = 'doverie.html';
    });
  }

  renderReviewsMarquee();

  // Переход на blogger.html по клику на любую .blog-card
  const blogSection = document.querySelector('.blog-section');
  if (blogSection) {
    blogSection.addEventListener('click', function(e) {
      const card = e.target.closest('.blog-card');
      if (card) {
        window.location.href = 'blogger.html';
      }
    });
  }

  // Новый обработчик для нажатия клавиши '2'
  window.addEventListener('keydown', function(e) {
    if (e.key === '2') {
      window.location.href = 'home-detail.html';
    }
  });

  // Инициализация мобильного слайдера портфолио
  initPortfolioMobileSlider();
});

// Универсальная функция для создания слайдера
function createSlider({
  containerId,
  images,
  labels = [],
  withLogo = false,
  logoSrc = ''
}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="slider">
      ${withLogo && logoSrc ? `<img class="slider-logo" src="${logoSrc}" alt="logo">` : ''}
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
      bar.addEventListener('mouseenter', () => bar.classList.add('hover'));
      bar.addEventListener('mouseleave', () => bar.classList.remove('hover'));
      bar.addEventListener('click', () => showSlide(idx, true));
      indicators.appendChild(bar);
    });
  }
  function renderThumbs() {
    thumbs.innerHTML = '';
    images.forEach((src, idx) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'slider-thumb' + (idx === current ? ' active' : '');
      thumb.addEventListener('click', () => showSlide(idx, true));
      thumbs.appendChild(thumb);
    });
  }
  function showSlide(index, manual = false) {
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

function up() {
  const el = document.querySelector('.hero-vectors');
  if (el) el.classList.add('upp');
}

// --- Отзывы (Reviews Marquee) ---
const reviewsData = [
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

function renderReviewsMarquee() {
  const track = document.getElementById('reviewsMarqueeTrack');
  if (!track) return;
  // Дублируем отзывы минимум 2 раза для бесконечной ленты
  let cards = '';
  for (let i = 0; i < 2; i++) {
    reviewsData.forEach(r => {
      cards += createReviewCard(r);
    });
  }
  track.innerHTML = cards;
}

// --- Blog Slider ---
const blogData = [
  {
    date: '29',
    month: 'апреля',
    image: 'slider/1.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '17',
    month: 'апреля',
    image: 'slider/2.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '05',
    month: 'апреля',
    image: 'slider/3.png',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '28',
    month: 'марта',
    image: 'slider/4.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  }
];

function createBlogCard({date, month, image, title, desc}) {
  return `
    <div class="blog-card">
      <img class="blog-card-bg" src="${image}" alt="blog">
      <div class="blog-card-overlay"></div>
      <div class="blog-card-date">${date}<span>${month}</span></div>
      <img class="blog-card-fingerprint" src="slider/5.png" alt="fingerprint">
      <div class="blog-card-content">
        <div class="blog-card-title">${title}</div>
        <div class="blog-card-desc">${desc}</div>
      </div>
    </div>
  `;
}

window.createReviewCard = createReviewCard;

// Массив для хранения заявок
window.applicationForms = [];

// Более надежная система инициализации модальных окон
function initModalSystem() {
  // Создаем модальные окна, если их еще нет
  if (!document.getElementById('contactsModal')) {
    createContactsModal();
  }
  if (!document.getElementById('applicationModal')) {
    createApplicationModal();
  }
  
  // Привязываем события для открытия модального окна контактов
  bindContactsEvents();
  
  // Привязываем события для кнопок заявок с несколькими попытками
  bindApplicationEvents();
}

function bindContactsEvents() {
  // Ищем элементы с классом .left на всей странице, НО исключаем элементы внутри модальных окон
  const leftElements = document.querySelectorAll('.left');
  leftElements.forEach(element => {
    // Проверяем, что элемент не находится внутри модального окна
    const isInsideModal = element.closest('.contacts-modal') || element.closest('.modal-overlay');
    
    if (!element.hasAttribute('data-contacts-attached') && !isInsideModal) {
      element.setAttribute('data-contacts-attached', 'true');
      element.addEventListener('click', function(e) {
        e.preventDefault();
        openContactsModal();
      });
      element.style.cursor = 'pointer';
    }
  });
}

function bindApplicationEvents() {
  // Ищем все возможные кнопки для заявок
  const buttonSelectors = [
    '.vershina-btn',
    '.test-btn', 
    '.service-main-btn',
    '.main-btn',
    '.contacts-btn',
    '.bt',
    '.blog-featured-btn',
    'button[class*="btn"]:not(.service-nav-item)',
    'div[class*="bt"]'
  ];
  
  buttonSelectors.forEach(selector => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
      // Проверяем, что элемент не находится внутри модального окна
      const isInsideModal = btn.closest('.contacts-modal') || btn.closest('.modal-overlay');
      
      if (!btn.hasAttribute('data-modal-attached') && !isInsideModal) {
        btn.setAttribute('data-modal-attached', 'true');
        btn.addEventListener('click', function(e) {
          const text = this.textContent.toLowerCase();
          
          // Расширенный список ключевых слов
          const triggers = [
            'заявку', 'заказать', 'обсудить', 'проект', 'обсудим', 
            'связаться', 'консультация', 'читать', 'полностью',
            'подробнее', 'узнать', 'получить', 'оформить', 'записаться'
          ];
          
          const shouldOpenModal = triggers.some(trigger => text.includes(trigger));
          
          if (shouldOpenModal) {
            e.preventDefault();
            e.stopPropagation();
            openApplicationModal();
          }
        });
      }
    });
  });
}

// Функция переинициализации для динамически добавляемых элементов
function reinitializeModals() {
  bindContactsEvents();
  bindApplicationEvents();
}

function createContactsModal() {
  const modal = document.createElement('div');
  modal.id = 'contactsModal';
  modal.className = 'contacts-modal';
  modal.innerHTML = `
    <div class="contacts-wrapper">
      <div class="topImg">
        <img src="images/Group 4.svg" alt="">
        <img class="left modal-close-contacts" src="lastblock/textalign-center.png" alt="" style="cursor: pointer;">
      </div>

      <!-- Навигационные табы -->
      <div class="nav-tabs">
        <button class="nav-tab" data-page="services">Услуги</button>
        <button class="nav-tab" data-page="portfolio">Портфолио</button>
        <button class="nav-tab" data-page="about">О нас</button>
        <button class="nav-tab" data-page="blog">Блог</button>
        <button class="nav-tab" data-page="philosophy">Философия</button>
        <button class="nav-tab active" data-page="contacts">Контакты</button>
      </div>

      <!-- Контент контактов -->
      <div class="nav-content">
        <div class="contacts-main">
          <div class="contacts-hero">
            <h1 class="contacts-title">Vershina Art</h1>
            <p class="contacts-subtitle">Мы ценим каждого клиента и учитываем все возможные пожелания</p>
          </div>

          <div class="contacts-content">
            <div class="contacts-info">
              <div class="contacts-block">
                <img src="lastblock/call-calling.svg" alt="Телефон" class="contacts-icon">
                <div class="contacts-text">
                  <h3 class="contacts-block-title">Телефон</h3>
                  <p class="contacts-block-text">+7(425) 495-32-30</p>
                  <p class="contacts-block-text">+7(913) 495-32-30</p>
                </div>
              </div>

              <div class="contacts-block">
                <img src="lastblock/location-add.png" alt="Адрес" class="contacts-icon">
                <div class="contacts-text">
                  <h3 class="contacts-block-title">Адрес</h3>
                  <p class="contacts-block-text">г. Москва, проспект Путина, 39</p>
                </div>
              </div>

              <div class="contacts-block">
                <img src="images/textalign-left.svg" alt="Email" class="contacts-icon">
                <div class="contacts-text">
                  <h3 class="contacts-block-title">Email</h3>
                  <p class="contacts-block-text">info@vershina.agency</p>
                  <p class="contacts-block-text">@vershina.art</p>
                </div>
              </div>
            </div>

            <div class="contacts-company">
              <h2 class="contacts-section-title">Реквизиты</h2>
              <div class="contacts-details">
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">Наименование:</span>
                  <span class="contacts-detail-value">ООО "Вершина Арт"</span>
                </p>
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">Юридический адрес:</span>
                  <span class="contacts-detail-value">350059, Россия, г. Москва, проспект Путина, 39</span>
                </p>
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">ОГРН:</span>
                  <span class="contacts-detail-value">1142312009971</span>
                </p>
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">ОКПО:</span>
                  <span class="contacts-detail-value">15143540</span>
                </p>
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">ИНН:</span>
                  <span class="contacts-detail-value">2312218831</span>
                </p>
                <p class="contacts-detail-item">
                  <span class="contacts-detail-label">КПП:</span>
                  <span class="contacts-detail-value">231201001</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Нижняя секция -->
          <div class="contacts-bottom">
            <div class="contacts-maps">
              <a href="https://2gis.ru/" target="_blank" class="contacts-map-link">
                <img src="lastblock/2gis.svg" alt="2GIS">
                <span class="map-link-text">Проложить маршрут</span>
              </a>
              <a href="https://yandex.ru/maps/" target="_blank" class="contacts-map-link">
                <img src="lastblock/yandex.svg" alt="Yandex">
                <span class="map-link-text">Проложить маршрут</span>
              </a>
              <a href="https://maps.google.com/" target="_blank" class="contacts-map-link">
                <img src="lastblock/google.svg" alt="Google">
                <span class="map-link-text">Проложить маршрут</span>
              </a>
            </div>

            <div class="contacts-actions">
              <button class="vershina-btn contacts-btn">Оставить заявку <span class="vershina-btn-dot">•</span></button>
              <div class="contacts-links">
                <a href="#" class="contacts-link">Политика конфиденциальности</a>
                <a href="#" class="contacts-link">Пользовательское соглашение</a>
              </div>
            </div>

            <div class="contacts-copyright">
              2025. Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Привязываем события к навигации (пока без функционала)
  modal.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Убираем активный класс со всех табов
      modal.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      // Добавляем активный класс к выбранному табу
      this.classList.add('active');
      
      const pageName = this.getAttribute('data-page');
      console.log('Выбрана страница:', pageName); // Для отладки
      
      // Здесь позже будет логика загрузки страниц
    });
  });
  
  // Привязываем закрытие модального окна
  const closeBtn = modal.querySelector('.modal-close-contacts');
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeContactsModal();
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeContactsModal();
    }
  });
  
  // Привязываем кнопку "Оставить заявку" к модальному окну заявки
  const applicationBtn = modal.querySelector('.vershina-btn.contacts-btn');
  if (applicationBtn) {
    applicationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeContactsModal();
      setTimeout(() => openApplicationModal(), 300);
    });
  }
}

function createApplicationModal() {
  const modal = document.createElement('div');
  modal.id = 'applicationModal';
  modal.className = 'modal-overlay';
  
  // Создаем массив шагов формы
  const formSteps = [
    {
      title: 'Личная информация',
      fields: `
        <div class="modal-form-group">
          <label class="modal-form-label" for="appName">Имя *</label>
          <input type="text" id="appName" name="name" class="modal-form-input" required>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="appPhone">Телефон *</label>
          <input type="tel" id="appPhone" name="phone" class="modal-form-input" required>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="appEmail">Email</label>
          <input type="email" id="appEmail" name="email" class="modal-form-input">
        </div>
      `
    },
    {
      title: 'Детали проекта',
      fields: `
        <div class="modal-form-group">
          <label class="modal-form-label" for="appService">Услуга *</label>
          <select id="appService" name="service" class="modal-form-input" required>
            <option value="">Выберите услугу</option>
            <option value="Проект для старта ремонта">Проект для старта ремонта</option>
            <option value="Экспресс проект">Экспресс проект</option>
            <option value="Полный дизайн проект">Полный дизайн проект</option>
            <option value="Авторский надзор">Авторский надзор</option>
            <option value="Комплектация объекта">Комплектация объекта</option>
            <option value="День с дизайнером">День с дизайнером</option>
            <option value="Хоумстейджинг">Хоумстейджинг</option>
            <option value="Консультация">Консультация</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="appBudget">Бюджет проекта</label>
          <select id="appBudget" name="budget" class="modal-form-input">
            <option value="">Выберите бюджет</option>
            <option value="до 500 000 ₽">до 500 000 ₽</option>
            <option value="500 000 - 1 000 000 ₽">500 000 - 1 000 000 ₽</option>
            <option value="1 000 000 - 2 000 000 ₽">1 000 000 - 2 000 000 ₽</option>
            <option value="2 000 000 - 5 000 000 ₽">2 000 000 - 5 000 000 ₽</option>
            <option value="свыше 5 000 000 ₽">свыше 5 000 000 ₽</option>
          </select>
        </div>
      `
    },
    {
      title: 'Дополнительная информация',
      fields: `
        <div class="modal-form-group">
          <label class="modal-form-label" for="appArea">Площадь помещения (м²)</label>
          <input type="number" id="appArea" name="area" class="modal-form-input" min="1" placeholder="например, 85">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="appTimeline">Желаемые сроки</label>
          <select id="appTimeline" name="timeline" class="modal-form-input">
            <option value="">Выберите сроки</option>
            <option value="Срочно (до 1 месяца)">Срочно (до 1 месяца)</option>
            <option value="1-3 месяца">1-3 месяца</option>
            <option value="3-6 месяцев">3-6 месяцев</option>
            <option value="6-12 месяцев">6-12 месяцев</option>
            <option value="Не определились">Не определились</option>
          </select>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="appMessage">Расскажите о вашем проекте</label>
          <textarea id="appMessage" name="message" class="modal-form-textarea" rows="4" placeholder="Опишите ваши пожелания, особенности объекта, предпочтения в стиле..."></textarea>
        </div>
      `
    }
  ];
  
  let currentStep = 0;
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-navigation">
          <button class="modal-nav-btn modal-nav-prev" type="button" ${currentStep === 0 ? 'disabled' : ''}>
            <span>‹</span>
          </button>
          <button class="modal-nav-btn modal-nav-next" type="button">
            <span>›</span>
          </button>
        </div>
        <button class="modal-close" type="button">
          <span>×</span>
        </button>
      </div>
      <div class="modal-body">
        <h2 class="modal-title">${formSteps[currentStep].title}</h2>
        <div class="modal-progress">
          <div class="modal-progress-bar">
            <div class="modal-progress-fill" style="width: ${((currentStep + 1) / formSteps.length) * 100}%"></div>
          </div>
          <span class="modal-progress-text">Шаг ${currentStep + 1} из ${formSteps.length}</span>
        </div>
        <form class="modal-form" id="applicationForm">
          <div class="modal-form-step" data-step="${currentStep}">
            ${formSteps[currentStep].fields}
          </div>
          <div class="modal-form-actions">
            ${currentStep === formSteps.length - 1 ? 
              '<button type="submit" class="modal-form-submit">Отправить заявку</button>' :
              '<button type="button" class="modal-form-next">Далее</button>'
            }
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Функции навигации по шагам
  function updateStep() {
    const title = modal.querySelector('.modal-title');
    const stepContainer = modal.querySelector('.modal-form-step');
    const progressFill = modal.querySelector('.modal-progress-fill');
    const progressText = modal.querySelector('.modal-progress-text');
    const prevBtn = modal.querySelector('.modal-nav-prev');
    const nextBtn = modal.querySelector('.modal-nav-next');
    const formActions = modal.querySelector('.modal-form-actions');
    
    // Анимация перехода
    stepContainer.style.opacity = '0';
    stepContainer.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
      title.textContent = formSteps[currentStep].title;
      stepContainer.innerHTML = formSteps[currentStep].fields;
      stepContainer.dataset.step = currentStep;
      
      progressFill.style.width = `${((currentStep + 1) / formSteps.length) * 100}%`;
      progressText.textContent = `Шаг ${currentStep + 1} из ${formSteps.length}`;
      
      prevBtn.disabled = currentStep === 0;
      nextBtn.disabled = currentStep === formSteps.length - 1;
      
      if (currentStep === formSteps.length - 1) {
        formActions.innerHTML = '<button type="submit" class="modal-form-submit">Отправить заявку</button>';
      } else {
        formActions.innerHTML = '<button type="button" class="modal-form-next">Далее</button>';
      }
      
      stepContainer.style.opacity = '1';
      stepContainer.style.transform = 'translateX(0)';
      
      // Перебиндиваем событие для кнопки "Далее"
      const nextFormBtn = modal.querySelector('.modal-form-next');
      if (nextFormBtn) {
        nextFormBtn.addEventListener('click', () => {
          if (validateCurrentStep()) {
            nextStep();
          }
        });
      }
    }, 200);
  }
  
  function nextStep() {
    if (currentStep < formSteps.length - 1) {
      currentStep++;
      updateStep();
    }
  }
  
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
  }
  
  function validateCurrentStep() {
    const currentStepElement = modal.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
    
    for (let field of requiredFields) {
      if (!field.value.trim()) {
        field.focus();
        field.style.borderColor = '#ff4757';
        setTimeout(() => {
          field.style.borderColor = '';
        }, 2000);
        return false;
      }
    }
    return true;
  }
  
  // Привязываем события
  modal.querySelector('.modal-close').addEventListener('click', closeApplicationModal);
  modal.querySelector('.modal-nav-prev').addEventListener('click', prevStep);
  modal.querySelector('.modal-nav-next').addEventListener('click', nextStep);
  
  // Первоначальная кнопка "Далее"
  const initialNextBtn = modal.querySelector('.modal-form-next');
  if (initialNextBtn) {
    initialNextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        nextStep();
      }
    });
  }
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeApplicationModal();
    }
  });
  
  // Обработка формы
  modal.querySelector('#applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateCurrentStep()) {
      submitApplication(this);
    }
  });
  
  // Клавиатурная навигация
  modal.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && currentStep > 0) {
      prevStep();
    } else if (e.key === 'ArrowRight' && currentStep < formSteps.length - 1) {
      if (validateCurrentStep()) {
        nextStep();
      }
    }
  });
}

function openContactsModal() {
  const modal = document.getElementById('contactsModal');
  if (modal) {
    modal.classList.add('active');
    // Полностью убираем скроллбары
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
}

function closeContactsModal() {
  const modal = document.getElementById('contactsModal');
  if (modal) {
    modal.classList.remove('active');
    // Возвращаем скроллбары
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}

function openApplicationModal() {
  const modal = document.getElementById('applicationModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeApplicationModal() {
  const modal = document.getElementById('applicationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function submitApplication(form) {
  const formData = new FormData(form);
  const application = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    service: formData.get('service'),
    budget: formData.get('budget'),
    area: formData.get('area'),
    timeline: formData.get('timeline'),
    message: formData.get('message'),
    page: window.location.pathname,
    userAgent: navigator.userAgent
  };
  
  // Добавляем заявку в массив
  if (!window.applicationForms) {
    window.applicationForms = [];
  }
  window.applicationForms.push(application);
  
  // Сохраняем в localStorage для сохранения между сессиями
  try {
    localStorage.setItem('vershina_applications', JSON.stringify(window.applicationForms));
  } catch (e) {
    console.warn('Не удалось сохранить заявки в localStorage:', e);
  }
  
  // Логируем для разработчика бэкенда
  console.log('Новая заявка:', application);
  console.log('Все заявки:', window.applicationForms);
  
  // Показываем улучшенное уведомление
  showSuccessNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  
  // Закрываем модальное окно и очищаем форму
  closeApplicationModal();
  form.reset();
}

function showSuccessNotification(message) {
  // Создаем красивое уведомление
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✓</div>
      <div class="notification-message">${message}</div>
    </div>
  `;
  
  // Добавляем стили для уведомления
  const style = document.createElement('style');
  style.textContent = `
    .success-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
      z-index: 10000;
      animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3s forwards;
      max-width: 400px;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .notification-icon {
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }
    
    .notification-message {
      font-family: Inter, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
    
    @media (max-width: 768px) {
      .success-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Удаляем уведомление через 4 секунды
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }, 4000);
}

// Мультиуровневая инициализация
function initializeEverything() {
  // Ограничиваем ширину
  if (!document.body.style.maxWidth) {
    document.body.style.maxWidth = '1920px';
    document.body.style.margin = '0 auto';
  }
  
  // Инициализируем модальные окна
  initModalSystem();
  
  // Переинициализируем через небольшие интервалы для подстраховки
  setTimeout(reinitializeModals, 100);
  setTimeout(reinitializeModals, 500);
  setTimeout(reinitializeModals, 1000);
}

// Мобильный слайдер для портфолио
function initPortfolioMobileSlider() {
  // Проверяем, нужно ли инициализировать мобильный слайдер
  if (window.innerWidth > 768) return;
  
  const portfolioGrid = document.querySelector('.portfolio-grid-3col');
  if (!portfolioGrid) return;
  
  // Получаем все колонки портфолио
  const portfolioCols = Array.from(portfolioGrid.querySelectorAll('.portfolio-col'));
  if (portfolioCols.length === 0) return;
  
  // Создаем структуру мобильного слайдера
  portfolioGrid.innerHTML = '';
  portfolioGrid.style.position = 'relative';
  portfolioGrid.style.overflow = 'hidden';
  portfolioGrid.style.paddingBottom = '120px'; // Место для навигации
  
  // Создаем контейнер слайдера
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'portfolio-mobile-slider';
  
  // Добавляем каждую колонку как отдельный слайд
  portfolioCols.forEach((col, index) => {
    const slide = document.createElement('div');
    slide.className = 'portfolio-mobile-slide';
    slide.appendChild(col);
    sliderContainer.appendChild(slide);
  });
  
  portfolioGrid.appendChild(sliderContainer);
  
  // Создаем навигацию
  const navigation = document.createElement('div');
  navigation.className = 'portfolio-slider-nav';
  navigation.innerHTML = `
    <button class="portfolio-nav-btn portfolio-nav-prev">‹</button>
    <button class="portfolio-nav-btn portfolio-nav-next">›</button>
  `;
  
  // Создаем индикаторы
  const dots = document.createElement('div');
  dots.className = 'portfolio-slider-dots';
  portfolioCols.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'portfolio-dot' + (index === 0 ? ' active' : '');
    dot.dataset.slide = index;
    dots.appendChild(dot);
  });
  
  portfolioGrid.appendChild(navigation);
  portfolioGrid.appendChild(dots);
  
  // Логика слайдера
  let currentSlide = 0;
  const totalSlides = portfolioCols.length;
  
  function updateSlider() {
    const translateX = -currentSlide * 100;
    sliderContainer.style.transform = `translateX(${translateX}%)`;
    
    // Обновляем индикаторы
    dots.querySelectorAll('.portfolio-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Обновляем кнопки
    const prevBtn = navigation.querySelector('.portfolio-nav-prev');
    const nextBtn = navigation.querySelector('.portfolio-nav-next');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }
  
  // Обработчики событий
  navigation.querySelector('.portfolio-nav-prev').addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });
  
  navigation.querySelector('.portfolio-nav-next').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });
  
  // Обработчики для индикаторов
  dots.addEventListener('click', (e) => {
    if (e.target.classList.contains('portfolio-dot')) {
      currentSlide = parseInt(e.target.dataset.slide);
      updateSlider();
    }
  });
  
  // Поддержка свайпов
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    sliderContainer.style.transition = 'none';
  });
  
  sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const translateX = -currentSlide * 100 + (diffX / sliderContainer.offsetWidth) * 100;
    sliderContainer.style.transform = `translateX(${translateX}%)`;
  });
  
  sliderContainer.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.transition = 'transform 0.3s ease';
    
    const diffX = currentX - startX;
    const threshold = sliderContainer.offsetWidth * 0.25; // 25% ширины для свайпа
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentSlide > 0) {
        currentSlide--; // Свайп вправо
      } else if (diffX < 0 && currentSlide < totalSlides - 1) {
        currentSlide++; // Свайп влево
      }
    }
    
    updateSlider();
  });
  
  // Инициализация
  updateSlider();
  
  // Автопереключение слайдов (опционально)
  let autoSlideInterval;
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    }, 5000);
  }
  
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }
  
  // Запускаем автопереключение
  startAutoSlide();
  
  // Останавливаем при взаимодействии
  portfolioGrid.addEventListener('mouseenter', stopAutoSlide);
  portfolioGrid.addEventListener('mouseleave', startAutoSlide);
  portfolioGrid.addEventListener('touchstart', stopAutoSlide);
  
  // Улучшение работы других слайдеров на мобильных
  enhanceMobileSliders();
}

// Улучшение работы слайдеров на мобильных устройствах
function enhanceMobileSliders() {
  if (window.innerWidth > 768) return;
  
  // Улучшаем основные слайдеры
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => {
    const img = slider.querySelector('.slider-img');
    if (!img) return;
    
    // Добавляем навигационные кнопки для мобильных
    if (!slider.querySelector('.slider-nav-btn')) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'slider-nav-btn slider-nav-prev';
      prevBtn.innerHTML = '‹';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'slider-nav-btn slider-nav-next';
      nextBtn.innerHTML = '›';
      
      slider.appendChild(prevBtn);
      slider.appendChild(nextBtn);
      
      // Логика переключения (нужно будет доработать в зависимости от существующей логики)
      const indicators = slider.querySelectorAll('.slider-bar');
      let currentIndex = 0;
      
      prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : indicators.length - 1;
        if (indicators[currentIndex]) {
          indicators[currentIndex].click();
        }
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < indicators.length - 1 ? currentIndex + 1 : 0;
        if (indicators[currentIndex]) {
          indicators[currentIndex].click();
        }
      });
    }
  });
  
  // Улучшаем слайдер услуг
  const servicesNavScroll = document.querySelector('.services-nav-scroll');
  if (servicesNavScroll) {
    let isScrolling = false;
    
    servicesNavScroll.addEventListener('touchstart', () => {
      isScrolling = true;
    });
    
    servicesNavScroll.addEventListener('touchend', () => {
      setTimeout(() => {
        isScrolling = false;
      }, 100);
    });
    
    // Плавная прокрутка к активному элементу
    const activeItem = servicesNavScroll.querySelector('.service-nav-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}

// Инициализация при разных событиях
document.addEventListener('DOMContentLoaded', initializeEverything);
document.addEventListener('readystatechange', function() {
  if (document.readyState === 'complete') {
    initializeEverything();
  }
});
window.addEventListener('load', initializeEverything);

// Добавляем поддержку ESC для закрытия модальных окон
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeContactsModal();
    closeApplicationModal();
  }
});

// Переинициализация мобильного слайдера при изменении размера экрана
window.addEventListener('resize', function() {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function() {
    // Переинициализируем мобильный слайдер портфолио
    const currentWidth = window.innerWidth;
    const portfolioGrid = document.querySelector('.portfolio-grid-3col');
    
    if (portfolioGrid) {
      if (currentWidth <= 768) {
        // Если экран стал мобильным и слайдер еще не инициализирован
        if (!portfolioGrid.querySelector('.portfolio-mobile-slider')) {
          // Перезагружаем страницу для правильной инициализации
          location.reload();
        }
      } else {
        // Если экран стал десктопным и есть мобильный слайдер
        if (portfolioGrid.querySelector('.portfolio-mobile-slider')) {
          // Перезагружаем страницу для правильной инициализации
          location.reload();
        }
      }
    }
  }, 250);
});

// Экспортируем функции для внешнего использования
window.openContactsModal = openContactsModal;
window.openApplicationModal = openApplicationModal;
window.reinitializeModals = reinitializeModals;
window.initPortfolioMobileSlider = initPortfolioMobileSlider;