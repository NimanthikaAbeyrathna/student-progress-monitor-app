package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.StudentDTO;
import lk.student.progressmonitor.util.Gender;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.RequestPart;
import org.w3c.dom.ls.LSInput;

import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class Students {

    @Autowired
    private BasicDataSource dataSource;
    @Autowired
    private ServletContext servletContext;

 @PostMapping(value = "/save" ,consumes ="application/json" )
    public ResponseEntity<?> saveAllStudents(@RequestBody @Valid StudentDTO studentDTO){

     try {
         Connection connection = dataSource.getConnection();
         PreparedStatement stm = connection.prepareStatement("INSERT INTO student (student_index_no, fullName, address, gender, guaranteeName, guaranteeContact) VALUES (?,?,?,?,?,?)");
         stm.setString(1,studentDTO.getStudentIndexNo());
         stm.setString(2,studentDTO.getFullName());
         stm.setString(3,studentDTO.getAddress());
        // stm.setDate(4,studentDTO.getParsedDate());
         stm.setString(4, String.valueOf(studentDTO.getGender()));
         stm.setString(5,studentDTO.getGuaranteeName());
         stm.setString(6,studentDTO.getGuaranteeContact());
         stm.executeUpdate();
        return new  ResponseEntity<>(HttpStatus.CREATED);
     } catch (SQLException e) {
         e.printStackTrace();
         throw new RuntimeException(e);
     }
 }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<String> saveImageOfStudents(@RequestPart("img")List<Part> Files, UriComponentsBuilder urlBuilder){
        ArrayList<String> imageUrlList=new ArrayList<>();


        if (Files != null) {
            String imgDirectPath = servletContext.getRealPath("/images");
            for (Part imageFile : Files) {
                String imageFilePath = new File(imgDirectPath, imageFile.getSubmittedFileName()).getAbsolutePath();
                File fileDir = new File(imgDirectPath);



                if (!fileDir.exists()) {
                    if (fileDir.mkdirs()) {
                        System.out.println("Directory created successfully: " + fileDir.getAbsolutePath());
                    } else {
                        System.out.println("Failed to create the directory: " + fileDir.getAbsolutePath());

                    }
                }

                try {
                    imageFile.write(imageFilePath);
                    UriComponentsBuilder cloneBuilder = urlBuilder.cloneBuilder();
                    String imageUrl = cloneBuilder.
                            pathSegment("images", imageFile.getSubmittedFileName()).toUriString();//images== place where image store
                    imageUrlList.add(imageUrl);

                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }
        return imageUrlList;
    }





    @GetMapping
    public ResponseEntity<?> getAllStudents(@RequestParam(value = "q",required = false)String query) {

        System.out.println(query);

            try {
                Connection connection = dataSource.getConnection();
                PreparedStatement stm = connection.prepareStatement("SELECT *FROM student WHERE student_index_no LIKE ? OR fullName LIKE ? OR  address LIKE ? OR  gender LIKE ? OR student.guaranteeName LIKE ? OR guaranteeContact LIKE ?");
                if(query!=null) {
                    for (int i = 1; i <=6; i++) {
                        stm.setString(i, "%" + query + "%");
                    }
                }
                else  {
                    for (int i = 1; i <=6; i++) {
                        stm.setString(i, "%");  //---------use this as empty stirng
                    }
                }
                ResultSet rst = stm.executeQuery();

                List<StudentDTO> studentList = new ArrayList<>();
                while (rst.next()) {

                    String indexNumber = rst.getString("student_index_no");
                    String fullName = rst.getString("fullName");
                    String address = rst.getString("address");
                    String gender = rst.getString("gender");
                    Gender genderAsDTO = Gender.valueOf(gender);
                    String guaranteeName = rst.getString("guaranteeName");
                    String guaranteeContact = rst.getString("guaranteeContact");

                    StudentDTO studentDTO1 = new StudentDTO(indexNumber, fullName, address, genderAsDTO, guaranteeName, guaranteeContact);
                    studentList.add(studentDTO1);
                }
                return new ResponseEntity<>(studentList, HttpStatus.OK);

            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

    }


    @DeleteMapping("/{studentIndexNo}")
    public ResponseEntity<?> deleteAllStudents(@PathVariable String studentIndexNo ){

        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("DELETE FROM student WHERE student_index_no=?");
            stm.setString(1,studentIndexNo);
            stm.executeUpdate();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @PatchMapping("/{studentIndexNo}")
    public ResponseEntity<?> updateStudents(@PathVariable String studentIndexNo , @RequestBody StudentDTO studentDTO){

        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("UPDATE student  SET fullName=?,address=?,gender=?,guaranteeName=?,guaranteeContact=? WHERE student_index_no=?");
            stm.setString(1,studentDTO.getFullName());
            stm.setString(2,studentDTO.getAddress());
            stm.setString(3, String.valueOf(studentDTO.getGender()));
            stm.setString(4, studentDTO.getGuaranteeName());
            stm.setString(5,studentDTO.getGuaranteeContact());
            stm.setString(6,studentIndexNo);

            stm.executeUpdate();
            stm.close();
            connection.close();

            return new ResponseEntity<>(studentDTO,HttpStatus.ACCEPTED);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

