# Новая структура проекта Vershina Art

## 📁 Целевая структура

```
vershina-art/
├── index.html                 # Главная страница (десктоп)
├── mobile.html               # Мобильная версия
├── pages/                    # Все остальные страницы
│   ├── contacts.html
│   ├── portfolio.html
│   ├── blog.html
│   └── about.html
├── assets/                   # Все ресурсы
│   ├── css/
│   │   ├── main.css         # Основные стили
│   │   ├── mobile.css       # Мобильные стили
│   │   └── components.css   # Компоненты
│   ├── js/
│   │   ├── main.js          # Основной JS
│   │   └── components.js    # Компоненты JS
│   └── images/              # Все изображения
│       ├── icons/           # Иконки
│       ├── portfolio/       # Портфолио
│       ├── vectors/         # SVG векторы VERSHINA ART
│       └── ui/              # UI элементы
├── docs/                    # Документация
│   ├── README.md
│   └── DEPLOY.md
└── config/                  # Конфигурация
    ├── .gitignore
    └── package.json
```

## 🗑️ Файлы для удаления

- node_modules/ (не нужно в Git)
- Дублирующиеся файлы
- Временные файлы
- Тестовые файлы

## ✅ Файлы для переименования

- index-mobile.html → mobile.html
- style.css → assets/css/main.css
- script.js → assets/js/main.js 