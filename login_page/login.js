
let PopHider = document.querySelector("#x");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginSubmit = document.querySelector("#login")
let popHead = document.querySelector("#top-none")
let signUpPage = document.querySelector("#create_account");
let rigthDiv = document.querySelector("#input-cont");
let userloginToken = JSON.parse(localStorage.getItem("loginToken")) || null;
let userloginId = +localStorage.getItem("loginId") || null

// -----------------Event listners------------------------------

PopHider.addEventListener("click", function () {
    console.log("hi")
    PopHider.style = "display:none;"
    popHead.innerHTML = "";
})

loginSubmit.addEventListener("click", async function (event) {
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
        userloginToken = localStorage.setItem("loginToken", data.accessToken)
        userloginId = localStorage.setItem("loginId", data.user.id)
        // alert("Welcome " + Info.username)
        // -------redirefct to admin after fetch correct---
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
<input type="text" name="lastName" id="register_Password" class="mob-input" placeholder="Password must be of 6 letters" minlength="6" required>

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
    // backToLogin.addEventListener("click", function () {
    //     rigthDiv.innerHTML = ` <div id="input-cont">
    //     <div>
    //         <h3><a href="../index.html">
    //                 <span class="material-icons-sharp">
    //                     << </span>
    //             </a>
    //         </h3>
    //     </div>

    //     <h1 id="hi">Hi!</h1>

    //     <h3>new user? Create an account <a href="" id="create_account"> here </a>!</h3>
    //     <form action="" id="login">
    //         <div id="input-field">
    //             <input class="mob-input" id="username" type="email" name="mobile" placeholder="enter your username"
    //                 required>
    //             <input class="mob-input" id="password" type="password" style="display: block;" name="mobile"
    //                 placeholder="enter your password" required>
    //             <h6 style="text-align: right
    //             ;"><a href="">
    //                     Forgot password ?</a></h6>
    //         </div>
    //         <div>
    //             <p>Registering for this site allows you to access your order status and history. Just fill
    //                 in
    //                 the
    //                 above fields, and we'll get a new account set up for you in no time. We will only ask
    //                 you
    //                 for
    //                 information necessary to make the purchase process faster and easier.</p>
    //             <input type="submit" value="Login here" id="login_btn">
    //             <span class="pink-ligth" id="block">
    //                 <a href="">
    //                     Login as admin</a></span>
    //         </div>
    //         <hr class="dash">
    //         <input type="checkbox" name="" id="">
    //         Get important updates on Whatsapp <span class="pink-ligth">Terms and Conditions</span>
    //         <br>
    //         <p id="left-align">
    //             Need Help? <span class="pink-ligth">Contact Us</span>
    //         </p>
    //         <hr class="dash">
    //         <p>By Signing up or logging in, you agree to our <span class="pink-ligth">Terms and
    //                 Conditions</span></p>
    //     </form>


    // </div>

    // </div>
    // <!-- <div"> -->
    // <h5 id="footer-copyrigth">Copyright © 2023 SUGAR Cosmetics. All rights reserved.</h5>

    // </div>

    // </div>
    // `
    // })
    // -----------------------------------------------
    let register_fullName = document.querySelector("#register_fullName");
    let register_Password = document.querySelector("#register_password");
    let register_mobile = document.querySelector("#Mobile_number");
    let register_email = document.querySelector("#register_email")
    let register_btn = document.querySelector("#SignUp");
    register_btn.addEventListener("submit", function (event) {
        event.preventDefault();
        // console.log("hiii")
        let regi_Info = {
            name: register_fullName.value,
            password: register_Password.value,
            mobile: register_mobile.value,
            email: register_email.value
        }
        fetch(`https://beautybliss-cosmetics-mock-api.onrender.com/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(regObj)
        })
            .then((res) => {
                return res.json()
            }).then((data) => {
                alert("Register_Done")
                window.location.href = "./login.html"
            })
    })

}


















