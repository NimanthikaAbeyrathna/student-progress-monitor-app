package lk.student.progressmonitor.dto;

import lk.student.progressmonitor.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

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
    @Pattern(regexp = "[A-Za-z0-9,./\\d ]+")
    private String address;
    private Gender gender;
    @NotBlank
    @Pattern(regexp = "[A-Za-z ]+")
    private String guaranteeName;
    @NotBlank
    @Pattern(regexp = "\\d{3}-\\d{7}")
    private String guaranteeContact;
    private String fileName;


}
