
let API = `https://beautybliss-cosmetics-mock-api.onrender.com/`

// // ----------------------------------------------------------------------------------------

let list = document.querySelector(".append");
let search_button = document.querySelector("#search_data");
let form = document.querySelector("#search_form");
let filter_button = document.querySelector("#filter_button");
let filter_div = document.querySelector(".filter");

// let produts_list = ["foundation","makeupkit","eyes","lipstick"]
let alldata = [];

//  ---------------- Functions ---------------- //



//     ------------- Filter Fetch DATA ------------------     //

async function filter_Data(value) {
    let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/${value}`);
    let data = await res.json();
    // console.log(res);
    console.log(data);
    list.innerHTML = display(data);

    //appear edit_box
    editBox_div_appear()

    // edit button on every div
    edit_button_td();

    // Search Product
    Search(data);

    //delete functionality
    delete_and_display()


}

// // fetchData(alldata);

let filter_box = document.querySelector("#filter_box")

filter_box.addEventListener("click", () => {
    let input = document.querySelector('input[name="filter"]:checked').value
    console.log(input);
    filter_Data(input);
    filter_div.style.display = "none"

})



////------------- TEST MULTIPLE FETCH --------------///

const all_API = [
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/foundation`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/makeupkit`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/eyes`),
    fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/lipstick`),
]

async function main() {
    try {
        const res = await Promise.all(all_API);
        const data = await Promise.all(res.map((item) => {
            return item.json();
        }))
        console.log(data);
        for (let x of data) {
            alldata.push(...x)
        }
        // console.log(alldata);

        //show data
        list.innerHTML = display(alldata);

        //appear edit_box
        editBox_div_appear()

        //delete functionality
        delete_and_display()

        // Search Product
        Search(alldata);

        // edit button on every div
        edit_button_td();






    } catch (error) {
        console.log(error)
    }
}
main();

//   -------click on screen to hide div -------
document.addEventListener('mouseup', function (e) {
    let box = document.querySelectorAll(".edit_box");
    for (let BOX of box) {
        if (!BOX.contains(e.target)) {
            BOX.style.display = "none";
        }
    }

    if (!filter_div.contains(e.target)) {
        filter_div.style.display = "none";
    }
});

// ------------- edit button on div -------------------- //

function edit_button_td() {
    let edit_button = document.querySelectorAll("#edit1");
    for (let buttons of edit_button) {
        buttons.addEventListener("click", (e) => {
            let id = e.currentTarget.dataset.id;
            let category = e.currentTarget.dataset.category;
            console.log(id, category);
            if (category == 'Skin care products') {
                category = 'foundation'
            } else if (category == 'Makeup Kits') {
                category = 'makeupkit'
            }
            else {
                category = category.split(' ').join('').toLowerCase();
            }
            console.log(id, category);
            let obj = {
                id: id,
                category: category
            }
            localStorage.setItem("Edit", JSON.stringify(obj));

            window.location.href = "editproduct.html"
        })
    }


}


//  ------------ Search Product Name ----------------- //

function Search(DATA) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(alldata);
        console.log(search_button.value)

        let search_data = DATA.filter((element) => {
            return (element.title.toLowerCase().includes(search_button.value.toLowerCase()))
        })
        console.log(search_data);
        list.innerHTML = display(search_data);

        //appear edit_box
        editBox_div_appear()

        // edit button on every div
        edit_button_td();

        // Search Product
        Search(data);

        //delete functionality
        delete_and_display()

    })
}


//   ----------- Delete Data (from server)------------ //

function delete_and_display() {
    let delete_button = document.querySelectorAll("#delete");

    for (let del of delete_button) {
        del.addEventListener("click", (e) => {
            console.log(e.currentTarget.dataset)
            let id = e.currentTarget.dataset.id;
            let category = e.currentTarget.dataset.category;
            console.log(id, category);
            if (category == 'Skin care products') {
                category = 'foundation'
            } else if (category == 'Makeup Kits') {
                category = 'makeupkit'
            }
            else {
                category = category.split(' ').join('').toLowerCase();
            }
            console.log(category);

            delete_data(category, id)
        })
    }
}


// -------------- To show the box on click --------------------

function editBox_div_appear() {

    let more_vertical = document.querySelectorAll(".edit");
    // console.log(more_vertical);
    for (let buttons of more_vertical) {
        buttons.addEventListener("click", (e) => {
            let box = document.querySelector(`.${e.target.id}`);
            box.style.display = "block";
            // console.log(box);
            // alert();

        })
        // console.log(buttons);
    }
}

//  ------------- Show Filter DIv (Box) ---------------  //

filter_button.addEventListener("click", () => {
    filter_div.style.display = "block";
})




// // ------------- UTILITIES ----------------------------//
// -------------------------------------------// // ------------- UTILITIES ----------------------------//

function display(data) {

    let list = `${data.map((element) => {

        return card(
            element.image,
            element.category,
            element.quantity,
            element.title,
            element.id,
            element.sellingprice,
            element.totalprice
        );

    }).join('')}`
    return list;
}

function card(img, category, inventory, title, id, sell, total) {

    if (inventory == undefined) {
        inventory = Math.floor(Math.random() * 100);
    }

    let card = `
        <tr>
          <td><div><img src="${img}" alt=""><span>${title}</span> </div> </td>
          <td>${category}</td>
          <td>${inventory}</td>
         
          <td class="edit" value=""><span id="${category.split(' ').join('')}-${id}" class="material-icons-sharp">more_vert</span> <div><div class="edit_box ${category.split(' ').join('')}-${id}">
          <button data-id="${id}" data-category="${category}" id="edit1"><span class="material-icons-sharp">edit_note</span><p> Edit</p></button>
          <button data-id="${id}" data-category="${category}" id="delete"><span class="material-icons-sharp">delete_forever</span><p> Delete</p></button>
      </div></div></td>
          
        </tr>
    `
    return card;
}
{/* <div class="edit_box ${category.split(' ').join('')}-${id}">
          <button id="edit1"><span class="material-icons-sharp">edit_note</span><p> Edit</p></button>
          <button id="delete"><span class="material-icons-sharp">delete_forever</span><p> Delete</p></button>
      </div> */}



//////////////---------- DELETE ------------------///////////

async function delete_data(path, id) {
    let res = await fetch(`${API}${path}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })

    let data = await res.json();
    // element which is deleted ^^^^^^^
    window.location.href = "product.html"
    alert("Item successfully Deleted")
    console.log(data);
}







//   -------------- TEST on Delete data ------------

// let api = "https://63f44c752213ed989c400d71.mockapi.io/makeup_kit/";

// async function fetch_data() {
//     let res = await fetch(api);
//     let data = await res.json();
//     console.log(data);
// }
// // fetch_data();
