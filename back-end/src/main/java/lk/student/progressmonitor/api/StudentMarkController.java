package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ResponceErrorDto;
import lk.student.progressmonitor.dto.StudentMark;
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
@RequestMapping("/studentmark")
@CrossOrigin
public class StudentMarkController {
    @Autowired
    private BasicDataSource pool;

    @PostMapping
    public ResponseEntity<?> saveStudentMark(@RequestBody @Valid StudentMark studentMark) {

        try (Connection connection = pool.getConnection()){
            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM student_marks " +
                    "WHERE year = ? AND semester=? AND grade=? AND class_code=? AND subject=? AND " +
                    "student_index_no=? AND mark=?");
            checkStm.setInt(1, studentMark.getYear());
            checkStm.setInt(2, studentMark.getSemester());
            checkStm.setInt(3, studentMark.getGrade());
            checkStm.setString(4, studentMark.getClassCode());
            checkStm.setString(5, studentMark.getSubject());
            checkStm.setString(6, studentMark.getStudentIndexNo());
            checkStm.setInt(7, studentMark.getMark());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // student mark already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Student mark already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save
                PreparedStatement stm = connection.prepareStatement("INSERT INTO student_marks " +
                        "(year, semester, grade, class_code, subject, student_index_no, mark)VALUES (?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
                stm.setInt(1, studentMark.getYear());
                stm.setInt(2, studentMark.getSemester());
                stm.setInt(3, studentMark.getGrade());
                stm.setString(4, studentMark.getClassCode());
                stm.setString(5, studentMark.getSubject());
                stm.setString(6, studentMark.getStudentIndexNo());
                stm.setInt(7, studentMark.getMark());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    studentMark.setId(id);
                }
                return new ResponseEntity<>(studentMark, HttpStatus.CREATED);
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
    public ResponseEntity<?> getStudentMarks(@RequestParam(value = "q", required = false) String query) {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM student_marks WHERE id LIKE ? OR year LIKE ? OR semester LIKE ? OR grade LIKE ? OR class_code LIKE ? OR subject LIKE ? OR student_index_no LIKE ? OR mark LIKE ?");
            if (query != null){
                query = "%" + query + "%";

            }else {
                query = "%";

            }
            for (int i = 1; i <= 8; i++) {
                stm.setString(i, query);
            }


            ResultSet rst = stm.executeQuery();
            List<StudentMark> studentMarkList = new ArrayList<>();
            while (rst.next()) {

                int id = rst.getInt("id");
                int year= rst.getInt("year");
                int semester = rst.getInt("semester");
                int grade = rst.getInt("grade");
                String classCode = rst.getString("class_code");
                String subject = rst.getString("subject");
                String studentIndexNo = rst.getString("student_index_no");
                int mark = rst.getInt("mark");

                studentMarkList.add(new StudentMark(id, year, semester, grade, classCode, subject, studentIndexNo, mark));

            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", studentMarkList.size() + "");

            System.out.println("student mark list when searche"+studentMarkList);
            return new ResponseEntity<>(studentMarkList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudentMark(@PathVariable("id") int studentMarkId) {
        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("DELETE FROM student_marks WHERE id=?");
            stm.setInt(1, studentMarkId);
            int affectedRows = stm.executeUpdate();
            if (affectedRows == 1) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                ResponceErrorDto response = new ResponceErrorDto(404, "StudentMarkId ID Not Found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (SQLException e) {
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

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateStudentMark(@PathVariable("id") int studentMarkId,
                                            @RequestBody @Valid StudentMark studentMark) {
        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement
                    ("UPDATE student_marks SET year=?, semester=?, grade=?,class_code=?,subject=?,student_index_no=?,mark=? WHERE id=?");

            stm.setInt(1, studentMark.getYear());
            stm.setInt(2, studentMark.getSemester());
            stm.setInt(3, studentMark.getGrade());
            stm.setString(4, studentMark.getClassCode());
            stm.setString(5, studentMark.getSubject());
            stm.setString(6, studentMark.getStudentIndexNo());
            stm.setInt(7, studentMark.getMark());
            stm.setInt(8, studentMarkId);

            int affectedRows = stm.executeUpdate();
            if (affectedRows == 1) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                ResponceErrorDto error = new ResponceErrorDto(404, "studentMark ID not found");
                return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            }
        } catch (SQLException e) {
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

}
