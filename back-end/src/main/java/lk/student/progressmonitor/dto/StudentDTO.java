package lk.student.progressmonitor.dto;

import lk.student.progressmonitor.util.Gender;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private String studentIndexNo;
    @NotBlank
    @Pattern(regexp = "[A-Za-z ]+")
        private String fullName;
    @NotBlank
    @Pattern(regexp = "[A-Za-z0-9 ]+")
    private String address;
//    @NotBlank
//    private String birthDay;

     private Gender gender;
    @NotBlank
    @Pattern(regexp = "[A-Za-z ]+")
     private String guaranteeName;
    @NotBlank
    @Pattern(regexp = "\\d{3}-\\d{7}")
     private String guaranteeContact;


//    public Date getParsedDate() {
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//        try {
//   java.util.Date parsedDate = format.  parse(String.valueOf(birthDay));
//            return new java.sql.Date(parsedDate.getTime());
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }
//
//
//    }
}
