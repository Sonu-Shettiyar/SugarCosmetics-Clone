let API = `https://beautybliss-cosmetics-mock-api.onrender.com/`

let title = document.querySelector("#title");
let category = document.querySelector("#category");

let image = document.querySelector("#img_box");
let quantity = document.querySelector("#quantity");
let totalprice = document.querySelector("#totalprice");
let rating;
let sellingprice;
let type = document.querySelector("#type");
let submit = document.querySelector("#Add");
let image_url = document.querySelector("#img_url");
let img_button = document.querySelector("#upload")


// --------------- Submit Data -----------------  //

submit.addEventListener("click", () => {
  
    let obj ={
        title:title.value,
        category:category.value,
        type:type.value,
        image:image.src,
        quantity:quantity.value,
        totalprice:totalprice.value,
        sellingprice: Math.abs(totalprice.value - Math.floor(Math.random() * 200)),
        rating:4.2,
    }

    console.log(obj)

    post_data(category.value);

    async function post_data(path) {
        let res = await fetch(`${API}${path}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        console.log(res);
        let data = await res.json();
        console.log(data);

        alert("Successfully Added")
    }

   
})

//  ----------- Preview Img ------------  //

img_button.addEventListener("click", () => {
    image.setAttribute("src", `${image_url.value}`);
})


//    ---------- Change Type According to Category ----------  //

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

