# Инструкции по развертыванию

## 🚀 Загрузка на GitHub

### 1. Создание репозитория

1. Зайдите на [GitHub](https://github.com)
2. Нажмите кнопку "New repository"
3. Укажите название: `vershina-art-website`
4. Добавьте описание: "Сайт студии дизайна интерьеров Vershina Art"
5. Выберите "Public" или "Private"
6. **НЕ** добавляйте README, .gitignore или лицензию (они уже есть)

### 2. Инициализация Git

Откройте терминал в папке проекта и выполните:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Vershina Art website"

# Добавление удаленного репозитория (замените URL на ваш)
git remote add origin https://github.com/ВАШ_USERNAME/vershina-art-website.git

# Установка основной ветки
git branch -M main

# Загрузка на GitHub
git push -u origin main
```

### 3. Настройка GitHub Pages

1. Перейдите в Settings репозитория
2. Найдите раздел "Pages"
3. В "Source" выберите "Deploy from a branch"
4. Выберите ветку "main" и папку "/ (root)"
5. Нажмите "Save"

Сайт будет доступен по адресу: `https://ВАШ_USERNAME.github.io/vershina-art-website/`

## 🔄 Обновление проекта

Для загрузки изменений:

```bash
# Добавить измененные файлы
git add .

# Создать коммит с описанием изменений
git commit -m "Описание изменений"

# Загрузить на GitHub
git push
```

## 📝 Полезные команды Git

```bash
# Проверить статус
git status

# Посмотреть историю коммитов
git log --oneline

# Создать новую ветку
git checkout -b feature/new-feature

# Переключиться на ветку
git checkout main

# Слить ветку
git merge feature/new-feature

# Клонировать репозиторий
git clone https://github.com/ВАШ_USERNAME/vershina-art-website.git
```

## 🌐 Альтернативные платформы для хостинга

### Netlify
1. Зайдите на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий
3. Настройки деплоя оставьте по умолчанию
4. Нажмите "Deploy site"

### Vercel
1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте проект из GitHub
3. Настройки оставьте по умолчанию
4. Нажмите "Deploy"

## 🔧 Настройка для продакшена

### Оптимизация изображений
```bash
# Сжатие изображений (если установлен ImageMagick)
find . -name "*.jpg" -exec convert {} -quality 85 {} \;
find . -name "*.png" -exec convert {} -quality 85 {} \;
```

### Минификация CSS и JS
Рекомендуется использовать онлайн-инструменты:
- [CSS Minifier](https://cssminifier.com/)
- [JavaScript Minifier](https://javascript-minifier.com/)

### Настройка домена
1. Купите домен у регистратора
2. В настройках DNS добавьте CNAME запись:
   - Name: `www`
   - Value: `ВАШ_USERNAME.github.io`
3. В GitHub Pages укажите custom domain

## 📊 Аналитика

### Google Analytics
Добавьте в `<head>` всех HTML файлов:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Yandex.Metrica
Добавьте код счетчика в `<head>`:

```html
<!-- Yandex.Metrica -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🛡️ Безопасность

### Заголовки безопасности
Создайте файл `_headers` (для Netlify):

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### robots.txt
Создайте файл `robots.txt` в корне:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте [GitHub Docs](https://docs.github.com)
2. Обратитесь к разработчику проекта
3. Создайте Issue в репозитории 