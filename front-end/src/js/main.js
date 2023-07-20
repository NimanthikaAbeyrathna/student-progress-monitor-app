import $ from 'jquery';
import {getReportDesignHTML} from "./report-design.js";

const yearInput = $('#yearInput');
const btnYear = $('#btnYearSave');
const semesterInput = $('#semesterInput');
const btnSemester = $('#btnSemesterSave');
const gradeInput = $('#gradeInput');
const btnGrade = $('#btnGradeSave');
const classCodeInput = $('#classCodeInput');
const btnClass = $('#btnClassSave');
const subjectNameInput = $('#subjectNameInput');
const btnSubject = $('#btnSubjectSave');
const printButton = $('#printButton');
const studentIdInputInPrint = $('#studentIdInput');
const classInputInPrint = $('#classInput');
const yearInput2InPrint = $('#yearInput2');
const semesterInputFieldInPrint = $('#semesterInputField');
const gradeInputFieldInPrint = $('#gradeInputField');




btnYear.on('click', () => {
    let year = yearInput.val().trim();
    if (/^\d{4}$/.test(year)) {
        year = +year;
        const yearObject = {
            year: year
        };
       const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    yearInput.val('');
                    yearInput.focus();
                    location.reload();
                    showToast('success', 'Saved', 'Year saved successfully');
                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    showToast('error', 'Failed to save', errorObj.message);
                    yearInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/year', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(yearObject));
    }else {
        yearInput.select();
        showToast('warning','please enter correct year',undefined)
    }
});


btnSemester.on('click', () => {
    let semester = semesterInput.val().trim();
    if (/^[123]$/.test(semester)) {
        semester = +semester;
        const semesterObject = {
            semester: semester
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    semesterInput.val('');
                    semesterInput.focus();
                    location.reload();
                    showToast('success', 'Saved', 'Semester saved successfully');
                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    showToast('error', 'Failed to save', errorObj.message);
                    semesterInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/semester', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(semesterObject));
    }else {
        semesterInput.select();
        showToast('warning', 'please enter correct semester', undefined);
    }
});

btnGrade.on('click', () => {

    let grade = gradeInput.val().trim();
    if (/^([1-9]|1[0-3])$/.test(grade)) {
        const gradeObject = {
            grade: grade
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    gradeInput.val('');
                    gradeInput.focus();
                    location.reload();
                    showToast('success', 'Saved', 'Grade saved successfully');
                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    showToast('error', 'Failed to save', errorObj.message);
                    gradeInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/grade', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(gradeObject));
    }else {
        gradeInput.select();
        showToast('warning', 'please enter correct grade', undefined);
    }
});
btnClass.on('click', () => {

    let classCode = classCodeInput.val().trim();
    if (/^[A-Z]$/.test(classCode)) {
        const classObject = {
            classCode: classCode
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    classCodeInput.val('');
                    classCodeInput.focus();
                    location.reload();
                    showToast('success', 'Saved', 'Class saved successfully');
                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    showToast('error', 'Failed to save', errorObj.message);
                    classCodeInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/classCode', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(classObject));
    }else {
        classCodeInput.select();
        showToast('warning', 'please enter correct class code', undefined);
    }
});

btnSubject.on('click', () => {

    let subject = subjectNameInput.val().trim();
    if (/^[A-Za-z ]+$/.test(subject)) {
        const subjectObject = {
            subject: subject
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    subjectNameInput.val('');
                    subjectNameInput.focus();
                    location.reload();
                    showToast('success', 'Saved', 'Subject name saved successfully');
                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    showToast('error', 'Failed to save', errorObj.message);
                    subjectNameInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/subject', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(subjectObject));
    }else {
        subjectNameInput.select();
        showToast('warning', 'please enter correct subject name', undefined);
    }
});

printButton.on('click', () => {
    const printRequestId = studentIdInputInPrint.val().trim();
    const printRequestClass = classInputInPrint.val().trim();
    const printRequestYear = yearInput2InPrint.val().trim();
    const printRequestSemester = semesterInputFieldInPrint.val().trim();
    const printRequestGrade = gradeInputFieldInPrint.val().trim();


        const printRequestObject = {
            printRequestId: printRequestId,
            printRequestClass: printRequestClass,
            printRequestYear: +printRequestYear,
            printRequestSemester: +printRequestSemester,
            printRequestGrade:+printRequestGrade
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    studentIdInputInPrint.val('');
                    classInputInPrint.val('');
                    yearInput2InPrint.val('');
                    semesterInputFieldInPrint.val('');
                    gradeInputFieldInPrint.val('');
                    studentIdInputInPrint.focus();

                    console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText));
                    const responseObject = JSON.parse(xhr.responseText);

                    const billWindow = open("", `_blank`, "popup=true,width=600");
                    billWindow.document.write(getReportDesignHTML(responseObject));

                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                   showToast('error', 'Failed to get details of the student', errorObj.message);
                    yearInput.select();
                }
            }
        });

        xhr.open('POST', 'http://localhost:8080/app/print', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(printRequestObject));

});

