package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassCode {
    private  int id;
    @NotEmpty(message = "Class can't be null or empty")
    @Pattern(regexp = "[A-Z]", message = "Invalid class name")
    private String classCode;
}
