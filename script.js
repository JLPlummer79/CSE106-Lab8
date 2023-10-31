let signinform =  document.getElementById("signinform");

const baseURL = 'http://127.0.0.1:5000'

const selfURL = "http://127.0.0.1:5501"

let access = ""



signinform.addEventListener("submit", (e) => {
    e.preventDefault()
    let username = document.getElementById("getUsername")
    let password = document.getElementById("getPassword")

    if (username.value == "" || password == "") {
        alert("Fill out the forms")
    } else  {
        signin(username.value, password.value)
    }
})

const signin = async (userName, passWord) => {
    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username: userName,
            password: passWord
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const myJson = await response.json()
    window.globalUsername = userName;
    access = myJson["access"]
    
    updatePage()
    //window.location.href = response
}

function updatePage() {
    //console.log("updating")
    switch(access) {
        case "index":
            window.location = `${selfURL}/index.html`
            break;
        case "Admin":
            window.location = `${baseURL}/admin/`
            break;
        case "Teacher":
            //console.log("going to teacher")
            window.location = `${selfURL}/teacher.html`
            break;
        case "Student":
            // console.log("going to student")
            window.location = `${selfURL}/student.html`
            break;
    }
}

