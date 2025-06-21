// Картинки для слайдера - 5 реальных фотографий проектов
const sliderImages = [
  'slider/1.jpg',
  'slider/2.jpg',
  'slider/3.png',
  'slider/4.jpg',
  'slider/5.png'
];

// --- Team slider data ---
const teamData = [
  {
    img: 'images/girl.jpg',
    name: 'Корсун Наталья',
    role: 'Руководитель отдела дизайна',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  },
  {
    img: 'images/girl.jpg',
    name: 'Косихина Анна',
    role: 'Бухгалтер',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  },
  {
    img: 'images/girl.jpg',
    name: 'Тишман Герман',
    role: 'Прораб',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  },
  {
    img: 'images/girl.jpg',
    name: 'Гордеева Кристина',
    role: 'Специалист по снабжению',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  },
  {
    img: 'images/girl.jpg',
    name: 'Иванов Иван',
    role: 'Менеджер проектов',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  },
  {
    img: 'images/girl.jpg',
    name: 'Петрова Мария',
    role: 'Дизайнер интерьеров',
    socials: ['Instagram', 'Telegram', 'Whatsapp']
  }
];

function initTeamSlider() {
const teamSlider = document.getElementById('teamSlider');
const teamPrev = document.getElementById('teamSliderPrev');
const teamNext = document.getElementById('teamSliderNext');
  
  if (!teamSlider || !teamPrev || !teamNext) return;

const teamCardWidth = 450;
const teamGap = 48;
const teamSidePadding = 100;
let teamIndex = 0;
let isTransitioning = false;

function getVisibleCount() {
  // 3.3 карточки (видно 3 полностью и часть 4-й)
  return 3.3;
}

function getWrapperWidth() {
  return getVisibleCount() * (teamCardWidth + teamGap) - teamGap + 2 * teamSidePadding;
}

function renderTeamSlider(jumpToReal = false) {
  const loopCount = Math.ceil(getVisibleCount());
  const visibleCount = Math.floor(getVisibleCount());
  const cards = [];
  for (let i = teamData.length - loopCount; i < teamData.length; i++) {
    cards.push(teamData[i % teamData.length]);
  }
  for (let i = 0; i < teamData.length; i++) {
    cards.push(teamData[i]);
  }
  for (let i = 0; i < loopCount; i++) {
    cards.push(teamData[i % teamData.length]);
  }

  teamSlider.innerHTML = '';
  teamSlider.style.gap = teamGap + 'px';
  teamSlider.style.transition = jumpToReal ? 'none' : 'transform 0.6s cubic-bezier(.4,0,.2,1)';
  const wrapper = document.querySelector('.team-slider-wrapper');
  wrapper.style.width = getWrapperWidth() + 'px';

  cards.forEach((member, idx) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.style.width = teamCardWidth + 'px';
    card.style.minWidth = teamCardWidth + 'px';
    card.style.maxWidth = teamCardWidth + 'px';
    card.style.flexShrink = '0';
    card.style.height = '700px';
    card.style.background = '#fff';
    card.style.borderRadius = '12px';
    card.style.boxShadow = 'none';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.padding = '32px 0 0 0';
    card.style.position = 'relative';
    // Серая полоска внутри карточки
    const bar = document.createElement('div');
    bar.style.position = 'absolute';
    bar.style.left = '0px';
    bar.style.right = '0px';
    bar.style.top = '50%';
    bar.style.transform = 'translateY(-45%)';
    bar.style.height = '80px';
    bar.style.background = '#ededed';
    bar.style.zIndex = '2';
    bar.style.pointerEvents = 'none';
    card.appendChild(bar);
    // Соц. иконки
    const socials = document.createElement('div');
    socials.className = 'team-socials';
    socials.style.display = 'flex';
    socials.style.justifyContent = 'center';
    socials.style.gap = '16px';
    socials.style.marginBottom = '16px';
    socials.style.width = '100%';
    member.socials.forEach(s => {
      const img = document.createElement('img');
      img.src = `lastblock/${s}.svg`;
      img.alt = s;
      img.style.width = '24px';
      img.style.height = '24px';
      socials.appendChild(img);
    });
    card.appendChild(socials);
    // Фото (flex:1)
    const photoWrap = document.createElement('div');
    photoWrap.style.flex = '1';
    photoWrap.style.display = 'flex';
    photoWrap.style.alignItems = 'center';
    photoWrap.style.justifyContent = 'center';
    photoWrap.style.width = '100%';
    const photo = document.createElement('img');
    photo.src = 'images/girl.jpg';
    photo.alt = member.name;
    photo.style.width = (teamCardWidth / 1.3) + 'px';
    photo.style.height = '400px';
    photo.style.objectFit = 'cover';
    photo.style.borderRadius = '8px';
    photo.style.margin = '0 auto';
    photo.style.display = 'block';
    photo.style.position = 'relative';
    photo.style.zIndex = '3';
    photoWrap.appendChild(photo);
    card.appendChild(photoWrap);
    // Имя и роль (внизу)
    const textBlock = document.createElement('div');
    textBlock.style.width = '100%';
    textBlock.style.marginTop = 'auto';
    textBlock.style.display = 'flex';
    textBlock.style.flexDirection = 'column';
    textBlock.style.alignItems = 'center';
    textBlock.style.position = 'relative';
    textBlock.style.zIndex = '3';
    // Имя
    const name = document.createElement('div');
    name.textContent = member.name;
    name.style.fontFamily = 'Inter, Arial, sans-serif';
    name.style.fontWeight = '600';
    name.style.fontSize = '22px';
    name.style.marginTop = '24px';
    name.style.textAlign = 'center';
    textBlock.appendChild(name);
    // Роль
    const role = document.createElement('div');
    role.textContent = member.role;
    role.style.fontFamily = 'Inter, Arial, sans-serif';
    role.style.fontWeight = '400';
    role.style.fontSize = '16px';
    role.style.color = '#888';
    role.style.marginTop = '8px';
    role.style.marginBottom = '24px';
    role.style.textAlign = 'center';
    textBlock.appendChild(role);
    card.appendChild(textBlock);
    teamSlider.appendChild(card);
    // Серая полоска между карточками (кроме последней)
    if (idx < cards.length - 1) {
      const gapBar = document.createElement('div');
      gapBar.style.width = teamGap + 'px';
      gapBar.style.height = '80px';
      gapBar.style.background = '#ededed';
      gapBar.style.alignSelf = 'center';
      gapBar.style.marginTop = 'auto';
      gapBar.style.marginBottom = 'auto';
      gapBar.style.zIndex = '2';
      gapBar.style.pointerEvents = 'none';
      teamSlider.appendChild(gapBar);
    }
  });

  // Loop-сдвиг на одну карточку
  const offset = loopCount;
  let translateIndex = teamIndex + offset;
  teamSlider.style.transform = `translateX(-${translateIndex * (teamCardWidth + teamGap)}px)`;

  teamPrev.style.visibility = 'visible';
  teamNext.style.visibility = 'visible';
}

