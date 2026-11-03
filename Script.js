// document.querySelector("#logo").addEventListener("click", () => {
//     alert("Hello");
// });

document.querySelector(".main-btn").addEventListener("click", () => {
    document.querySelector(".tour").scrollIntoView({behavior: "smooth"});
});



// Dark mode and Light mode ->

// let currMode = "light";

// document.querySelector("#mode").addEventListener("click", () => {
//     if(currMode === "light"){
//         currMode = "dark";
//         document.querySelector("body").classList.add("dark");
//         document.querySelector("body").classList.remove("light");
//     }

//     else{
//         currMode = "light";
//         document.querySelector("body").classList.add("light");
//         document.querySelector("body").classList.remove("dark");
//     }

//     console.log(currMode);
// });



let color = "var(--orange)";
let home = document.querySelector("#home");

if(home !== document.querySelector(".hero-section")){
    home.addEventListener("click", () =>{
        home.style.background = "var(--orange)";
        home.style.color = "white";
    });
    
}



// header -->
home.addEventListener("click", ()=>{
    document.querySelector("header").scrollIntoView({behavior: "smooth"});
});

document.querySelector("#about").addEventListener("click", () =>{
    document.querySelector(".about").scrollIntoView({behavior: "smooth"});
});

document.querySelector("#contact").addEventListener("click", () =>{
    document.querySelector(".contact-us").scrollIntoView({behavior: "smooth"});
});




// gallery -->
document.querySelector(".leh").addEventListener("click", () =>{
    window.location.href="leh.html";
});

document.querySelector(".umlinga").addEventListener("click", () =>{
    window.location.href="umlinga.html";
});

document.querySelector(".Zensakarroad").addEventListener("click", () =>{
    window.location.href="Zensakarroad.html";
});

document.querySelector(".Thikesy").addEventListener("click", () =>{
    window.location.href="Thikesy.html";
});

document.querySelector(".Zensakar").addEventListener("click", () =>{
    window.location.href="Zensakar.html";
});
document.querySelector(".pangong").addEventListener("click", () =>{
    window.location.href="pangong.html";
});
document.querySelector(".santistupa").addEventListener("click", () =>{
    window.location.href="santistupa.html";
});
document.querySelector(".khardungla").addEventListener("click", () =>{
    window.location.href="khardungla.html";
});
document.querySelector(".chandratal").addEventListener("click", () =>{
    window.location.href="chandratal.html";
});



document.querySelector(".news-btn").addEventListener("click", () =>{
    window.location.href="https://mail.google.com/mail/u/0/#inbox?compose=new";
});

document.querySelector(".btnn").addEventListener("click", () =>{
    window.location.href="about.html";
});

document.querySelector("#insta").addEventListener("click", () =>{
    window.location.href="https://www.instagram.com/mantu___004?igsh=YW9tbndhaTBwbjR2";
});

document.querySelector("#github").addEventListener("click", () =>{
    window.location.href="https://github.com/Mantu-code";
});

document.querySelector("#email").addEventListener("click", () =>{
    window.location.href="https://mail.google.com/mail/u/0/#inbox";
});

document.querySelector("#linkedin").addEventListener("click", () =>{
    window.location.href="https://www.linkedin.com/in/mantu-kunda-744285289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
});
