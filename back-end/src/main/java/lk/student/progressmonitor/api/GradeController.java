package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.Grade;
import lk.student.progressmonitor.dto.ResponceErrorDto;
import lk.student.progressmonitor.dto.Semester;
import lk.student.progressmonitor.dto.Year;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/grade")
@CrossOrigin
public class GradeController {

    @Autowired
    private BasicDataSource pool;

    @PostMapping
    private ResponseEntity<?> saveGrade(@RequestBody @Valid Grade grade){

        try (Connection connection = pool.getConnection()) {

            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM grade WHERE grade = ?");
            checkStm.setInt(1, grade.getGrade());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // Semester already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Grade already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save
                PreparedStatement stm = connection.prepareStatement("INSERT INTO grade (grade) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
                stm.setInt(1, grade.getGrade());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    grade.setId(id);

                }
                return new ResponseEntity<>(grade, HttpStatus.CREATED);
            }
        }catch (SQLException e){
            if (e.getSQLState().equals("23000")) {
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), e.getMessage()),
                        HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>(
                        new ResponceErrorDto(500, e.getMessage()),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


    }


    @GetMapping
    public ResponseEntity<?> getGrades() {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM grade");

            ResultSet rst = stm.executeQuery();
            List<Grade> gradeList = new ArrayList<>();
            while (rst.next()) {
                int id = rst.getInt("id");
                int grade = rst.getInt("grade");

                gradeList.add(new Grade(id, grade));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", gradeList.size() + "");
            return new ResponseEntity<>(gradeList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
