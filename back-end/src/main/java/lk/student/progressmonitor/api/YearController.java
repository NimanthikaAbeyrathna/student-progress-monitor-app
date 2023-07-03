package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ResponceErrorDto;
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
@RequestMapping("/year")
@CrossOrigin
public class YearController {
    @Autowired
    private BasicDataSource pool;

    @PostMapping
    public ResponseEntity<?> saveYear(@RequestBody @Valid Year year) {

        try (Connection connection = pool.getConnection()){
            PreparedStatement checkStm = connection.prepareStatement("SELECT * FROM year WHERE year = ?");
            checkStm.setInt(1, year.getYear());
            ResultSet resultSet = checkStm.executeQuery();

            if (resultSet.next()) {
                // year already exists, return a response with an error message
                return new ResponseEntity<>(
                        new ResponceErrorDto(HttpStatus.CONFLICT.value(), "Year already exists"),
                        HttpStatus.CONFLICT);
            }else {
                //if does not exist save

                PreparedStatement stm = connection.prepareStatement("INSERT INTO year (year)VALUES (?)", Statement.RETURN_GENERATED_KEYS);
                stm.setInt(1, year.getYear());
                stm.executeUpdate();
                ResultSet generatedKeys = stm.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    year.setId(id);
                }
                return new ResponseEntity<>(year, HttpStatus.CREATED);
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
    public ResponseEntity<?> getYears() {

        try (Connection connection = pool.getConnection()) {
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM year");

            ResultSet rst = stm.executeQuery();
            List<Year> yearList = new ArrayList<>();
            while (rst.next()) {
                int id = rst.getInt("id");
                int year = rst.getInt("year");

                yearList.add(new Year(id, year));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Count", yearList.size() + "");
            System.out.println(yearList);
            return new ResponseEntity<>(yearList, headers, HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponceErrorDto(500, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
