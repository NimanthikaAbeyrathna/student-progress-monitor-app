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

);