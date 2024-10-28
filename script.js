document.addEventListener('DOMContentLoaded', loadNews);

const newsForm = document.getElementById('newsForm');
const newsContainer = document.getElementById('newsContainer');

newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;
    const textColor = document.getElementById('textColor').value;
    const textSize = document.getElementById('textSize').value;

    const news = {
        id: Date.now(),
        author,
        date,
        content,
        textColor,
        textSize
    };

    saveNews(news);
    displayNews(news);
    newsForm.reset();
});

function saveNews(news) {
    const newsList = getNewsList();
    newsList.push(news);
    localStorage.setItem('news', JSON.stringify(newsList));
}

function getNewsList() {
    return JSON.parse(localStorage.getItem('news')) || [];
}

function displayNews(news) {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news-item');
    newsDiv.setAttribute('data-id', news.id);
    newsDiv.style.color = news.textColor;
    newsDiv.style.fontSize = `${news.textSize}px`;

    newsDiv.innerHTML = `
        <div class="actions">
            <button onclick="editNews(${news.id})">Editar</button>
            <button onclick="deleteNews(${news.id})">Eliminar</button>
        </div>
        <h3>${news.author} - ${news.date}</h3>
        <p>${news.content}</p>
    `;

    newsContainer.prepend(newsDiv);
}

function loadNews() {
    const newsList = getNewsList();
    newsList.forEach(displayNews);
}

function deleteNews(id) {
    const newsList = getNewsList();
    const updatedNewsList = newsList.filter(news => news.id !== id);
    localStorage.setItem('news', JSON.stringify(updatedNewsList));
    document.querySelector(`.news-item[data-id="${id}"]`).remove();
}

function editNews(id) {
    const newsList = getNewsList();
    const news = newsList.find(news => news.id === id);

    document.getElementById('author').value = news.author;
    document.getElementById('date').value = news.date;
    document.getElementById('content').value = news.content;
    document.getElementById('textColor').value = news.textColor;
    document.getElementById('textSize').value = news.textSize;

    deleteNews(id);
}