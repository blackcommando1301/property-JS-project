let addBtn =document.querySelector(".add");
let property =document.querySelector(" #a1 ");
let size =document.querySelector("#a2");
let description =document.querySelector("#a3");
let price=document.querySelector("#a4");

let deleteBtn=document.querySelector(".deletetog");
let deleteFlag=false;

let ticketContainer=document.querySelector(".ticket-container");
var uid = new ShortUniqueId();

let ticketArr=[];


if(localStorage.getItem("property")){

    let str=localStorage.getItem("property");
    let arr=JSON.parse(str);
    ticketArr=arr;
    for(let i=0;i<ticketArr.length;i++){
    let propertyName =ticketArr[i].name ;
     let propertySize=ticketArr[i].size;
    let propertydescr=ticketArr[i].description;
     let propertyprice=ticketArr[i].rate;
     let propertyid=ticketArr[i].id;

     createTicket(propertyName,propertySize,propertydescr,propertyprice,-1,propertyid);

    }
}





addBtn.addEventListener("click",function(){
  let propertyName =property.value;
  let propertySize=size.value;
  let propertydescr=description.value;
  let propertyprice=price.value;
  let id=uid();
   createTicket(propertyName,propertySize,propertydescr,propertyprice , 1,id);
   property.value=""; 
   size.value="";
   description.value="";
   price.value="";
})



function createTicket(name , sizes, descri,prices,number,id){


    let currentTicket=document.createElement("div");
    currentTicket.classList.add("ticket");
    currentTicket.setAttribute("ide",id)
    currentTicket.innerHTML=`
    <div  class="basic">
                
    Name:-${name},
    
    Size:-${sizes},

    Price:-${prices}

    </div>
     <div class="descr">${descri}</div>   
     `
    if(number==1){
     let ticketObj={
         name:name ,
         size:sizes,
         description:descri,
         rate:prices,
         id:id,
     }
     ticketArr.push(ticketObj);

     console.log(ticketArr);
    //  pushing items in local storage

     let stringArr=JSON.stringify(ticketArr);

     localStorage.setItem("property",stringArr);
    }
     

     ticketContainer.appendChild(currentTicket);
    
    currentTicket.addEventListener("dblclick",function(){
        if(deleteFlag==true){
            let idee=currentTicket.getAttribute("ide");

        //    delete ticketArr[arridx]
       ticketArr= ticketArr.filter((arr)=>{
           return arr.id!=idee
        })
            let stringArr=JSON.stringify(ticketArr);
            localStorage.setItem("property",stringArr);

        currentTicket.remove();

        console.log(ticketArr);
        
    
        }
    })


}



deleteBtn.addEventListener("click",function(){
    if(deleteFlag==false){
      deleteBtn.style.color="red"
    }else{
        deleteBtn.style.color="black" 
    }
    deleteFlag=!deleteFlag
})