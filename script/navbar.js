// ---------------Display-loggedUserName-----------
let logName = document.querySelector("#loggedUserName");
let logbtn = document.querySelector('header .logout');

let getData = localStorage.getItem("logger");
if(getData===null||getData==='abc'){
    logName.innerText = 'Login/Register';
}else if(getData!==null){
    logName.innerText = `Hi ${getData}`;
    logbtn.setAttribute('id', 'displayLogout');
}

logbtn.addEventListener('click', function(evnt){
    evnt.preventDefault();
    localStorage.setItem('logger', 'abc');
    window.location.href = '../index.html';
})

//-------------linking-Page------;
let kkDepart = document.querySelector("#kohl_kajal");
let FDepart = document.querySelector("#faces");
let LipDepart = document.querySelector("#lips_page");
kkDepart.style.cursor = 'pointer'
FDepart.style.cursor = 'pointer'
LipDepart.style.cursor = 'pointer'

kkDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/kajal.html"
})
LipDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/lipstick.html"
})

let discountEl = document.querySelector('.discountSection');
let crossEl = document.querySelector('.discountSection img');

crossEl.addEventListener('click',function(){
    discountEl.style.display = 'none';
})

let lips = document.querySelector('.nav #lips');
let dropLips = document.querySelector('.lips');

lips.addEventListener("mouseenter", function(){
    dropLips.style.display = 'flex'
})
lips.addEventListener("mouseleave", function(){
    dropLips.style.display = 'none'
})

dropLips.addEventListener('mouseenter', function(){
    dropLips.style.display = 'flex'
})
dropLips.addEventListener('mouseleave', function(){
    dropLips.style.display = 'none'
})


let eyes = document.querySelector('.nav #eyes');
let dropEyes = document.querySelector('.eyes');

eyes.addEventListener("mouseenter", function(){
    dropEyes.style.display = 'flex'
})
eyes.addEventListener("mouseleave", function(){
    dropEyes.style.display = 'none'
})

dropEyes.addEventListener('mouseenter', function(){
    dropEyes.style.display = 'flex'
})
dropEyes.addEventListener('mouseleave', function(){
    dropEyes.style.display = 'none'
})

let faces = document.querySelector('.nav #face');
let dropFace = document.querySelector('.faces');

faces.addEventListener("mouseenter", function(){
    dropFace.style.display = 'flex'
})
faces.addEventListener("mouseleave", function(){
    dropFace.style.display = 'none'
})

dropFace.addEventListener('mouseenter', function(){
    dropFace.style.display = 'flex'
})
dropFace.addEventListener('mouseleave', function(){
    dropFace.style.display = 'none'
})


let skincare = document.querySelector('.nav #skincare');
let dropSkincare = document.querySelector('.skincare');

skincare.addEventListener("mouseenter", function(){
    dropSkincare.style.display = 'flex'
})
skincare.addEventListener("mouseleave", function(){
    dropSkincare.style.display = 'none'
})

dropSkincare.addEventListener('mouseenter', function(){
    dropSkincare.style.display = 'flex'
})
dropSkincare.addEventListener('mouseleave', function(){
    dropSkincare.style.display = 'none'
})


let accessories = document.querySelector('.nav #accessories');
let dropAccessories = document.querySelector('.accessories');

accessories.addEventListener("mouseenter", function(){
    dropAccessories.style.display = 'flex'
})
accessories.addEventListener("mouseleave", function(){
    dropAccessories.style.display = 'none'
})

dropAccessories.addEventListener('mouseenter', function(){
    dropAccessories.style.display = 'flex'
})
dropAccessories.addEventListener('mouseleave', function(){
    dropAccessories.style.display = 'none'
})
let gifting = document.querySelector('.nav #gifting');
let dropGifting = document.querySelector('.gifting');

gifting.addEventListener("mouseenter", function(){
    dropGifting.style.display = 'flex'
})
gifting.addEventListener("mouseleave", function(){
    dropGifting.style.display = 'none'
})

dropGifting.addEventListener('mouseenter', function(){
    dropGifting.style.display = 'flex'
})
dropGifting.addEventListener('mouseleave', function(){
    dropGifting.style.display = 'none'
})

let blog = document.querySelector('.nav #blog');
let dropBlog = document.querySelector('.blog');

blog.addEventListener("mouseenter", function(){
    dropBlog.style.display = 'flex'
})
blog.addEventListener("mouseleave", function(){
    dropBlog.style.display = 'none'
})

dropBlog.addEventListener('mouseenter', function(){
    dropBlog.style.display = 'flex'
})
dropBlog.addEventListener('mouseleave', function(){
    dropBlog.style.display = 'none'
})