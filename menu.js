const enableElement = (element) =>{
    element.style.display = 'block';
}
const disableElement = (element) =>{
    element.style.display = 'none';
}
let boxes = document.querySelectorAll('.boxes');
disableElement(boxes[3]);

let previousArrow = document.querySelector('#previous');
let nextArrow = document.querySelector('#next');

nextArrow.addEventListener('click',()=>{
    let tempBox = boxes[0].querySelector('p').textContent;
    boxes[0].querySelector('p').textContent = boxes[1].querySelector('p').textContent;
    boxes[1].querySelector('p').textContent = boxes[2].querySelector('p').textContent;
    boxes[2].querySelector('p').textContent = boxes[3].querySelector('p').textContent;
    boxes[3].querySelector('p').textContent = tempBox;
})
previousArrow.addEventListener('click',()=>{
    let tempBox = boxes[3].querySelector('p').textContent;
    boxes[3].querySelector('p').textContent = boxes[2].querySelector('p').textContent;
    boxes[2].querySelector('p').textContent = boxes[1].querySelector('p').textContent;
    boxes[1].querySelector('p').textContent = boxes[0].querySelector('p').textContent;
    boxes[0].querySelector('p').textContent = tempBox;
})
    
//responsive search bar

let searchContainer = document.querySelector('.search-container');
let searchImage = document.querySelector('.search-image img');
let input = document.querySelector('.search-input input');

input.disabled = true;
let counter = 1;

searchImage.addEventListener('click',()=>{
    if(counter % 2 !== 0)
    {
        searchContainer.style.width = '90%';
        input.style.opacity = 1;
        input.disabled = false;
    }
    else{
        searchContainer.style.width = '10%';
        input.style.opacity = 0;
        input.disabled = true;
    }
    counter++;
})

// load menu items using api
const getMenuItems = () =>{
    
    let url = 'https://64d8d8bf5f9bf5b879ce9e35.mockapi.io/Menu';

    let items = document.querySelector('.menu-container');

    fetch(url)
            .then(
                r => {
                    if (r.status !== 200) {
                        alert("Server javlja grešku: " + r.status);
                        return;
                    }

                    r.json().then(obj => {
                        for (const x of obj) {
                            items.innerHTML +=` <div class="items">
                            <img src="${x.imageUrl}">
                            <div class="item-informations">
                                <h3>${x.Title}</h3>
                                <p>${x.Category}</p>
                            </div>
                            <div class="item-details">
                                <p>$${x.Price}</p>
                                <input type="number" min="1">
                            </div>
                            <button class="item-button" onclick="getItems(this)">Add</button>
                        </div>`
                        }
                    });
                }
            )
            .catch(
                err => {
                    alert("Error: " + err);
                }
            );
}
getMenuItems();

let tempDeskNumber;
let sumOrder;

function getItems (element){
    

    let mainEl = element.closest('.items');
    let titleItem = mainEl.querySelector('.item-informations h3');
    let priceItem = mainEl.querySelector('.item-details p');
    let quantityItem = mainEl.querySelector('.item-details input');

    let qunatityNumber = parseInt(quantityItem.value);

    let deskNumber = document.querySelector('.desk-container input').value;
    deskNumber = parseInt(deskNumber);

    if(!isNaN(deskNumber))
    {
    if(!isNaN(qunatityNumber))
    {
        let itemTotal = priceItem.textContent.substring(1);
        itemTotal = parseFloat(itemTotal) * quantityItem.value;


        let orderContainer = document.querySelector('.order');
        if(deskNumber === tempDeskNumber){
            let itemList = document.querySelector('.order-desk');
            itemList.innerHTML += `<div class="desk-information">
            <p>${titleItem.textContent} ${priceItem.textContent} x ${quantityItem.value} = $${itemTotal}</p>
            <button class="item-button" id="remove-item" onclick="removeItem(this)">Remove</button>
        </div>`
        }
        else{
            orderContainer.innerHTML += `<div class="order-desk">
            <div class="desk-title">
                <h2>Desk ${deskNumber}</h2>
            </div>
            <div class="desk-information">
                <p>${titleItem.textContent} ${priceItem.textContent} x ${quantityItem.value} = $${itemTotal}</p>
                <button class="item-button" id="remove-item" onclick="removeItem(this)">Remove</button>
            </div>
        </div>`
        }
        
        quantityItem.value = '';
        orderContainer.style.opacity = 1;
        tempDeskNumber = deskNumber;
        fontResponsive();
    }
    else{
        alert('Plese check qunatity of product')
    }
}
else{
    alert('Please check number of the desk')
}
}

// remove item from order
function removeItem (item){

    let orderThing = item.closest('.order-desk');
    let itemDetail = orderThing.querySelector('.desk-information');
    itemDetail.remove();
}
let fontResponsive = () =>{
    // not text in new row
    let itemDetail = document.querySelectorAll('.desk-information p');
    for (let i = 0; i < itemDetail.length; i++) {
        let height = itemDetail[i].offsetHeight;
        if(height > 26)
        {
            itemDetail[i].style.fontSize = '16px'
        }
    }
}
