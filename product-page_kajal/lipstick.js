let prodFil = document.querySelector("#typeHidden");
let rightBar = document.querySelector("#rightBar");
let CardDiv = document.querySelector("#CardAppender");
let routeHome = document.querySelector("#route > h4 > pre");
let leftBar = document.querySelector("#leftBar");
// -----------------sort------------
let ArrowKey = document.querySelector("#upDownKey");
let sortSpan = document.querySelector("#sortSpan");
let relevanceSort_inp = document.querySelector("#relevance");
let highSort_inp = document.querySelector("#high");
let sortForm = document.querySelector("#hiddenDiv");
let lowSort_inp = document.querySelector("#low");
let ArrowKeyfil = document.querySelector("#upDownKey2");
let filData;
let sortdata;
window.addEventListener("load", function () {

    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick`)
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);
            renderCard(data)
            filData = data;
            sortdata = data

        }).catch((err) => {
            console.log(err)
        })
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

            if (ele.type.toUpperCase().includes(event.target.value.toUpperCase())) {
                return true;
            }
        })

        renderCard(efilData);
        if (efilData.length == 0) {
            CardDiv.innerHTML = `<div style="margin:auto;">
<h1 >Sorry No Products</h1></div>`
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


        fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)

            }).catch((err) => {
                console.log(err)
            })

    } else if (e.target.value == "high") {
        fetch(`https://bliss-febn.onrender.com/lipstick?_sort=sellingprice&_order=desc`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)

            }).catch((err) => {
                console.log(err)
            })
    } else if (e.target.value == "low") {
        fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick?_sort=sellingprice&_order=asc`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                renderCard(data)

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

// -------------------functions--------

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
        add.innerText = "Add to Bag";

        wishHeart.innerText = "🖤"
        wishHeart.addEventListener("click", function () {
            if (wishHeart.innerText === "🖤") {
                wishHeart.innerText = "💗"
            } else {
                wishHeart.innerText = "🖤"
            }

        })
        add.id = "sonu"
        price.innerText = "₹" + ele.sellingprice;
        if (ele.sellingprice == undefined) {
            price.innerText = "₹" + ele.totalprice;
        } price.innerText = ` ${"₹" + ele.sellingprice}`;
        wishHeart.id = "heartWish"
        priceDiv.append(strikePrice, price)
        diver.append(img, title, priceDiv, wishHeart, add);
        CardDiv.append(diver)
    });
}
// -------------linking
let kkDepart = document.querySelector("#kohl_kajal");
let FDepart = document.querySelector("#faces");
let LipDepart = document.querySelector("#lips_page");

kkDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/kajal.html"
})
LipDepart.addEventListener("click", function () {
    window.location.href = "../product-page_kajal/lipstick.html"
})