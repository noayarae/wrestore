/*  Drop (Delete) a DDBB */
DROP DATABASE databasename;

/*  Create a DDBB */
CREATE DATABASE databasename;

/* --------- Query to delete "USERS" table if exists and create if it doesn't --------- */

DROP TABLE IF EXISTS `users_w2`;
CREATE TABLE `users_w2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usercod` varchar(20) NOT NULL DEFAULT '',
  `pid` varchar(1000) NOT NULL DEFAULT '',
  `name` varchar(1000) NOT NULL DEFAULT '',
  `login` varchar(20) NOT NULL DEFAULT '',
  `spent_time` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/* Query to Select only "Mouse-Click" into a "USER1" table */
SELECT * FROM USER1 WHERE all_act LIKE 'm-c%'

/* QUERY to GET Login_time (Login_time) ---  Here, replace the table-name "users" with your table*/

ALTER TABLE users ADD COLUMN (calc DECIMAL);
UPDATE users SET calc=login/1000;
ALTER TABLE users ADD COLUMN (login_time DATETIME);
UPDATE users SET login_time = from_unixtime(calc);
ALTER TABLE users DROP COLUMN calc;

/* Using Table: `users_w2` */
/* --- If columns already exist --- */
ALTER TABLE `users_w2` DROP COLUMN login_time, DROP COLUMN spent_time_sec;
/* --- If columns does not exist --- */
/* QUERY TO GET the Spent time ‘SPENT_TIME_SEC’ in seconds */
ALTER TABLE `users_w2` ADD COLUMN (login_time DATETIME);
UPDATE `users_w2` SET login_time = from_unixtime(login/1000);
/* QUERY TO GET the Spent time in seconds ‘SPENT_TIME_SEC’ */
ALTER TABLE `users_w2` ADD COLUMN (spent_time_sec DECIMAL);
UPDATE `users_w2` SET spent_time_sec = spent_time/1000;

/* ========================================================== */
/* --------- QUERY TO PROCESS "USERS" TABLE --------- */
/* Query to DELETE columns */
ALTER TABLE users
  DROP COLUMN login_time,
  DROP COLUMN spent_time_sec;

/* Query to INSERT a column into an existing DB */
ALTER TABLE `takefeedback2`
    ADD COLUMN `RATING1` INT(10) AFTER `firstCol`;

ALTER TABLE `takefeedback2`
    ADD COLUMN `RATING1` tinyint(4) AFTER `RATING`;

/* Query to CHANGE a column-NAME in a exiting TABLE */
ALTER TABLE TABLE_NAME CHANGE old_name new_name COLUMN_TYPE;
ALTER TABLE `takefeedback2` CHANGE RATING1 RATING2 tinyint;

/* ================================================= */

/* INSERT a data into a table.*/
/* Note: the 'id' column is 'AUTO-INCREMENT' type that is why it is set as 'NULL' */
INSERT INTO user10 (id, usercod, pid, name,time,all_act)
VALUES (NULL, 'usercode', 'pi20','name20','time20','click all 20');

/* +++++++  other queries ++++++++++++++ */
/* Rename a table */
RENAME TABLE `tb1` TO `tb2`, tb3 TO tb4;

/* Create a table with FORMAT from an existing table. Here: 'takefeedback4' is a new table. It'll take format from 'takefeedback2' */
CREATE TABLE takefeedback4 LIKE takefeedback2;

/* Load CSV data into an existing table (Format of columns from CSV and MySQL table must match) */
/* 'F:/WRESTORE/takefeedback_json3.csv' is the CSV file. 'takefeedback3' is the SQL table */
LOAD DATA LOCAL INFILE 'F:/WRESTORE/takefeedback_json3.csv'
INTO TABLE takefeedback3
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;/*it ignores the first row*/



/* Other queries */
ALTER TABLE `user_list` ADD COLUMN `pvq_q1` VARCHAR(40) AFTER `EXP_Q21`;

ALTER TABLE `user_list` ADD COLUMN `pvq_q2` VARCHAR(40) AFTER `pvq_q1`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q3` VARCHAR(40) AFTER `pvq_q2`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q4` VARCHAR(40) AFTER `pvq_q3`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q5` VARCHAR(40) AFTER `pvq_q4`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q6` VARCHAR(40) AFTER `pvq_q5`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q7` VARCHAR(40) AFTER `pvq_q6`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q8` VARCHAR(40) AFTER `pvq_q7`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q9` VARCHAR(40) AFTER `pvq_q8`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q10` VARCHAR(40) AFTER `pvq_q9`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q11` VARCHAR(40) AFTER `pvq_q10`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q12` VARCHAR(40) AFTER `pvq_q11`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q13` VARCHAR(40) AFTER `pvq_q12`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q14` VARCHAR(40) AFTER `pvq_q13`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q15` VARCHAR(40) AFTER `pvq_q14`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q16` VARCHAR(40) AFTER `pvq_q15`;
ALTER TABLE `user_list` ADD COLUMN `pvq_q17` VARCHAR(40) AFTER `pvq_q16`;
