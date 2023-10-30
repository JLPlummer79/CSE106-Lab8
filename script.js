let signinform =  document.getElementById("signinform");

const baseURL = 'http://127.0.0.1:5000'

const selfURL = "http://127.0.0.1:5501"

signinform.addEventListener("submit", (e) => {
    e.preventDefault()
    let username = document.getElementById("getUsername")
    let password = document.getElementById("getPassword")
    console.log(username.value)
    console.log(password.value)

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

        
    switch(myJson) {
        case "index":
            window.location = `${selfURL}/index.html`
            break;
        case "Admin":
            window.location = `${baseURL}/admin/`
            break;
        case "Teacher":
            window.location = `${selfURL}/teacher.html`
        case "Student":
            window.location = `${selfURL}/student.html`
    }

    //window.location.href = response
}

