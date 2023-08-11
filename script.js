const enableElement = (element) =>{
    element.style.display = 'block';
}
const disableElement = (element) =>{
    element.style.display = 'none';
}

let aboutSign = document.querySelector('#popup-about');

aboutSign.addEventListener('click',()=>{
    let aboutUsDiv = document.querySelector('.popUp-about');
    enableElement(aboutUsDiv);
    moveLeft(aboutUsDiv,'.popUp-about')


    let closeButton = document.querySelector('.popUp-about button');
    closeButton.addEventListener('click',()=>{
        aboutUsDiv.style.display = 'none';
    })
})

let signButton = document.querySelector('.sign');
signButton.addEventListener('click',(element)=>{
    let loginForm = document.querySelector('#login-form');
    enableElement(loginForm);
    moveLeft(loginForm,'.login-form')

    let X = document.querySelector('.close');
    X.addEventListener('click',()=>{
        loginForm.style.display = 'none';
    })
})

let registrationButton = document.querySelector('#registration');

registrationButton.addEventListener('click',()=>{
    let registrationForm = document.querySelector('.registration-container');
    enableElement(registrationForm);
    moveLeft(registrationForm,'.registration-container');

    let X = document.querySelector('#test');
    X.addEventListener('click',()=>{
        registrationForm.style.display = 'none';
    })
})

//show password

let checkBox = document.querySelector('#show');
let password = document.querySelector('#lpassword');
checkBox.addEventListener('click',()=>{
    if(checkBox.checked){
        password.type = password.type === 'password'? 'text':'password';
    }
    else{
        password.type = 'password';
    }
})

// hardcoding opening menu, later I will do sign up implementation

let username = document.querySelector('#lname');
let sign = document.querySelector('#sign-in');
sign.addEventListener('click',()=>{
    if(username.value === 'admin' && password.value === 'admin'){
       var menu = 'menu.html';
       window.location.href = menu;
    }
})

//---------------------------------------------------------------------
/*This code describe responsive centering paragraphs*/
const moveLeft = (element,elementClass) =>{
    let bodyWidth = document.querySelector('.mobile-container').offsetWidth;
    let elementWidth = document.querySelector(`${elementClass}`).offsetWidth;
    let marginSize = (bodyWidth - elementWidth) / 2;
    element.style.marginLeft = marginSize + 'px';
}
/*Here I enable all elements in the goal to have their width that can
calculate marginSize and implement an operation executing
when the application starts. In every addEventListener paragraph, I added moveLeft
function in goal to not change marginSize value*/
let paragraphs = document.querySelectorAll('.centred-paragraph');
for (const paragraph of paragraphs) {
    enableElement(paragraph)
}
const centredParagraph = () =>{
    for (let i = 0; i < paragraphs.length; i++) {
        
        let classNames = paragraphs[i].getAttribute('class');
        let className = classNames.split(' ');
        let classString = "." + className[0];
        moveLeft(paragraphs[i],classString)
    }
}
centredParagraph();
for (const paragraph of paragraphs) {
    disableElement(paragraph)
}
window.addEventListener('resize',()=>{
    centredParagraph();
})

// opacity animation with title

let title = document.querySelector('.title h1');
let letters = title.textContent.split('');

title.innerHTML = '';

for (let i = 0; i < letters.length; i++) {
    title.innerHTML += `<span>${letters[i]}</span>`
}

let i = 0;
let inerval = setInterval(() => {
    let spans = document.querySelectorAll('.title h1 span');
    let singleSpan = spans[i];

    singleSpan.style.opacity = 1;

    i++;

    if(i === spans.length)
    {
        clearInterval(inerval)
    }
}, 300);




