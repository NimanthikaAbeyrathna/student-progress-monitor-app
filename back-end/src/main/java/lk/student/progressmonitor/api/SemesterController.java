package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ResponceErrorDto;
import lk.student.progressmonitor.dto.Semester;
import lk.student.progressmonitor.dto.Year;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import javax.validation.Valid;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/semester")
@CrossOrigin
public class SemesterController {

    @Autowired
    private BasicDataSource pool;

    @PostMapping
    private ResponseEntity<?> saveSemester(@RequestBody @Valid Semester semester){

        try (Connection connection = pool.getConnection()) {

            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM semester WHERE semester = ?");
            checkStm.setInt(1, semester.getSemester());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // Semester already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Semester already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save
                PreparedStatement stm = connection.prepareStatement("INSERT INTO semester (semester) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
                stm.setInt(1, semester.getSemester());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    semester.setId(id);

                }
                return new ResponseEntity<>(semester, HttpStatus.CREATED);
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
    public ResponseEntity<?> getSemesters() {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM semester");

            ResultSet rst = stm.executeQuery();
            List<Semester> semesterList = new ArrayList<>();
            while (rst.next()) {
                int id = rst.getInt("id");
                int semester = rst.getInt("semester");

                semesterList.add(new Semester(id, semester));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", semesterList.size() + "");
            return new ResponseEntity<>(semesterList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
