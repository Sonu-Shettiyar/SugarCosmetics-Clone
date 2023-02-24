let tbody=document.getElementById("tbody")
//search
let search=document.querySelector(".search")
let search_submit=document.getElementById("search_submit")
// filter
let Complete=document.getElementById("A")
let Payment=document.getElementById("B")
let Processing=document.getElementById("C")
let Cancelled=document.getElementById("E")
let Failded=document.getElementById("F")

let submit=document.getElementById("submit")

let fdata=[]
let api="https://beautybliss-cosmetics-mock-api.onrender.com/orders"
mainfunction()
function mainfunction(){


   // --- fetch api ---
fetch(api)
.then((req)=> req.json())
.then((data)=>{
  fdata=data
cart(data)
})
}

function cart(arr){ 
  tbody.innerHTML=""
    arr.forEach(ele => {
     
let div=document.createElement("tr")

  let img=document.createElement("td")
  img.innerText=ele.id
  let h3=document.createElement("td")
  h3.innerText=ele.date
  let p=document.createElement("td")
  p.innerText=ele.name
  let p1=document.createElement("td")
  p1.innerText=ele.payment
  let p2=document.createElement("td")
  p2.innerText=ele.status

  
p2.addEventListener("click",(e)=>{
e.preventDefault()
check(ele)
})

  let button=document.createElement("td")
  button.innerText=ele.total
  let button2=document.createElement("td")
  button2.innerText=ele.productCount
 
  div.append(img,h3,p,p1,p2,button,button2)
  tbody.append(div)
    });
  
  }

//status change
  function check(ele){

   let objupdate={

    "date":ele.date,
    "name": ele.name,
    "status":"Complete",
    "payment": ele.payment,
    "total": ele.total,
    "productCount": ele.productCount,
    
    
    }
    
   console.log(ele.id)
fetch(`${api}/${ele.id}`,{
  method:"PATCH",
      body:JSON.stringify(objupdate),
  headers:{
      'content-type': 'application/json'
  }
})
.then((req)=> req.json())
.then((data)=>{
  console.log(data)
  mainfunction();
 })

  }

// ---- search  ---------------

let sapi="https://beautybliss-cosmetics-mock-api.onrender.com/orders?q="

search_submit.addEventListener("click",(e)=>{
    e.preventDefault()
    
fetch(`${sapi}${search.value}`)
.then((req)=> req.json())
.then((data)=>{
    console.log(data)
    cart(data)
})
})
 // ---- search  ---------------


// filter ---------------
submit.addEventListener("click",(e)=>{
e.preventDefault()

let s=[]

  for(let data of fdata){

  if(Complete.checked){
    if(data.status=="Complete"){
      s.push(data)
    }
  }
  if(Payment.checked){
    if(data.status=="Pending"){
      s.push(data)
    }
  
  }
  if(Cancelled.checked){
    if(data.status=="Cancelled"){
      s.push(data)
    }
  
  }
  if(Processing .checked){
    if(data.status=="Processing"){
      s.push(data)
    }
  
  }
  }
  cart(s)
    })
// filter ---------------