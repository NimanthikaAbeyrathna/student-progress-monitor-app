import $ from 'jquery';


const eyeElm = $('#eye');
const passwordOuter=$('.form-floating icons');
const nameElm=$('#name');
const userNameElm=$('.userName');
const passwordElm=$('#passwordElement');
const btnSignUp=$('#signUp');
const outerFullName=$('#fullNameInput');
const outerUserName=$('#userNameInput');
const outerPassword=$('#passwordInput');


btnSignUp.on('click',(evt)=>{
    evt.preventDefault();
    sendData();

});
[nameElm,userNameElm,passwordElm].forEach(element=>{
    element.on('input',(evt)=>{
element.closest(".inputElm").find('.errorcode').remove();
    });
});

// functions

function validation(){
const fullName = nameElm.val();
const userName = userNameElm.val();
const password=passwordElm.val();

    let validate=true;

    nameElm.removeClass('animate__jello');
    userNameElm.removeClass('animate__jello');
    passwordElm.removeClass('animate__jello');
    [outerFullName,outerUserName,outerPassword].forEach(elements=>{
        elements.find(".errorcode").remove();
    })


    if(!fullName){
        validate=regEx(nameElm,outerFullName,"Name can not be empty");
    }else if(!(/^[A-Za-z ]+$/.test(fullName))){
        validate=regEx(nameElm,outerFullName,"Name includes only letters");
    }

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
    nameElm.val("");
    userNameElm.val("");
    passwordElm.val("");
}
function sendData(){

    const fullName = nameElm.val();
    const userName = userNameElm.val();
    const password=passwordElm.val();


    if(!validation()) return;

const information={
fullName,userName,password
}

const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange',()=>{

});

// xhr.open();

xhr.send(JSON.stringify(information));




}




