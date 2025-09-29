

let form=document.getElementById("form");
let firstName=document.getElementById("fName");
let lastName=document.getElementById("lName");
let email=document.getElementById("email");
let password=document.getElementById("password");
let confirmPassword=document.getElementById("confirmPassword");


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword){
        alert("Please fill all fields!");
        return;
    }
      if (password.value.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    if(password.value!==confirmPassword.value){
   alert("Password and confirm password do not match");
      return;
    }

    let user={
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        password:password.value,
    };

    // check user is already exists in local storage

    let users=JSON.parse(localStorage.getItem("users"))|| [];


    // check email is already registered

    let existingUser=users.find(u=>u.email===email.value);
    if(existingUser){
        alert("Email already registered");
        return;
    }

    // Add new user
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));

    
// Store current user
localStorage.setItem("currUser", JSON.stringify(user));


    alert("Signup successfully");
    form.reset();

})