function getClass() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                classInputInPrint.empty();
                const classList = JSON.parse(xhr.responseText);
                classList.forEach(classCode => {
                    classInputInPrint.append(`<option>${classCode.classCode}</option>`);
                });

                if (!classList.length) {
                    classInputInPrint.append(`<option>Please enter classes to show</option>`);
                }
            } else {
                classInputInPrint.empty();
                classInputInPrint.append(`<option>Please enter classes to show</option>`);
                showToast('error', 'Failed', 'Failed to load classes');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/classCode', true);

    xhr.send();
}

getClass();

function getYears() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                yearInput2InPrint.empty();
                const yearList = JSON.parse(xhr.responseText);

                yearList.forEach(year => {
                    yearInput2InPrint.append(`<option>${year.year}</option>`);
                });

                if (!yearList.length) {
                    yearInput2InPrint.append(`<option>Please enter years to show</option>`);
                }
            } else {
                yearInput2InPrint.empty();
                yearInput2InPrint.append(`<option>Please enter years to show</option>`);
                showToast('error', 'Failed', 'Failed to load years');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/year', true);

    xhr.send();
}

getYears();

function getSemesters() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                semesterInputFieldInPrint.empty();
                const semesterList = JSON.parse(xhr.responseText);
                semesterList.forEach(semester => {
                    semesterInputFieldInPrint.append(`<option>${semester.semester}</option>`);
                });

                if (!semesterList.length) {
                    semesterInputFieldInPrint.append(`<option>Please enter semesters to show</option>`);
                }
            } else {
                semesterInputFieldInPrint.empty();
                semesterInputFieldInPrint.append(`<option>Please enter semesters to show</option>`);
                showToast('error', 'Failed', 'Failed to load semesters');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/semester', true);

    xhr.send();
}

getSemesters();

function getGrade() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                gradeInputFieldInPrint.empty();
                const gradeList = JSON.parse(xhr.responseText);
                gradeList.forEach(grade => {
                    gradeInputFieldInPrint.append(`<option>${grade.grade}</option>`);
                });

                if (!gradeList.length) {
                    gradeInputFieldInPrint.append(`<option>Please enter grades to show</option>`);
                }
            } else {
                gradeInputFieldInPrint.empty();
                gradeInputFieldInPrint.append(`<option>Please enter grades to show</option>`);
                showToast('error', 'Failed', 'Failed to load grades');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/grade', true);

    xhr.send();
}

getGrade();

export function showToast(toastType, header, message) {
    const toast = document.querySelector("#toast .toast");
    toast.classList.remove("text-bg-success", "text-bg-warning", "text-bg-danger");
    switch (toastType) {
        case 'success':
            toast.classList.add('text-bg-success');
            break;
        case 'warning':
            toast.classList.add('text-bg-warning');
            break;
        case 'error':
            toast.classList.add('text-bg-danger');
            break;
        default:
            break;
    }
    document.querySelector("#toast .toast-header > strong").textContent = header;
    document.querySelector("#toast .toast-body").textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
        toast.classList.remove('show');
    }, 5000);
}


$(document).ready(function () {
    // Get the logout link element
    const logoutLink = $('#logout-link');

    // Add a click event listener to the logout link
    logoutLink.on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: 'http://localhost:8080/app/api/v1/adding/logout', // Update the URL according to back end
            method: 'GET',
            success: function (response) {

                window.location.href = 'index.html';// Redirect the user to the login page
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

    });
});







