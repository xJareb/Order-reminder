let signUp = document.querySelector('.registration-container');

let rName = document.querySelector('#name');
let rSurname = document.querySelector('#surname');
let rUsername = document.querySelector('#username')

signUp.addEventListener('input',()=>{
    //automatically creating username
    if(rName.value !== '' || rSurname.value !== ''){
        rUsername.value = (rName.value.toString() + '.' + rSurname.value.toString()).toLowerCase(); 
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
            //registrationHeight -= 22;
            //signUp.style.height = registrationHeight + "px";
        }
    })
});

//populating registration data to API
 
let regbtn = signUp.querySelector('form button');

regbtn.addEventListener('click',()=>{
    let bodyInputs = document.querySelectorAll('.registration');
    let countErrors = 0;
    let countEmptyInputs = 4;
    bodyInputs.forEach(element => {
        let errors = element.querySelectorAll('ul li');
        let inputs = element.querySelector('input').value;
        //check how many fields are not empty
        if(inputs !== ""){
            countEmptyInputs--;
        }
        if(errors.length === 0){
            countErrors++;
        }
    });
    //disable populating data to API with errors or empty fields
    if(countErrors === 4 && countEmptyInputs === 0){
        
            let newObj = {
                name: document.querySelector('#name').value,
                surname: document.querySelector('#surname').value,
                password: document.querySelector('#Password').value,
                username: document.querySelector('#username').value
            }
            //console.log(data);

            let strJson = JSON.stringify(newObj);

            fetch("https://64d8d8bf5f9bf5b879ce9e35.mockapi.io/users", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: strJson,
        })
            .then((r) => {

                r.json().then(x => {
                    window.location.href = "menu.html";
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else{
            alert('Please check your fields. You might have left some of the areas empty or made the wrong input')
        }
})