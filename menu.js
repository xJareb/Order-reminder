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

let emptyArray = [];
let foundNumber = false;
let sumTotal;

/*This function do sorting ordered items into right position*/

let publicItemName;

function getItems (element){
    
    let mainEl = element.closest('.items');
    let titleItem = mainEl.querySelector('.item-informations h3');
    let priceItem = mainEl.querySelector('.item-details p');
    let quantityItem = mainEl.querySelector('.item-details input');

    let qunatityNumber = parseInt(quantityItem.value);

    let deskNumber = document.querySelector('.desk-container input').value;
    deskNumber = parseInt(deskNumber);

    publicItemName = titleItem;

    if(!isNaN(deskNumber))
    {
    if(!isNaN(qunatityNumber))
    {
        let itemTotal = priceItem.textContent.substring(1);
        itemTotal = parseFloat(itemTotal) * quantityItem.value;

        let orderContainer = document.querySelector('.order');

        //Used for loop to find a desk number stored in array
        for (let i = 0; i < emptyArray.length; i++) {
            if(deskNumber == emptyArray[i])
            {
                foundNumber = true;
                break;
            }
            else{
                foundNumber = false;
            }
        }
        //if desk number is found in array locate an ordered item into container which title contains desk number
        //else create new container with title and desk number
        if(foundNumber){
            let itemList = document.getElementById(`${deskNumber.toString()}`);
            let span = document.getElementById(`s${deskNumber}`);
            let tempSum = parseFloat(span.innerText);
            tempSum += itemTotal;
            span.innerText = tempSum;
            //test
            disableDuplicates(deskNumber);
            if(notDuplicated)
            {
            itemList.innerHTML += `<div class="desk-information">
            <p>${titleItem.textContent} ${priceItem.textContent} x ${quantityItem.value} = $${itemTotal}</p>
            <button class="item-button" id="remove-item" onclick="removeItem(this,${deskNumber.toString()})">Remove</button>
            </div>`
            //need to fix to work perefctly
            }
        }
        else{
            emptyArray.push(deskNumber);
            sumTotal = itemTotal;
            //console.log('Suma:' + sumTotal);
            //console.log('Item sum:' + itemTotal);
            orderContainer.innerHTML += `<div class="order-desk" id="${deskNumber.toString()}">
            <div class="desk-title">
                <h2>Desk ${deskNumber}</h2>
            </div>
            <div class="desk-commands">
            <p>Total: $</p><span id="s${deskNumber.toString()}">${sumTotal}</span>
            <button class="item-button" id="payButton" onclick="payOrder(${deskNumber})">Pay order</button>
            </div>
            <hr>
            <div class="desk-information">
                <p>${titleItem.textContent} ${priceItem.textContent} x ${quantityItem.value} = $${itemTotal}</p>
                <button class="item-button" id="remove-item" onclick="removeItem(this,${deskNumber.toString()})">Remove</button>
            </div>
        </div>`
        }
        quantityItem.value = '';
        orderContainer.style.opacity = 1;
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
function removeItem (item,deskNumber){

    let orderThing = item.closest('.order-desk');
    let itemDetail = orderThing.querySelector('.desk-information');
    let tempItemDetail = orderThing.querySelectorAll('.desk-information');

    itemDetail.remove();

    let orderDesk = document.getElementById(deskNumber);

    if(tempItemDetail.length === 1)
    {
        for (let i = 0; i < emptyArray.length; i++) {
            if(deskNumber === emptyArray[i])
            {
                delete emptyArray[i];
                emptyArray.length = emptyArray.length - 1;
            }
        }
       orderDesk.remove();
    }
    // need to implement reducing a total sum
    
    let itemInfo = item.closest('.desk-information');
    let pItemInfo = itemInfo.querySelector('p');

    //take out price from the p element
    let position = pItemInfo.innerText.indexOf('=');
    let price = parseFloat(pItemInfo.innerText.substring(position + 3));

    //take span
    let span = orderThing.querySelector('.desk-commands span');
    let spanPrice = parseFloat(span.innerText);
    
    spanPrice -= price;
    span.innerText = spanPrice;
    
}
function payOrder(deskNumber) {
    let orderDesk = document.getElementById(deskNumber);
    orderDesk.remove();
    for (let i = 0; i < emptyArray.length; i++) {
        if(deskNumber === emptyArray[i])
        {
            delete emptyArray[i];
            emptyArray.length = emptyArray.length - 1;
        }
    }
}

// disable duplicates
let notDuplicated = true;

let disableDuplicates = (deskNumber) =>{
    // need to implement
    let body = document.getElementById(deskNumber);
    let items = body.querySelectorAll('.desk-information p');

    let privateItemName = publicItemName.textContent;

    for (const item of items) {
        let endName = item.textContent.indexOf('$');
        let itemName = item.textContent.substring(0,endName - 1);

        if(privateItemName === itemName)
        {
            alert('Dodan isti proizvod')
            notDuplicated = false;
            break;
        }
        else
        {
            notDuplicated = true;
        }
    }
}
