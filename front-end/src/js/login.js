import $ from "jquery";


const userNameElm=$('.userName');
const passwordElm=$('#passwordElement');
const btnLogin=$('#login');
const outerUserName=$('#userNameInput');
const outerPassword=$('#passwordInput');


btnLogin.on('click',(evt)=>{
    evt.preventDefault();
    sendData();

});
[userNameElm,passwordElm].forEach(element=>{
    element.on('input',(evt)=>{
        element.closest(".inputElm").find('.errorcode').remove();
    });
});

// functions

function validation(){

    const userName = userNameElm.val();
    const password=passwordElm.val();

    let validate=true;

    userNameElm.removeClass('animate__jello');
    passwordElm.removeClass('animate__jello');
    [outerUserName,outerPassword].forEach(elements=>{
        elements.find(".errorcode").remove();
    });

    if(!userName){
        validate =regEx(userNameElm,outerUserName,"User name can not be empty");
    }else if(!(/^[A-Za-z0-9 ]+$/.test(userName))){
        validate =regEx(userNameElm,outerUserName,"User Name contain only letters and numbers");
    }

    if(!password){
        validate =regEx(passwordElm,outerPassword,"Password can not be empty");
    } else if (!(/.{5,}/.test(password))){
        validate = regEx(passwordElm,outerPassword,"Password length is not enough");
    }

    return validate;
}
function regEx(inputElm,outerElm,error){
    inputElm.addClass('animate__jello');
    outerElm.append(`<div class="errorcode">${error}</div>`)
    return false;
}

function resetForm(){

    userNameElm.val("");
    passwordElm.val("");
}
function sendData(){


    const userName = userNameElm.val();
    const password=passwordElm.val();


    if(!validation()) return;

    const information={
        userName,password
    }

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange',()=>{

    });

// xhr.open();

    xhr.send(JSON.stringify(information));




}