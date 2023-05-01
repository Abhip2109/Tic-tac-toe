console.log("hello")
let music= new Audio("./music.mp3")
let turnmusic = new Audio("./ting.mp3")
let gameover= new Audio("./gameover.mp3")
let turn ="X"
let isgameover=false;
let count=0;
music.play();
music.volume=0.3;
var x = window.matchMedia("(max-width: 900px)")

const changeturn=()=>{
    return turn==="X"?"0":"X"
}
const checkdraw=()=>{
    if(count===9 ){
      return true
    }
    return false;
}
turnmusic.volume=0.5
const checkwin=()=>{
    let boxtext=document.getElementsByClassName('boxtext');
    let win=[
        [0,1,2,5,5,0,5,10,0],
        [3,4,5,5,15,0,5,35,0],
        [6,7,8,5,25,0,5,60,0],
        [0,3,6,-5,15,90,-20,37,90],
        [1,4,7,5,15,90,4,37,90],
        [2,5,8,15,15,90,28,37,90],
        [0,4,8,5,15,45,6,38,45],
        [2,4,6,5,15,135,2,37,135],    
    ]
    win.forEach(e=>{

        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText ) && (boxtext[e[2]].innerText===boxtext[e[1]].innerText) && (boxtext[e[0]].innerText!=="")   ){
            document.querySelector('.info').innerText=boxtext[e[0]].innerText +" won"
            isgameover=true;
            count=0;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="200px";
            gameover.play()
            if (x.matches){
                document.querySelector(".line").style.transform=`translate(${e[6]}vw,${e[7]}vw) rotate(${e[8]}deg)`
                document.querySelector(".line").style.width="65vw";
            }
            else{
            document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width="20vw";
        }
    }
    })
}

let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(elem=>{
    let boxtext=elem.querySelector('.boxtext');
    elem.addEventListener('click',()=>{
        count++;
        if(boxtext.innerText===''){
            boxtext.innerText=turn;
            turn =changeturn();
            turnmusic.play();
            console.log(count)
            checkwin();
            if(checkdraw() && isgameover===false){
                document.querySelector('.info').innerText="Draw"
                gameover.play();
                isgameover=true;
            }
           
            
            if(!isgameover){
                document.querySelector("span.info").innerText="Turn for "+ turn ;
            }
        }
    })
})

reset.addEventListener('click',()=>{
    let boxtext=document.querySelectorAll('.boxtext')
    Array.from(boxtext).forEach(e=>{
        e.innerText=""
    })
    isgameover=false;
    count=0;
    turn ="X";
    document.querySelector("span.info").innerText="Turn for "+ turn ;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="0px";
    gameover.play()    
    document.querySelector(".line").style.width="0" 
})