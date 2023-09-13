
let editor=ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.getSession().setMode("ace/mode/javascript");

document.getElementById("codeConverter").addEventListener("click",()=>{
    let btn=document.getElementById("codeConverter");
    btn.innerText="";
    btn.innerHTML="";
    btn.innerHTML=`<div class="loader"></div>`;
    convertCode("Convert Code","codeConverter");
});
document.getElementById("codeDebugger").addEventListener("click",()=>{
    let btn=document.getElementById("codeDebugger");
    btn.innerText="";
    btn.innerHTML="";
    btn.innerHTML=`<div class="loader"></div>`;
    debugCode("Debug Code","codeDebugger");
});
document.getElementById("codeQualityCheck").addEventListener("click",()=>{
    let btn=document.getElementById("codeQualityCheck");
    btn.innerText="";
    btn.innerHTML="";
    btn.innerHTML=`<div class="loader"></div>`;
    checkCodeQuality("Check Quality","codeQualityCheck");
});



function convertCode(value,Id){

    let editorValue=editor.getValue();
    let language=document.getElementById("programmingLanguage").value;
    const params=new URLSearchParams();
    params.append('codesnippet',`${editorValue}`);
    params.append('language',`${language}`)
    let url=`http://localhost:8085/codeswapper/convertCode?${params.toString()}`;
    console.log(url);
    fetch(url,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
    })
    .then(response => {
        console.log(1);
        if(!response.ok){
            throw new Error(`Response not OK, Status: ${response.status}`); 
        }
        return response.json();
    })
    .then(data=>{
        console.log(data);
        displayData(data.content,value,Id);
    })
    .catch(error=>{
        console.error("Error: "+error);
        let message=`Failed to convert a code, please try again.`
        console.log(message);
        displayData(message,value,Id);
    });
}

function debugCode(value,Id){
    let editorValue=editor.getValue();
    const params=new URLSearchParams();
    params.append('codesnippet',`${editorValue}`);

    let url=`http://localhost:8085/codeswapper/debugCode?${params.toString()}`;
    console.log(url);
    fetch(url,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
    })
    .then(response => {
        console.log(1);
        if(!response.ok){
            throw new Error(`Response not OK, Status: ${response.status}`); 
        }
        return response.json();
    })
    .then(data=>{
        console.log(data);
        displayData(data.content,value,Id);
    })
    .catch(error=>{
        console.error("Error: "+error);
        let message=`Failed to debug a code, please try again.`
        console.log(message);
        displayData(message,value,Id);
    });
}

function checkCodeQuality(value,Id){
    let editorValue=editor.getValue();
    const params=new URLSearchParams();
    params.append('codesnippet',`${editorValue}`);

    let url=`http://localhost:8085/codeswapper/checkQuality?${params.toString()}`;

    fetch(url,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Response not OK, Status: ${response.status}`); 
        }
        return response.json();
    })
    .then(data=>{
        displayData(data.content,value,Id);
    })
    .catch(error=>{
        console.error("Error: "+error);
        let message=`Failed to check a code quality, please try again.`
        displayData(message,value,Id);
    });
}

function displayData(data,value,Id){

    let btn=document.getElementById(`${Id}`);
    btn.innerHTML="";
    btn.innerText="";
    btn.innerText=value;

   if(Id!="codeConverter"){
     let mainContainer=document.querySelector(".main-container");
     mainContainer.style.height="100%";
   }

    let resContainer=document.getElementById("response");
    resContainer.innerText="";
    resContainer.innerText="Output:- \n\n"+data;
}



// for(let i=0; i<=5; i++){
//     console.log(i);
// }