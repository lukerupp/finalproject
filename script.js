//let favoriteTeam = document.querySelector("favoriteTeamValueQuestion").value;

let backgroundColor = "#B0B7BC"
let fontColor = "#0076B6"
const $login = document.getElementById("login")
    if($login) $login.onsubmit = login
   const $signup = document.getElementById("signup")
    if($signup) $signup.onsubmit = signup
let string1
let string2
function colorSelect(string1, string2)  { 
document.querySelector("body").style.backgroundColor = string2;
document.querySelector("body").style.color = string1;
}

function signup(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            favoriteteam: document.getElementById("FavoriteTeamQuestion").value,
            first_name: document.getElementById("firstname").value,
            last_name: document.getElementById("lastname").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))
}


function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))
}
