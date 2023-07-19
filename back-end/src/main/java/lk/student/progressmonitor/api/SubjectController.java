package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ResponceErrorDto;
import lk.student.progressmonitor.dto.Subject;
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
@RequestMapping("/subject")
@CrossOrigin
public class SubjectController {
    @Autowired
    private BasicDataSource pool;

    @PostMapping
    public ResponseEntity<?> saveSubject(@RequestBody @Valid Subject subject) {

        try (Connection connection = pool.getConnection()){
            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM subject WHERE subject = ?");
            checkStm.setString(1, subject.getSubject());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // subject already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Subject name already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save

                PreparedStatement stm = connection.prepareStatement("INSERT INTO subject (subject)VALUES (?)", Statement.RETURN_GENERATED_KEYS);
                stm.setString(1, subject.getSubject());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    subject.setId(id);
                }
                return new ResponseEntity<>(subject, HttpStatus.CREATED);
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
    public ResponseEntity<?> getSubjects() {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM subject");

            ResultSet rst = stm.executeQuery();
            List<Subject> subjectList = new ArrayList<>();
            while (rst.next()) {
                int id = rst.getInt("id");
                String subject = rst.getString("subject");

                subjectList.add(new Subject(id, subject));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", subjectList.size() + "");
            return new ResponseEntity<>(subjectList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
