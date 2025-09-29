let form=document.getElementById("form");
let email=document.getElementById("email");
let password=document.getElementById("password");
let welcomeMsg=document.getElementById("welcomeMsg");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(!email.value || !password.value){
        alert("please fill all inputs!");
        return;
    }

    let users=JSON.parse(localStorage.getItem("users"))||[];

    let user=users.find(u=>u.email===email.value.trim() &&u.password===password.value.trim());

    if(user){
        localStorage.setItem("currUser", JSON.stringify(user));
         alert(`Welcome,${user.firstName}!`);
      
       window.location.href="index.html";
         welcomeMsg.textContent = `Welcome, ${user.firstName || "User"}!`;

    }else{
        alert("User not found, please signup");
          window.location.href = "signUp.html"; 
    }
    form.reset();
})