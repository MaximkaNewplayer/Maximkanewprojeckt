// --- Имитация данных проекта (как будто с сервера) ---
const projectDataList = [
  {
    id: 1,
    title: 'ЖК Балтийский',
    numbers: [
      { value: '7м', label: 'Стоимость реализации' },
      { value: '200к', label: 'Стоимость проекта' },
      { value: '60 дней', label: 'Время реализации' },
      { value: '100м²', label: 'Площадь' }
    ],
    images: [
      'slider/жк балтийский.png',
      'slider/iron speedy.png',
      'slider/green pool.jpg',
      'slider/batmansity.png',
      'slider/жк саморкад.jpg'
    ],
    labels: [
      'ЖК Балтийский',
      'Iron Speedy',
      'Green Pool',
      'Batmansity',
      'ЖК Саморкад'
    ],
    content: [
      {
        title: 'Практически все из нас знают',
        text: 'Практически все из нас знают, что есть полезная и вредная еда. Мы делим все продукты на плохие и хорошие, и стараемся есть только хорошее, которое полезно, а вредное избегать. Но для кого-то будет открытием, что овощи и фрукты приносят организму максимальную пользу, если их есть только в сезон и в климате, где они выращены. И что мясо можно есть только определённым людям, а молочные продукты показаны не всем. Подобные знания о себе и своём теле, которые приходят с опытом, помогают нам быть здоровыми и счастливыми. Точно так же и с интерьером: есть много стилей, которые можно изучать, и долго их выбирать. Но только один из них будет по-настоящему вашим.',
        img: 'slider/жк саморкад.jpg'
      },
      {
        imgFull: 'slider/iron speedy.png'
      },
      {
        imgRow: ['slider/green pool.jpg', 'slider/batmansity.png']
      },
      {
        text: 'Подобные знания о себе и своём теле, которые приходят с опытом, помогают нам быть здоровыми и счастливыми. Точно так же и с интерьером: есть много стилей, которые можно изучать, и долго их выбирать. Но только один из них будет по-настоящему вашим.',
        isBottom: true
      },
      {
        imgFull: 'slider/жк балтийский.png'
      }
    ]
  },
  // Можно добавить другие проекты по аналогии
];

// --- Получение id из query ---
function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10) || 1;
}

function findProjectData(id) {
  return projectDataList.find(p => p.id === id) || projectDataList[0];
}

// --- Слайдер (только с одной надписью слева по центру) ---
function createSlider({containerId, images}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="slider">
      <div class="slider-main-title">Квартира в стиле<br>минимализма и акцентами<br>в мебели</div>
      <img class="slider-img" src="${images[0]}" alt="Слайд 1">
      <div class="slider-indicators"></div>
      <div class="slider-thumbs"></div>
    </div>
  `;
  let current = 0;
  const img = container.querySelector('.slider-img');
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
    renderIndicators();
    renderThumbs();
  }
  renderIndicators();
  renderThumbs();
}

// --- Рендерим всё ---
document.addEventListener('DOMContentLoaded', function() {
  const id = getProjectId();
  const project = findProjectData(id);
  // Слайдер
  createSlider({
    containerId: 'project-slider',
    images: project.images
  });
  // Цифры
  const numbersRow = document.getElementById('projectNumbersRow');
  if (numbersRow) {
    numbersRow.innerHTML = project.numbers.map(n => `
      <div class="doverie-number-block">
        <div class="doverie-number">${n.value}</div>
        <div class="doverie-number-label">${n.label}</div>
      </div>
    `).join('');
  }
  // Контент
  const content = document.getElementById('projectContent');
  if (content) {
    content.innerHTML = '';
    project.content.forEach(block => {
      if (block.title && block.text && block.img) {
        content.innerHTML += `
          <div class="doverie-content-row">
            <div class="doverie-content-text">
              <div class="doverie-content-title">${block.title}</div>
              <div class="doverie-content-subtitle">${block.text}</div>
            </div>
            <div class="doverie-content-img">
              <img src="${block.img}" alt="${block.title}">
            </div>
          </div>
        `;
      } else if (block.imgFull) {
        content.innerHTML += `
          <div class="doverie-img-full">
            <img src="${block.imgFull}" alt="Фото проекта">
          </div>
        `;
      } else if (block.imgRow) {
        content.innerHTML += `
          <div class="doverie-img-row">
            <div class="doverie-img-half"><img src="${block.imgRow[0]}" alt="Фото проекта"></div>
            <div class="doverie-img-half"><img src="${block.imgRow[1]}" alt="Фото проекта"></div>
          </div>
        `;
      } else if (block.text && block.isBottom) {
        content.innerHTML += `
          <div class="doverie-content-subtitle doverie-content-bottom-text">${block.text}</div>
        `;
      }
    });
  }
}); 