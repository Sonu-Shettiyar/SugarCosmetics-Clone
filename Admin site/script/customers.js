let tbody=document.getElementById("table_body")
let api="https://bliss-febn.onrender.com/users"

let search=document.querySelector(".search")
let submit=document.getElementById("submit")
fapi(api)
function fapi(api){
    fetch(`${api}`)
.then((req)=>req.json())
.then((data)=>{
    displaydata(data)
})
}


let sapi="https://bliss-febn.onrender.com/users?q="

 submit.addEventListener("click",(e)=>{
    e.preventDefault()
    
fetch(`${sapi}${search.value}`)
.then((req)=> req.json())
.then((data)=>{
    console.log(data)
    displaydata(data)
})
 })

function displaydata(data){
    tbody.innerHTML=""
    data.forEach(ele => {
        if(ele.id!=undefined){
        let tr=document.createElement("tr")
        let td=document.createElement("td")
        td.innerText=ele.id
        let td1=document.createElement("td")
        td1.innerText=ele.name
        let td2=document.createElement("td")
        td2.innerText=ele.mobile
        let td3=document.createElement("td")
        td3.innerText=ele.email
        let td4=document.createElement("td")
        td4.innerText=ele.address

        tr.append(td,td1,td2,td3,td4)
        tbody.append(tr)
    }
    });

}

let sort=document.getElementById("sort")

sort.addEventListener("change",()=>{
if(sort.value==""){
    fapi("https://bliss-febn.onrender.com/users")
}else{
    if(sort.value=="asc"){
        fapi("https://bliss-febn.onrender.com/users?_sort=name&_order=asc")
    }else{
        fapi("https://bliss-febn.onrender.com/users?_sort=name&_order=desc")
    }
}
})