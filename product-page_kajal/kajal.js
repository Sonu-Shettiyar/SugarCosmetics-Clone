let rightBar = document.querySelector("#rightBar");
let leftBar = document.querySelector("#leftBar");
let CardDiv = document.querySelector("#CardAppender");
// -----------------leftBar------------

let ArrowKey = document.querySelector("#upDownKey");
let sortDesc = document.querySelector("#hiddenDiv");
let sortSpan = document.querySelector("#sortSpan");
// --------------------------------Event listners----------
window.addEventListener("load", function () {

    fetch(`https://bliss-febn.onrender.com/eyes`)
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);
            renderCard(data)

        }).catch((err) => {
            console.log(err)
        })
})

ArrowKey.addEventListener("click", function () {
    if (ArrowKey.innerHTML === `<i class="fa-solid fa-chevron-up"></i>`) {
        ArrowKey.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`
        sortDesc.style = "display:block;"
    } else {
        ArrowKey.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`
        sortDesc.style = "display:none;"

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
        if (ele.sellingprice == undefined) {
            price.innerText = "₹" + ele.totalprice;
        } else {
            price.innerText = "₹" + ele.sellingprice;
        }
        price.innerText = ` ${"₹" + ele.sellingprice}`;
        wishHeart.id = "heartWish"
        priceDiv.append(strikePrice, price)
        diver.append(img, title, priceDiv, wishHeart, add);
        CardDiv.append(diver)
    });
}