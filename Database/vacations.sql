-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2024 at 03:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `country_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`country_id`, `country_name`) VALUES
(1, 'Afghanistan'),
(2, 'Albania'),
(3, 'Algeria'),
(4, 'Andorra'),
(5, 'Angola'),
(6, 'Antigua and Barbuda'),
(7, 'Argentina'),
(8, 'Armenia'),
(9, 'Australia'),
(10, 'Austria'),
(11, 'Azerbaijan'),
(12, 'Bahamas'),
(13, 'Bahrain'),
(14, 'Bangladesh'),
(15, 'Barbados'),
(16, 'Belarus'),
(17, 'Belgium'),
(18, 'Belize'),
(19, 'Benin'),
(20, 'Bhutan'),
(21, 'Bolivia'),
(22, 'Bosnia and Herzegovina'),
(23, 'Botswana'),
(24, 'Brazil'),
(25, 'Brunei'),
(26, 'Bulgaria'),
(27, 'Burkina Faso'),
(28, 'Burundi'),
(29, 'Cabo Verde'),
(30, 'Cambodia'),
(31, 'Cameroon'),
(32, 'Canada'),
(33, 'Central African Republic'),
(34, 'Chad'),
(35, 'Chile'),
(36, 'China'),
(37, 'Colombia'),
(38, 'Comoros'),
(39, 'Congo'),
(40, 'Costa Rica'),
(41, 'Cote d\'Ivoire'),
(42, 'Croatia'),
(43, 'Cuba'),
(44, 'Cyprus'),
(45, 'Czechia'),
(46, 'Denmark'),
(47, 'Djibouti'),
(48, 'Dominica'),
(49, 'Dominican Republic'),
(50, 'Ecuador'),
(51, 'Egypt'),
(52, 'El Salvador'),
(53, 'Equatorial Guinea'),
(54, 'Eritrea'),
(55, 'Estonia'),
(56, 'Eswatini'),
(57, 'Ethiopia'),
(58, 'Fiji'),
(59, 'Finland'),
(60, 'France'),
(61, 'Gabon'),
(62, 'Gambia'),
(63, 'Georgia'),
(64, 'Germany'),
(65, 'Ghana'),
(66, 'Greece'),
(67, 'Grenada'),
(68, 'Guatemala'),
(69, 'Guinea'),
(70, 'Guinea-Bissau'),
(71, 'Guyana'),
(72, 'Haiti'),
(73, 'Honduras'),
(74, 'Hungary'),
(75, 'Iceland'),
(76, 'India'),
(77, 'Indonesia'),
(78, 'Iran'),
(79, 'Iraq'),
(80, 'Ireland'),
(81, 'Israel'),
(82, 'Italy'),
(83, 'Jamaica'),
(84, 'Japan'),
(85, 'Jordan'),
(86, 'Kazakhstan'),
(87, 'Kenya'),
(88, 'Kiribati'),
(89, 'Korea, North'),
(90, 'Korea, South'),
(91, 'Kosovo'),
(92, 'Kuwait'),
(93, 'Kyrgyzstan'),
(94, 'Laos'),
(95, 'Latvia'),
(96, 'Lebanon'),
(97, 'Lesotho'),
(98, 'Liberia'),
(99, 'Libya'),
(100, 'Liechtenstein'),
(101, 'Lithuania'),
(102, 'Luxembourg'),
(103, 'Madagascar'),
(104, 'Malawi'),
(105, 'Malaysia'),
(106, 'Maldives'),
(107, 'Mali'),
(108, 'Malta'),
(109, 'Marshall Islands'),
(110, 'Mauritania'),
(111, 'Mauritius'),
(112, 'Mexico'),
(113, 'Micronesia'),
(114, 'Moldova'),
(115, 'Monaco'),
(116, 'Mongolia'),
(117, 'Montenegro'),
(118, 'Morocco'),
(119, 'Mozambique'),
(120, 'Myanmar'),
(121, 'Namibia'),
(122, 'Nauru'),
(123, 'Nepal'),
(124, 'Netherlands'),
(125, 'New Zealand'),
(126, 'Nicaragua'),
(127, 'Niger'),
(128, 'Nigeria'),
(129, 'North Macedonia'),
(130, 'Norway'),
(131, 'Oman'),
(132, 'Pakistan'),
(133, 'Palau'),
(134, 'Palestine'),
(135, 'Panama'),
(136, 'Papua New Guinea'),
(137, 'Paraguay'),
(138, 'Peru'),
(139, 'Philippines'),
(140, 'Poland'),
(141, 'Portugal'),
(142, 'Qatar'),
(143, 'Romania'),
(144, 'Russia'),
(145, 'Rwanda'),
(146, 'Saint Kitts and Nevis'),
(147, 'Saint Lucia'),
(148, 'Saint Vincent and the Grenadines'),
(149, 'Samoa'),
(150, 'San Marino'),
(151, 'Sao Tome and Principe'),
(152, 'Saudi Arabia'),
(153, 'Senegal'),
(154, 'Serbia'),
(155, 'Seychelles'),
(156, 'Sierra Leone'),
(157, 'Singapore'),
(158, 'Slovakia'),
(159, 'Slovenia'),
(160, 'Solomon Islands'),
(161, 'Somalia'),
(162, 'South Africa'),
(163, 'South Sudan'),
(164, 'Spain'),
(165, 'Sri Lanka'),
(166, 'Sudan'),
(167, 'Suriname'),
(168, 'Sweden'),
(169, 'Switzerland'),
(170, 'Syria'),
(171, 'Taiwan'),
(172, 'Tajikistan'),
(173, 'Tanzania'),
(174, 'Thailand'),
(175, 'Timor-Leste'),
(176, 'Togo'),
(177, 'Tonga'),
(178, 'Trinidad and Tobago'),
(179, 'Tunisia'),
(180, 'Turkey'),
(181, 'Turkmenistan'),
(182, 'Tuvalu'),
(183, 'Uganda'),
(184, 'Ukraine'),
(185, 'United Arab Emirates'),
(186, 'United Kingdom'),
(187, 'United States'),
(188, 'Uruguay'),
(189, 'Uzbekistan'),
(190, 'Vanuatu'),
(191, 'Vatican City'),
(192, 'Venezuela'),
(193, 'Vietnam'),
(194, 'Yemen'),
(195, 'Zambia'),
(196, 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `vacation_id`) VALUES
(3, 1),
(3, 2),
(3, 3),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 17),
(3, 18),
(4, 1),
(4, 3),
(4, 17),
(4, 18),
(5, 3),
(5, 11),
(5, 17),
(7, 3),
(7, 10),
(8, 1),
(8, 3),
(8, 7),
(8, 8),
(8, 10),
(8, 12),
(9, 9);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role_id`) VALUES
(1, 'Assaf', 'Finkelstein', 'assaffink@gmail.com', '5148be05966d5c36fe99f984137facc7a87b3ef37244f3495ccc3faf507594cd9bb9bb5de830d63ab24aa35421d3db4262fe18505d12e22c0b5cdb07813ea40a', 1),
(2, 'Mor', 'Rubisa', 'mor.rubisa@gmail.com', '9d1ee69b29affd8424f5f7caa0182fe2fbdb5febee00cdc33a984712fe4110a1ce035feca45aface489ce82b7dc2049d7e73646e104a4eab05143da05670a19e', 2),
(3, 'Niv', 'Shteingart', 'niv1999@gmail.com', '869f123e9f27a705640a86d33f9d62b193da347aa6417beecd1cf6a0fd432e03c843ec3c1a4686dc1049c5c9ae5e7a624025e1854b07a6fc6378ad7f55196532', 2),
(4, 'Shay', 'Melamud', 'shayutut2000@gmail.com', 'b26a5dc7bf8c7eda08709424d2ac702bd5c69c07c651c4e9b22c70020a026f603d6af6c994ecd7b67abf1957f5eb40eb42fc2936995b9d27fd51a278f3174f98', 2),
(5, 'Angela', 'Shteingart', '6200104@gmail.com', 'e00030532f5ffb55a1a112aaa527a932e6ccc5b042724c2f46c57fdc2f20ff9b20fc137b541f9d0867b865fb50aa4aea5bcb096a1ea3950dabeb4cffb22d9973', 2),
(7, 'Shany', 'Shteingart', 'shany9797@gmail.com', '5d10de810d34e4ea3081f98dc44a232c2d222bc127db9b6005da4fac79160e14d2dfd7e365b2e00c038ba08abd2350d8b2b4fc52b7c9696f232fba4db4ac90d4', 2),
(8, 'Or', 'Bitton', 'orbitton45@gmail.com', '405fb4fa786503407e2edd795997022ae86f2e3ab40cdf385c09d958c074d0e31ad6160399ed2e94647834b8477f87ee96b874592a2611787f8f856881976351', 2),
(9, 'Tzlil', 'Douglen', 'tzlilshalev@gmail.com', '5148be05966d5c36fe99f984137facc7a87b3ef37244f3495ccc3faf507594cd9bb9bb5de830d63ab24aa35421d3db4262fe18505d12e22c0b5cdb07813ea40a', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `image_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `country_id`, `description`, `start_date`, `end_date`, `price`, `image_name`) VALUES
(1, 106, 'Escape to the breathtaking Maldives for a week of sun, sea, and serenity. Indulge in luxurious overwater bungalows, pristine white-sand beaches, and vibrant coral reefs. This tropical paradise retreat offers the perfect blend of relaxation and adventure.', '2024-07-15', '2024-07-22', 2500.00, 'bf8258cb-3745-4969-8fff-da1a06c1d73f.jpg'),
(2, 169, 'Embark on an exhilarating alpine adventure in the heart of Switzerland. Enjoy snow-covered landscapes, world-class skiing, and cozy chalets. This winter getaway promises a magical experience surrounded by stunning mountain scenery.', '2025-01-10', '2025-01-18', 3000.00, '2e9cf373-5381-4833-8bef-361d44a6028c.jpg'),
(3, 82, 'Immerse yourself in the rich history of Rome with this cultural exploration. Visit iconic landmarks such as the Colosseum, Vatican City, and the Roman Forum. Indulge in authentic Italian cuisine while strolling through charming cobblestone streets.', '2024-04-05', '2024-04-12', 1800.00, '8a8588c3-cc0c-4236-9bbe-8c1ec0852c08.jpg'),
(4, 66, 'Experience the beauty of Greece by hopping between its picturesque islands. Discover ancient ruins, crystal-clear waters, and traditional Greek hospitality. Each island offers a unique blend of history and natural splendor.', '2024-09-08', '2024-09-15', 2200.00, '1387329a-0bab-4fbc-995e-0d4dea7eb415.jpg'),
(5, 77, 'Rejuvenate your mind and body with a serene spa retreat in Bali. Relax in luxurious resorts surrounded by lush landscapes, explore ancient temples, and indulge in traditional Balinese spa treatments for the ultimate wellness experience.', '2024-06-20', '2024-06-27', 2800.00, '15160d74-2aa5-4716-b95c-5262cf05e822.jpg'),
(6, 66, 'Discover the coastal charm of Santorini with its stunning sunsets, whitewashed buildings, and azure waters. Explore the narrow streets of Oia, unwind on black sand beaches, and savor delicious Greek cuisine overlooking the Aegean Sea.', '2024-10-03', '2024-10-10', 2000.00, 'fc27fdc2-89eb-4f5f-b0f3-68f6342a45ae.jpg'),
(7, 87, 'Embark on a thrilling safari adventure in the wild landscapes of Kenya. Witness majestic wildlife, including lions, elephants, and giraffes, as you explore national parks and reserves. Stay in luxurious lodges for an unforgettable African experience.', '2024-08-12', '2024-08-20', 3500.00, '5fd76ae4-6625-4ab9-8cea-6f4cf444833d.jpg'),
(8, 84, 'Immerse yourself in the vibrant city lights of Tokyo, Japan. Explore futuristic technology, traditional temples, and bustling markets. Indulge in sushi delights and experience the unique blend of modernity and tradition in this dynamic city.', '2024-11-07', '2024-11-14', 2400.00, '2e0bdab7-44c4-4035-9b65-ac0a46885fd7.jpg'),
(9, 82, 'Escape to the picturesque Amalfi Coast for a coastal retreat filled with breathtaking views, seaside villages, and delectable Italian cuisine. Relax on scenic beaches, explore cliffside towns, and soak in the Mediterranean charm.', '2024-05-15', '2024-05-22', 1900.00, 'f10148fe-cfa6-4662-9600-d229ecb78438.jpg'),
(10, 75, 'Experience the wonders of a Nordic winter in Iceland. Marvel at the Northern Lights, relax in geothermal hot springs, and explore glaciers and waterfalls. This winter wonderland promises an enchanting escape.', '2024-12-08', '2024-12-15', 2800.00, '8929253c-a54b-4dac-afa1-c089b6351d30.jpg'),
(11, 84, 'Immerse yourself in the cultural odyssey of Kyoto, Japan. Explore historic temples, traditional tea houses, and beautiful cherry blossoms. Delight in the serene ambiance and rich traditions of this ancient city.', '2024-03-20', '2024-03-26', 2100.00, '08173c05-9a37-4ad9-96f6-8c591c0f0c6d.jpg'),
(12, 60, 'Indulge in coastal bliss on the French Riviera, where glamour meets the Mediterranean. Relax on glamorous beaches, explore charming coastal towns, and savor exquisite French cuisine. This chic and sun-soaked retreat offers the epitome of luxury.', '2024-07-05', '2024-07-12', 3000.00, '2c4429d4-8c51-44ba-a6ef-7d5f0651897f.jpg'),
(17, 10, 'Embark on a month-long Austrian getaway, immersing yourself in its culture, landscapes, and cuisine. From historic cities like Vienna to outdoor adventures in the Alps, this affordable vacation offers a realistic exploration of Austria\'s charm.', '2024-04-18', '2024-05-19', 2500.00, 'a53e30ab-533a-4dd4-a553-a37647f50db9.jpg'),
(18, 75, 'Discover Iceland\'s June allure: majestic waterfalls cascade, serene glaciers gleam, and vibrant Reykjavik beckons—all under the enchanting glow of the midnight sun.', '2024-05-01', '2024-06-21', 4200.00, 'ad758720-2471-46e2-bb38-1454137dbd93.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`),
  ADD KEY `country_id` (`country_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `vacations`
--
ALTER TABLE `vacations`
  ADD CONSTRAINT `vacations_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
