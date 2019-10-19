-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2019 at 11:11 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shareu`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `content` varchar(700) NOT NULL,
  `newsfeedId` bigint(20) NOT NULL,
  `commentId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `newsfeedId` bigint(20) NOT NULL,
  `imgLocation` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) NOT NULL,
  `newsfeedId` bigint(20) NOT NULL,
  `commentId` bigint(20) DEFAULT NULL,
  `ownerId` bigint(20) NOT NULL,
  `ownerUsername` varchar(50) NOT NULL,
  `ownerIcon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `newsfeed`
--

CREATE TABLE `newsfeed` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ownerId` bigint(20) NOT NULL,
  `description` varchar(800) DEFAULT NULL,
  `time` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userfriendship`
--

CREATE TABLE `userfriendship` (
  `user_first_id` bigint(20) NOT NULL,
  `user_second_id` bigint(20) NOT NULL,
  `type` enum('pending_first_second','pending_second_first','friends','block_first_second','block_second_first','block_both') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userIcon` text,
  `password` varchar(70) NOT NULL,
  `lastLogin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `userIcon`, `password`, `lastLogin`) VALUES
(1, 'abc', '1@gmail.com', NULL, '123456', '0000-00-00 00:00:00'),
(2, 'bcd', '2@gmail.com', NULL, '234567', '0000-00-00 00:00:00'),
(3, 'cde', '3@gmail.com', NULL, '345678', '0000-00-00 00:00:00'),
(4, 'def', '4@gmail.com', NULL, '456789', '0000-00-00 00:00:00'),
(5, 'efg', '5@gmail.com', NULL, '567890', '0000-00-00 00:00:00'),
(6, 'fgh', '6@gmail.com', NULL, '$2b$10$rJUvoE7CWJQV5Q3kBOvbHuGh1tIgp.jwRKdLjEv2r9wiqIsC0yfOO', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsfeed`
--
ALTER TABLE `newsfeed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userfriendship`
--
ALTER TABLE `userfriendship`
  ADD PRIMARY KEY (`user_first_id`,`user_second_id`),
  ADD KEY `user_second_id` (`user_second_id`),
  ADD KEY `user_first_id` (`user_first_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsfeed`
--
ALTER TABLE `newsfeed`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userfriendship`
--
ALTER TABLE `userfriendship`
  ADD CONSTRAINT `userfriendship_ibfk_1` FOREIGN KEY (`user_first_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userfriendship_ibfk_2` FOREIGN KEY (`user_second_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
