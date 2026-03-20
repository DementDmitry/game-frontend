# Game Frontend

React + Vite фронтенд для AI Game Generator.

## Структура
```
src/
├── components/
│   ├── Selector.jsx     — универсальный пикклист
│   ├── Console.jsx      — консоль логов
│   └── GameFrame.jsx    — iframe с игрой
├── services/
│   └── api.js           — запросы к llm-router API
├── config/
│   └── options.js       — все опции и промпты
└── App.jsx              — главный компонент
```

## Запуск локально
```bash
npm install
npm run dev
```

## Деплой
Автоматически через GitHub Actions при push в main.
Живёт на: https://dementdmitry.github.io/game-frontend/
