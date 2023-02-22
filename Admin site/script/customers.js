let tbody=document.getElementById("table_body")
let api="https://bliss-febn.onrender.com"

let search=document.querySelector(".search").value
let submit=document.getElementById("submit")

fetch(`${api}/users`)
.then((req)=>req.json())
.then((data)=>{
    displaydata(data)
})

let sapi="https://bliss-febn.onrender.com/users?q="

 submit.addEventListener("click",()=>{
fetch(`${sapi}${search}`)
.then((req)=> req.json)
.then((data)=>{
    displaydata(data)
})
 })

function displaydata(data){
    tbody.innerHTML=""
    data.forEach(ele => {
        let tr=document.createElement("tr")
        let td=document.createElement("td")
        td.innerText=ele.name+Math.floor(Math.random()*10000)
        let td1=document.createElement("td")
        td1.innerText=ele.name
        let td2=document.createElement("td")
        td2.innerText="empty"
        let td3=document.createElement("td")
        td3.innerText="empty"
        let td4=document.createElement("td")
        td4.innerText="empty"

        tr.append(td,td1,td2,td3,td4)
        tbody.append(tr)
    });

}