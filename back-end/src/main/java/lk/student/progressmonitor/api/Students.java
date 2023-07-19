package lk.student.progressmonitor.api;

import lk.student.progressmonitor.dto.StudentDTO;
import lk.student.progressmonitor.util.Gender;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.xml.SimpleTransformErrorListener;
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

         if(studentDTO.getFileName()!=null){

         PreparedStatement stm1 = connection.prepareStatement("INSERT INTO imageUrl (indexNumber, url) VALUES (?,?)");
         stm1.setString(1,studentDTO.getStudentIndexNo());
         stm1.setString(2,studentDTO.getFileName());
         stm1.executeUpdate();
         }
         return new  ResponseEntity<>(HttpStatus.CREATED);
     } catch (SQLException e) {
         e.printStackTrace();
         throw new RuntimeException(e);
     }
 }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveImageOfStudents(@RequestPart("img") List<Part> files, UriComponentsBuilder urlBuilder) {
        if (files != null && !files.isEmpty()) {
            Part imageFile = files.get(0);
            String imgDirectPath = servletContext.getRealPath("/images");
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
                String imageUrl = cloneBuilder.pathSegment("images", imageFile.getSubmittedFileName()).toUriString();
                System.out.println(imageUrl);
                return new ResponseEntity<>(imageUrl,HttpStatus.CREATED);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.badRequest().body("No image provided");
    }

    @GetMapping("/imgUrl")
    public ArrayList<String> getHasImage(){
      ArrayList<String> list= new ArrayList<>();
        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM imageUrl");
            ResultSet resultSet = stm.executeQuery();
            while (resultSet.next()){
                list.add(resultSet.getString("indexNumber"));
            }
            stm.close();
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }


    @GetMapping("/images")
    public ResponseEntity<?> getImage(@RequestParam(value = "q",required = false)String query ,UriComponentsBuilder uriComponentsBuilder) {
        String[] imgList = new String[1];
        String imgDirectParth = servletContext.getRealPath("/images");
        File filePath = new File(imgDirectParth);
        String[] imageNames = filePath.list();
        System.out.println("query: "+query);
        System.out.println("imageName: "+ imageNames);
        for (String imageName : imageNames) {
            System.out.println(imageName);
            if (query!=null  && query.equals(imageName)) {
                System.out.println("inside if");
                UriComponentsBuilder cloneBuilder = uriComponentsBuilder.cloneBuilder();
                String url = cloneBuilder.pathSegment("images", imageName).toUriString();
                imgList[0] = url;
                System.out.println("url" + imgList[0]);
                return new ResponseEntity<>(imgList, HttpStatus.OK);
            }

        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/images/{studentImage:.+}")
    public ResponseEntity<?> deleteImages(@PathVariable String studentImage){
        String imgDirectPath = servletContext.getRealPath("/images");
        File filePath = new File(imgDirectPath);
        String[] imageNames = filePath.list();

        if (imageNames != null) {
            for (String imageName : imageNames) {
                if (imageName.equals(studentImage)) {
                    File imgFile = new File(filePath, imageName);
                    boolean delete = imgFile.delete();

                    if (delete) {
                        // Delete the corresponding entry from the imageUrl table
                        try {
                            Connection connection = dataSource.getConnection();
                            PreparedStatement deleteUrlStm = connection.prepareStatement("DELETE FROM imageUrl WHERE url = ?");
                            deleteUrlStm.setString(1, studentImage);
                            deleteUrlStm.executeUpdate();
                            deleteUrlStm.close();
                            connection.close();
                        } catch (SQLException e) {
                            throw new RuntimeException(e);
                        }

                        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                    }
                }
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
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

                    StudentDTO studentDTO1 = new StudentDTO(indexNumber, fullName, address, genderAsDTO, guaranteeName, guaranteeContact,null);
                    studentList.add(studentDTO1);
                }
                return new ResponseEntity<>(studentList, HttpStatus.OK);

            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

    }

    @GetMapping("/url")
    public String getUrl(@RequestParam(value = "q",required = false)String query){
        String url="";
        System.out.println("query in url :"+query);
        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM imageUrl WHERE indexNumber=?");
            stm.setString(1,query);
            ResultSet resultSet = stm.executeQuery();
            if(resultSet.next()){
                     url = resultSet.getString("url");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return url;
    }


    @DeleteMapping("/url/{response}")
    public ResponseEntity<?> deleteImageFromUrl(@PathVariable String  response){

        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm = connection.prepareStatement("DELETE FROM imageUrl WHERE url=?");
            stm.setString(1,response);
            stm.executeUpdate();
            stm.close();
            connection.close();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{studentIndexNo}")
    public ResponseEntity<?> deleteAllStudents(@PathVariable String studentIndexNo ){


        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement stm3 = connection.prepareStatement("SELECT * FROM imageUrl WHERE indexNumber=?");
            stm3.setString(1,studentIndexNo);
            ResultSet resultSet = stm3.executeQuery();

            if(resultSet.next()){
                String url = resultSet.getString("url");
                if(url!=null){
                    deleteImages(url);
                }
            }

            resultSet.close();
            stm3.close();
            PreparedStatement stm1 = connection.prepareStatement("DELETE FROM imageUrl WHERE indexNumber=?");
            stm1.setString(1,studentIndexNo);
            stm1.executeUpdate();
            stm1.close();

            PreparedStatement stm = connection.prepareStatement("DELETE FROM student WHERE student_index_no=?");
            stm.setString(1,studentIndexNo);
            stm.executeUpdate();
            stm.close();

            connection.close();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @PatchMapping("/{studentIndexNo}")
    public ResponseEntity<?> updateStudents(@PathVariable String studentIndexNo , @RequestBody StudentDTO studentDTO){

        try {
            Connection connection = dataSource.getConnection();

//            PreparedStatement stm1 = connection.prepareStatement("SELECT *FROM imageUrl WHERE indexNumber=?");
//            stm1.setString(1,studentIndexNo);
//            ResultSet resultSet = stm1.executeQuery();
//            if(resultSet.next()){
//                String url = resultSet.getString("url");
//                studentDTO.setFileName(url);
//            }
//            stm1.close();

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

