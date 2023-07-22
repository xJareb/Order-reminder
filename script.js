/* Popup with opacity animation*/

let aboutSign = document.querySelector('#popup-about');

aboutSign.addEventListener('click',()=>{
    let popupAbout = document.querySelector('.popUp-about');
    let popup = document.querySelectorAll('.hide');
    let button = document.querySelector('.popUp-about button');
    popupAbout.classList = 'popUp-about fadeEffect'
    popupAbout.style.opacity = 1;
    popup[0].style.display = 'block';
    popup[1].style.display = 'block';
    button.style.display = 'block';

   
    button.addEventListener('click',()=>{
        popupAbout.style.opacity = 0;
        popup[0].style.display = 'none';
        popup[1].style.display = 'none';
        button.style.display = 'none';
    })
})
/*In the previous code, all elements inside 
popupAbout div are disabled because the user has 
possibility to highlight text */
 
let signButton = document.querySelector('.sign');
signButton.addEventListener('click',(element)=>{
    let loginForm = document.querySelector('#login-form');
    loginForm.style.display = 'block';

    //leave popup with keyboard
    window.addEventListener('keydown',(element)=>{
        if(element.key === 'Escape')
        {
            loginForm.style.display = 'none';
        }
    })
    let X = document.querySelector('.close');
    X.addEventListener('click',()=>{
        loginForm.style.display = 'none';
    })
})