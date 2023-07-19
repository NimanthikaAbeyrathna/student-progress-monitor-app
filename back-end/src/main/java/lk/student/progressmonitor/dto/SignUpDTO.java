package lk.student.progressmonitor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.groups.Default;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDTO {

    @NotBlank(groups =SignUp.class )
    @Pattern(regexp ="[A-Za-z ]+",groups = SignUp.class)
    private String fullName;
    @NotBlank
    private String userName;
    @NotBlank
    @Length(min = 5)
    private String password;

   public interface SignUp extends Default{}
}
