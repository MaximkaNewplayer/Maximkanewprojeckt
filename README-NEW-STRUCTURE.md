# 📁 Инструкция по реорганизации проекта

## 🎯 Цель
Создать чистую и логичную структуру проекта для GitHub.

## 📋 Что нужно сделать

### 1. Создайте новую папку
Создайте папку `vershina-art` на рабочем столе или в удобном месте.

### 2. Скопируйте файлы в новую структуру:

```
vershina-art/
├── index.html              # Скопировать как есть
├── mobile.html             # Уже создан - скопировать
├── assets/
│   ├── css/
│   │   ├── main.css        # Переименовать style.css → main.css
│   │   └── mobile.css      # Скопировать как есть
│   ├── js/
│   │   └── main.js         # Переименовать script.js → main.js
│   └── images/             # Переместить все папки с изображениями:
│       ├── icons/          # lastblock/ → icons/
│       ├── portfolio/      # slider/ → portfolio/
│       ├── services/       # services_photos/ → services/
│       ├── steps/          # steps/ → steps/
│       ├── vectors/        # Векторы букв VERSHINA ART
│       └── ui/             # images/ → ui/
├── pages/
│   ├── contacts.html       # Скопировать
│   ├── portfolio.html      # Скопировать
│   ├── blog.html           # blogger.html → blog.html
│   └── about.html          # doverie.html → about.html
└── docs/
    ├── README.md           # Скопировать
    ├── DEPLOY.md           # Скопировать
    ├── .gitignore          # Скопировать
    └── package.json        # Скопировать
```

### 3. Обновите пути в файлах

После копирования нужно обновить пути к файлам:

**В index.html:**
```html
<!-- Было -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>

<!-- Стало -->
<link rel="stylesheet" href="assets/css/main.css">
<script src="assets/js/main.js"></script>
```

**В mobile.html:** (уже обновлено)
```html
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/mobile.css">
<script src="assets/js/main.js"></script>
```

**В страницах (pages/):**
```html
<!-- Было -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>

<!-- Стало -->
<link rel="stylesheet" href="../assets/css/main.css">
<script src="../assets/js/main.js"></script>
```

**В CSS файлах обновите пути к изображениям:**
```css
/* Было */
background-image: url('images/photo.jpg');
background-image: url('slider/photo.jpg');
background-image: url('lastblock/icon.svg');

/* Стало */
background-image: url('../images/ui/photo.jpg');
background-image: url('../images/portfolio/photo.jpg');
background-image: url('../images/icons/icon.svg');
```

### 4. Удалите ненужные файлы

НЕ копируйте эти файлы:
- ❌ `node_modules/` (если есть)
- ❌ `index-mobile.html` (заменен на mobile.html)
- ❌ `project-structure.md`
- ❌ `README-NEW-STRUCTURE.md`
- ❌ Дублирующиеся CSS и JS файлы
- ❌ Временные файлы

### 5. Проверьте результат

После реорганизации:
1. Откройте `index.html` в браузере
2. Убедитесь, что все изображения загружаются
3. Проверьте, что стили применяются
4. Проверьте мобильную версию (`mobile.html`)

### 6. Загрузите в Git

Теперь можно загружать в GitHub из папки `vershina-art`:

```bash
cd vershina-art
git init
git add .
git commit -m "Initial commit: Clean project structure"
git remote add origin https://github.com/olegmaymai/versina.git
git branch -M main
git push -u origin main
```

## ✅ Преимущества новой структуры

- 🎯 Логичная организация файлов
- 📁 Все ресурсы в папке `assets`
- 📄 Страницы отдельно в `pages`
- 📚 Документация в `docs`
- 🚀 Готово для профессиональной разработки

## 🆘 Если нужна помощь

Если что-то не получается, скажите на каком этапе возникли сложности! 