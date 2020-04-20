function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

function logMeIn() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // call the API
    fetch('http://localhost:5000/Account/DOSLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            password,
            returnUrl
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.redirectUrl) {
            window.location = data.redirectUrl;
        }
        else {
            document.getElementById('error-msg').innerText = "Invalid credentials";
        }
    })
    .catch(error => {
        console.log(error);
    });

}


