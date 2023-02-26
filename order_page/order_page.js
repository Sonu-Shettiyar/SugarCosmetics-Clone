let append = document.querySelector(".append");

// let active_user = localStorage.getItem("");

// -------------- Fetch DATA ----------------

async function fetch_Data(value) {
    let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/${value}`);
    let data = await res.json();
    // console.log(res);
    // console.log(data);
    // for (let x of data) {
    //   // console.log(x);
    //   ALL_data.unshift(x);
    // }

    // filter data according to user

    let getDt = localStorage.getItem("logger");
    console.log(getDt);

    let filtered_data = data.filter((element) => {
        if (element.name == getDt) {
            return true;
        } else {
            return false;
        }
    })

    console.log(filtered_data);

    // console.log(data)
    append.innerHTML = display(filtered_data);


    // Cancel Click

    let cancel = document.querySelectorAll(".cancel");

    let status = document.querySelectorAll(".status");
    for (let x of status) {
        // console.log(x);
        console.log(x.innerText);
        if (x.innerText == "Complete") {
            x.style.color = "#023020"
        } else if (x.innerText == "Cancelled") {
            x.style.color = "#FF0000"
        } else {
            x.style.color = "#FFA500"
        }
    }

    for (let x of cancel) {
        x.addEventListener("click", (e) => {
            console.log(e.currentTarget.id);
            cancel_order(e.currentTarget.id);
        })
    }
    //    console.log(cancel);


}
fetch_Data("orders");




// // ------------- UTILITIES ----------------------------//
// -------------------------------------------// // ------------- UTILITIES ----------------------------//

function display(data) {


    let card_list = `
    ${data.map((ele) => {
        return card(
            ele.id,
            ele.productCount,
            ele.status,
            ele.total,
            ele.product,
            ele.date
        )

    }).join('')}
    `

    // console.log(display_data);
    // let list = `${data.map((element) => {



    //     return card(
    //         element.image,
    //         element.category,
    //         element.quantity,
    //         element.title,
    //         element.id,
    //         element.sellingprice,
    //         element.totalprice
    //     );

    // }).join('')}`
    // return list;

    return card_list;
}

function card(order_id, count, status, total, product_arr, date) {

    let card = `
    <tr>
    <td class="sticky-header" rowspan="${count}">${order_id}</td>
    <td class="" rowspan="${count}">${date.join("/")}</td>
    <td class=""><div><img src="${product_arr[0].image}" alt=""><span>${product_arr[0].title}</span> </div> </td>
    <td class="">${product_arr[0].totalprice}</td>
    <td class="" rowspan="${count}">${total}</td>
    <td class="status" rowspan="${count}">${status}</td>
    <td class="cancel" id="${order_id}" rowspan="${count}"><span class="material-icons-sharp">
        cancel
        </span></td>
    </tr>
    ${(get_products(product_arr) || "")}
    `
    return card;
}

function get_products(data) {
    if (data.length > 1) {
        let card = ``;
        for (let i = 1; i < data.length; i++) {
            card += get_tr(
                data[i].image,
                data[i].title,
                data[i].totalprice
            )
        }
        return card;
    }
}

function get_tr(img, title, amount) {
    let card = `<tr>
    <td class="sticky-header"><div><img src="${img}" alt=""><span>${title}</span> </div> </td>
    <td class="sticky-header">${amount}</td>
    </tr>
    `
    return card
}


// ---------------- Cancel Order -------------------  //

function cancel_order(id) {

    let objupdate = {
        "status": "Cancelled",
    }

    console.log(id)
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(objupdate),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((req) => req.json())
        .then((data) => {
            console.log(data)
            alert("Order Cancelled")
            window.location.href = "order.html"
        })

}


