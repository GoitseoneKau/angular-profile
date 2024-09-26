M.AutoInit();

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

    
  

});

  
