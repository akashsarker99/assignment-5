const loadHome = ()=>{
   
    const userName = document.getElementById("inputUsername").value;
    const inputPass = document.getElementById("inputPass").value;

    if(userName =="admin" && inputPass=="admin123"){
        alert("Sign In successfull");
        window.location.assign("/home.html");
    }
    else{
        alert("Sign In failed");
        return;
    }
}