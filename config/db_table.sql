create table users(
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    PRIMARY KEY ( user_id )
 );

 create table checkout(
    id INT NOT NULL AUTO_INCREMENT,
    domain VARCHAR(100) NOT NULL,
    category_id VARCHAR(100) NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    promo_code VARCHAR(100) NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    cost VARCHAR(10) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    user_details TEXT NOT NULL,
    PRIMARY KEY ( id )
 );

 create table user_images(
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    video_id VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    img longtext NOT NULL,
    PRIMARY KEY ( id )
 );