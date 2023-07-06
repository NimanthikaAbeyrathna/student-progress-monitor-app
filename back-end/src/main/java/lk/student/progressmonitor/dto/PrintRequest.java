package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrintRequest {
    @NotEmpty(message = "ID can't be null or empty")
    private  String printRequestId;
    private String printRequestClass;
    @NotNull(message = "year can't be null or empty")
    private int printRequestYear;
    @NotNull(message = "semester can't be null or empty")
    private int printRequestSemester;
    @NotNull(message = "grade can't be null or empty")
    private int printRequestGrade;

}
