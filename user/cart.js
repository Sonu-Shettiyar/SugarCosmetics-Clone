
let api="https://beautybliss-cosmetics-mock-api.onrender.com"
let main=document.getElementById("main_div")

var c=0
var c1=0
var l
let yyy=[]
let totalitem=document.getElementById("totalitem")
let totalite=document.getElementById("totalite")
let total_Price_Count=document.getElementById("total_Price_Count")
let discount_price=document.getElementById("discount_price")
let totalPrice=document.getElementById("totalPrice")
let shipping=document.getElementById("shipping")

mainfunction()
function mainfunction(){

fetch(`${api}/cart`)

.then((req)=>req.json())
.then((data)=>{
    yyy=data
    totalitem.innerHTML=data.length
    totalite.innerHTML=data.length
    l=data.length
c=0
c1=0
let p=`<div >${data.map(element => displaydata(element.image,element.title,element.totalprice,element.sellingprice,element.id,element.nos)).join(" ")}</div>`
    
main.innerHTML=p

//delete btn

let editLinksD = document.querySelectorAll("#delete");
for (let editLinkD of editLinksD) {
editLinkD.addEventListener("click", (e) => {
    e.preventDefault();
    let currentIdD = e.target.dataset.id;

    let s="cart"
    fetch(`${api}/${s}/${currentIdD}`,{
    method:"DELETE",
        body:JSON.stringify(),
    headers:{
        'content-type': 'application/json'
    }
})
.then((data)=>{
    mainfunction();
   })
  });
 }  

//-- -- --increment, decrement product count-- -- --
let increment=document.querySelectorAll("#increment")
let decrement=document.querySelectorAll("#decrement")

//increment--
for (let increment1 of increment) {
increment1.addEventListener("click",(e)=>{
    e.preventDefault()
    let currentIdD = e.target.dataset.id;
let s

yyy.forEach(element => {
   if( element.id==currentIdD){
s=element.nos

   }
});

let obj={
   
    "nos":(s+1)
}
fetch(`${api}/cart/${currentIdD}`,{
    method:"PATCH",
    body:JSON.stringify(obj),
    headers:{
     'content-type': 'application/json'
    }
})
.then((req)=>req.json())

.then((data)=>{
    mainfunction()
   
})
})
}
//decrement--
for (let decrement1 of decrement) {
decrement1.addEventListener("click",(e)=>{
    e.preventDefault()
    let currentIdD = e.target.dataset.id;
let s

yyy.forEach(element => {
   if( element.id==currentIdD){
s=element.nos

   }
});
if(s>1){


let obj={
   
    "nos":(s-1)
}
fetch(`${api}/cart/${currentIdD}`,{
    method:"PATCH",
    body:JSON.stringify(obj),
    headers:{
     'content-type': 'application/json'
    }
})
.then((req)=>req.json())

.then((data)=>{
    mainfunction()
   
})
} 
})
}

})
}

function displaydata(image,title,totalprice,sellingprice,id,nos){
  
    if(nos==undefined){
        nos = 1;
    }
    if(totalprice!=undefined){
        c+=(+totalprice*Number(nos))
    }
    if(sellingprice!=undefined){
        c1+=(+sellingprice*Number(nos))
    } 
     if(image!=undefined){

   let s=`<div id="product">
    <div id="product_img"> 
     <img src="${image}" alt="">
    </div>
     <div id="name_product">
     <h4>${title}</h4>
     <div id="product_price">
     <p id="totalprice">₹${totalprice}</p>
   
     <b><p>₹${sellingprice}</p></b>
    </div>
    </div>
    <div id="count">
        <button id="increment" data-id=${id}>+</button>
     <span id="sp">${nos}</span>
        <button id="decrement" data-id=${id}>-</button>
</div>
<i id="delete" data-id=${id} class="fa-solid fa-trash-can"></i>
</div> 
    `
    //price section
    total_Price_Count.innerHTML='₹ '+c
    discount_price.innerHTML='₹ '+(c-c1)

    if(c1>=4000){
      shipping.innerHTML='₹ '+0
      totalPrice.innerHTML='₹ '+(c1) 
    }
   
    if(c1>0&&c1<4000){
        shipping.innerHTML='₹ '+99
       totalPrice.innerHTML='₹ '+(c1+99) 
    }
    
    return s
}
}

