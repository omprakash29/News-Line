const apiKey = '29247cbe019b49bba66c467e03d0d7e8'
const url = "https://newsapi.org/v2/everything?q=";

function reload(){
    window.location.reload()
}

window.addEventListener("load",() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&pageSize=31&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles)
}

function bindData(articles){
    const blogConatainer= document.getElementById("blog-container")
    const templateCard = document.getElementById("template-card")

    blogConatainer.innerHTML=""
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardclone = templateCard.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        blogConatainer.appendChild(cardclone)
    });
}

function fillDataInCard(cardclone,article){
    const newsImg = cardclone.querySelector("#news-image");
    const newsTitle = cardclone.querySelector("#news-title");
    const newsSource = cardclone.querySelector("#news-source");
    const newsDesc = cardclone.querySelector("#news-desc");
    
    newsImg.src = article.urlToImage
    newsTitle.innerHTML= article.title
    const description = article.description.length>150?article.description.slice(0,150) + " ......" : article.description;
    newsDesc.innerHTML = description
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} . ${date}`

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim()
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

document.addEventListener("keydown", (event) => {
    if(event.key === 'Enter') {
        searchButton.click();
    }
})