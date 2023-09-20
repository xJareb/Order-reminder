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
//validation

let inputs = document.querySelectorAll('.registration input');

let errors = {
    "name" : [],
    "surname":[],
    "password":[]
}

inputs.forEach(element => {
    element.addEventListener('change', e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

        let notNumberValidation = () =>{
            let regex = /[0-9]/
            let validation = inputValue.trim();
            if(validation.match(regex))
            {
                errors[inputName].push('This field cannot contain number');
            }
        }
        let notSpaceValidation = () =>{
            let space = /[ ]/;
            if(inputValue.match(space)){
                errors[inputName].push('This field cannot contain space');
            }
        }
        if(inputName !== 'password'){
        if(inputValue.length > 4){
            errors[inputName] = [];
            
            switch (inputName) {
                case "name":
                    notNumberValidation();
                    notSpaceValidation();
                    break;
                case "surname":
                    notNumberValidation();
                    notSpaceValidation();
                    break;
                default:
                    break;
            }
        }
        else{
            errors[inputName] = ['This field must contain more than three character']
        }}
        else{
            if(inputValue.length > 7)
            {
                errors[inputName] = [];
                let uppercaseLetter = /[A-Z]/;
                if(!inputValue.match(uppercaseLetter)){
                    errors[inputName].push('This field must contain an uppercase letter')
                }
                let number = /[0-9]/;
                if(!inputValue.match(number))
                {
                    errors[inputName].push('This field must contain a number')
                }
                notSpaceValidation();
            }
            else{
                errors[inputName] = ['This field must contain more than seven character']
            }
        }
        populateErrors();
        
    })
});

const populateErrors = () =>{

    for (const element of document.querySelectorAll('ul')) {
        element.remove();
    }

    for (const key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);

        errors[key].forEach(error => {
            let li = document.createElement('li');
            li.innerText = error;

            errorsElement.appendChild(li);
        });
    }
}

//responsive registration form

//Part of the code used to take out the height of the registration div
signUp.style.display = 'block';
let registrationHeight = signUp.offsetHeight;
console.log(registrationHeight);
signUp.style.display = 'none';

let tempErrorLocal;

//current number of errors
inputs.forEach(element => {
    element.addEventListener('click',(e)=>{
        let numError = e.target.parentElement.querySelectorAll('li');
        tempErrorLocal = numError.length;
    })
});

let tempErrorList = 0;
let tempErrorName = "";

inputs.forEach(element => {
    element.addEventListener('change',(e)=>{
        let parentElement = e.target.parentElement;
        let errorList = parentElement.querySelectorAll('li');
        let errorListLength = errorList.length;

        let elementName = e.target.getAttribute('name');

        if(errorListLength > 0){
            if(tempErrorName !== ""){
                if(elementName !== tempErrorName){
                    
                   tempErrorList = tempErrorLocal;
                }
            }
            //used two variables to create an "event" changing the height
            if(errorListLength > tempErrorList)
            {
                registrationHeight += 22;
            }
            else{
                registrationHeight -= 22;
            }
            signUp.style.height = registrationHeight + "px";
            tempErrorList = errorListLength;
            tempErrorName = elementName;
        }
        else{
            registrationHeight -= 22;
            signUp.style.height = registrationHeight + "px";
        }
    })
});
