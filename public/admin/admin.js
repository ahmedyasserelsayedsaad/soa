document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    
    if (email === "admin" && password === "12345678") {
       
        window.location.href = "adminJobs/jobs.html";
    } else {
        
        alert("Invalid email or password. Please try again.");
    }
});