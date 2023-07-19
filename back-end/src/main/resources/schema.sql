CREATE TABLE IF NOT EXISTS signUp(
    userName VARCHAR(50) PRIMARY KEY NOT NULL ,
    fullName VARCHAR(100) NOT NULL ,
    password VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS student(

    student_index_no  VARCHAR(100) PRIMARY KEY NOT NULL,
    fullName VARCHAR(200) NOT NULL ,
    address VARCHAR(250) NOT NULL ,
    gender ENUM ('MALE','FEMALE') NOT NULL ,
    guaranteeName VARCHAR(100) NOT NULL ,
    guaranteeContact VARCHAR(100) NOT NULL,
    UNIQUE (guaranteeContact)
CREATE TABLE year (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 year INT
);

CREATE TABLE semester (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      semester INT
);

CREATE TABLE grade (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          grade INT
);

CREATE TABLE class_code (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       class_code VARCHAR(10)
);
CREATE TABLE subject (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       subject VARCHAR(100)
);
ALTER TABLE year ADD INDEX idx_year (year);
ALTER TABLE year DROP INDEX idx_year;

ALTER TABLE semester ADD INDEX idx_semester (semester);
ALTER TABLE semester DROP INDEX idx_semester;

ALTER TABLE grade ADD INDEX idx_grade (grade);
ALTER TABLE grade DROP INDEX idx_grade;

ALTER TABLE class_code ADD INDEX idx_class_code (class_code);
ALTER TABLE class_code DROP INDEX idx_class_code;

ALTER TABLE subject ADD INDEX idx_subject (subject);
ALTER TABLE subject DROP INDEX idx_subject;

CREATE TABLE IF NOT EXISTS student(

                                      student_index_no  VARCHAR(100) PRIMARY KEY NOT NULL,
                                      fullName VARCHAR(200) NOT NULL ,
                                      address VARCHAR(250) NOT NULL ,
                                      birthday DATE NOT NULL ,
                                      gender ENUM ('MALE','FEMALE') NOT NULL ,
                                      guaranteeName VARCHAR(100) NOT NULL ,
                                      guaranteeContact VARCHAR(100) NOT NULL,
                                      url VARCHAR(500) NOT NULL,
                                      UNIQUE (guaranteeContact)

);

CREATE TABLE student_marks (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 year INT,
                                 semester INT,
                                 grade INT,
                                 class_code VARCHAR(10),
                                 subject VARCHAR(100),
                                 student_index_no VARCHAR(50),
                                 mark INT,
                                 FOREIGN KEY (year) REFERENCES year (year),
                                 FOREIGN KEY (semester) REFERENCES semester (semester),
                                 FOREIGN KEY (grade) REFERENCES grade (grade),
                                 FOREIGN KEY (class_code) REFERENCES class_code (class_code),
                                 FOREIGN KEY (subject) REFERENCES subject (subject),
                                 FOREIGN KEY (student_index_no) REFERENCES student (student_index_no)
);




SELECT student_index_no, SUM(mark) AS total_mark
FROM student_marks
WHERE year = 2019 AND semester = 1 AND grade = 1 AND class_code = 'A'
GROUP BY student_index_no;


);

CREATE TABLE IF NOT EXISTS imageUrl(
    number INT AUTO_INCREMENT PRIMARY KEY ,
    indexNumber VARCHAR(200) NOT NULL ,
    url VARCHAR(500),
    FOREIGN KEY (indexNumber) REFERENCES student(student_index_no)
);