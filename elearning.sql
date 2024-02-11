-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2023 at 02:18 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` varchar(36) NOT NULL,
  `admin_username` varchar(2000) NOT NULL,
  `admin_password` varchar(2000) NOT NULL,
  `admin_token` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_username`, `admin_password`, `admin_token`) VALUES
('9a999a16-ecd2-4d43-abc5-2703baccc98f', 'nm', '$2a$10$hVZzmemnf20uWzMP0HWBxuQSFNhlJn6kgYzggpSi5T6woif5EQxbO', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` varchar(36) NOT NULL,
  `book_title` varchar(1000) NOT NULL,
  `book_details` varchar(5000) NOT NULL,
  `book_author` varchar(1000) DEFAULT NULL,
  `book_purchases` int(100) NOT NULL DEFAULT 0,
  `book_price` float DEFAULT NULL,
  `book_rating` float DEFAULT 0,
  `book_date_created` datetime(6) DEFAULT NULL,
  `book_archived` tinyint(1) NOT NULL DEFAULT 0,
  `book_thumbnail` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_title`, `book_details`, `book_author`, `book_purchases`, `book_price`, `book_rating`, `book_date_created`, `book_archived`, `book_thumbnail`) VALUES
('0cb1d33d-78cc-4fef-8a27-3d181573e6f3', 'Amharic book 3', 'Pariatur velit fugiat consectetur occaecat sit ex. Esse dolore esse non amet reprehenderit Lorem minim elit mollit et in. Pariatur sint in et laborum. Sit magna irure do tempor.        Pariatur velit fugiat consectetur occaecat sit ex. Esse dolore esse non amet reprehenderit Lorem minim elit mollit et in. Pariatur sint in et laborum. Sit magna irure do tempor.\r\nPariatur velit fugiat consectetur occaecat sit ex. Esse dolore esse non amet reprehenderit Lorem minim elit mollit et in. Pariatur sint in et laborum. Sit magna irure do tempor. Pariatur velit fugiat consectetur occaecat sit ex. Esse dolore esse non amet reprehenderit Lorem minim elit mollit et in. Pariatur sint in et laborum. Sit magna irure do tempor.\r\n\r\n', 'Kebede\'s', 0, 57, 0, '2023-09-12 23:12:17.000000', 0, '0cb1d33d-78cc-4fef-8a27-3d181573e6f3.png'),
('200f7364-70c8-40c7-a9fe-347e8172316d', 'smth', 'smth', 'smth', 0, 456, 0, '2023-09-13 00:56:32.000000', 0, NULL),
('7d0e78e3-2e4e-44f2-b073-2a3e92a4f5a8', 'Amharic book', 'description here', 'Kebede', 0, 457, 0, '2023-09-12 23:11:33.000000', 1, NULL),
('8d8cbccd-fec8-45ad-87db-316db5c3c5ca', 'New Book', 'description', 'Kebede Abebe', 0, 200, 0, '2023-09-18 15:43:00.000000', 0, '8d8cbccd-fec8-45ad-87db-316db5c3c5ca.png'),
('d8469824-120d-4222-a4a1-38afa68ea279', 'Amharic book', 'desc', 'Kebede', 0, 7800, 0, '2023-09-13 03:05:38.000000', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `book_id` varchar(36) DEFAULT NULL,
  `course_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` varchar(36) NOT NULL,
  `category_name` varchar(1000) NOT NULL,
  `category_type` int(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category_join`
--

CREATE TABLE `category_join` (
  `category_join_id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL,
  `book_id` varchar(36) NOT NULL,
  `category_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `certificate`
--

CREATE TABLE `certificate` (
  `certificate_id` varchar(36) NOT NULL,
  `certificate_body` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(36) NOT NULL,
  `course_title` varchar(1000) NOT NULL,
  `course_details` varchar(1000) NOT NULL,
  `course_level` varchar(1000) NOT NULL,
  `course_certificate` tinyint(1) NOT NULL DEFAULT 1,
  `course_students` int(100) NOT NULL DEFAULT 0,
  `course_rating` varchar(100) DEFAULT '0',
  `course_sections` int(10) NOT NULL DEFAULT 0,
  `course_archived` tinyint(1) DEFAULT 0,
  `course_price` double NOT NULL,
  `course_instructor` varchar(100) DEFAULT NULL,
  `course_max_comments` int(100) NOT NULL DEFAULT 5,
  `course_total_hour` int(100) DEFAULT NULL,
  `course_date_created` datetime(6) DEFAULT NULL,
  `course_thumbnail` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_title`, `course_details`, `course_level`, `course_certificate`, `course_students`, `course_rating`, `course_sections`, `course_archived`, `course_price`, `course_instructor`, `course_max_comments`, `course_total_hour`, `course_date_created`, `course_thumbnail`) VALUES
('00b109c9-ed5c-44ed-9bef-474dd97056d4', 'new name', 'details', 'Advanced', 1, 0, '3.5', 4, 0, 2000, 'Paul', 5, 123, '2023-09-14 00:14:03.000000', NULL),
('05054689-9bc3-471f-ab6f-970e8f56d05f', 'Psychology', 'psy', 'Intermediate', 1, 0, '0', 0, 0, 5600, 'Dagi', 5, 40, '2023-09-13 03:09:17.000000', NULL),
('19a45b62-6f39-4034-8ca1-85770e6c7193', 'Tigrigna course', 'klsjfdslkfjsdlkfjsdklfjdslkf', 'Advanced', 1, 0, '0', 0, 0, 78, 'Kebede', 5, 12345, '2023-09-07 23:09:37.000000', NULL),
('4c44cc8d-bce2-4ac5-9968-11821296afb4', 'Advaned Amharic Lesson ', 'Details ', 'Intermediate', 1, 0, '0', 0, 0, 200, 'Dr Abebe', 5, 3, '2023-09-13 04:00:43.000000', NULL),
('5a0398dc-8998-4409-b9a5-f1adf380f3a1', 'sdfdsfsdfsd', 'fsdffssssssssss', 'Beginner', 1, 0, '0', 0, 1, 345, 'sdfghjk', 5, 23, '2023-09-08 00:09:57.000000', NULL),
('9154f207-9a25-418c-9b87-34257ef565d9', 'llsdjkfjkdsljflsdkjfsdljfkld', 'klsjfdslkfjsdlkfjsdklfjdslkf', 'Advanced', 1, 0, '0', 0, 0, 12, 'ksljdflfksdjfkldsjfksdlfjdskl', 5, 13, '2023-09-07 23:22:04.000000', NULL),
('985af890-025f-4cdb-a425-858d48d9c49a', 'Amharic Lesson 1', 'klsjfdslkfjsdlkfjsdklfjdslkf', 'Advanced', 1, 0, '0', 0, 0, 12, 'ksljdflfksdjfkldsjfksdlfjdskl', 5, 13, '2023-09-07 23:12:52.000000', NULL),
('a18537b7-7716-4db6-b21d-598d8843b258', 'sdfdsfsdfsd', 'fsdffssssssssss', 'Beginner', 1, 0, '0', 0, 1, 345, 'sdfghjk', 5, 23, '2023-09-08 00:08:00.000000', NULL),
('aaa0473e-3ebf-4b4a-a0fb-1cfa73add1ab', 'pt course', 'deeds', 'Intermediate', 1, 0, '0', 0, 0, 120, 'Abebe Molla', 5, 12, '2023-09-18 15:04:06.000000', 'aaa0473e-3ebf-4b4a-a0fb-1cfa73add1ab.jpg'),
('acfd41b1-d532-4782-ad46-a008a2f48aec', 'Amharic Lesson 2', 'Lesson details section', 'Beginner', 1, 0, '0', 0, 0, 908, 'Dagim', 5, 21, '2023-09-09 12:00:06.000000', NULL),
('c1bdec10-d0f1-4894-8028-cd9803afb749', 'አምህሪች', 'ክድልስፍጅክ ', 'Beginner', 1, 0, '0', 0, 1, 56, 'ዳግም', 5, 123, '2023-09-12 22:12:43.000000', NULL),
('c6bf0b68-0c74-47d6-9320-26a58757c6c6', 'llsdjkfjkdsljflsdkjfsdljfkld', 'klsjfdslkfjsdlkfjsdklfjdslkf', 'Advanced', 1, 0, '0', 0, 0, 12, 'ksljdflfksdjfkldsjfksdlfjdskl', 5, 13, '2023-09-07 23:11:44.000000', NULL),
('c8c3fa7c-4050-4bf8-9fb1-23ca38cd511f', 'The nation', 'Dagim\'s personal favourite', 'Advanced', 1, 0, '0', 0, 0, 50000, 'Dagim', 5, 20, '2023-09-12 21:25:34.000000', NULL),
('faa2c699-971d-4394-9db9-edef4df7962c', 'sdfdsfsdfsd', 'fsdffssssssssss', 'Beginner', 1, 0, '0', 0, 0, 345, 'sdfghjk', 5, 23, '2023-09-08 00:21:23.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enrolled`
--

CREATE TABLE `enrolled` (
  `enrolled_id` varchar(36) NOT NULL,
  `enrolled_token` varchar(1000) DEFAULT NULL,
  `enrolled_course_completion` tinyint(1) NOT NULL DEFAULT 0,
  `enrolled_date` datetime(6) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enrolled`
--

INSERT INTO `enrolled` (`enrolled_id`, `enrolled_token`, `enrolled_course_completion`, `enrolled_date`, `user_id`, `course_id`) VALUES
('06983c13-4894-4e52-a380-de554900ed49', NULL, 0, '2023-09-18 03:19:27.454000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '9154f207-9a25-418c-9b87-34257ef565d9'),
('17a33564-b585-4ce1-8373-f8751c63ae65', NULL, 0, '2023-09-18 03:11:54.129000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '00b109c9-ed5c-44ed-9bef-474dd97056d4'),
('3d869057-8339-4903-ae1f-c1a89ee20a31', NULL, 0, '2023-09-18 03:17:55.725000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '05054689-9bc3-471f-ab6f-970e8f56d05f'),
('57bf563e-d7f7-4687-a33f-918e742495c8', NULL, 0, '2023-09-18 03:17:55.725000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '19a45b62-6f39-4034-8ca1-85770e6c7193'),
('5ccd450e-3cba-4028-ba4b-ab9a8e5eed38', NULL, 0, '2023-09-18 03:15:58.256000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '00b109c9-ed5c-44ed-9bef-474dd97056d4'),
('65352cc5-5e74-45fe-afcf-2d1d5445dcfa', NULL, 0, '2023-09-18 03:15:58.256000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '05054689-9bc3-471f-ab6f-970e8f56d05f'),
('6d55d719-ef39-45ae-82d5-9f4cbd761890', NULL, 0, '2023-09-18 03:19:27.454000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '00b109c9-ed5c-44ed-9bef-474dd97056d4'),
('9075649b-bf4b-41f9-b66b-f6b8f6ac6f84', NULL, 0, '2023-09-18 03:17:55.725000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '4c44cc8d-bce2-4ac5-9968-11821296afb4'),
('9cb3153d-3835-4f3d-a201-43e74b0675b6', NULL, 0, '2023-09-18 03:19:27.454000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', 'acfd41b1-d532-4782-ad46-a008a2f48aec'),
('b1fc215d-c9b9-4219-8186-5711fb119abd', NULL, 0, '2023-09-18 03:19:27.454000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '05054689-9bc3-471f-ab6f-970e8f56d05f'),
('cfd933b3-bb94-4d29-b3b3-769b812e080f', NULL, 0, '2023-09-18 03:17:55.725000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '00b109c9-ed5c-44ed-9bef-474dd97056d4'),
('ffc224d4-862f-409b-af51-17bec83be722', NULL, 0, '2023-09-18 03:19:27.454000', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '19a45b62-6f39-4034-8ca1-85770e6c7193');

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `grade_id` varchar(36) NOT NULL,
  `section_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `grade` float DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `link` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `graduate`
--

CREATE TABLE `graduate` (
  `graduate_id` varchar(36) NOT NULL,
  `graduate_date` datetime(6) NOT NULL,
  `certificate_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `purchase_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `book_id` varchar(36) NOT NULL,
  `purchase_token` varchar(1000) NOT NULL,
  `purchase_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`purchase_id`, `user_id`, `book_id`, `purchase_token`, `purchase_date`) VALUES
('3f97a3e1-141a-4e32-81ce-eda710a9ee16', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '200f7364-70c8-40c7-a9fe-347e8172316d', '', '2023-09-18 03:15:58.256000'),
('a814e90b-03f0-4096-92b8-fac98f71a5b7', 'c09c4b57-65e5-4e58-8b6c-743c18f57589', '0cb1d33d-78cc-4fef-8a27-3d181573e6f3', '', '2023-09-18 03:11:54.129000');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` varchar(36) NOT NULL,
  `question_name` varchar(2000) NOT NULL,
  `question_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`question_options`)),
  `section_id` varchar(36) NOT NULL,
  `question_date_created` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `question_name`, `question_options`, `section_id`, `question_date_created`) VALUES
('c7540527-0e82-4a14-9fe1-fb4009bf2ea5', 'ques 1', '[{\"text\":\"ch 1\",\"isCorrect\":false},{\"text\":\"ch 2\",\"isCorrect\":true}]', 'c217aae1-beeb-4e01-9496-c63ea3bb85f6', '2023-09-25 03:17:54.000000');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` varchar(36) NOT NULL,
  `section_title` varchar(1000) NOT NULL,
  `section_description` varchar(5000) NOT NULL,
  `section_type` varchar(10) NOT NULL,
  `section_content` varchar(2000) DEFAULT NULL,
  `section_value` int(100) DEFAULT NULL,
  `course_id` varchar(36) NOT NULL,
  `section_date_created` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `section_title`, `section_description`, `section_type`, `section_content`, `section_value`, `course_id`, `section_date_created`) VALUES
('5a8a006e-cc45-4cf2-a0b3-643012f42e6c', 'Amharic section 2', 'dlks', 'video', '', 0, '00b109c9-ed5c-44ed-9bef-474dd97056d4', '2023-09-15 02:38:56.000000'),
('b649dbf9-cf4e-4140-bef7-8ed64f348fbc', 'Amharic section 1', 'deets', 'text', '', 0, '00b109c9-ed5c-44ed-9bef-474dd97056d4', '2023-09-15 02:31:55.000000'),
('c217aae1-beeb-4e01-9496-c63ea3bb85f6', 'section stuff', 'desc', 'quiz', 'http::/localhost:3000/smth', 12, '00b109c9-ed5c-44ed-9bef-474dd97056d4', '2023-09-25 03:17:25.000000'),
('c4c7650b-80aa-4ae6-aeb3-a49378ef357d', 'Amharic section 3', 'deet', 'assignment', '', 23, '00b109c9-ed5c-44ed-9bef-474dd97056d4', '2023-09-15 02:39:42.000000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `user_email` varchar(2000) NOT NULL,
  `user_password` varchar(2000) NOT NULL,
  `user_photo` varchar(2000) DEFAULT NULL,
  `user_token` varchar(2000) DEFAULT NULL,
  `user_full_name` varchar(1000) NOT NULL,
  `user_date_joined` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_photo`, `user_token`, `user_full_name`, `user_date_joined`) VALUES
('9a999a16-ecd2-4d43-abc5-2703baccc98f', 'pt3@gmail.com', '$2a$10$phHISPm5esQS5QveZqV9KOfeqzjL0VEukaP/c8TUOtaUik4eGWmxK', NULL, NULL, 'Paulos Teshome', '2023-09-16 17:38:22.046000'),
('c09c4b57-65e5-4e58-8b6c-743c18f57589', 'pt4@gmail.com', '$2a$10$dGbAJXJh6orFEOYPcpDureen6kvetqw1TgSStDH3jy13KDzDtYLFS', NULL, NULL, 'Paulos Teshome', '2023-09-18 00:27:14.432000'),
('ef8202ae-2188-44d7-8bb1-da4b2ee4a3a3', 'haileyabsera3@gmail.com', '$2a$10$/TmjzMTEsE06YqcLE/uRj.WVsoGSP2Wxd5ieH/8ydu0OwefVzAoa6', NULL, NULL, 'Natan Mekebib', '2023-09-07 21:52:13.984000'),
('fceeca18-a0f3-4ab4-9ade-06e4d109746c', 'nm', '$2a$10$hVZzmemnf20uWzMP0HWBxuQSFNhlJn6kgYzggpSi5T6woif5EQxbO', NULL, NULL, 'Natan Mekebib', '2023-09-13 02:51:37.284000');

-- --------------------------------------------------------

--
-- Table structure for table `web_content`
--

CREATE TABLE `web_content` (
  `web_content_id` varchar(36) NOT NULL,
  `goal_title` varchar(1000) DEFAULT NULL,
  `hero_title` varchar(1000) DEFAULT NULL,
  `goal_detail` varchar(2000) DEFAULT NULL,
  `hero_detail` varchar(2000) DEFAULT NULL,
  `lesson_title` varchar(1000) DEFAULT NULL,
  `lesson_detail` varchar(2000) DEFAULT NULL,
  `action_title` varchar(1000) DEFAULT NULL,
  `action_detail` varchar(2000) DEFAULT NULL,
  `mentor_title` varchar(1000) DEFAULT NULL,
  `mentor_detail` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_content`
--

INSERT INTO `web_content` (`web_content_id`, `goal_title`, `hero_title`, `goal_detail`, `hero_detail`, `lesson_title`, `lesson_detail`, `action_title`, `action_detail`, `mentor_title`, `mentor_detail`) VALUES
('11f1e0fd-4bea-11ee-9cc4-0a002700000a', 'OUR GOAL     ', 'Learn Ethiopian Languages', 'At Logo, we are passionate about promoting Ethiopian languages and bridging the linguistic gap for foreigners. Our team of experienced language experts and native speakers have developed a comprehensive curriculum to make learning Ethiopian languages accessible and enjoyable.', 'Discover the beauty and diversity of Ethiopian languages through our immersive courses, interactive lessons, and cultural insights. Start your language learning journey today!', 'Qualified lessons for students', 'Explore our range of courses designed to suit your language learning needs. Whether you are a beginner or an advanced learner, we have courses that cater to all levels. Choose from Amharic, Oromo, Tigrinya, Somali, and more!', 'Subscribe For Get Update Every New Courses', '20k+ students daily learn with Eduvi. Subscribe for new courses.', 'Want to share your knowledge? Join us a Mentor', 'High-definition video is video of higher resolution and quality than standard-definition. While there is no standardized meaning for high-definition, generally any video.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `cart_ibfk_2` (`book_id`),
  ADD KEY `cart_ibfk_3` (`course_id`),
  ADD KEY `cart_ibfk_4` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_join`
--
ALTER TABLE `category_join`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`certificate_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `enrolled`
--
ALTER TABLE `enrolled`
  ADD PRIMARY KEY (`enrolled_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `enrolled_ibfk_2` (`course_id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `grade_ibfk_1` (`user_id`),
  ADD KEY `grade_ibfk_2` (`section_id`);

--
-- Indexes for table `graduate`
--
ALTER TABLE `graduate`
  ADD KEY `certificate_id` (`certificate_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `web_content`
--
ALTER TABLE `web_content`
  ADD PRIMARY KEY (`web_content_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `category_join`
--
ALTER TABLE `category_join`
  ADD CONSTRAINT `category_join_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_join_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_join_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enrolled`
--
ALTER TABLE `enrolled`
  ADD CONSTRAINT `enrolled_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enrolled_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `graduate`
--
ALTER TABLE `graduate`
  ADD CONSTRAINT `graduate_ibfk_1` FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`certificate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `graduate_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
