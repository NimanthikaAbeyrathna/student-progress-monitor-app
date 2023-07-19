package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subject {
    private int id;
    @NotEmpty(message = "Subject can't be null or empty")
    @Pattern(regexp = "\\w+", message = "Invalid subject")
    private String subject;
}
