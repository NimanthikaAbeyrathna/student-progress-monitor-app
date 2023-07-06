import $ from 'jquery';

import {showToast} from "./main.js";

const yearSelection = $('#yearSelect');
const semesterSelection = $('#semesterSelect');
const gradeSelection = $('#gradeSelect');
const classSelection = $('#classSelect');
const subjectSelection = $('#subjectSelect');
const indexNoInputElm = $('#indexNoInput');
const marksInputElm = $('#marksInput');
const btnSave = $('#save');
const btnClear = $('#clear');
let updateStudentMarkId= null;

btnClear.on('click',(event)=>{
    btnSave.text('Save');
    getStudentMarks();
    updateStudentMarkId=null;
    indexNoInputElm.val('');
    marksInputElm.val('');
});

$('tbody').on('click', '.delete', (eventData)=> {

    const id =+$(eventData.target).parents("tr").children("td:first-child").text();
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status === 204) {
            showToast('success', 'Deleted', 'studentMark has been deleted successfully');
            $(eventData.target).parents("tr").remove();
            getStudentMarks();

        } else {
            showToast('error', 'Failed', 'Failed to delete the studentMark, try again!');
        }
    };
    xhr.open('DELETE', `http://localhost:8080/app/studentmark/${id}`,true);
    xhr.send();
});

$('tbody').on('click', '.edit', (eventData)=> {
    btnSave.text('Update')
    const tdList = $(eventData.target).parents("tr").children("td");
    const abc = [];
    for (const tdListElement of tdList) {
        abc.push($(tdListElement).text());
    }

    yearSelection.val(`${abc[1]}`);
    semesterSelection.val(`${abc[2]}`);
    gradeSelection.val(`${abc[3]}`);
    classSelection.val(`${abc[4]}`);
    subjectSelection.val(`${abc[5]}`);
    indexNoInputElm.val(`${abc[6]}`);
    marksInputElm.val(`${abc[7]}`);

    updateStudentMarkId = abc[0];
});


btnSave.on('click', () => {
    const year = yearSelection.val();
    const semester = semesterSelection.val();
    const grade = gradeSelection.val();
    const classCode = classSelection.val();
    const subject = subjectSelection.val();
    const studentIndexNo = indexNoInputElm.val().trim();
    const mark = marksInputElm.val().trim();

    if (/^.+$/.test(studentIndexNo)) {
        if (/^\d{1,3}$/.test(mark)) {
            const studentMark = {
                year: year,
                semester: semester,
                grade: grade,
                classCode: classCode,
                subject: subject,
                studentIndexNo: studentIndexNo,
                mark: mark
            };
            if (btnSave.text()==="Save"){
                const xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            yearSelection.val('');
                            semesterSelection.val('');
                            gradeSelection.val('');
                            classSelection.val('');
                            subjectSelection.val('');
                            indexNoInputElm.val('');
                            marksInputElm.val('');
                            yearSelection.focus();
                            location.reload();
                            showToast('success', 'Saved', 'student mark saved successfully');
                        } else {
                            const errorObj = JSON.parse(xhr.responseText);
                            showToast('error', 'Failed to save', errorObj.message);
                        }
                    }
                });
                xhr.open('POST', 'http://localhost:8080/app/studentmark', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(studentMark));
            }else {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {

                    if (xhr.status === 204) {
                        showToast('success', 'Updated', 'studentMark has been updated successfully');
                        btnSave.text('Save');
                        yearSelection.val('');
                        semesterSelection.val('');
                        gradeSelection.val('');
                        classSelection.val('');
                        subjectSelection.val('');
                        indexNoInputElm.val('');
                        marksInputElm.val('');
                        yearSelection.focus();
                        getStudentMarks();
                        updateStudentMarkId=null;

                    } else {
                        showToast('error', 'Failed', 'Failed to update the studentMark, try again!');
                    }
                };
                xhr.open('PATCH', `http://localhost:8080/app/studentmark/${updateStudentMarkId}`,true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(studentMark));
            }


        } else {
            mark.select();
            showToast('warning', 'please enter correct mark', undefined);
        }
    } else {
        studentIndexNo.select();
        showToast('warning', 'please enter correct student index no', undefined);
    }
});


