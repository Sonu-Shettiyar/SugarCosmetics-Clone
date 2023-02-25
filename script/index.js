let baseUrl = 'https://beautybliss-cosmetics-mock-api.onrender.com';

// ---------------Display-loggedUserName-----------
let logName = document.querySelector("#loggedUserName");
let logbtn = document.querySelector('header .logout');

let getData = localStorage.getItem("logger");
if(!(getData)){
    logName.innerHTML = 'Login/Register';
}else{
    logName.innerHTML = `Hi ${getData}`;
    logbtn.setAttribute('id', 'displayLogout');
}

logbtn.addEventListener('click', function(evnt){
    evnt.preventDefault();
    localStorage.setItem('logger', null);
    window.location.href = 'index.html';
})
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


(function loop() {
    setInterval(() => {
        imgEl.src = imgArray[count % imgArray.length];
        count++;
    }, 2000);
})();



// Bestseller Section Starting 

// let lipstickUrl = 'https://plain-lamb-school-uniform.cyclic.app/data';
let containerEl = document.querySelector('#bestSeller .cardSection #cardContainer');
let nextButton = document.querySelector('#bestSeller .cardSection .button2')
let prevButton = document.querySelector('#bestSeller .cardSection .button1')

let lipstickPages;
let pgno = 1;

nextButton.addEventListener('click', function () {
    pgno++;
    fetchAndRender(pgno % lipstickPages);
})
prevButton.addEventListener('click', function () {
    pgno--;
    fetchAndRender(pgno % lipstickPages);
})


async function fetchAndRender(pageNumber = 1) {
    let data = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick?_limit=4&_page=${pageNumber}`);
    lipstickPages = Math.ceil(data.headers.get('X-Total-Count') / 4);
    data = await data.json();
    renderCard(data);
}

fetchAndRender();

function renderCard(data) {
    let arr = data.map((el) => eachcard(el));
    containerEl.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#bestSeller .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el) => {
        el.addEventListener('click', function (evnt) {
            if (evnt.target.dataset['wish'] == 'false') {
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            } else {
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
    let cartBtn = document.querySelectorAll('#bestSeller .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addLipstick(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addLipstick(id){
    let data = await fetch(`${baseUrl}/lipstick/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}

// Add to Cart Function 

