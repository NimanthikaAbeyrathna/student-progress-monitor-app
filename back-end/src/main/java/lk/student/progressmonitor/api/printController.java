package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.*;
import lk.student.progressmonitor.util.Gender;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/print")
@CrossOrigin
public class printController {

    @Autowired
    private BasicDataSource pool;

    @PostMapping
    public ResponseEntity<?> getPrint(@RequestBody @Valid PrintRequest printRequest) {
        System.out.println("printRequest=???"+printRequest);
        try (Connection connection = pool.getConnection()) {

            String requestStudentId = printRequest.getPrintRequestId();
            String requestClassCode = printRequest.getPrintRequestClass();
            int requestYear = printRequest.getPrintRequestYear();
            int requestSemester = printRequest.getPrintRequestSemester();
            int printRequestGrade = printRequest.getPrintRequestGrade();

            List<StudentMark> studentMarkList = new ArrayList<>();
            List<StudentMark> studentTotalMarkList = new ArrayList<>();
            StudentDTO student= new StudentDTO();

            PreparedStatement stm1 = connection.prepareStatement("SELECT * FROM student_marks WHERE student_index_no = ? AND  year=? AND semester=? AND grade=?");
            stm1.setString(1,requestStudentId);
            stm1.setInt(2,requestYear);
            stm1.setInt(3,requestSemester);
            stm1.setInt(4,printRequestGrade);

            ResultSet rst1 = stm1.executeQuery();

            while (rst1.next()) {

                int id = rst1.getInt("id");
                int year = rst1.getInt("year");
                int semester = rst1.getInt("semester");
                int grade = rst1.getInt("grade");
                String classCode = rst1.getString("class_code");
                String subject = rst1.getString("subject");
                String studentIndexNo = rst1.getString("student_index_no");
                int mark = rst1.getInt("mark");

                studentMarkList.add(new StudentMark(id, year,semester,grade,classCode,subject,studentIndexNo,mark));
            }

            PreparedStatement stm2 = connection.prepareStatement("SELECT * FROM student WHERE student_index_no=?");
            stm2.setString(1, requestStudentId);
            ResultSet rst2 = stm2.executeQuery();
            while (rst2.next()){
                String studentIndexNo = rst2.getString("student_index_no");
                String fullName = rst2.getString("fullName");
                String address = rst2.getString("address");
                String birthDay = rst2.getString("birthday");
                String genderString = rst2.getString("gender");
                Gender gender = Gender.valueOf(genderString);
                String guaranteeName = rst2.getString("guaranteeName");
                String guaranteeContact = rst2.getString("guaranteeContact");
                String url = rst2.getString("url");

                student = new StudentDTO(studentIndexNo,fullName,address,
                        birthDay,gender,guaranteeName,guaranteeContact,url);
            }

            PreparedStatement stm3 = connection.prepareStatement("SELECT student_index_no, SUM(mark) AS total_mark\n" +
                    "FROM student_marks\n" +
                    "WHERE year = ? AND semester = ? AND grade = ? AND class_code = ?\n" +
                    "GROUP BY student_index_no");
            stm3.setInt(1,requestYear);
            stm3.setInt(2,requestSemester);
            stm3.setInt(3,printRequestGrade);
            stm3.setString(4,requestClassCode);
            ResultSet rst3 = stm3.executeQuery();
            while (rst3.next()){
                String studentIndexNo = rst3.getString("student_index_no");
                int totalMark = rst3.getInt("total_mark");
                studentTotalMarkList.add(new StudentMark(studentIndexNo, totalMark));

            }


            ArrayList<Object> responseObject = new ArrayList<>();
            responseObject.add(studentMarkList);
            responseObject.add(student);
            responseObject.add(studentTotalMarkList);

            System.out.println("responce object =??????"+responseObject);
            System.out.println("student mark=???????????? "+studentMarkList);
            System.out.println("student=??????"+student);
            System.out.println("studenttotalmarklist=???????????"+studentTotalMarkList);

            return new ResponseEntity<>(responseObject,HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
