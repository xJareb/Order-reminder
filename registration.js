//universal function for creating error alert
const errorElement = (elementID,text) =>{

    let errorSign = document.createElement('div');
    errorSign.classList = 'error';
    let parrent = document.querySelector(`${elementID}`);
    parrent.appendChild(errorSign);
    errorSign.innerText = text;
}
//creating a list of error alerts for password
const passwordElement = () => {
    let errorList = document.createElement('ul');
    errorList.classList = 'list';
    let parrent = document.querySelector('#passwordinput');
    parrent.appendChild(errorList);

    let ul = document.querySelector('.list');
    
    console.log(ul);
}
window.addEventListener('input',(element)=>{
    //automatically creating a username
    let usernameInput = document.querySelector('#username');

    let nameValue = document.querySelector('#name').value;
    let surnameValue = document.querySelector('#surname').value;
    let passwordValue = document.querySelector('#Password').value;
    console.log(passwordValue);

    let targetInput = element.target;
    let targetInputName = targetInput.getAttribute('name');

    switch (targetInputName) {
        case "name":
            usernameInput.value = (`${nameValue}.${surnameValue}`).toLocaleLowerCase();
            break;
        case "surname":
            usernameInput.value = (`${nameValue}.${surnameValue}`).toLocaleLowerCase();
            break;
    }
    
    // validation

    let errors = document.querySelectorAll('.error');

    const disableDuplication = ()=>{
        for (const error of errors) {
            error.remove();
        }
    }

    const lengthValidation = (element,input,length)=>{
        if(element.length < length){
            let text = `• The field must contain a minimum of ${length} characters`;
            errorElement(input,text)
            disableDuplication();
        }
        else{
            disableDuplication();
        }
    }

    switch (targetInputName) {
        case "name":
            lengthValidation(nameValue,'#nameinput',3);
        case "surname":
            lengthValidation(surnameValue,'#surnameinput',3);
        case "password":
            lengthValidation(passwordValue,'#passwordinput',7);
    }
})
passwordElement();