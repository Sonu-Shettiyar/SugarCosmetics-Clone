let Name =document.getElementById("Name")
let Email =document.getElementById("Email")
let Address =document.getElementById("Address")
let PinCode =document.getElementById("PinCode")
let Mobile =document.getElementById("Mobile")
let City =document.getElementById("City")

// -- Added by Tejas ---------

let getDt = localStorage.getItem("logger");
console.log(getDt);
Name.value = getDt;

// -----------------------------------------------------------------

let Place_Ordder=document.getElementById("Place_Ordder")

Place_Ordder.addEventListener("submit",(e)=>{

// ------------------- added by tejas -------
 
// ---------------------------------------------

    e.preventDefault()
  //users details
    let obj={
        id: Name.value+Math.floor(Math.random()*100),
        name : Name.value,
        email : Email.value,
        address : Address.value,
        pinCode : PinCode.value,
        mobile : Mobile.value,
        city : City.value
    }
    
//-------- users api  fetch ------
fetch(`${api}/users`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
         'content-type': 'application/json'
        }
    })
.then((data)=> data.json())
.then((req)=>{
    console.log(req)
})


// - -- -- -- -- date - -- -- - -- -
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

let s=today.split("/")
// let totalPrice=document.getElementById("totalPrice")
console.log(totalPrice.value)

// - - - orders details - - -
let kk
let paymathod=document.getElementById("UPI")

let paymatho=document.getElementById("CASH")

if(paymatho.checked){
kk="CASH"
}else if(paymathod.checked){
kk="UPI"
}

//-------- orders api  fetch ------
let obj1={
    "id":Name.value+Math.floor(Math.random()*100),
    "date":s,
    "name": Name.value,
    "status":"Pending",
    "payment": kk,
    "total": c1,
    "productCount": l,
"product":yyy
}

fetch(`${api}/orders`,{
    method:"POST",
    body:JSON.stringify(obj1),
    headers:{
     'content-type': 'application/json'
    }
})
.then((data)=> data.json())
.then((req)=>{
console.log(req)
})

setTimeout(() => {
   alert("Paymant Done") 

//---enter the user order page name --------------------------------
window.location.href="../order_page/order.html"
}, 3000);

})

