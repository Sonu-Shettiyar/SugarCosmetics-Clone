let API = `https://beautybliss-cosmetics-mock-api.onrender.com/`


let title = document.querySelector("#title");
let category = document.querySelector("#category");
let description = document.querySelector("#Description");

let image = document.querySelector("#img_box");
let quantity = document.querySelector("#quantity");
let totalprice = document.querySelector("#totalprice");
let rating;
let sellingprice;
let type = document.querySelector("#type");
let submit = document.querySelector("#Add");
let image_url = document.querySelector("#img_url");
let img_button = document.querySelector("#upload")

img_button.addEventListener("click", () => {
    image.setAttribute("src", `${image_url.value}`);
})





category.addEventListener("change", (element) => {
    // console.log(element.target.value)

    if (element.target.value == "eye") {
        let data = `
          <option value="kajal">kajal</option>
          <option value="kohl">kohl</option>
          <option value="eyeliner">eyeliner</option>
          <option value="Matte Eyeliner">Matte Eyeliner</option>`

        type.innerHTML = data;

    } else if (element.target.value == "foundation") {
        let data = `
            <option value="Sheet mask">Sheet mask</option>
            <option value="Highlighter">Highlighter</option>
            <option value="Primer">Primer</option>
            <option value="Blush">Blush</option>
            <option value="Powder">Powder</option>
            <option value="Face Mask">Face Mask</option>
            <option value="Moisturizer">Moisturizer</option>
            <option value="Foundations & Concealers">Foundations & Concealers</option>
            `
        type.innerHTML = data;


    } else if (element.target.value == "lipstick") {
        let data = `
            <option value="Crayon Lipstick">Crayon Lipstick</option>
            <option value="Matte Lipstick">Matte Lipstick</option>
            <option value="Balm">Balm</option>
            <option value="Liquid Lipstick">Liquid Lipstick</option>
            <option value="Tint Remover">Tint Remover</option>
            <option value="Lip Cream">Lip Cream</option>
            <option value="Lip Lacquer">Lip Lacquer</option>
            <option value="Lipstick">Lipstick</option>
            <option value="Lip Scrub">Lip Scrub</option>
            `
        type.innerHTML = data;

    } else if (element.target.value == "makeupkit") {
        let data = `
            <option value="Kit">Kit</option>
            `
        type.innerHTML = data;

    }

})

//  ----------------- Localstorage data ------------------------ //

  let data = JSON.parse(localStorage.getItem("Edit"));
  let id = data.id;
  let path = data.category;

  console.log(data);
  console.log(id,path)

//   ---------------- Populate Data on input -------------------   //

async function get_data(path,id) {
    let res = await fetch(`${API}${path}/${id}`)
    console.log(res);
    let data = await res.json();
    console.log(data);
    populate_data(data);
}

get_data(path,id);


//  ------------populate------------ //

function populate_data(data){
    title.value = data.title;
    category.value = data.category;
    type.value = data.type;
    description.value = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quisquam nesciunt veniam deleniti? Minima, ducimus?";
    image.src = data.image;
    image_url.value = data.image;
    quantity.value = data.quantity;
    totalprice.value = data.totalprice;
}

