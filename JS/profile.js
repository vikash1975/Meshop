let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let saveInfoBtn = document.getElementById("saveInfo");
let oldPass = document.getElementById("old");
let newPass = document.getElementById("new");
let confirmPass = document.getElementById("confirm");
let changePassBtn = document.getElementById("change");
let logoutBtn = document.getElementById("logout");
let welcomeMsg=document.getElementById("welcomeMsg");


let currUser=JSON.parse(localStorage.getItem("currUser"));
let users=JSON.parse(localStorage.getItem("users")) ||[];


// agar user login nhi h to login page pe bhej do
if(!currUser){
    alert("Please login first!");
    window.location.href="login.html";
}

welcomeMsg.textContent = `Welcome, ${currUser.firstName || "User"}!`;

fName.value = currUser.fName||"";
lName.value = currUser.lName||"";

saveInfoBtn.addEventListener("click",()=>{
    currUser.fName=fName.value;
    currUser.lName=lName.value;



    // users ko array me update kro

    let index=users.findIndex(u=>u.email===currUser.email);
    if(index!==-1){
        users[index]=currUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currUser", JSON.stringify(currUser));
        alert("Profile info saved successfully.");
    }
})

changePassBtn.addEventListener("click",()=>{
    if(oldPass.value!==currUser.password){
   alert("Old Password is incorrect!");
   return;
    }

    if(newPass.value!==confirmPass.value){
        alert("New Password and Confirm Password do not match!");
        return;
    }

    if(newPass.value.length<6){
        alert("Password must be at least 6 characters long!");
        return;
    }


    //  Update Password
    currUser.password=newPass.value;
    let index=users.findIndex(u=>u.email.value===currUser.email);
    if(index !=-1){
        users[index]=currUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currUser",JSON.stringify(currUser))
        alert("Password changed successfully!");
        oldPass.value="";
        newPass.value="";
        confirmPass.value="";
    }

});

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("currUser");
    alert("You have been logged out!");
    window.local.href="login.html";
})