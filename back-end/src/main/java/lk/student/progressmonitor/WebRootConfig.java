package lk.student.progressmonitor;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class WebRootConfig {

    @RequestScope
    @Bean
    public BasicDataSource dataSource(){
        BasicDataSource bds = new BasicDataSource();
        bds.setUsername("root");
        bds.setPassword("Gaya/123&1994");
        bds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        bds.setUrl("jdbc:mysql://localhost:3306/student_progress_monitor?createDatabaseIfNotExist=true");
        bds.setMaxTotal(50);
        bds.setInitialSize(10);
        return bds;
    }
}
