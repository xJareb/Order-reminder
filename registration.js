//universal function for creating error alert
const errorElement = (elementID,text) =>{

    let errorSign = document.createElement('div');
    errorSign.classList = 'error';
    let parrent = document.querySelector(`${elementID}`);
    parrent.appendChild(errorSign);
    errorSign.innerText = text;
}
let signUp = document.querySelector('.registration-container');
let rName = document.querySelector('#name');
let rSurname = document.querySelector('#surname');
let rUsername = document.querySelector('#username')

signUp.addEventListener('input',()=>{
    //automatically creating username
    if(rName.value !== '' || rSurname.value !== ''){
        rUsername.value = rName.value.toString() + '.' + rSurname.value.toString(); 
    }
    else if(rName.value === '' && rSurname.value === ''){
        rUsername.value = '';
    }
})