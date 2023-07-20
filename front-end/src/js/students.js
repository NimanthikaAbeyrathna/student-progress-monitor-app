import $ from 'jquery';

const indexElm = $('#index');
const UserNameElm = $('#Uname');
const addressElm = $('#address');
const genderElms = $('input[name="gender"]');
const guaranteeNameElm = $('#Gname');
const guaranteeContactElm = $('#Gcontact');
const btnSave = $('#save');
const btnAddImg = $('#btnAddImg');
const imgInputElm = $('#fileInput');
const tableBodyElm = $('#tbody');
const tFootElm = $('#tFoot');
const searchElm = $('#search');
const tableElm = $('#tableElement');
const imgInput = $('#imgInput');
let x = [];
let update = false;
let imgUpload = false;
let btnSaveClick = false;
let getImage = false;
let deleteImage = true; // Flag to determine if the image should be deleted
let indexVariable;
let selectedFile;
let indexValue;
let response;
let updateFileName1;
let fileName;
let files;
let imgUrlIndex = [];
let tblElementIndex = [];


const inputElements = [indexElm, UserNameElm, addressElm, guaranteeNameElm, guaranteeContactElm];

addDataToTable();
getImageUrls();

$(window).on('resize', adjustTrashPosition);


$(document).on('click', '.trash', function (evt) {
    clearImage();
    deleteImage = true;
    $(this).remove();
});
tableBodyElm.on('click', '.delete', (evt) => {

    const idElm = $(evt.target).closest('tr').children().first();
    console.log(idElm);
    const idValue = idElm.text();
    deleteElements(idValue);
});


tableBodyElm.on('click', '.edit', (evt) => {
    update = true;
    deleteImage = false;
    console.log("update: " + update);
    const allTd = $(evt.target).closest('tr').children();

    allTd.each(function () {
        const element = $(this).text();
        x.push(element);
    });
    indexElm.val(x[0]);
    UserNameElm.val(x[1]);
    addressElm.val(x[2]);
    genderElms.filter(function () {
        return $(this).val() === x[3];
    }).prop('checked', true);
    guaranteeNameElm.val(x[4]);
    guaranteeContactElm.val(x[5]);

    updateElements(x[0])
    getUrl(x[0]);
    x.length = 0; // all element inside the array is deleted
});

searchElm.on("input", (evt) => {
    addDataToTable();
});


btnAddImg.on('click', (evt) => {
    imgUpload = true;
    deleteImage = false;
    imgInputElm.trigger('click');

});
btnSave.on('click', (evt) => {
    if (validation()) {
        btnSaveClick = true;
        imgInput.css({"background-image": `url()`});
        imgInput.find('.trash').remove();
    }

    if (!update) {
        sendData();

    } else {
        updateElements(indexVariable);
    }

});

window.addEventListener('beforeunload', function (event) {   //when refresh the page this listner start to workin

    if (deleteImage) {
        clearImage();
    }
});

imgInputElm.on('change', (evt) => {
    alert("ok1")
    imgUpload = true;
    files = evt.target.files;
    uploadImages(files);
});


inputElements.forEach(elements => {
    elements.on('input', (evt) => {
        elements.closest('.inputElm').find('.errorcode').remove();
    });
});

