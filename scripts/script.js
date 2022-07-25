const passwordInput = document.querySelector("#password")
const pconfirmInput = document.querySelector("#confirmpassword")

const passMsg = document.createElement("ul");

passwordInput.classList.toggle("error");
pconfirmInput.classList.toggle("error");

passMsg.innerHTML = `
    <li id="upper">at least one uppercase character</li>
    <li id="lower">at least one lowercase character</li>
    <li id="symbol">at least one symbol</li>
    <li id="number">at least one number</li>
    <li id="length">length between 6 and 16</li>
`;

const passDiv = document.querySelector(".passwords > div");
const req = document.createElement("div");
passMsg.style.color = "red";
req.innerHTML = "<small>password requirements:</small>";
passDiv.appendChild(req);
passDiv.appendChild(passMsg);

function updateItem(id, decoration, color) {
    const item = document.querySelector(id);
    item.style.textDecoration = decoration;
    item.style.color = color;
}
function validatePassword(password) {
    const symbols = /[-!#$%^&*()\\@_+|~=`{}\[\]:";'<>?,.\/]/g;
    // uppercase check
    if (password.match(/[A-Z]/g)) updateItem("#upper", "line-through", "green");
    else updateItem("#upper", "none", "red");

    if (password.match(/[a-z]/g)) updateItem("#lower", "line-through", "green");
    else updateItem("#lower", "none", "red");

    if (password.match(/[0-9]/g)) updateItem("#number", "line-through", "green");
    else updateItem("#number", "none", "red");

    if (password.match(symbols)) updateItem("#symbol", "line-through", "green");
    else updateItem("#symbol", "none", "red");

    if (password.length >= 6 && password.length <= 16) updateItem("#length", "line-through", "green");
    else updateItem("#length", "none", "red");

    if (!(password.match(/[A-Z]/g) && password.match(/[a-z]/g) && password.match(/[0-9]/g) &&
        password.match(symbols) && (password.length >= 6 && password.length <= 16))) {
        return false;
    }
    return true;

}

const confirmMsg = document.createElement("div");
const confDiv = document.querySelector(".passwords > div:last-of-type");
confDiv.appendChild(confirmMsg);

function confirmPassword(confirmPass) {
    if (passwordInput.value == "" && pconfirmInput.value == "") {
        confirmMsg.innerText = "";
        confirmMsg.style.color = "black";
        if (pconfirmInput.className == "error") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    }
    else if (passwordInput.value == "" && pconfirmInput.value != "") {
        confirmMsg.innerHTML = "<small>please enter a password first</small>";
        confirmMsg.style.color = "red";
        if (pconfirmInput.className == "") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    }
    else if (passwordInput.value != "" && pconfirmInput.value == "") {
        confirmMsg.innerHTML = "";
        confirmMsg.style.color = "";
        if (pconfirmInput.className == "error") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    }
    else if (!validatePassword(passwordInput.value)) {
        confirmMsg.innerHTML = "<small>your password does not meet the requirements</small>";
        confirmMsg.style.color = "red";
        if (pconfirmInput.className == "") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    } else if (validatePassword(passwordInput.value) && confirmPass !== passwordInput.value) {
        confirmMsg.innerHTML = "<small>passwords do not match</small>";
        confirmMsg.style.color = "red";
        if (pconfirmInput.className == "") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    } else if (validatePassword(passwordInput.value) && confirmPass === passwordInput.value) {
        confirmMsg.innerText = "";
        confirmMsg.style.color = "black";
        if (pconfirmInput.className == "error") {
            pconfirmInput.classList.toggle("error");
            passwordInput.classList.toggle("error");
        }
    }

}
passwordInput.addEventListener("input", () => validatePassword(passwordInput.value), false)
pconfirmInput.addEventListener("input", () => confirmPassword(pconfirmInput.value), false)
