document.querySelector("div.bmenu").onclick=(e)=>{
    e.stopPropagation();
    document.querySelector("header nav ul").classList.toggle("ch");
};
document.addEventListener("click",(el)=>{
    if(el.target != document.querySelector("div.bmenu") && el.target != document.querySelector("header nav ul"))
        document.querySelector("header nav ul").classList.remove("ch");
});

function a(){
    let fs=document.querySelector("main div.fs");
    fs.style.backgroundImage=`url("images/b${(Math.floor(Math.random()*4)+1)}.png")`;
    fs.classList.remove("c");
    fs.classList.add("b");
    setTimeout(() => {
        fs.classList.remove("b");
        fs.classList.add("c");
    }, 6000);
}
a();
setInterval(()=>{
    a();
    },9000);

document.body.onscroll=()=>{
    if(document.body.parentNode.scrollTop > 50)
        document.querySelector("header").style.boxShadow="0px 1px 0px 0 black";
    else document.querySelector("header").style.boxShadow="none";
    if( ((document.body.parentNode.scrollTop+50) >= document.querySelector(".fs").offsetHeight) && ((document.body.parentNode.scrollTop+50) <= (document.querySelector(".fs").offsetHeight+document.querySelector(".about").offsetHeight ))){
        document.querySelector("div.img").style.backgroundImage='url("images/DDD.webp")';
        setTimeout(()=>{document.querySelector("div.img").style.backgroundImage='url("images/D.png")';},1000);
    }
};

document.querySelector("div.img").onmouseover=()=>{document.querySelector("div.img").style.backgroundImage='url("images/DD.png")';};
document.querySelector("div.img").onmouseout=()=>{document.querySelector("div.img").style.backgroundImage='url("images/D.png")';};

document.querySelectorAll("div.gallery img").forEach((v)=>{
    v.onclick=()=>{
        if(document.querySelector("div.MC").style.display == "" || document.querySelector("div.MC").style.display == "none"){
            document.querySelector("div.galleryV").style.display="flex";
            document.querySelector("div.galleryV").querySelector(".gimg").style.backgroundImage=`url('${v.src}')`;
            document.querySelector("div.galleryV").setAttribute("imgP",v.src.split("/").at(-1));
            document.querySelector("div.galleryV .title").innerHTML=v.alt;
            document.body.style.overflowY="hidden"; 
        }
    };
});
document.querySelector("div.galleryV .close").onclick=(e)=>{
    e.currentTarget.parentNode.parentNode.style.display="none";
    document.body.style.overflowY="scroll";
};
let galA=["a1.png","a2.png","a3.png"];
document.querySelector("div.galleryV .left").onclick=(e)=>{
    let imgpath=galA[((galA.indexOf(e.currentTarget.parentNode.parentNode.getAttribute("imgP"))-1)>=0 ? (galA.indexOf(e.currentTarget.parentNode.parentNode.getAttribute("imgP"))-1) : (galA.length-1))];
    e.currentTarget.parentNode.style.backgroundImage=`url('images/${imgpath}')`;
    document.querySelector("div.galleryV").setAttribute("imgP",imgpath);
    e.currentTarget.parentNode.querySelector(".title").innerHTML=document.querySelector(`div.gallery img[src='images/${imgpath}']`).alt;
};
document.querySelector("div.galleryV .right").onclick=(e)=>{
    let imgpath=galA[((galA.indexOf(e.currentTarget.parentNode.parentNode.getAttribute("imgP"))+1)<galA.length ? (galA.indexOf(e.currentTarget.parentNode.parentNode.getAttribute("imgP"))+1) : 0)];
    e.currentTarget.parentNode.style.backgroundImage=`url('images/${imgpath}')`;
    document.querySelector("div.galleryV").setAttribute("imgP",imgpath);
    e.currentTarget.parentNode.querySelector(".title").innerHTML=document.querySelector(`div.gallery img[src='images/${imgpath}']`).alt;
};

function errorC(ds,msg){
    ds.style.display='flex';
    ds.style.backgroundColor='#f00';
    ds.style.color='#fff';
    ds.querySelector("div:last-child").innerHTML=msg;
}
function successC(ds,msg){
    ds.style.display='flex';
    ds.style.backgroundColor='#fff';
    ds.style.color='#000';
    ds.querySelector("div:last-child").innerHTML=msg;
}
document.querySelector(".contact button").onclick=()=>{
    let ds=document.querySelector(".MC");
    let _name=document.querySelector(".contact input[name='name']"),
        _email=document.querySelector(".contact input[name='email']"),
        _message=document.querySelector(".contact textarea[name='message']");
    if(_name.value.length < 3){
        errorC(ds,"Your name should contain at least three character.");
        _name.focus();
    }
    else if(!/\w+@\w+\.\w+/.test(_email.value)){
        errorC(ds,"Invalid email.");
        _email.focus();
    }
    else if(_message.value.length < 8){
        errorC(ds,"Your message should contain at least eight character.");
        _message.focus();
    }
    else{
        fetch("https://formsubmit.co/ajax/d0b3ff2f8202bbe926bc8930a085db86 ",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                name:_name.value,
                email:_email.value,
                message:_message.value,
            })
        }).then(r=>r.json())
        .then(d=>{
            if(d.success == "true"){
                successC(ds,`Thanks ${_name.value} for leaving us a message, we'll contact you soon on your email ${_email.value}.`);
            }
            else{
                errorC(ds,"We could not send the message, there's an error.");
            }
            });
    }
};
document.querySelector(".MC div.cl").addEventListener("click",(e)=>{
    e.target.parentNode.style.display='none';
});

document.querySelector("div.footer span.y").innerHTML= new Date().getFullYear();
