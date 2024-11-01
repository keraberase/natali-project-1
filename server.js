const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Определение папки для статических файлов
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

// Маршрут для index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Обработка всех остальных маршрутов для SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
