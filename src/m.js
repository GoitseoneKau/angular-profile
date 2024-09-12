M.AutoInit();



let professionEl = document.getElementById("profession-header");//h1 element in home page
    
async function typeWriter(text,element,delay=100){
    const letters= text.split("");
    let i=0;

    while(i<letters.length){
        await delayFunction(delay);
        element?.append(letters[i]);
        i++;
    }

    return;
}

async function deleteWriter(element,delay=100){
    const letters= element?.innerHTML.split("");
    
    while(letters?.length>0){
        await delayFunction(delay);
       letters.pop();
       element.innerHTML=letters.join("")
    }
}

function delayFunction(ms){
    return new Promise(resolve=>setTimeout(resolve, ms))
}

let professionRoots = ["DEVELOPER","DESIGNER"];

document.addEventListener("DOMContentLoaded", async ()=>{

    var elems = document.querySelectorAll('.sidenav');

    var instances = M.Sidenav.init(elems, {
      edge:"right",
      draggable:true,
      preventScrolling:true,
      inDuration:600,
      outDuration:600
    });

    let nav = document.getElementById("navbar");
 
    if(window.scrollY >100){
        nav.style.backgroundColor = "#000000";
        nav.classList.add("shadow");
    }

    document.onscroll = ()=>{

        if(window.scrollY >100){
            nav.style.backgroundColor = "#000000";
            nav.classList.add("shadow");
        }else{
            nav.style.backgroundColor = ""
        }

    }

    //Segment to create typewriter effect in home header element
   
   
    await delayFunction(1000);
    await deleteWriter(professionEl,150);

    let count = 0;
    while(true){
        if(count>1){
            count=0;
        }
        await typeWriter(professionRoots[count],professionEl,200);
        await delayFunction(500);
        await deleteWriter(professionEl,150);
        await delayFunction(500)
        count++;
    }
  

});

document.onchange = async ()=>{
  let count = 0;
    while(true){
        if(count>1){
            count=0;
        }
        await typeWriter(professionRoots[count],professionEl,200);
        await delayFunction(500);
        await deleteWriter(professionEl,150);
        await delayFunction(500)
        count++;
    }
}
let form = document.getElementById("contactForm");

const submitForm = (event)=>{
  event.preventDefault();
    //Form
    //For Contact Me Page
  
    let lastName =  document.getElementById("lname");
    let firstName = document.getElementById("fname");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let eleList = [lastName,firstName,email,message];
    let isvalidEMail = email.value.trim() !=="" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
    let isvalidMessage = message.value.trim() !=="";
    let isvalidFname = firstName.value.trim() !=="";
    let isvalidLname = lastName.value.trim() !=="";

    let isvalidForm = isvalidEMail&&isvalidFname&&isvalidLname&&isvalidMessage;

    if (isvalidForm==true){
        var data = new FormData(event.target);
        let validGreen ="0 0 10px green";
        fetch("https://formspree.io/f/xkndkvgg", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {

              let successMessage = document.createElement("span");
                successMessage.style.cssText = "color:green; display:block; font-size:28px";
                successMessage.classList.add("center");
                successMessage.innerText ="Thanks for your submission!";

                eleList.forEach((el)=>{
                  el.style.boxShadow=validGreen;
                  el.removeChild(document.querySelector(".error"));
                })

                message.parentElement.appendChild(successMessage);

                form.reset()
            } else {
                response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                }
            })
            }
        });

    } if(isvalidForm==false) {
            let invalidRed ="0 0 10px red";  
            
            //email error
            if (isvalidEMail==false) {
                let alertEmail = document.createElement("span");
                alertEmail.style.color="red";
                alertEmail.style.display = "block";
                alertEmail.classList.add("error")
                alertEmail.innerText ="Please enter a valid email";
                email.style.boxShadow = invalidRed;
                email.parentElement.appendChild(alertEmail);
            }
          
            //message error
            if (isvalidMessage==false) {
                let alertMessage = document.createElement("span");
                alertMessage.style.color="red";
                alertMessage.style.display ="block";
                alertMessage.classList.add("error")
                alertMessage.innerText ="Please state your message";
                message.style.boxShadow = invalidRed;
                message.parentElement.appendChild(alertMessage);
            }
            
            //first name error   
            if (isvalidFname==false) {
                let alertFname = document.createElement("span");
                alertFname.style.color="red";
                alertFname.style.display = "block";
                alertFname.classList.add("error")
                alertFname.innerText ="Please fill in your name";
                firstName.style.boxShadow = invalidRed;
                firstName.parentElement.appendChild(alertFname);
            }
            
            //last name error
            if(isvalidLname==false) {
                let alertLname = document.createElement("span");
                alertLname.style.color="red";
                alertLname.style.display = "block";
                alertLname.classList.add("error")
                alertLname.innerText ="Please fill in your last name";
                lastName.style.boxShadow = invalidRed;
                lastName.parentElement.appendChild(alertLname);
            }
          
    }

}


 //JS for sliding images
 const sliders = document.querySelectorAll(".projects-s>div.slide>.image");
 const btnLeft = document.getElementById("left");
 const btnRight = document.getElementById("right");

 let activeSlide = 0;
//Function to slide images or set the acvtive image
 function setImageSlide(){
   sliders.forEach((slides)=>slides.classList.remove("active"));//get all related elements as a list/array and clear the active class
   sliders[activeSlide].classList.add("active");//get the specific element that needs to be shown from list and add active class
 }

 //Function to increase activeSlide and navigate to next image
 //untill it reaches last index and change activeSlide to first index, to transition to next first image
 function nextSlide(){
   activeSlide++;
   if(activeSlide>sliders.length-1){
       activeSlide=0;
   }
 }

 //Function to decrease activeSlide and navigate to previous image
 //untill it reaches first index and change activeSlide to last index, to transition to previous last image
 function prevSlide(){
   activeSlide--;
   if(activeSlide<0){
       activeSlide=sliders.length-1;
   }
 }

//add onclick event for the right button
//place nextSlide function-N.B must be before setImageSlide function to update the activeSlide vaariable for smooth transition
 btnRight.onclick = ()=>{
   nextSlide();
   setImageSlide();
 }

//add onclick event for the left button
//place prevSlide function-N.B must be before setImageSlide function to update the activeSlide vaariable for smooth transition
 btnLeft.onclick = ()=>{
   prevSlide();
   setImageSlide();
 }

 let image = document.querySelectorAll(".projects>div.slide>.image");
 let slide = document.querySelector(".slide");
 image.forEach((imgDiv)=>{
   imgDiv.addEventListener("click",()=>{
     if(slide.style.animationPlayState=="paused"){
       slide.style.animationPlayState = "running";
     }else{
       slide.style.animationPlayState= "paused";
     }
   });  
 });