function getStudentMarks() {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                $('tbody').empty();
                $('tfoot').hide();

                const studentMarkList = JSON.parse(xhr.responseText);

                studentMarkList.forEach(studentMark => {
                    $('table>tbody').append(` <tr>
                        <td scope="row">${studentMark.id}</td>
                        <td>${studentMark.year}</td>
                        <td>${studentMark.semester}</td>
                        <td>${studentMark.grade}</td>
                        <td>${studentMark.classCode}</td>
                        <td>${studentMark.subject}</td>
                        <td>${studentMark.studentIndexNo}</td>
                        <td>${studentMark.mark}</td>
                        <td >
                            <div class="actions d-flex gap-3 justify-content-center">
                                <svg data-bs-toggle="tooltip" data-bs-title="Edit Customer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-pencil-square edit" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                                <svg data-bs-toggle="tooltip" data-bs-title="Delete Customer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-trash delete" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>
                            </div>
                        </td>
                    </tr>`);
                });
                if (studentMarkList.length===0){
                    $('tfoot').show();
                }

            } else {

                $('tfoot').show();
                showToast('error', 'Failed', 'Failed to load student marks');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });
    const searchText = $("#searchInput").val().trim();

    const query = (searchText) ? `?q=${searchText}`: "";


    xhr.open('GET', `http://localhost:8080/app/studentmark${query}`, true);
    xhr.addEventListener('loadstart', ()=> $('tfoot').text('Please wait!'));
    xhr.addEventListener('loadend', ()=> $('tfoot').text('No studentMarks  are found!'));

    xhr.send();

}

getStudentMarks();
$("#searchInput").on('input',(event)=>{
    getStudentMarks();
});

function getYears() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                yearSelection.empty();
                const yearList = JSON.parse(xhr.responseText);

                yearList.forEach(year => {
                    yearSelection.append(`<option>${year.year}</option>`);
                });

                if (!yearList.length) {
                    yearSelection.append(`<option>Please enter years to show</option>`);
                }
            } else {
                yearSelection.empty();
                yearSelection.append(`<option>Please enter years to show</option>`);
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
                semesterSelection.empty();
                const semesterList = JSON.parse(xhr.responseText);
                semesterList.forEach(semester => {
                    semesterSelection.append(`<option>${semester.semester}</option>`);
                });

                if (!semesterList.length) {
                    semesterSelection.append(`<option>Please enter semesters to show</option>`);
                }
            } else {
                semesterSelection.empty();
                semesterSelection.append(`<option>Please enter semesters to show</option>`);
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
                gradeSelection.empty();
                const gradeList = JSON.parse(xhr.responseText);
                gradeList.forEach(grade => {
                    gradeSelection.append(`<option>${grade.grade}</option>`);
                });

                if (!gradeList.length) {
                    gradeSelection.append(`<option>Please enter grades to show</option>`);
                }
            } else {
                gradeSelection.empty();
                gradeSelection.append(`<option>Please enter grades to show</option>`);
                showToast('error', 'Failed', 'Failed to load grades');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/grade', true);

    xhr.send();
}

getGrade();

function getClass() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                classSelection.empty();
                const classList = JSON.parse(xhr.responseText);
                classList.forEach(classCode => {
                    classSelection.append(`<option>${classCode.classCode}</option>`);
                });

                if (!classList.length) {
                    classSelection.append(`<option>Please enter classes to show</option>`);
                }
            } else {
                classSelection.empty();
                classSelection.append(`<option>Please enter classes to show</option>`);
                showToast('error', 'Failed', 'Failed to load classes');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/classCode', true);

    xhr.send();
}

getClass();

function getSubjects() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                subjectSelection.empty();
                const subjectList = JSON.parse(xhr.responseText);
                subjectList.forEach(subject => {
                    subjectSelection.append(`<option>${subject.subject}</option>`);
                });

                if (!subjectList.length) {
                    subjectSelection.append(`<option>Please enter subjects to show</option>`);
                }
            } else {
                subjectSelection.empty();
                subjectSelection.append(`<option>Please enter subjects to show</option>`);
                showToast('error', 'Failed', 'Failed to load subjects');
                console.log(JSON.parse(xhr.responseText));
            }
        }
    });

    xhr.open('GET', 'http://localhost:8080/app/subject', true);

    xhr.send();
}

getSubjects();

