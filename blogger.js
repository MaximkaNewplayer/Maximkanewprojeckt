// --- Данные (имитация сервера) ---
const blogCategories = [
  { id: 'design', name: 'дизайн' },
  { id: 'news', name: 'новости' },
  { id: 'styles', name: 'стили' },
  { id: 'inspiration', name: 'вдохновение' },
  { id: 'other', name: 'другая рубрика' }
];

const blogFeaturedData = {
  design: {
    title: 'Какая-то основная новость, которая важнее',
    date: '06.05.2025',
    category: 'Дизайн интерьеров',
    author: 'Надежда Бойко',
    desc: 'Соблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище.',
    image: 'slider/3.png',
    btn: 'Читать полностью'
  },
  news: {
    title: 'Важная новость из мира дизайна',
    date: '05.05.2025',
    category: 'Новости',
    author: 'Сергей Бойко',
    desc: 'Новости в мире дизайна интерьеров: новые тренды, открытия и события, которые нельзя пропустить.',
    image: 'slider/2.jpg',
    btn: 'Читать полностью'
  },
  styles: {
    title: 'Стиль — это больше, чем просто оформление',
    date: '04.05.2025',
    category: 'Стили',
    author: 'Мария Иванова',
    desc: 'Погружаемся в разнообразие стилей интерьера: от минимализма до ар-деко. Как выбрать свой?',
    image: 'slider/1.jpg',
    btn: 'Читать полностью'
  },
  inspiration: {
    title: 'Вдохновение для вашего дома',
    date: '03.05.2025',
    category: 'Вдохновение',
    author: 'Екатерина Смирнова',
    desc: 'Где искать вдохновение для создания уникального интерьера? Советы и подборки от экспертов.',
    image: 'slider/4.jpg',
    btn: 'Читать полностью'
  },
  other: {
    title: 'Другая важная рубрика',
    date: '02.05.2025',
    category: 'Другое',
    author: 'Алексей Ковалёв',
    desc: 'Иногда самые интересные идеи рождаются вне привычных рамок. Открываем новые горизонты.',
    image: 'slider/5.png',
    btn: 'Читать полностью'
  }
};

const blogCardsData = [
  // Дизайн
  {
    title: 'Современный интерьер гостиной',
    desc: 'Минимализм, светлые тона и максимум уюта — идеальный вариант для городской квартиры.',
    image: 'slider/1.jpg',
    category: 'design'
  },
  {
    title: 'Лофт в центре города',
    desc: 'Грубые фактуры, открытые коммуникации и стильные детали для ценителей урбанистики.',
    image: 'slider/2.jpg',
    category: 'design'
  },
  {
    title: 'Скандинавский стиль',
    desc: 'Белые стены, натуральное дерево и много света — уют и простота в каждой детали.',
    image: 'slider/3.png',
    category: 'design'
  },
  {
    title: 'Классика вне времени',
    desc: 'Молдинги, лепнина и благородные материалы для ценителей традиций.',
    image: 'slider/4.jpg',
    category: 'design'
  },
  {
    title: 'Эклектика в интерьере',
    desc: 'Смелое сочетание стилей и фактур для яркой индивидуальности.',
    image: 'slider/5.png',
    category: 'design'
  },
  {
    title: 'Японский минимализм',
    desc: 'Лаконичность, природные материалы и гармония пространства.',
    image: 'slider/6.svg',
    category: 'design'
  },
  // Новости
  {
    title: 'Тренды 2025 года',
    desc: 'Что будет актуально в дизайне интерьеров в новом сезоне? Обзор главных тенденций.',
    image: 'slider/2.jpg',
    category: 'news'
  },
  {
    title: 'Открытие нового шоурума',
    desc: 'В нашем городе появился новый центр современного дизайна — приходите на экскурсию!',
    image: 'slider/3.png',
    category: 'news'
  },
  {
    title: 'Премия "Лучший интерьер"',
    desc: 'Наши проекты отмечены престижной наградой в области дизайна.',
    image: 'slider/4.jpg',
    category: 'news'
  },
  {
    title: 'Мастер-класс по декору',
    desc: 'Приглашаем на бесплатный мастер-класс по современному декору интерьера.',
    image: 'slider/5.png',
    category: 'news'
  },
  {
    title: 'Интервью с архитектором',
    desc: 'Экспертное мнение о будущем городской среды и новых технологиях.',
    image: 'slider/6.svg',
    category: 'news'
  },
  {
    title: 'Обновление портфолио',
    desc: 'Добавили новые реализованные проекты — вдохновляйтесь свежими идеями!',
    image: 'slider/1.jpg',
    category: 'news'
  },
  // Стили
  {
    title: 'Минимализм: искусство простоты',
    desc: 'Как создать стильный интерьер без лишних деталей и сохранить уют.',
    image: 'slider/3.png',
    category: 'styles'
  },
  {
    title: 'Ар-деко в современном доме',
    desc: 'Геометрия, золото и роскошь — для тех, кто любит эффектные решения.',
    image: 'slider/4.jpg',
    category: 'styles'
  },
  {
    title: 'Прованс: французский шарм',
    desc: 'Пастельные оттенки, цветочные мотивы и атмосфера уюта.',
    image: 'slider/5.png',
    category: 'styles'
  },
  {
    title: 'Скандинавский стиль',
    desc: 'Белые стены, натуральное дерево и много света — уют и простота в каждой детали.',
    image: 'slider/1.jpg',
    category: 'styles'
  },
  {
    title: 'Лофт: свобода пространства',
    desc: 'Открытая планировка, кирпич и металл — для смелых и креативных.',
    image: 'slider/2.jpg',
    category: 'styles'
  },
  {
    title: 'Классика вне времени',
    desc: 'Молдинги, лепнина и благородные материалы для ценителей традиций.',
    image: 'slider/6.svg',
    category: 'styles'
  },
  // Вдохновение
  {
    title: 'Вдохновение в деталях',
    desc: 'Как аксессуары и декор создают настроение в интерьере.',
    image: 'slider/4.jpg',
    category: 'inspiration'
  },
  {
    title: 'Цвет года: как использовать?',
    desc: 'Советы по сочетанию модных оттенков в интерьере.',
    image: 'slider/5.png',
    category: 'inspiration'
  },
  {
    title: 'Идеи для маленьких пространств',
    desc: 'Функциональные решения для компактных квартир и студий.',
    image: 'slider/6.svg',
    category: 'inspiration'
  },
  {
    title: 'Семейный уют',
    desc: 'Как создать атмосферу тепла и уюта для всей семьи.',
    image: 'slider/1.jpg',
    category: 'inspiration'
  },
  {
    title: 'Зелёные акценты',
    desc: 'Растения как главный элемент современного интерьера.',
    image: 'slider/2.jpg',
    category: 'inspiration'
  },
  {
    title: 'Творческое пространство',
    desc: 'Организация рабочего места для вдохновения и продуктивности.',
    image: 'slider/3.png',
    category: 'inspiration'
  },
  // Другая рубрика
  {
    title: 'Эксперименты с цветом',
    desc: 'Не бойтесь ярких решений — интерьер должен отражать вашу индивидуальность.',
    image: 'slider/5.png',
    category: 'other'
  },
  {
    title: 'Маленькие пространства — большие идеи',
    desc: 'Как сделать даже небольшую комнату стильной и функциональной.',
    image: 'slider/6.svg',
    category: 'other'
  },
  {
    title: 'Тренды освещения',
    desc: 'Современные светильники как арт-объекты в интерьере.',
    image: 'slider/1.jpg',
    category: 'other'
  },
  {
    title: 'Декор своими руками',
    desc: 'Идеи для творчества и персонализации пространства.',
    image: 'slider/2.jpg',
    category: 'other'
  },
  {
    title: 'Истории клиентов',
    desc: 'Реальные примеры преображения квартир и домов.',
    image: 'slider/3.png',
    category: 'other'
  },
  {
    title: 'Секреты уюта',
    desc: 'Маленькие детали, которые делают дом особенным.',
    image: 'slider/4.jpg',
    category: 'other'
  }
];

