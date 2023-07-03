package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Year {
    private int id;
    @NotEmpty(message = "Year can't be null or empty")
    @Pattern(regexp = "\\d{4}", message = "Invalid year")
    private int year;
}
