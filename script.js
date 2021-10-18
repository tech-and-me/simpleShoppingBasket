const productArray =[
    {
        productID: 1,
        productImg:"./images/iphoneX.jpg",
        productName:"Samsung",
        unitPrice:"300",
        
    },
    {
        productID: 2,
        productImg:"./images/iphoneX.jpg",
        productName:"Iphone",
        unitPrice:"800",
        
    },
    {
        productID: 3,
        productImg:"./images/iphoneX.jpg",
        productName:"Oppo",
        unitPrice:"200",
        
    },
    {
        productID: 4,
        productImg:"./images/iphoneX.jpg",
        productName:"NotePad",
        unitPrice:"1000",
        
    },
    {
        productID: 5,
        productImg:"./images/iphoneX.jpg",
        productName:"Acer Laptop",
        unitPrice:"1200",
        
    },
    {
        productID: 6,
        productImg:"./images/iphoneX.jpg",
        productName:"Ipad Mini",
        unitPrice:"700",
        
    },
    {
        productID: 7,
        productImg:"./images/iphoneX.jpg",
        productName:"Dell Laptop",
        unitPrice:"1500",
        
    }
]


let htmlElementList =[];
let tbodyEl = document.getElementById("tbody")

productArray.forEach(element => 
    {
        const htmlElement =`<div class="col col-12 col-md-6 col-lg-4 gy-5 card-item text-center">
                <div class="card" id=${element.productID}>
                    <img src="${element.productImg}" class="card-img-top" alt="">
                    <div class="card-body">
                    <p class="card-text px-3" style="font-weight:bold">${element.productName}</p>
                    <p class="card-text px-3"><span>$ </span>${element.unitPrice}</p>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    <button  type="button" class="btn btn-primary mt-2 add">Add to Basket</button>
                    </div>
                </div>
                </div>
            `
        htmlElementList.push(htmlElement);
    }        
    );
let basket =[]
let basketHTML = []
let total = 0;
let itemNum = 0;
console.log(htmlElementList);
let htmlElementJoined = htmlElementList.join("\n");
console.log(htmlElementJoined);
const cardLayoutEl=document.getElementById("cardLayout")
cardLayoutEl.innerHTML=htmlElementJoined;
cardLayoutEl.addEventListener("click",(event)=>{
    console.log("Clicked Cardlayout")
    if(event.target.classList.contains("add")){
        console.log("Clicked Add");
        const mainDiv = event.target.parentElement.parentElement;
        const mainDivId = Number(mainDiv.id);
        console.log(mainDivId);
        const unitEl = event.target.previousElementSibling
        let unitNumber = Number(unitEl.value)
        unitEl.value = ""
        let foundTask;
        let totalEl = document.getElementById("total")
        
        productArray.forEach(element => {
            if (element.productID===mainDivId){
                foundTask = element;
                console.log(foundTask)
                itemNum++
                let amount = unitNumber * foundTask.unitPrice 
                foundTask["id"] = itemNum;
                foundTask["unitNumber"] = unitNumber;
                foundTask["amount"] = amount;
                basket.push(foundTask);
                console.log(basket)
                render(basket);

            }   
        });
        
    }
})



const render=(items)=>{
    let total = 0
    let basketHTML = [];
    items.forEach(element => {
        let foundTaskHTML = `
                    <tr id="${element.id}">
                        <td>${element.productName}</td>
                        <td>${element.unitNumber}</td>
                        <td><span>$</span>${element.unitPrice}</td>
                        <td><span>$</span>${element.amount}</td>
                        <td><span class="text-danger remove btn">Remove</span></td>
                    </tr>`
                    basketHTML.push(foundTaskHTML);
        total += element.amount;
    });    
    // End of foreach iteration
    
    let totalEl = document.getElementById("total")
    tbodyEl.innerHTML = basketHTML.join("\n");
    totalEl.innerText = total;

}


// Removing item from the basket
tbodyEl.addEventListener("click",(event)=>{
    if (event.target.classList.contains("remove")){
        mainDivRemove = event.target.parentElement.parentElement;
        mainDivRemoveId = Number(mainDivRemove.id)
        const newBasket = [];
        basket.forEach(element => {
            if (element.id !== mainDivRemoveId){
                newBasket.push(element);
            }          
        });
        basket = newBasket;
        render(basket);

    }
})








// Task to do 
//  add eventlistener to the whole table
// check if event.target contain class of btn.remove ? if it is, then find the parent row and then find id of the parent row  
// once get Id of that row, then, create a new basket that contain all object apart from the object contain the ID found.  and then replace the old basket with the new basket. after that, render it again 