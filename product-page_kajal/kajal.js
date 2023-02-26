let getDt = localStorage.getItem("logger");

let prodFil = document.querySelector("#typeHidden");
let rightBar = document.querySelector("#rightBar");
let CardDiv = document.querySelector("#CardAppender");
let routeHome = document.querySelector("#route > h4 > pre");
let leftBar = document.querySelector("#leftBar");

let ArrowKey = document.querySelector("#upDownKey");
let sortSpan = document.querySelector("#sortSpan");
let relevanceSort_inp = document.querySelector("#relevance");
let highSort_inp = document.querySelector("#high");
let sortForm = document.querySelector("#hiddenDiv");
let lowSort_inp = document.querySelector("#low");
let ArrowKeyfil = document.querySelector("#upDownKey2");
let gameChanger;
let filData;
let sortdata;
window.addEventListener("load", function () {
    fetchAndrender(1)
})



let Clear = document.querySelector("#clearAll");
Clear.addEventListener("click", function () {
    window.location.reload();
})
let reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
    window.location.reload();
})
// ----------------filter------------
fil();
function fil() {
    prodFil.addEventListener("change", function (event) {
        event.preventDefault();
        let efilData = filData.filter((ele) => {

            if (event.target.id == ele.type) {
                return true;
            }
        })

        renderCard(efilData);
        if (efilData.length == 0) {
            CardDiv.innerHTML = `<div style="width:550px; margin:auto; margin-top:20px; padding:200px;">
<h1 style="text-align:center;">Sorry No Products</h1></div>`
        }
        efilData = filData;
    })
}
ArrowKeyfil.addEventListener("click", function () {
    if (ArrowKeyfil.innerHTML === `<i class="fa-solid fa-chevron-up"></i>`) {
        ArrowKeyfil.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`
        prodFil.style = "display:block;"
    } else {
        ArrowKeyfil.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`
        prodFil.style = "display:none;"

    }
})
//  -----------sorting-------------

sortForm.addEventListener("click", function (e) {

    e.preventDefault()
    if (e.target.value == "relevance") {


        fetch(`https://bliss-febn.onrender.com/eyes`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)

            }).catch((err) => {
                console.log(err)
            })
        sortSpan.innerHTML = "Relevance"


    } else if (e.target.value == "high") {
        fetch(`https://bliss-febn.onrender.com/eyes?_sort=sellingprice&_order=desc`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)
                sortSpan.innerHTML = "High to Low"
            }).catch((err) => {
                console.log(err)
            })
    } else if (e.target.value == "low") {
        fetch(`https://bliss-febn.onrender.com/eyes?_sort=sellingprice&_order=asc`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)
                sortSpan.innerHTML = "Low To High"

            }).catch((err) => {
                console.log(err)
            })
    }
})

ArrowKey.addEventListener("click", function () {
    if (ArrowKey.innerHTML === `<i class="fa-solid fa-chevron-up"></i>`) {
        ArrowKey.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`
        sortForm.style = "display:block;"
    } else {
        ArrowKey.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`
        sortForm.style = "display:none;"

    }
})

// -------------------Card Appending Func--------
function fetchAndrender(id) {
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/eyes?_limit=9&_page=${id}`)
        .then((res) => {
            return res.json()
        }).then((data) => {
            renderCard(data)
            filData = data;
            sortdata = data
            gameChanger = id;
        }).catch((err) => {
            console.log(err)
        })
}
function renderCard(data) {
    // rightBar.innerHTML = "";
    CardDiv.innerHTML = "";

    data.forEach((ele) => {
        let diver = document.createElement("div")
        let img = document.createElement("img")
        let rating = document.createElement("h5")
        let title = document.createElement("p");
        let strikePrice = document.createElement("strike");
        let price = document.createElement("h4");
        let add = document.createElement("button");
        let wishHeart = document.createElement("button");
        let priceDiv = document.createElement("div");
        let buttonDiv = document.createElement("div")
        img.src = ele.image;
        title.innerText = ele.title;
        strikePrice.innerText = "₹" + ele.totalprice;
        add.innerText = "Add To Cart";

        add.addEventListener('click', async function () {
            delete ele.id;
            if (getDt !== null && getDt !== 'abc') {
                let res = await fetch('https://beautybliss-cosmetics-mock-api.onrender.com/cart', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...ele, ...{nos:1}}),
                    method: 'POST'
                });
                if (res.ok) {
                    alert('Added To Cart')
                }
            } else {
                alert('Login First');
            }
        })
        wishHeart.innerText = "🖤"
        wishHeart.addEventListener("click", function () {
            if (getDt !== null && getDt !== 'abc') {
                if (wishHeart.innerText === "🖤") {
                    wishHeart.innerText = "💗"
                } else {
                    wishHeart.innerText = "🖤"
                }
            } else {
                alert('Login First');
            }
        })
        add.id = "sonu";
        price.innerText = "₹" + ele.sellingprice;
        if (ele.sellingprice == undefined) {
            price.innerText = "₹" + ele.totalprice;
        };

        wishHeart.id = "heartWish"
        priceDiv.append(strikePrice, price)
        diver.append(img, title, priceDiv, wishHeart, add);
        CardDiv.append(diver)
    });
}


kkDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/kajal.html"
})
LipDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/lipstick.html"
})
// ----------------pagination
let btns = document.getElementById("page-btn");
let btnsInp = document.querySelectorAll(".page-one")

btns.addEventListener("click", function (event) {
    colorChange();
    event.target.style = "background-image: linear-gradient(red, black);"

    if (event.target.value == "<<" && 1 < gameChanger) {
        gameChanger--
        fetchAndrender(gameChanger)

    } else if (event.target.value == ">>" && 4 > gameChanger) {

        gameChanger++
        fetchAndrender(gameChanger)

    } else {

        fetchAndrender(event.target.value)
    }
})

function colorChange() {
    btnsInp.forEach((ele) => {

        ele.style = "background-image: linear-gradient(pink);"
    })
}

//---------------search--------
let searchInp = document.querySelector("#Search-Inp");
let searchBtn = document.querySelector("#Search-btn");


searchBtn.addEventListener("click", function () {

    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/eyes`)
        .then((res) => { return res.json() })
        .then((data) => {
            let Search_Data = data.filter((ele) => {

                if (ele.type.toUpperCase().includes(searchInp.value.toUpperCase()) == true || ele.category.toUpperCase().includes(searchInp.value.toUpperCase()) == true || ele.title.toUpperCase().includes(searchInp.value.toUpperCase()) == true) {
                    return true;
                }

            })
            renderCard(Search_Data)
        })



})


