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
                            <img src="">
                            <div class="item-informations">
                                <h3>${x.Title}</h3>
                                <p>Category: ${x.Category}</p>
                            </div>
                            <div class="item-details">
                                <p>$${x.Price}</p>
                                <input type="number" min="0">
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

function getItems (element){
    

    let mainEl = element.closest('.items');
    let titleItem = mainEl.querySelector('.item-informations h3');
    let priceItem = mainEl.querySelector('.item-details p');
    let quantityItem = mainEl.querySelector('.item-details input');

    let qunatityNumber = parseInt(quantityItem.value);

    if(!isNaN(qunatityNumber))
    {
        let itemTotal = priceItem.textContent.substring(1);
        itemTotal = parseFloat(itemTotal) * quantityItem.value;

        let orderContainer = document.querySelector('.order');
        orderContainer.innerHTML += `<div class="desk-order"><h2>${titleItem.textContent}</h2> <p>${priceItem.textContent} X ${quantityItem.value} = $${itemTotal}</p> <button>Remove</button><div class="total"></div></div>`

    }
    else{
        alert('Plese check qunatity of product')
    }

}