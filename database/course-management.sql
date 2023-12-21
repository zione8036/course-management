-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 04:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course-management`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `columnId` int(11) DEFAULT NULL,
  `changedField` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `oldValue` text DEFAULT NULL,
  `newValue` text DEFAULT NULL,
  `dateCreated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `columnId`, `changedField`, `table`, `oldValue`, `newValue`, `dateCreated`) VALUES
(1, 1, 'title', 'course', 'Responsive Web Design1', 'Responsive Web Design', '2023-12-21 03:16:02'),
(2, 1, 'category', 'course', 'Design1', 'Design', '2023-12-21 03:16:17'),
(3, 1, 'endDate', 'course', 'April 10, 2023 at 08:00:00', 'April 14, 2023 at 08:00:00', '2023-12-21 03:16:29'),
(4, 1, 'capacity', 'course', '25', '23', '2023-12-21 03:17:15');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `instructor` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `archive` tinyint(1) DEFAULT 0,
  `dateCreated` datetime NOT NULL,
  `dateModified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `startDate`, `endDate`, `instructor`, `capacity`, `category`, `department`, `archive`, `dateCreated`, `dateModified`) VALUES
(1, 'Responsive Web Design', 'Learn how to create responsive and mobile-friendly web designs.', '2023-01-10 00:00:00', '2023-04-14 00:00:00', 'Emma Davis', 23, 'Design', 'Art', 0, '2023-12-21 03:08:59', '2023-12-21 03:17:15'),
(2, 'Python for Data Science', 'Introduction to using Python for data analysis and visualization.', '2023-02-05 00:00:00', '2023-05-05 00:00:00', 'Ethan Johnson', 30, 'Data Science', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(3, 'UX/UI Design Principles', 'Explore the principles of user experience and user interface design.', '2023-03-15 00:00:00', '2023-06-15 00:00:00', 'Ava Smith', 20, 'Design', 'Art', 1, '2023-12-21 03:08:59', '2023-12-21 03:17:29'),
(4, 'Big Data Analytics', 'Introduction to big data analytics and processing techniques.', '2023-04-01 00:00:00', '2023-07-01 00:00:00', 'Noah Taylor', 35, 'Data Science', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(5, 'Content Marketing Strategies', 'Develop effective strategies for creating and distributing content.', '2023-05-20 00:00:00', '2023-08-20 00:00:00', 'Mia Rodriguez', 40, 'Marketing', 'Business', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(6, 'Robotics Fundamentals', 'Introduction to the fundamentals of robotics and automation.', '2023-06-10 00:00:00', '2023-09-10 00:00:00', 'Liam Brown', 25, 'Technology', 'Engineering', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(7, 'Advanced Graphic Design', 'Explore advanced techniques in graphic design and digital art.', '2023-07-05 00:00:00', '2023-10-05 00:00:00', 'Zoe Turner', 30, 'Design', 'Art', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(8, 'Internet of Things (IoT) Workshop', 'Hands-on workshop exploring the Internet of Things and connected devices.', '2023-08-15 00:00:00', '2023-11-15 00:00:00', 'Caleb Martinez', 20, 'Technology', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(9, 'Strategic Management', 'Learn strategic management principles for organizational success.', '2023-09-01 00:00:00', '2023-12-01 00:00:00', 'Sofia Robinson', 35, 'Business', 'Business', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(10, 'Network Security Essentials', 'Explore essential concepts in network security and cyber defense.', '2023-10-20 00:00:00', '2024-01-20 00:00:00', 'Elijah Garcia', 30, 'Security', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(11, 'E-commerce Strategies', 'Develop effective strategies for running successful e-commerce businesses.', '2023-11-15 00:00:00', '2024-02-15 00:00:00', 'Avery Davis', 25, 'Business', 'Business', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(12, 'Cloud Computing Fundamentals', 'Introduction to the fundamentals of cloud computing and services.', '2023-12-05 00:00:00', '2024-03-05 00:00:00', 'Gabriel Smith', 30, 'Technology', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(13, 'Creative Writing Workshop', 'Hands-on workshop for developing creative writing skills.', '2024-01-15 00:00:00', '2024-04-15 00:00:00', 'Aria Johnson', 20, 'Humanities', 'English', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59'),
(14, 'Game Development Basics', 'Introduction to the basics of game development and design.', '2024-02-01 00:00:00', '2024-05-01 00:00:00', 'Leo Turner', 35, 'Technology', 'Computer Science', 0, '2023-12-21 03:08:59', '2023-12-21 03:08:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
