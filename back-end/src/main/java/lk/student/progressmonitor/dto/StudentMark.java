package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentMark {
    private int id;
    @NotNull(message = "Year can't be empty or null")
    private int year;
    @NotNull(message = "Semester can't be empty or null")
    private int semester;
    @NotNull(message = "Grade can't be empty or null")
    private int grade;
    @NotNull(message = "Class code can't be empty or null")
    private String classCode;
    @NotNull(message = "Subject can't be empty or null")
    private String subject;
    @NotNull(message = "Student Index no can't be empty or null")
    private String studentIndexNo;
    @NotNull(message = "Marks can't be empty or null")
    @Min(value = 0, message = "mark can't be a negative value")
    private int mark;

    public StudentMark(String studentIndexNo, int mark) {
        this.studentIndexNo = studentIndexNo;
        this.mark = mark;
    }
}
