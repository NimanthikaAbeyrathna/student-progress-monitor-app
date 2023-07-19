import $ from 'jquery';


export function getReportDesignHTML(responseObject) {
    const studentMarkList = responseObject[0];
    const student = responseObject[1];
    const studentTotalMarkList = responseObject[2];
    const studentImageUrl = responseObject[3];

    let sumOfMarks = 0;
    for (let i = 0; i < studentMarkList.length; i++) {
        sumOfMarks += studentMarkList[i].mark;
    }

    const maximumTotalMark = studentTotalMarkList.reduce((maxMark, mark) => {
        return Math.max(maxMark, mark.mark);
    }, 0);

    studentTotalMarkList.sort((a, b) => b.mark - a.mark);

    return `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./scss/report-styles.scss">
  <title>Report</title>
  <style>
    *{
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      margin-bottom: 20px;
      background-color: grey;

    }
    #bill{
      font-size: 10px;
      background-color: white;
      width: 148mm;
      height: 210mm;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 10px;
      padding: 10px;
    }
    #billContainer{
      position: relative;
      left: 75px;
      transform: translateX(-30px);
    }
    #headerElm{
      display: flex;
      width: 100%;
      justify-content: center;

    }
    #schoolBadgeElm {
      width: 50px;
      height: 60px;

    }
    #schoolBadgeElm >img{
       height: 100%;
       width: 100%; 
    }
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    #studentImageElm{
      width: 100px;
      height: 120px;
      position: relative;
      left: 40%;
      transform: translateX(-40%);
    }
    #studentImageElm>img{
        width: 100%;
        height: 100%;
    }
    .labelContainer{
      display: flex;
      width: 100%;
    }
    .label {
      font-weight: bold;
      text-align: left;
      margin-bottom: 5px;
      width: 100%;
    }

    .data {
      margin-bottom: 5px;
      text-align: left;
      width: 100%;
    }

    table {
      width: 80%;
      border-collapse: collapse;
      margin-bottom: 20px;
      position: relative;

    }
    table th{
      padding: 5px;
      text-align: center;
      border: 1px solid #ccc;
    }

    table td {
      padding: 5px;
      text-align: left;
      border: 1px solid #ccc;
    }
    .height{
      height:30px;
    }


  </style>
</head>
<body>
<div id="bill">
  <div id="billContainer">
    <div id="headerElm">
      <div id="schoolBadgeElm"><img src="https://png.pngtree.com/png-vector/20230217/ourmid/pngtree-education-logo-and-school-badge-design-template-png-image_6604397.png" alt="#"></div>
      <h1>K/Pushpadana Girl's collage</h1>
    </div>
    <br>
    <br>
    <div id="studentImageElm"><img src="${studentImageUrl}" alt="#"></div>
    <br>
    <br>
    <div class="labelContainer">
      <label class="label" for="indexNoElm">Index No</label>
      <div class="data" id="indexNoElm">${student.studentIndexNo}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="fullNameElm">Full Name</label>
      <div class="data" id="fullNameElm">${student.fullName}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="addressElm">Address</label>
      <div class="data" id="addressElm">${student.address}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="guaranteeNameElm">Gurantee Name</label>
      <div class="data" id="guaranteeNameElm">${student.guaranteeName}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="guaranteeContactElm">Gurantee Contact</label>
      <div class="data" id="guaranteeContactElm">${student.guaranteeContact}</div>
    </div>

    <div class="labelContainer">
      <label class="label" for="yearElm">Year</label>
      <div class="data" id="yearElm">${studentMarkList[0].year}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="semesterElm">Semester</label>
      <div class="data" id="semesterElm">${studentMarkList[0].semester}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="gradeElm">Grade</label>
      <div class="data" id="gradeElm">${studentMarkList[0].grade}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="classElm">Class</label>
      <div class="data" id="classElm">${studentMarkList[0].classCode}</div>
    </div>
    <br>
    <br>
    <table>
      <thead>
          <tr>
            <th>Subject</th>
            <th>marks(%)</th>
          </tr>
      </thead>
      <tbody>
         ${generateRows(studentMarkList)}
      </tbody>
    </table>
    <div class="labelContainer">
      <label class="label" for="totalMarksElm">Total marks</label>
      <div class="data" id="totalMarksElm">${sumOfMarks}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="averageMarksElm">Average marks</label>
      <div class="data" id="averageMarksElm">${sumOfMarks / studentMarkList.length}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="maxAverageMarksElm">Max average marks of the class</label>
      <div class="data" id="maxAverageMarksElm">${maximumTotalMark / studentMarkList.length}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="numberOfStudentInClassElm">Number of the students in the class</label>
      <div class="data" id="numberOfStudentInClassElm">${studentTotalMarkList.length}</div>
    </div>
    <div class="labelContainer">
      <label class="label" for="studentPositionElm">Student position of the class</label>
      <div class="data" id="studentPositionElm">${getPosition(studentTotalMarkList, student.studentIndexNo) + 1}</div>
    </div>
    <br>
    <br>
    <div class="labelContainer height">
      <label class="label">Principal sign :</label>
      <div class="data">-------------------</div>
      <div class="label">date :</div>
      <div class="data">-------------------</div>
    </div>
    <div class="labelContainer height">
      <label class="label">Class teacher sign :</label>
      <div class="data">-------------------</div>
      <div class="label">date :</div>
      <div class="data">-------------------</div>
    </div>
    <div class="labelContainer height">
      <label class="label">Guarantee sign :</label>
      <div class="data">-------------------</div>
      <div class="label">date :</div>
      <div class="data">-------------------</div>
    </div>
  </div>

</div>
</body>
</html>
    `;
}

function getPosition(studentTotalMarkList,studentIndexNo){
    return  studentTotalMarkList.findIndex(student => student.studentIndexNo === studentIndexNo);
}
function generateRows(studentMarkList){
    let html = '';
    studentMarkList.forEach((studentMark, index) => {
        html += `
          <tr>
            <td>${studentMark.subject}</td>
            <td>${studentMark.mark}</td>
          </tr>
          `;
    });
    return html;
}