function validation() {
    let validate = true;

    inputElements.forEach(elements => {
        elements.closest('.inputElm').find('.errorcode').remove();
    });

    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    if (!studentIndexNo) {
        validate = addingErrorClass(indexElm, "Index can not be empty")
    } else if (!(/^S\d{3,}$/.test(studentIndexNo))) {
        validate = addingErrorClass(indexElm, "Please add correct format");
    }

    if (!fullName) {
        validate = addingErrorClass(UserNameElm, "User name can not be empty")
    } else if (!(/^[A-Za-z ]+$/.test(fullName))) {
        validate = addingErrorClass(UserNameElm, "Please add correct format");
    }

    if (!address) {
        validate = addingErrorClass(addressElm, "Address can not be empty")
    } else if (!(/^[A-Za-z,/.\d ]+$/.test(address))) {
        validate = addingErrorClass(addressElm, "Please add correct format");
    }

    if (!guaranteeName) {
        validate = addingErrorClass(guaranteeNameElm, "Guarantee name can not be empty")
    } else if (!(/^[A-Za-z ]+$/.test(guaranteeName))) {
        validate = addingErrorClass(guaranteeNameElm, "Please add correct format");
    }

    if (!guaranteeContact) {
        validate = addingErrorClass(guaranteeContactElm, "Guarantee contact can not be empty")
    } else if (!(/^\d{3}-\d{7}$/.test(guaranteeContact))) {
        validate = addingErrorClass(guaranteeContactElm, "Please add correct format");
    }
    return validate;
}


function addingErrorClass(element, message) {
    element.closest('.inputElm').append(`<div class="errorcode">${message}</div>`);
    element.addClass('animate__jello');
    return false;
}

function getImageUrls() {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const parse = JSON.parse(xhr.responseText);
            parse.forEach(element => {
                imgUrlIndex.push(element);
            })
        }
    });


    xhr.open("GET", "http://localhost:8080/app/students/imgUrl");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

}


function sendData() {
    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
    //  const birthday = birthdayElm.val();
    const genderElm = $('input[name="gender"]:checked').val()
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    const studentInformation = {
        studentIndexNo, fullName, address, gender: genderElm
        , guaranteeName, guaranteeContact, fileName
    };


    if (!validation()) return;
    // btnAddImg.removeAttr('disabled');
    // console.log("after validation");
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        // console.log(birthday);
        if (xhr.readyState === 4 && xhr.status === 201) {
            resetForm();
            addDataToTable();
            console.log("inside send data")
            showToast("success", "Saved", "Data has been saved")

            setTimeout(function () {  // if i dont add that toast not going to appear long period
                location.reload();
            }, 1000);

        } else {
            console.log(xhr.responseText);
        }
    });

    xhr.open('POST', 'http://localhost:8080/app/students/save', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(studentInformation));
}

function resetForm() {

    indexElm.val("");
    UserNameElm.val("");
    addressElm.val("");
    guaranteeNameElm.val("");
    guaranteeContactElm.val("");
}

function clearImgInput() {
    alert("ok");
    console.log("inside clrimgInput");
    tblElementIndex.forEach(element => {
        imgUrlIndex.forEach(urls => {
            if (element.toString() !== urls.toString()) {
                imgInputElm.val('');
            }
        })

    });
}

function addDataToTable() {

    const searchValue = searchElm.val();
    const query = (searchValue) ? `${searchValue}` : "";

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (evt) => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            tableBodyElm.empty();
            const responseObject = JSON.parse(xhr.responseText);
            if (responseObject.length) {
                tFootElm.remove();
            } else {
                tableElm.append(tFootElm);
            }


            responseObject.forEach(responses => {
                tblElementIndex.push(responses.studentIndexNo);
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

    xhr.open("GET", `http://localhost:8080/app/students?q=${query}`, true, query);
    xhr.send();
}

function addImages(url) {

    console.log("inside addImage")
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const responseUrls = JSON.parse(xhr.response);
            imgInput.css({
                "background-image": `url(${responseUrls[0]})`,
                "background-size": "cover",
                "background-repeat": "no-repeat"
            });
            imgInput.append(`<div class="trash"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></div>`)
        }
    });

    if (url == null) {
        xhr.open('GET', `http://localhost:8080/app/students/images?q=${fileName}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    } else if (url.length === 0) {
        console.log("inside add image if");
        imgInput.css({
            "background-image": "none",
            "background-size": "cover",
            "background-repeat": "no-repeat"
        });
        imgInput.children().remove();
    } else {
        xhr.open('GET', `http://localhost:8080/app/students/images?q=${url}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

    }

}

