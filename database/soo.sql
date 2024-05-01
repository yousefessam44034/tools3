CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT NOT NULL AUTO_INCREMENT,
  doctor_username VARCHAR(255),
  patient_username VARCHAR(255),
  day_of_week VARCHAR(255),
  time_slot VARCHAR(255),
  PRIMARY KEY (appointment_id)
);

-- Create doctor_slots table
CREATE TABLE IF NOT EXISTS doctor_slots (
  doctor_username VARCHAR(255) NOT NULL,
  day_of_week VARCHAR(255) NOT NULL,
  time_slot VARCHAR(255) NOT NULL,
  status ENUM('booked', 'not booked') DEFAULT 'not booked'
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type ENUM('doctor', 'patient') NOT NULL,
  PRIMARY KEY (id)
);