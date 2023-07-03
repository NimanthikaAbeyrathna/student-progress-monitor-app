package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Semester {
    private int id;
    @NotEmpty(message = "Semester can't be null or empty")
    @Pattern(regexp = "[1-3]", message = "Invalid semester")
    private int semester;
}
