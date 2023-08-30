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

//list of errors that can be possible while registration
let errorList = {
    require : "This field is required",
    length: "This field must be longer than four characters",
    notNumber: "This field cannot contain numbers",
    notSpace: "This field cannot contain space",
    lengthpw: "This field must be longer than seven characters",
    uppercase: "This field must contain an uppercase letter",
    number : "This field must contain a number"
}