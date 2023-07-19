package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ClassCode;
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
@RequestMapping("/classCode")
@CrossOrigin
public class ClassController {

    @Autowired
    private BasicDataSource pool;

    @PostMapping
    private ResponseEntity<?> saveClassCode(@RequestBody @Valid ClassCode classCode){

        try (Connection connection = pool.getConnection()) {

            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM class_code WHERE class_code = ?");
            checkStm.setString(1, classCode.getClassCode());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // class already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Class already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save
                PreparedStatement stm = connection.prepareStatement("INSERT INTO class_code (class_code) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
                stm.setString(1, classCode.getClassCode());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    classCode.setId(id);

                }
                return new ResponseEntity<>(classCode, HttpStatus.CREATED);
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
    public ResponseEntity<?> getClassCodes() {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM class_code");

            ResultSet rst = stm.executeQuery();
            List<ClassCode> classCodeList = new ArrayList<>();
            while (rst.next()) {
                int id = rst.getInt("id");
                String classCode = rst.getString("class_code");

                classCodeList.add(new ClassCode(id, classCode));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", classCodeList.size() + "");
            return new ResponseEntity<>(classCodeList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
