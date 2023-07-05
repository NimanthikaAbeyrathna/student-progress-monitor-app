import $ from 'jquery';

const indexElm=$('#index');
const UserNameElm=$('#Uname');
const addressElm=$('#address');
//const birthdayElm=$('#birthday');
 const genderElms=$('input[name="gender"]');
const guaranteeNameElm=$('#Gname');
const guaranteeContactElm=$('#Gcontact');
const btnSave=$('#save');
const btnAddImg=$('#btnAddImg');
const imgInputElm=$('#fileInput');
const tableBodyElm=$('#tbody');
const tFootElm=$('#tFoot');
const searchElm=$('#search');
const tableElm=$('#tableElement');
let x =[];
let update= false;
let imgUpload=false;
let btnSaveClick=false;
let indexVariable;
let imgFiles=[];


const inputElements=[indexElm,UserNameElm,addressElm,guaranteeNameElm,guaranteeContactElm];

addDataToTable();

tableBodyElm.on('click','.delete',(evt)=>{

    const idElm = $(evt.target).closest('tr').children().first();
    console.log(idElm);
    // console.log(idElm);
    const idValue = idElm.text();
    console.log(idValue);
    deleteElements(idValue);
});

tableBodyElm.on('click','.edit',(evt)=>{
update=true;
         const allTd = $(evt.target).closest('tr').children();

        allTd.each(function(){
           const element = $(this).text();
           x.push(element);
        });
        indexElm.val(x[0]);
        UserNameElm.val(x[1]);
        addressElm.val(x[2]);
    genderElms.filter(function() {
        return $(this).val() === x[3];
    }).prop('checked', true);
         guaranteeNameElm.val(x[4]);
        guaranteeContactElm.val(x[5]);

       updateElements( x[0])

        x.length=0; // all element inside the array is deleted
});

searchElm.on("input",(evt)=>{
    addDataToTable();
})

// $('input[name="gender"]').on('click', () => {
//     const genderElm = $('input[name="gender"]:checked');
//
// });
// listners

btnAddImg.on('click',(evt)=>{
imgInputElm.trigger('click');

});
btnSave.on('click',(evt)=>{
    btnSaveClick=true;
    if(!update){
        sendData();
    }else {
        console.log("inside else")
        updateElements(indexVariable);
    }

});

imgInputElm.on('change', (evt) => {
    imgUpload=true;
    let files = Array.from(evt.target.files);
    uploadImages(files);
});
console.log(imgFiles);

inputElements.forEach(elements=>{
    elements.on('input',(evt)=>{
        elements.closest('.inputElm').find('.errorcode').remove();
    });
});


function validation(){
    let validate=true;

    inputElements.forEach(elements=>{
        console.log("ok")
        elements.closest('.inputElm').find('.errorcode').remove();
    });

    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
 //   const birthday = birthdayElm.val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    if(!studentIndexNo){
        validate= addingErrorClass(indexElm,"Index can not be empty")
    }else if(!(/^S\d{3,}$/.test(studentIndexNo))){
        validate=addingErrorClass(indexElm,"Please add correct format");
    }

    if(!fullName){
        validate= addingErrorClass(UserNameElm,"User name can not be empty")
    }else if(!(/^[A-Za-z ]+$/.test(fullName))){
        validate=addingErrorClass(UserNameElm,"Please add correct format");
    }

    if(!address){
        validate= addingErrorClass(addressElm,"Address can not be empty")
    }else if(!(/^[A-Za-z ]+$/.test(address))){
        validate=addingErrorClass(addressElm,"Please add correct format");
    }
    //
    // // if(!birthday){
    // //     validate= addingErrorClass(birthdayElm,"Birthday can not be empty")
    //
    // }
    if(!guaranteeName){
        validate= addingErrorClass(guaranteeNameElm,"Guarantee name can not be empty")
    }else if(!(/^[A-Za-z ]+$/.test(guaranteeName))){
        validate=addingErrorClass(guaranteeNameElm,"Please add correct format");
    }

    if(!guaranteeContact){
        validate= addingErrorClass(guaranteeContactElm,"Guarantee contact can not be empty")
    }else if(!(/^\d{3}-\d{7}$/.test(guaranteeContact))){
        validate=addingErrorClass(guaranteeContactElm,"Please add correct format");
    }
return validate;
}

function addingErrorClass(element,message){
element.closest('.inputElm').append(`<div class="errorcode">${message}</div>`);
element.addClass('animate__jello');
return false;
}

