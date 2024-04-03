
//api http://localhost:3000/soa/register

setTimeout(() => {
    let admin = document.getElementById('admin');
    if (admin) {
        admin.style.display ="none";
    }
    console.log('hello');
}, 2000);


document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {

        const api = "http://localhost:3000/soa/login";
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);
        alert(data.message)

    }

    catch (err) {
        console.log(err);
    }
    setTimeout(() => {
        location.replace("../products/products.html");
    }, 1200);
 
});