function getUrl(index) {

    indexValue = index;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            response = xhr.responseText;
            console.log(response.trim().length);
            if (response.trim().length === 0) {
                fileName = "";
                addImages(response);
            } else {
                addImages(response);
            }

        }
    });

    xhr.open('GET', `http://localhost:8080/app/students/url?q=${index}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function deleteElements(value) {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (evt) => {
        if (xhr.readyState === 4 && xhr.status === 204) {
            showToast("warning", "DELETE", "Selected data has been deleted");
            setTimeout(function () {  // if i dont add that toast not going to appear long period
                location.reload();
            }, 1000);
        }
    });

    xhr.open("DELETE", `http://localhost:8080/app/students/${value}`, true);
    xhr.send();

}

function updateElements(studentIndexNo) {

    indexVariable = studentIndexNo;
    console.log(indexVariable);

    const fullName = UserNameElm.val();
    const address = addressElm.val();
    const genderElm = $('input[name="gender"]:checked').val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();

    const studentDetails = {
        indexVariable,
        fullName,
        address,
        gender: genderElm,
        guaranteeName,
        guaranteeContact,
        fileName
    }
    console.log(studentDetails);
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.readyState === 4 && xhr.status === 202) {
            const responseObject = JSON.parse(xhr.responseText);
            updateFileName1 = responseObject.fileName;
            resetForm();
            showToast('success', 'Updated', 'Saved data has been updated');
            setTimeout(function () {  // if i dont add that toast not going to appear long period
                location.reload();
            }, 1000);
            addDataToTable();
            // if (getImage) {
            //     addImages(responseObject.fileName); // Fetch image using the updated file name
            // }
        }

    });

    if (update && btnSaveClick) {
        xhr.open("PATCH", `http://localhost:8080/app/students/${indexVariable}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(studentDetails));
    }

}

function showToast(toastType, header, message) {
    const toast = $("#toast .toast");
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

    setTimeout(function () {
        toast.removeClass('show');
    }, 2000);
}

function uploadImages(allFiles) {
    const formData = new FormData();
    const selectedFile = allFiles[0];

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.status === 201 && xhr.readyState === 4) {
            const url = xhr.responseText;
            fileName = url.substring(url.lastIndexOf('/') + 1);
            addImages();
        }

    });

    if (imgUpload) {
        formData.append('img', selectedFile);
        xhr.open("POST", "http://localhost:8080/app/students", true);
        xhr.send(formData);
    }
}

function deleteImageByFileName(fileName) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.status === 204 && xhr.readyState === 4) {
            imgInput.css({"background-image": "url()"});
            showToast("warning", "Deleted", "Image Successfully Deleted");
        }
    });

    xhr.open('DELETE', `http://localhost:8080/app/students/images/${fileName}`, true);
    xhr.send();
}

function deleteImageByURL(url) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', (evt) => {
        if (xhr.status === 204 && xhr.readyState === 4) {
            imgInput.css({"background-image": "url()"});
            showToast("warning", "Deleted", "Image Successfully Deleted");
        }
    });

    xhr.open('DELETE', `http://localhost:8080/app/students/url/${url}`, true);
    xhr.send();
}

function clearImage() {
    console.log("response length: " + response.length);

    if (response.length === 0) {
        deleteImageByFileName(fileName);
    } else {
        deleteImageByURL(response);
        deleteImageByFileName(indexValue);
    }
}

function adjustTrashPosition() {
    const imgInput = $('#imgInput');

    const trash = imgInput.find('.trash');

    const imgInputPosition = imgInput.position();
    const imgInputTop = imgInputPosition.top;
    const imgInputLeft = imgInputPosition.left;

    trash.css({
        top: (imgInputTop + 50) + 'px',
        left: (imgInputLeft + imgInput.width() + 100) + 'px'
    });
}




