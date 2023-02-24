
let PopHider = document.querySelector("#x");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginSubmit = document.querySelector("#login_btn")
let popHead = document.querySelector("#top-none")
let signUpPage = document.querySelector("#create_account");
let rigthDiv = document.querySelector("#input-cont");
// -----------------Event listners------------------------------

PopHider.addEventListener("click", function () {
    console.log("hi")
    PopHider.style = "display:none;"
    popHead.innerHTML = "";
})

loginSubmit.addEventListener("click", async function (event) {
    event.preventDefault()
    try {
        let res = await fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/register?email=${username.value}`)
        let data = await res.json()
        let flag = false;
        for (let ele of data) {
            if (ele.password == password.value) {

                alert("Login_Successfull");
                localStorage.setItem("logger", ele.name)
                window.location.href = "../index.html";
                return
            } else {
                flag = true
            }
        }


    } catch (error) {
        console.log("Wrong-Credentials")
    }


});
signUpPage.addEventListener("click", function (event) {
    event.preventDefault()
    rigthDiv.innerHTML = `<div>
<h3><a href="./login.html">
        <span class="material-icons-sharp" id="backToLogin">
            << </span>
    </a>
</h3>
</div>


<h3 id="signH3">Please fill this form below</h3>
<form action="" id="SignUp">
<input type="text" name="fullName" class="mob-input" id="register_fullName" placeholder="Enter your FullName" required>




<input class="mob-input" placeholder="Password must be of 6 letters" id="pass_word" type="text" name="regi_password" minlength="6" required>

<input class="mob-input" placeholder="Enter your Mobile number" id="Mobile_number" type="number" name="mobile" required>


<input class="mob-input" id="register_email" type="email" name="mobile" placeholder="Enter your email address"  required>

<input type="submit" value="Register" id="signUp_btn">
<hr  width="370px" class="red" style="border:1px dashed;     color: rgba(128, 128, 128, 0.432);
">
<div id="or"><h4>OR</h4></div>
<input type="button" value="Continue with Gmail" src="./1.png">



</div>



<p id="left-align">
    Need Help? <span class="pink-ligth">Contact Us</span>
</p>
<hr class="dash">
<p>By Signing up or logging in, you agree to our <span class="pink-ligth">Terms and
        Conditions</span></p>
</form>`

    displaySingUp();
});

function displaySingUp() {
    let register_fullName = document.querySelector("#register_fullName");
    let register_Pass = document.querySelector("#pass_word")
    let register_mobile = document.querySelector("#Mobile_number");
    let register_email = document.querySelector("#register_email")
    let register_btn = document.querySelector("#SignUp");
    register_btn.addEventListener("submit", function (event) {
        event.preventDefault();
        // console.log("hiii")
        let regi_Info = {
            name: register_fullName.value,
            password: register_Pass.value,
            mobile: register_mobile.value,
            email: register_email.value
        }

        fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(regi_Info)
        })
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                alert("Register_Succefull ! login Please")
                window.location.href = "./login.html"
            }).catch((err) => {
                console.log(err)
            })
    })

}


