async function addingToCart(data){
    let dt = await fetch(`${baseUrl}/cart`,{
        method: 'POST',
        body: JSON.stringify({...data, ...{nos:1}}),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(dt.ok){
        console.log('Added to cart');
    }
}

// {
//     "id": 1,
//     "title": "Matte As Hell Crayon Lipstick",
//     "image": "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0906%2F2558%2Fproducts%2F01_d6ffec78-c2b6-4466-8672-233fee0285a8.jpg%3Fv%3D1644394232&w=256&q=75",
//     "sellingprice": 849,
//     "rating": 4.8,
//     "type": "Crayon Lipstick",
//     "totalprice": 1000,
//     "category": "Lipstick",
//     "nos": 1
//     },

// BestSeller Section Ending 

// Card Markup 
function eachcard(data) {
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
    <button class='addToCart' data-id=${data.id}>
    ADD TO CART
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

nextButton2.addEventListener('click', function () {
    pgno1++;
    fetchAndRender2(pgno1 % foundationPages);
})
prevButton2.addEventListener('click', function () {
    pgno1--;
    fetchAndRender2(pgno1 % foundationPages);
})

async function fetchAndRender2(pageNumber = 1) {
    let data = await fetch(`${baseUrl}/foundation?_limit=4&_page=${pageNumber}`);
    foundationPages = Math.ceil(data.headers.get('X-Total-Count') / 4);
    data = await data.json();
    renderCard2(data);
}

fetchAndRender2();

function renderCard2(data) {
    let arr = data.map((el) => eachcard(el));
    containerEl2.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#justIn .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el) => {
        el.addEventListener('click', function (evnt) {
            if (evnt.target.dataset['wish'] == 'false') {
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            } else {
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
    let cartBtn = document.querySelectorAll('#justIn .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addJustIn(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addJustIn(id){
    let data = await fetch(`${baseUrl}/foundation/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}


// Just in Section Ending 

// Buy Now and Pay Later Section Starting

let containerEl3 = document.querySelector('#buyNowPayLater .cardSection #cardContainer');
let nextButton3 = document.querySelector('#buyNowPayLater .cardSection .button2');
let prevButton3 = document.querySelector('#buyNowPayLater .cardSection .button1');


let eyesPages
let pgno2 = 1;

nextButton3.addEventListener('click', function () {
    pgno2++;
    fetchAndRender3(pgno2 % eyesPages);
})
prevButton3.addEventListener('click', function () {
    pgno2--;
    fetchAndRender3(pgno2 % eyesPages);
})

async function fetchAndRender3(pageNumber = 1) {
    let data = await fetch(`${baseUrl}/eyes?_limit=4&_page=${pageNumber}`);
    eyesPages = Math.ceil(data.headers.get('X-Total-Count') / 4);
    data = await data.json();
    renderCard3(data);
}

fetchAndRender3();

function renderCard3(data) {
    let arr = data.map((el) => eachcard(el));
    containerEl3.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#buyNowPayLater .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el) => {
        el.addEventListener('click', function (evnt) {
            if (evnt.target.dataset['wish'] == 'false') {
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            } else {
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
    let cartBtn = document.querySelectorAll('#buyNowPayLater .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addBuyPay(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addBuyPay(id){
    let data = await fetch(`${baseUrl}/eyes/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}

// Buy Now and Pay Later Section Ending 

// Gifting Section Starting 
let containerEl5 = document.querySelector('#gifting .cardSection #cardContainer');
let nextButton5 = document.querySelector('#gifting .cardSection .button2');
let prevButton5 = document.querySelector('#gifting .cardSection .button1');


let giftPages
let pgno4 = 1;

nextButton5.addEventListener('click', function(){
    pgno4++;
    fetchAndRender5(pgno4%giftPages);
})
prevButton5.addEventListener('click', function(){
    pgno4--;
    fetchAndRender5(pgno4%giftPages);
})

async function fetchAndRender5(pageNumber=1){
    let data = await fetch(`https://odd-pear-scallop-ring.cyclic.app/data?_limit=4&_page=${pageNumber}`);
    giftPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard5(data);
}

fetchAndRender5();

function renderCard5(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl5.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#gifting .cardSection #cardContainer .card .wishlist');
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
    let cartBtn = document.querySelectorAll('#gifting .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addGifting(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addGifting(id){
    let data = await fetch(`https://odd-pear-scallop-ring.cyclic.app/data/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}

// Gifting Section Ending 

// Super Savers Section Starting 

let containerEl4 = document.querySelector('#superSavers .cardSection #cardContainer');
let nextButton4 = document.querySelector('#superSavers .cardSection .button2');
let prevButton4 = document.querySelector('#superSavers .cardSection .button1');


let kitsPages
let pgno3 = 1;

nextButton4.addEventListener('click', function () {
    pgno3++;
    fetchAndRender4(pgno3 % kitsPages);
})
prevButton4.addEventListener('click', function () {
    pgno3--;
    fetchAndRender4(pgno3 % kitsPages);
})

async function fetchAndRender4(pageNumber = 1) {
    let data = await fetch(`${baseUrl}/makeupkit?_limit=4&_page=${pageNumber}`);
    kitsPages = Math.ceil(data.headers.get('X-Total-Count') / 4);
    data = await data.json();
    renderCard4(data);
}

fetchAndRender4();

function renderCard4(data) {
    let arr = data.map((el) => eachcard(el));
    containerEl4.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#superSavers .cardSection #cardContainer .card .wishlist');
    wishbtn.forEach((el) => {
        el.addEventListener('click', function (evnt) {
            if (evnt.target.dataset['wish'] == 'false') {
                el.innerHTML = '<i class="fa-sharp fa-solid fa-heart" data-id="true"></i>';
                evnt.target.dataset.wish = 'true';
            } else {
                el.innerHTML = '<i class="fa-sharp fa-regular fa-heart" data-id="false"></i>';
                evnt.target.dataset.wish = 'false';
            }
        })
    })
    let cartBtn = document.querySelectorAll('#superSavers .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addsuperSavers(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addsuperSavers(id){
    let data = await fetch(`${baseUrl}/makeupkit/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}

// Super Savers Section Ending 

// newLaunches Section Starting 
let imgArray2 = [
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F0015f35b-4322-49e6-9e04-97362bb14dc4.gif&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F927e5f3e-64c4-4105-b315-0882d6c07f64.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F562fe539-20b1-4239-903e-9a27747b8bf0.gif&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9e2d8597-51d5-41be-95b0-aac4cc0e9794.gif&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F37471559-27d1-4509-9e31-29d889be7036.jpg&w=1920&q=75',
    'https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fcad57234-a923-4191-8f1e-62ced44a02af.gif&w=1920&q=75',
]

let imgEl2 = document.querySelector('#slideshow2 img');
imgEl2.src = imgArray2[0];

let count2 = 1;


(function loop(){
    setInterval(()=>{
        imgEl2.src = imgArray2[count2%imgArray2.length];
        count2++;
    }, 3500);
})();
// newLaunches Section Ending 

// Merch Section Starting

let containerEl6 = document.querySelector('#merch .cardSection #cardContainer');
let nextButton6 = document.querySelector('#merch .cardSection .button2');
let prevButton6 = document.querySelector('#merch .cardSection .button1');


let merchPages
let pgno5 = 1;

nextButton6.addEventListener('click', function(){
    pgno5++;
    fetchAndRender6(pgno5%merchPages);
})
prevButton6.addEventListener('click', function(){
    pgno5--;
    fetchAndRender6(pgno5%merchPages);
})

async function fetchAndRender6(pageNumber=1){
    let data = await fetch(`https://odd-pear-scallop-ring.cyclic.app/merch?_limit=4&_page=${pageNumber}`);
    merchPages = Math.ceil(data.headers.get('X-Total-Count')/4);
    data = await data.json();
    renderCard6(data);
}

fetchAndRender6();

function renderCard6(data){
    let arr = data.map((el)=>eachcard(el));
    containerEl6.innerHTML = arr.join('\n');
    let wishbtn = document.querySelectorAll('#merch .cardSection #cardContainer .card .wishlist');
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
    let cartBtn = document.querySelectorAll('#merch .cardSection #cardContainer .card .addToCart');
    cartBtn.forEach((el)=>{
        el.addEventListener('click', function(evnt){
            if(getData!==null){
                addMerch(evnt.target.dataset['id']);
            }else{
                alert('Login First');
            }
        })
    })
}

async function addMerch(id){
    let data = await fetch(`https://odd-pear-scallop-ring.cyclic.app/merch/${id}`)
    data = await data.json();
    console.log(data);
    addingToCart(data);
}

// Merch Section Ending 

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
exploreNext.addEventListener('click', function () {
    img1.src = exploreImg[4];
    img2.src = exploreImg[5];
    img3.src = exploreImg[6];
    img4.src = exploreImg[7];
})
explorePrev.addEventListener('click', function () {
    img1.src = exploreImg[0];
    img2.src = exploreImg[1];
    img3.src = exploreImg[2];
    img4.src = exploreImg[3];
})




// //-------------linking-Page------;
// let kkDepart = document.querySelector("#kohl_kajal");
// let FDepart = document.querySelector("#faces");
// let LipDepart = document.querySelector("#lips_page");

// kkDepart.addEventListener("click", function () {
//     window.location.href = "../product-page_kajal/kajal.html"
// })
// LipDepart.addEventListener("click", function () {
//     window.location.href = "../product-page_kajal/lipstick.html"
// })