// transitionend обработчик для бесшовного loop
teamSlider.addEventListener('transitionend', () => {
  const loopCount = Math.ceil(getVisibleCount());
  if (teamIndex < 0) {
    teamIndex = teamData.length - 1;
    renderTeamSlider(true);
  } else if (teamIndex >= teamData.length) {
    teamIndex = 0;
    renderTeamSlider(true);
  }
  isTransitioning = false;
});

teamPrev.onclick = () => {
  if (isTransitioning) return;
  isTransitioning = true;
  teamIndex--;
  renderTeamSlider();
};
teamNext.onclick = () => {
  if (isTransitioning) return;
  isTransitioning = true;
  teamIndex++;
  renderTeamSlider();
};
window.addEventListener('resize', () => renderTeamSlider(true));
renderTeamSlider(true);
}

// --- work-steps-section ---
const allBlocksWorkStepsTitles = [
  'знакомство и заполнение анкеты',
  'заключение договора',
  'разработка планировочного решения',
  'составление коллажей концепции',
  '3д визуализация',
  'разработка полного пакета чертежей',
  'подготовка сметы чистовых материалов',
  'сдача проекта для реализации'
];
const allBlocksWorkStepsImagesFolder = 'steps/';
const allBlocksWorkStepsImages = [
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

function initMainSlider() {
  console.log('🎯 initMainSlider вызывается');
  const mainSlider = document.getElementById('mainSlider');
  const nextBtn = document.getElementById('mainSliderNext');
  
  console.log('🔍 Элементы найдены:', { mainSlider, nextBtn });
  
  if (!mainSlider || !nextBtn) {
    console.error('❌ Элементы слайдера не найдены!', { mainSlider, nextBtn });
    return;
  }
  
  console.log('✅ Элементы найдены, инициализация слайдера...');
  
  // Добавляем стили для правильного отображения слайдера
  const sliderWrapper = mainSlider.parentElement;
  const blogSliderRow = sliderWrapper?.parentElement;
  const blogSection = blogSliderRow?.parentElement;
  
  // Исправляем стили всей цепочки контейнеров
  if (blogSection && blogSection.classList.contains('blog-section')) {
    blogSection.style.overflow = 'hidden';
    blogSection.style.maxWidth = '100vw';
    blogSection.style.width = '100%';
    console.log('✅ Стили для blog-section применены');
  }
  
  if (blogSliderRow && blogSliderRow.classList.contains('blog-slider-row')) {
    blogSliderRow.style.overflow = 'hidden';
    blogSliderRow.style.maxWidth = '100%';
    blogSliderRow.style.width = '100%';
    blogSliderRow.style.position = 'relative';
    blogSliderRow.style.display = 'flex';
    blogSliderRow.style.alignItems = 'center';
    console.log('✅ Стили для blog-slider-row применены');
  }
  
  if (sliderWrapper && sliderWrapper.classList.contains('blog-slider-wrapper')) {
    sliderWrapper.style.overflow = 'hidden';
    sliderWrapper.style.position = 'relative';
    sliderWrapper.style.width = '900px'; // Возвращаем больший размер
    sliderWrapper.style.minWidth = '900px';
    sliderWrapper.style.height = '620px'; // Увеличиваем высоту
    sliderWrapper.style.flexShrink = '0';
    // Убираем отладочную границу
    sliderWrapper.style.borderRadius = '12px';
    console.log('✅ Стили для blog-slider-wrapper применены');
  }

  const cardWidth = 725; // Возвращаем прежний размер
  const gap = 48; // Возвращаем прежний gap
  const leftPadding = 48; // Возвращаем прежний padding
  let currentIndex = 0;

  function renderSlider() {
    console.log('🔄 renderSlider вызывается, sliderImages:', sliderImages);
    mainSlider.innerHTML = '';
    mainSlider.style.display = 'flex';
    mainSlider.style.gap = gap + 'px';
    mainSlider.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)';
    mainSlider.style.paddingLeft = leftPadding + 'px';
    mainSlider.style.position = 'relative';
    mainSlider.style.willChange = 'transform';
    mainSlider.style.height = '100%';
    
    sliderImages.forEach((src, idx) => {
      console.log(`🖼️ Создаю карточку ${idx + 1}/${sliderImages.length}, src: ${src}`);
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.style.width = cardWidth + 'px';
      card.style.height = '570px';
      card.style.minWidth = cardWidth + 'px';
      card.style.maxWidth = cardWidth + 'px';
      card.style.minHeight = '570px';
      card.style.maxHeight = '570px';
      card.style.overflow = 'hidden';
      card.style.borderRadius = '12px';
      card.style.background = '#f5f5f5';
      card.style.position = 'relative';
      card.style.boxShadow = '0 4px 32px rgba(0,0,0,0.08)';
      card.style.transition = 'box-shadow 0.2s';
      card.style.flexShrink = '0';
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Проект ${idx + 1}`;
      img.className = 'blog-card-bg';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      img.onload = function() {
        console.log(`✅ Изображение ${idx + 1} загружено: ${src}`);
      };
      img.onerror = function() {
        console.warn(`⚠️ Изображение ${idx + 1} не загрузилось: ${src}`);
        // Создаем красивую заглушку
        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        placeholder.style.background = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.flexDirection = 'column';
        placeholder.style.color = '#fff';
        placeholder.style.fontSize = '24px';
        placeholder.style.fontFamily = 'Inter, sans-serif';
        placeholder.style.fontWeight = '500';
        placeholder.innerHTML = `
          <div style="font-size: 48px; margin-bottom: 16px;">🏠</div>
          <div>Проект ${idx + 1}</div>
        `;
        
        // Заменяем img на div
        card.removeChild(img);
        card.appendChild(placeholder);
      };
      
      card.appendChild(img);
      mainSlider.appendChild(card);
      console.log(`✅ Карточка ${idx + 1} добавлена в слайдер`);
    });
    
    console.log(`🎉 Слайдер создан! Количество карточек: ${sliderImages.length}`);
    console.log('📐 mainSlider ширина:', mainSlider.scrollWidth + 'px');
    console.log('📐 sliderWrapper ширина:', sliderWrapper?.offsetWidth + 'px');
    console.log('📐 sliderWrapper высота:', sliderWrapper?.offsetHeight + 'px');
    
    mainSlider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  }

  nextBtn.onclick = () => {
    console.log(`🔄 Переключение слайда: ${currentIndex} → ${(currentIndex + 1) % sliderImages.length}`);
    if (currentIndex < sliderImages.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    renderSlider();
  };

  window.addEventListener('resize', renderSlider);
  renderSlider();
}

// --- Reviews Section ---
const allBlocksReviewsData = [
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
  let cards = '';
  for (let i = 0; i < 2; i++) {
    allBlocksReviewsData.forEach(r => {
      cards += createReviewCard(r);
    });
  }
  track.innerHTML = cards;
}

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация основного слайдера
  initMainSlider();
  
  // Инициализация слайдера команды
  initTeamSlider();
  
  if (document.getElementById('workStepsList')) {
    renderWorkStepsAuto(allBlocksWorkStepsTitles, allBlocksWorkStepsImagesFolder, allBlocksWorkStepsImages);
  }
  
  if (document.getElementById('reviewsMarqueeTrack')) {
    renderReviewsMarquee();
  }
  
  // Инициализация модальной системы
  if (!window.applicationForms) {
    window.applicationForms = [];
    
    // Попытка загрузить из localStorage
    try {
      const saved = localStorage.getItem('vershina_applications');
      if (saved) {
        window.applicationForms = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Не удалось загрузить заявки из localStorage:', e);
    }
  }
  
  // Создаем модальные окна если их нет
  if (!document.getElementById('applicationModal')) {
    if (typeof createApplicationModal === 'function') {
      createApplicationModal();
    }
  }
  if (!document.getElementById('contactsModal')) {
    if (typeof createContactsModal === 'function') {
      createContactsModal();
    }
  }
  
  // Обработчики событий для модальных окон
  document.addEventListener('click', function(e) {
    // Открытие модального окна заявки
    if (e.target.matches('button') && 
        (e.target.textContent.includes('заявку') || 
         e.target.textContent.includes('обсудить') || 
         e.target.textContent.includes('заказать') ||
         e.target.textContent.includes('Обсудить проект'))) {
      e.preventDefault();
      if (typeof openApplicationModal === 'function') {
        openApplicationModal();
      }
    }
    
    // Открытие модального окна контактов
    if (e.target.classList.contains('left')) {
      e.preventDefault();
      if (typeof openContactsModal === 'function') {
        openContactsModal();
      }
    }
  });
});
