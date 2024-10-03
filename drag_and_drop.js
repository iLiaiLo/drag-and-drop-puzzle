let answerArray=Array.from({length:9}).fill(false);
let board=document.querySelector(".board");
let num=9;
let pieces=document.querySelector(".imagesContainer");
let elem=document.getElementById("resultText");

for(let i=1;i<=num;i++){
        let imagesDIV=document.createElement("div"); 
        let child=document.createElement("div");
        let image=document.createElement("img");
        child.id=`${i}${i}${i}`;
        board.append(child)
        imagesDIV.id=`${i}${i}`
        image.src="./images/"+i+".jpg";
        image.id=`${i}`;
        image.draggable=true;
                

                
        imagesDIV.append(image);
        pieces.append(imagesDIV);

        image.addEventListener("dragstart",function(e){
            e.dataTransfer.setData("text",e.target.id);
            elem.innerText="";
        })


        child.addEventListener("dragover",function(e){
            e.preventDefault()
        })

        imagesDIV.addEventListener("dragover",function(e){
            e.preventDefault()
        })


        imagesDIV.addEventListener("drop",function(e){
            let data=e.dataTransfer.getData("text");
            let source=document.getElementById(data);
            source.style.width="100%";
            source.style.height="100%";
                   
            if(e.target.tagName==="IMG"){
                return
            }
            else{
                e.target.appendChild(source);
            }
                
            })
        child.addEventListener("drop",function(e){
                let data=e.dataTransfer.getData("text");
                let source=document.getElementById(data);
                source.style.width="100%";
                source.style.height="100%";
                  
                if(e.target.tagName==="IMG"){
                    return
                }
                else{
                    e.target.appendChild(source);
                }

                if(e.target.id[0]===data){
                    answerArray[parseInt(data)-1]=true;
                }      
        })
}


function checkResult(){
    if(answerArray.every(item=>item)){
        elem.innerHTML="Congratulations!You are done.";
        elem.style.color="green"
        let resetBut=document.createElement("button");
        resetBut.id="resetButton"
        resetBut.innerText="Reset"
        resetBut.classList.add("resetBut");
        elem.appendChild(resetBut);

        resetBut.addEventListener("click",function(){
        for(let i=0;i<num;i++){
            pieces.children[i].appendChild(board.children[i].firstChild)
        }
            elem.removeChild(document.getElementById("resetButton"));
            elem.innerText="";
            answerArray=Array.from({length:9}).fill(false); 
        })    
    }
    else{
        elem.innerHTML="some piece is incorrect location";
        elem.style.color="red"
    }
}