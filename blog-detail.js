// --- Данные для примера (имитация сервера) ---
// blogCardsData и blogFeaturedData должны быть доступны глобально (как в blogger.js)

// Получение параметра id из query string
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// --- Рендеринг ---
function renderBlogDetail(data) {
  document.getElementById('blogDetailTitle').textContent = data.title;
  document.getElementById('blogDetailCol1Title').textContent = data.col1Title || '';
  document.getElementById('blogDetailCol1Text').textContent = data.col1Text || '';
  document.getElementById('blogDetailCol2Text').textContent = data.col2Text || '';
  document.getElementById('blogDetailImg1').src = data.img1;
  document.getElementById('blogDetailImg2').src = data.img2;
  document.getElementById('blogDetailDate').textContent = data.date;
  document.getElementById('blogDetailCategory').textContent = data.category;
  document.getElementById('blogDetailAuthor').textContent = data.author;
  document.getElementById('blogDetailBottomTitle').textContent = data.bottomTitle;
  document.getElementById('blogDetailBottomText').innerHTML = data.bottomText.replace(/\n/g, '<br>');

  // Подзаголовок второй колонки: если пустой, скрываем, иначе показываем
  var col2Title = document.getElementById('blogDetailCol2Title');
  if (data.col2Title && data.col2Title.trim() !== '') {
    col2Title.textContent = data.col2Title;
    col2Title.style.visibility = 'visible';
  } else {
    col2Title.textContent = 'заглушка';
    col2Title.style.visibility = 'hidden';
  }

  // Анимация появления текста
  document.querySelector('.blog-detail-bottom-left').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.blog-detail-bottom-left').style.transition = 'opacity 0.8s';
    document.querySelector('.blog-detail-bottom-left').style.opacity = 1;
  }, 100);

  // Динамическая высота картинок справа внизу
  const textBlock = document.querySelector('.blog-detail-bottom-left');
  const imagesBlock = document.getElementById('blogDetailBottomImages');
  imagesBlock.innerHTML = '';
  setTimeout(() => {
    const textHeight = textBlock.offsetHeight;
    const imgHeight = 360; // px, высота одной картинки (в 2 раза больше)
    let count = Math.max(1, Math.round(textHeight / imgHeight));
    // Проверка: если count*imgHeight > textHeight, уменьшаем count
    if ((count * imgHeight) > textHeight + imgHeight/2 && count > 1) {
      count--;
    }
    let totalImgHeight = count * imgHeight;
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.src = data.bottomImages[i % data.bottomImages.length];
      img.style.height = imgHeight + 'px';
      img.style.width = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '20px';
      img.style.marginBottom = '18px';
      img.style.opacity = 0;
      img.style.transform = 'translateY(40px)';
      img.style.transition = 'opacity 0.7s, transform 0.7s';
      setTimeout(() => {
        img.style.opacity = 1;
        img.style.transform = 'translateY(0)';
      }, 200 + i * 180);
      imagesBlock.appendChild(img);
    }
  }, 200);
}

// --- Формирование данных для детальной страницы на основе blogCardsData ---
function getDetailDataById(id) {
  if (!window.blogCardsData) return null;
  const idx = parseInt(id, 10);
  if (isNaN(idx) || idx < 0 || idx >= blogCardsData.length) return null;
  const card = blogCardsData[idx];
  // Пример генерации данных для детальной страницы на основе карточки
  return {
    title: card.title,
    col1Title: 'Описание',
    col1Text: card.desc,
    col2Text: 'Подробнее о проекте и его особенностях.',
    img1: card.image,
    img2: card.image,
    date: '06.05.2025', // Можно добавить дату в blogCardsData
    category: card.category,
    author: 'Автор', // Можно добавить автора в blogCardsData
    bottomTitle: card.title,
    bottomText: card.desc + '\n\nЗдесь может быть подробное описание проекта, его этапы, сложности и решения.',
    bottomImages: [
      'slider/3.png',
      'slider/4.jpg',
      'slider/5.png',
      'slider/6.svg',
      'slider/batmansity.png',
      'slider/green pool.jpg',
      'slider/iron speedy.png',
    ]
  };
}

document.addEventListener('DOMContentLoaded', function() {
  // Получаем id из query string
  const id = getQueryParam('id');
  let data = null;
  if (id !== null) {
    data = getDetailDataById(id);
  }
  if (!data) {
    // fallback на дефолтные данные
    data = {
      title: 'Суперновость про компанию или что-то связанное с ней',
      col1Title: 'Уважение',
      col1Text: 'Соблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище. Практически все из нас знают, что есть полезная и вредная еда, мы делаем все продукты на плохие и хорошие, и это действительно так, потому что не все они полезны для человеческого организма, и есть много таких, которые вредны, и иногда и опасны.',
      col2Text: 'Соблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище.',
      img1: 'slider/1.jpg',
      img2: 'slider/2.jpg',
      date: '06.05.2025',
      category: 'Дизайн интерьеров',
      author: 'Надежда Бойко',
      bottomTitle: 'Практически все из нас знают',
      bottomText: `Практически все из нас знают, что есть полезная и вредная еда, мы делаем все продукты на плохие и хорошие, и это действительно так, потому что не все они полезны для человеческого организма, и есть много таких, которые вредны, и иногда и опасны.\n\nНи для кого не будет открытием, что овощи и фрукты принесут организму колоссальную пользу, так же как мясные вкусняшки вред и плохие эмоции.\n\nСоблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище. Вкусная и полезная пища необходима для здоровья и работоспособности человека.\n\nСоблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище. Вкусная и полезная пища необходима для здоровья и работоспособности человека.`,
      bottomImages: [
        'slider/3.png',
        'slider/4.jpg',
        'slider/5.png',
        'slider/6.svg',
        'slider/batmansity.png',
        'slider/green pool.jpg',
        'slider/iron speedy.png',
      ]
    };
  }
  renderBlogDetail(data);
}); 