// Slideshow 

let imgArray = [
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9723d8e3-9e99-459f-acfe-4ef93089e9ef.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fac1ec1f4-fd83-4477-8f04-3a3a8d497e9c.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fe87bf28f-6430-45fa-bd97-49fdb1705df0.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fc8a0aa10-0c57-48e4-8882-31662d4c3c78.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fab569f69-5f23-4018-8a74-8657fc279ac3.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9adf71b4-8c62-45c2-9c54-e716a5140794.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fe4ea7d7e-eba9-41ac-9010-3856b42d3ffa.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F069d0c1c-f78c-4d80-94f9-e65f3bbdda73.jpg&w=1920&q=75'
]

let imgEl = document.querySelector('#slideshow img');
imgEl.src = imgArray[0];

let count = 1;


(function loop(){
    setInterval(()=>{
        imgEl.src = imgArray[count%imgArray.length];
        count++;
    }, 2000);
})();



// Bestseller Section 
let lipstickUrl = 'https://plain-lamb-school-uniform.cyclic.app/data';
let containerEl = document.querySelector('#bestSeller .cardSection #cardContainer');
let nextButton = document.querySelector('#bestSeller .cardSection .button2')
let prevButton = document.querySelector('#bestSeller .cardSection .button1')

let lipstickPages;
let pgno = 1;

nextButton.addEventListener('click', function(){
    pgno++;
    fetchAndRender(pgno%lipstickPages);
})
prevButton.addEventListener('click', function(){
    pgno--;
    fetchAndRender(pgno%lipstickPages);
})


async function fetchAndRender(pageNumber=1){
    let data = await fetch(`${lipstickUrl}?_limit=4&_page=${pageNumber}`);
    lipstickPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard(data);
}

fetchAndRender();

function renderCard(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl.innerHTML = arr.join('\n');
    let wishbtn = document.querySelector('#bestSeller .cardSection #cardContainer .card .wishlist');
    wishbtn.addEventListener('click', function(evnt){
        console.log(evnt.target.dataset['id']);
        if(evnt.target.dataset['wish'] == 'false'){
            wishbtn.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
        }else{
            wishbtn.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';

        }
    })
}


function eachcard(data){
    let str = 
    `
    <div class='card'>
    <div class='image'>
    <img src=${data.image}>
    </div>
    <div class='body'>
    <p>
    ${data.title}
    </p>
    <h3>&#8377 ${data.sellingprice}    <del>${data.totalprice}</del> </h3>
    </div>
    <div class='buttoncontainer'>
    <button class='wishlist'>
    <i class="fa-sharp fa-regular fa-heart" data-wish='false' data-id=${data.id}></i>
    </button>
    <button class='addToCart'>
    <h2> ADD TO BAG</ h2>
    </button>
    </div>
    </div>
    `;
    return str;
}