// --- Рендер категорий ---
function renderCategories(activeId) {
  const container = document.getElementById('blogCategories');
  container.innerHTML = blogCategories.map(cat =>
    `<button class="blog-category-btn${cat.id === activeId ? ' active' : ''}" data-id="${cat.id}">${cat.name}</button>`
  ).join('');
  container.querySelectorAll('.blog-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderBlogFeatured(btn.dataset.id);
      renderCategories(btn.dataset.id);
      renderBlogCards(btn.dataset.id);
    });
  });
}

// --- Рендер главного блока ---
function renderBlogFeatured(categoryId) {
  const data = blogFeaturedData[categoryId];
  document.getElementById('blogFeaturedTitle').textContent = data.title;
  document.getElementById('blogFeaturedDate').textContent = data.date;
  document.getElementById('blogFeaturedCategory').textContent = data.category;
  document.getElementById('blogFeaturedAuthor').textContent = data.author;
  document.getElementById('blogFeaturedDesc').textContent = data.desc;
  document.getElementById('blogFeaturedImage').src = data.image;
  // Кнопка в стиле vershina-btn
  document.getElementById('blogFeaturedBtn').outerHTML =
    `<button class="vershina-btn" id="blogFeaturedBtn">
      <span>${data.btn}</span>
      <span class="blog-featured-btn-dot"></span>
    </button>`;
  // Добавляю обработчик клика на кнопку 'Читать полностью'
  setTimeout(() => {
    const btn = document.getElementById('blogFeaturedBtn');
    if (btn) {
      // Найти первую карточку текущей категории
      const idx = blogCardsData.findIndex(card => card.category === categoryId);
      if (idx !== -1) {
        btn.onclick = () => {
          window.location.href = `blog-detail.html?id=${idx}`;
        };
      }
    }
  }, 0);
}

// --- Рендер карточек ---
function renderBlogCards(categoryId) {
  const container = document.getElementById('blogCardsList');
  // Фильтруем по категории
  let filtered = blogCardsData.filter(card => card.category === categoryId);
  // Если карточек меньше 6 — добавляем пустые-заглушки
  if (filtered.length < 6) {
    const emptyCount = 6 - filtered.length;
    for (let i = 0; i < emptyCount; i++) {
      filtered.push({ empty: true });
    }
  } else if (filtered.length > 6) {
    filtered = filtered.slice(0, 6);
  }
  container.innerHTML = filtered.map((card, idx) =>
    card.empty
      ? `<div class="blog-card blog-card-empty"></div>`
      : `<div class="blog-card" tabindex="0" data-idx="${idx}">
          <img class="blog-card-image" src="${card.image}" alt="blog">
          <div class="blog-card-title">${card.title}</div>
          <div class="blog-card-desc">${card.desc}</div>
        </div>`
  ).join('');
  // Клик по карточке — переход на новую страницу (с передачей индекса)
  container.querySelectorAll('.blog-card').forEach((card, idx) => {
    if (!filtered[idx].empty) {
      card.addEventListener('click', () => {
        // Переход на страницу детальной новости с передачей индекса в query
        const globalIdx = blogCardsData.findIndex(
          c => c.category === categoryId && c.title === filtered[idx].title
        );
        window.location.href = `blog-detail.html?id=${globalIdx}`;
      });
    }
  });
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
  renderCategories('design');
  renderBlogFeatured('design');
  renderBlogCards('design');
}); 