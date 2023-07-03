package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grade {
    private int id;
    @NotEmpty(message = "Grade can't be null or empty")
    @Pattern(regexp = "([1-9]|1[0-3])", message = "Invalid grade")
    private int grade;
}
