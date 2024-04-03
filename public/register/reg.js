document.getElementById('register-Form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
const ddata=document.querySelector('.data')
    try {
        const api="http://localhost:3000/soa/register";
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone })
        });

        const data = await res.json();
        console.log(data); 
        alert(data.message)
        
    } catch (error) {
        console.error('Error:', error);
    }
    setTimeout(()=>{
        location.replace("../login/log.html")
    },1200)
    
});