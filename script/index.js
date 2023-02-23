let baseUrl = 'https://beautybliss-cosmetics-mock-api.onrender.com';
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



// Bestseller Section Starting 

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
    let data = await fetch(`${baseUrl}/lipstick?_limit=4&_page=${pageNumber}`);
    lipstickPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard(data);
}

fetchAndRender();

function renderCard(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#bestSeller .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(evnt.target.dataset['wish'] == 'false'){
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            }else{
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
}



// BestSeller Section Ending 

// Card Markup 
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
    <button class='wishlist'data-wish='false'>
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


// Just in Section Starting 

let containerEl2 = document.querySelector('#justIn .cardSection #cardContainer');
let nextButton2 = document.querySelector('#justIn .cardSection .button2');
let prevButton2 = document.querySelector('#justIn .cardSection .button1');


let foundationPages
let pgno1 = 1;

nextButton2.addEventListener('click', function(){
    pgno1++;
    fetchAndRender2(pgno1%foundationPages);
})
prevButton2.addEventListener('click', function(){
    pgno1--;
    fetchAndRender2(pgno1%foundationPages);
})

async function fetchAndRender2(pageNumber=1){
    let data = await fetch(`${baseUrl}/foundation?_limit=4&_page=${pageNumber}`);
    foundationPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard2(data);
}

fetchAndRender2();

function renderCard2(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl2.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#justIn .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(evnt.target.dataset['wish'] == 'false'){
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            }else{
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
}

// Just in Section Ending 

// Buy Now and Pay Later Section Starting

let containerEl3 = document.querySelector('#buyNowPayLater .cardSection #cardContainer');
let nextButton3 = document.querySelector('#buyNowPayLater .cardSection .button2');
let prevButton3 = document.querySelector('#buyNowPayLater .cardSection .button1');


let eyesPages
let pgno2 = 1;

nextButton3.addEventListener('click', function(){
    pgno2++;
    fetchAndRender3(pgno2%eyesPages);
})
prevButton3.addEventListener('click', function(){
    pgno2--;
    fetchAndRender3(pgno2%eyesPages);
})

async function fetchAndRender3(pageNumber=1){
    let data = await fetch(`${baseUrl}/eyes?_limit=4&_page=${pageNumber}`);
    eyesPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard3(data);
}

fetchAndRender3();

function renderCard3(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl3.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#buyNowPayLater .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(evnt.target.dataset['wish'] == 'false'){
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            }else{
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
}
// Buy Now and Pay Later Section Ending 

// Super Savers Section Starting 

let containerEl4 = document.querySelector('#superSavers .cardSection #cardContainer');
let nextButton4 = document.querySelector('#superSavers .cardSection .button2');
let prevButton4 = document.querySelector('#superSavers .cardSection .button1');


let kitsPages
let pgno3 = 1;

nextButton4.addEventListener('click', function(){
    pgno3++;
    fetchAndRender4(pgno3%kitsPages);
})
prevButton4.addEventListener('click', function(){
    pgno3--;
    fetchAndRender4(pgno3%kitsPages);
})

async function fetchAndRender4(pageNumber=1){
    let data = await fetch(`${baseUrl}/makeupkit?_limit=4&_page=${pageNumber}`);
    kitsPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard4(data);
}

fetchAndRender4();

function renderCard4(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl4.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#superSavers .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(evnt.target.dataset['wish'] == 'false'){
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            }else{
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
}

// Super Savers Section Ending 

// Explore Section Starting 
let exploreImg = [
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F97722164-55b4-4030-a9f6-0219a9575a24.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F52b4f85e-f9e8-465a-a9a4-6f11e6b407aa.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fa7b72adf-7e02-45c4-a208-552d46eefc4c.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F88ee8d58-7cc5-450a-953b-aa16ef190d52.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F60bdba27-5962-401b-b03e-2c55baa74bd1.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F259217a4-239d-4103-8bf7-cd2a7e1529c1.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F8e3d35ed-5e1f-4056-b36a-575761e2c995.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F97722164-55b4-4030-a9f6-0219a9575a24.jpg&w=1920&q=75'
]

let img1 = document.querySelector('.cardContainerForExplore .one');
let img2 = document.querySelector('.cardContainerForExplore .two');
let img3 = document.querySelector('.cardContainerForExplore .three');
let img4 = document.querySelector('.cardContainerForExplore .four');
let exploreNext = document.querySelector('.cardContainerForExplore .nextItems');
let explorePrev = document.querySelector('.cardContainerForExplore .prevItems');

img1.src = exploreImg[0];
img2.src = exploreImg[1];
img3.src = exploreImg[2];
img4.src = exploreImg[3];
exploreNext.addEventListener('click', function(){
    img1.src = exploreImg[4];
    img2.src = exploreImg[5];
    img3.src = exploreImg[6];
    img4.src = exploreImg[7];
})
explorePrev.addEventListener('click', function(){
    img1.src = exploreImg[0];
    img2.src = exploreImg[1];
    img3.src = exploreImg[2];
    img4.src = exploreImg[3];
})
