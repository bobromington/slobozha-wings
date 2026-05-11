## Заміна favicon

1. Скопіювати завантажене зображення `user-uploads://СЛОБОДА-SAMOSUD_TEAM-2.png` у `public/favicon.png`.
2. Видалити старий `public/favicon.ico`, щоб браузер не підтягував його за замовчуванням.
3. Оновити `index.html` — додати/замінити тег у `<head>`:
   ```html
   <link rel="icon" href="/favicon.png" type="image/png">
   ```

Після цього вкладка браузера показуватиме новий логотип. Може знадобитись жорстке оновлення сторінки (Ctrl+Shift+R), щоб побачити зміну.
