package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrintRequest {
    private  String printRequestId;
    @NotEmpty(message = "class can't be null or empty")
    private String printRequestClass;
    @NotEmpty(message = "year can't be null or empty")
    private int printRequestYear;
    @NotEmpty(message = "semester can't be null or empty")
    private int printRequestSemester;
    @NotEmpty(message = "grade can't be null or empty")
    private int printRequestGrade;

}
