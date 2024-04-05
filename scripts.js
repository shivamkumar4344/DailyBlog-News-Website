const API_KEY = "881de863599547c283c0e4c7c0f2c54a";
// const API_KEY = "44b07e40c81e4ae284e49626f3a0c81a";

const url = "https://newsapi.org/v2/everything?q=";

//Index page
window.addEventListener('load',()=>fetchNews("India"));

function reload()
{
    window.location.reload();
}



async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

    const data = await res.json();
    console.log(data);

    bindData(data.articles);


}

function bindData(articles)
{
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })

}

let currentSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const serachButton = document.getElementById("search-button");

const searchText = document.getElementById("search-text");

serachButton.addEventListener("click", () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;

})


//Login Form
function validate()
{
    const pass = document.getElementById("password");
    if(pass.length<8)
    {
        window.alert("invalid");
        return;
    }
}
