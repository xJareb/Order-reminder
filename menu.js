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
    //later
})
    
//responsive search bar

let searchContainer = document.querySelector('.search-container');
let searchImage = document.querySelector('.search-image img');
let input = document.querySelector('.search-input input');

let counter = 1;

searchImage.addEventListener('click',()=>{
    if(counter % 2 !== 0)
    {
        searchContainer.style.width = '90%';
        searchContainer.style.backgroundColor = '#5F7ADB';
        input.style.display = 'block';
    }
    else{
        searchContainer.style.width = '10%';
        searchContainer.style.backgroundColor = 'black';
        input.style.display = 'none';
    }
    counter++;
})
//not finished