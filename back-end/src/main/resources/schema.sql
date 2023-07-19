CREATE TABLE IF NOT EXISTS signUp (
                                      userName VARCHAR(50) PRIMARY KEY NOT NULL,
                                      fullName VARCHAR(100) NOT NULL,
                                      password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS student (
                                       student_index_no VARCHAR(100) PRIMARY KEY NOT NULL,
                                       fullName VARCHAR(200) NOT NULL,
                                       address VARCHAR(250) NOT NULL,
                                       gender ENUM ('MALE', 'FEMALE') NOT NULL,
                                       guaranteeName VARCHAR(100) NOT NULL,
                                       guaranteeContact VARCHAR(100) NOT NULL,
                                       UNIQUE (guaranteeContact)
);

CREATE TABLE year (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      year INT,
                      INDEX idx_year (year)
);

CREATE TABLE semester (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          semester INT,
                          INDEX idx_semester (semester)
);

CREATE TABLE grade (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       grade INT,
                       INDEX idx_grade (grade)
);

CREATE TABLE class_code (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            class_code VARCHAR(10),
                            INDEX idx_class_code (class_code)
);

CREATE TABLE subject (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         subject VARCHAR(100),
                         INDEX idx_subject (subject)
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

CREATE TABLE IF NOT EXISTS imageUrl (
                                        number INT AUTO_INCREMENT PRIMARY KEY,
                                        indexNumber VARCHAR(200) NOT NULL,
                                        url VARCHAR(500),
                                        FOREIGN KEY (indexNumber) REFERENCES student (student_index_no)
);
