window.addEventListener('input',(element)=>{
    //automatically creating a username
    let usernameInput = document.querySelector('#username');

    let nameValue = document.querySelector('#name').value;
    let surnameValue = document.querySelector('#surname').value;

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
})
