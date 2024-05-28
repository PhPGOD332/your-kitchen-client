## Твоя Кухня Client

Приложение разработано для компании [**Твоя Кухня**](https://youkuhnya.ru)


### Работа с проектом
#### Установка зависимостей
```bash
yarn
```
или
```bash
npm install
```
---
#### Запуск в режиме разработки

```bash
npm run dev
```
или
```bash
yarn dev
```
---
#### Сборка проекта
```bash
npm run build
```
или
```bash
yarn build
```
---
#### Запуск в production режиме
```bash
npm run start
```
или
```bash
yarn start
```
---

### Стек:
- React
- Next JS
- TypeScript
- Redux
- SASS
  
Архитектура приложения - **Feature Sliced Design**.

Папка src:
-  app
   -  styles - глобальные стили
   -  остальные файлы - страницы
- data
  - статичные данные, картинки и т.д.
- features
  - функции
- http - axios interceptors
- pages - страницы для статичной загрузки
- services - запросы на сервер
- shared - часто используемые компоненты и функции
- store - глобальное хранилище Redux
- types - типы и интерфейсы
- widgets - блоки и компоненты

Автор: [Киреев Кирилл](https://t.me/ker4ik13)