function sendData(){
    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
  //  const birthday = birthdayElm.val();
   const genderElm=$('input[name="gender"]:checked').val()
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    const studentInformation={ studentIndexNo, fullName,address,gender:genderElm
        ,guaranteeName,guaranteeContact};


    if(!validation()) return;
console.log("after validation");
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange',()=>{
        // console.log(birthday);
        if(xhr.readyState===4 && xhr.status===201){
            resetForm();
           addDataToTable();
            showToast("success","Saved","Data has been saved")

        }else {
            // const errorObject = JSON.parse(xhr.responseText);
        }
    });

    xhr.open('POST','http://localhost:8080/app/students/save',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(studentInformation));
}

function resetForm(){

indexElm.val("");
UserNameElm.val("");
addressElm.val("");
//birthdayElm.val("");
    guaranteeNameElm.val("");
    guaranteeContactElm.val("");
}


function addDataToTable() {

const searchValue = searchElm.val();
  const query=  (searchValue)? `${searchValue}`:"";

    const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", (evt) => {
            if(xhr.status===200 && xhr.readyState===4) {
                tableBodyElm.empty();
                const responseObject = JSON.parse(xhr.responseText);
                if(responseObject.length){
                    tFootElm.remove();
                }else {
                    tableElm.append(tFootElm);
                }


                responseObject.forEach(responses => {
                    tableBodyElm.append(`
           <tr>
        <td scope="row">${responses.studentIndexNo}</td>
        <td>${responses.fullName}</td>
        <td>${responses.address}</td>
        <td>${responses.gender}</td>
        <td>${responses.guaranteeName}</td>
        <td>${responses.guaranteeContact}</td>

        <td>
            <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                 className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        
            <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3"
                 viewBox="0 0 16 16">
                <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </td>

    </tr>  
        `)
                });
            }

        });

        xhr.open("GET",`http://localhost:8080/app/students?q=${query}`,true,query);
        xhr.send();
}

function  deleteElements(value){

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange",(evt)=>{
        if(xhr.readyState===4 && xhr.status===204){
            showToast("warning","DELETE","Selected data has been deleted")

        }

    });

    xhr.open("DELETE",`http://localhost:8080/app/students/${value}`,true);
    xhr.send();

}

function updateElements(studentIndexNo){

     indexVariable=studentIndexNo;
    console.log(indexVariable);

    const fullName = UserNameElm.val();
    const address = addressElm.val();
    const genderElm=$('input[name="gender"]:checked').val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    const studentDetails={indexVariable,fullName,address,gender:genderElm,guaranteeName,guaranteeContact}
    console.log(studentDetails);

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange',(evt)=>{
            if(xhr.readyState===4 && xhr.status===202){
                const responseObject = JSON.parse(xhr.responseText);
                resetForm();
                showToast('success','Updated','Saved data has been updated');
                console.log(btnSaveClick);
               addDataToTable();
            }

    });

   if(update && btnSaveClick){
       console.log(update);
       console.log(btnSaveClick);
       xhr.open("PATCH",`http://localhost:8080/app/students/${indexVariable}`, true);
       xhr.setRequestHeader('Content-Type', 'application/json');
       xhr.send(JSON.stringify(studentDetails));
   }

}
function showToast(toastType, header, message) {
    const toast =$("#toast .toast");
    toast.removeClass("text-bg-success", "text-bg-warning", "text-bg-danger");
    switch (toastType) {
        case 'success':
            toast.addClass('text-bg-success');
            break;
        case 'warning':
            toast.addClass('text-bg-warning');
            break;
        case 'error':
            toast.addClass('text-bg-danger');
            break;
        default:

    }
    $("#toast .toast-header > strong").text(header);
    $("#toast .toast-body").text(message);
    toast.addClass('show');

    setTimeout(function() {
        toast.removeClass('show');
    }, 2000);
}

function  uploadImages(allFiles){

    const formData = new FormData;
   const selectedFile = allFiles[0];
    formData.append("img",selectedFile);


    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange',(evt)=>{
        if(xhr.readyState===4 && xhr.status===201){
            const listOfImageUrls = JSON.parse(xhr.responseText);


        }

      });

        if(imgUpload && btnSaveClick){
            xhr.open("POST","http://localhost:8080/app/students",true);
            xhr.send(formData);
        }


}