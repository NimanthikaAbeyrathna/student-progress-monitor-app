package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.ErrorDTO;
import lk.student.progressmonitor.dto.SignUpDTO;
import lombok.extern.flogger.Flogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import javax.validation.Valid;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/adding")
public class signUp {

    @Autowired
    private DataSource dataSource;

    @PostMapping(value = "/signUp", consumes = "application/json")
    public ResponseEntity<?> saveUsers(@RequestBody @Validated(SignUpDTO.SignUp.class) SignUpDTO signUpDTO){

        try {
            Connection connection = dataSource.getConnection();

            PreparedStatement stmExistUser = connection.prepareStatement("SELECT *FROM signUp WHERE userName=?");
            stmExistUser.setString(1,signUpDTO.getUserName());
            ResultSet rst = stmExistUser.executeQuery();
            System.out.println(rst.next());
            if(rst.next()) {
                System.out.println("inside if");
                return new ResponseEntity<>(new ErrorDTO(409,"User Name Already Exist"),HttpStatus.CONFLICT);
            }else {
                PreparedStatement stm = connection.prepareStatement("INSERT INTO signUp (fullName,userName,password) VALUES(?,?,?)");
                stm.setString(1,signUpDTO.getFullName());
                stm.setString(2,signUpDTO.getUserName());
                stm.setString(3,signUpDTO.getPassword());
                stm.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorDTO(500, "Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/login",consumes = "application/json")
    public ResponseEntity<?> checkLoginStatus(@RequestBody @Valid SignUpDTO signUpDTO, HttpServletRequest request){

        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("SELECT *FROM signUp WHERE userName=? and password=?");
            stm.setString(1,signUpDTO.getUserName());
            stm.setString(2,signUpDTO.getPassword());
            ResultSet resultSet = stm.executeQuery();
            if(!resultSet.next()){
                System.out.println(" if login");
             return new ResponseEntity<>(new ErrorDTO(400,"Access Denied"),HttpStatus.BAD_REQUEST) ;

            }else {
                HttpSession session = request.getSession();
                String id = session.getId();
                session.setAttribute("userName",signUpDTO.getUserName());

            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    @GetMapping("/logout")
    public void logOut(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session!=null){
            session.invalidate();
        }

    }

}
