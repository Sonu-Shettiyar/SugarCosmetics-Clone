
let PopHider = document.querySelector("#x");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
// let loginBtn = document.querySelector("#login_btn");
let formSubmit = document.querySelector("#login")
let popHead = document.querySelector("#top-none")


// -----------------Event listners------------------------------

PopHider.addEventListener("click", function () {
    console.log("hi")
    PopHider.style = "display:none;"
    popHead.innerHTML = "";
})

formSubmit.addEventListener("click", async function (event) {
    event.preventDefault()
    try {
        let Info = {
            username: username.value,
            password: password.value
        }

        let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Info)
        })
        let data = await res.json()
        console.log(data)
        console.log(data.accessToken)

        alert("Welcome " + Info.username)
    } catch (error) {
        console.log("Wrong-Credentials")
    }
});