-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20221216.13890a947a
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 17, 2022 at 10:39 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sabzlearn_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `id` int(100) NOT NULL,
  `firstname` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `usermame` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `task` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `img` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `token` varchar(100) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`id`, `firstname`, `lastname`, `usermame`, `password`, `task`, `img`, `token`) VALUES
(1, 'محمدامین', 'سعیدی راد', 'amin_1834', 'amin0101_34', 'برنامه نویس فرانت‌اند', 'content/img/saeedi.jpeg', '748e7284-52df-02b5-64a6-35d3c95fc979'),
(2, 'قدیر', 'یلمه', 'q_yolme', 'yolme_9012', 'مدیریت اصلی', 'content/img/yolme.jpg', '748e7284-52df-02b5-64a6-35d3c95fc980'),
(3, 'ساسان', 'مقدس', 'sasan_mqds', 'sasan_9099', 'دیجیتال مارکتر', 'content/img/sasan.avif', '748e7284-52df-02b5-64a6-35d3c95fc981');

-- --------------------------------------------------------

--
-- Table structure for table `Baskets`
--

CREATE TABLE `Baskets` (
  `id` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `userID` int(100) NOT NULL,
  `productImg` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `productTitle` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `productPrice` bigint(20) NOT NULL,
  `productUrl` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `count` int(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(100) NOT NULL,
  `title` varchar(100) COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `title`) VALUES
(1, 'گوشی'),
(2, 'لپتاپ'),
(4, 'عمومی');

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(100) NOT NULL COMMENT 'آیدی کامنت',
  `body` text COLLATE utf8_persian_ci NOT NULL COMMENT 'متن کامنت',
  `date` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'تاریخ ثبت کامنت',
  `hour` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'ساعت ثبت کامنت',
  `userID` int(100) NOT NULL COMMENT 'آیدی کاربر ثبت کننده کامنت',
  `productID` int(100) NOT NULL COMMENT 'محصول کامنت',
  `is-reply` int(10) NOT NULL,
  `reply-id` int(100) NOT NULL,
  `isAccept` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`id`, `body`, `date`, `hour`, `userID`, `productID`, `is-reply`, `reply-id`, `isAccept`) VALUES
(7, 'سلام. من از این محصول کاملا راضی بودم - تشکر از دیجی کالا', '1400-07-07', '18:12', 8, 33, 0, 0, 0),
(8, 'سلام، کیفیت کافی رو نداشت متاسفانه', '1400-07-09', '12:21', 1, 49, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Offs`
--

CREATE TABLE `Offs` (
  `id` int(100) NOT NULL,
  `code` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `percent` int(100) NOT NULL,
  `adminID` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `date` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `isActive` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `userID` int(100) NOT NULL,
  `date` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `hour` varchar(100) COLLATE utf8_persian_ci NOT NULL,
  `price` bigint(20) NOT NULL,
  `off` int(100) NOT NULL,
  `sale` bigint(20) NOT NULL,
  `popularity` int(100) NOT NULL,
  `count` bigint(20) NOT NULL,
  `sale_count` bigint(20) NOT NULL,
  `isActive` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(100) NOT NULL COMMENT 'آیدی محصول',
  `title` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'اسم محصول',
  `price` int(100) NOT NULL COMMENT 'مبلغ محصول',
  `count` int(100) NOT NULL COMMENT 'موجودی محصول',
  `img` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'آدرس عکس محصول',
  `popularity` int(100) NOT NULL COMMENT 'میزان رضایت',
  `sale` int(100) NOT NULL COMMENT 'میزان فروش محصول',
  `colors` int(100) NOT NULL COMMENT 'تعداد رنگ بندی',
  `productDesc` text COLLATE utf8_persian_ci DEFAULT NULL,
  `url` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `categoryID` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `title`, `price`, `count`, `img`, `popularity`, `sale`, `colors`, `productDesc`, `url`, `categoryID`) VALUES
(3, 'شارژر Type-C', 20000, 134, '/img/charger.jpeg', 91, 18000000, 10, 'شارژر لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.', 'charger-type-c', 1),
(33, 'هندزفری بلوتوثی', 90000, 80, '/img/head.jpeg', 91, 9000000, 2, 'هندزفری بلوتوثی لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.', 'peadphone', 1),
(37, 'تی شرت مشکی', 130000, 19, '/img/tshirt.jpeg', 79, 8900200, 1, 'تی شرت مشکی لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.', 't-shirt', 4),
(38, 'هدفون', 320000, 12, '/img/headphone.jpeg', 93, 23000000, 4, 'هدفون لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.', 'headphone', 2),
(45, 'آیفون 13', 32000000, 200, 'img/iphone.jpeg', 100, 0, 3, NULL, NULL, NULL),
(49, 'روغن اویلا', 79000, 231, 'img/oil.jpeg', 100, 0, 1, NULL, NULL, NULL),
(50, 'صابون گلنار', 90000, 391, 'img/soap.jpeg', 100, 0, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(100) NOT NULL COMMENT 'آیدی کاربر',
  `firsname` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'نام کاربر',
  `lastname` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'نام خانوادگی کاربر',
  `username` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'نام کاربری کاربر',
  `password` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'گذرواژه کاربر',
  `phone` bigint(20) NOT NULL COMMENT 'شماره تماس کاربر',
  `city` varchar(50) COLLATE utf8_persian_ci NOT NULL COMMENT 'ایمیل کاربر',
  `email` varchar(50) COLLATE utf8_persian_ci NOT NULL COMMENT 'شهر کاربر',
  `address` text COLLATE utf8_persian_ci NOT NULL COMMENT 'آدرس کاربر',
  `score` int(100) NOT NULL COMMENT 'امتیاز کاربر',
  `buy` bigint(20) NOT NULL COMMENT 'میزان خرید کاربر'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `firsname`, `lastname`, `username`, `password`, `phone`, `city`, `email`, `address`, `score`, `buy`) VALUES
(1, 'علیرضا', 'حسینی نژاد', 'ali_hsyni', 'ali_9991', 9158798712, 'اصفهان', 'ali@gmail.com', ' اصفهان', 92, 8900000),
(8, 'حسین', 'احمدی', 'amir._.reza', 'amir_reza_9901', 9146678291, 'تبریز', 'amir_reza@gmail.com', 'تبریز', 51, 3400000),
(13, 'محمد', 'ولی پور', 'sina_vlpr', 'mmd1212', 9911234321, 'اصفهان', 'sina_vlpr@gmail.com', 'اصفهان، کوچه فلان خیابون فلان', 31, 2300000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Baskets`
--
ALTER TABLE `Baskets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_1` (`productID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `Offs`
--
ALTER TABLE `Offs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminID` (`adminID`),
  ADD KEY `offs_ibfk_1` (`productID`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `orders_ibfk_1` (`productID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admins`
--
ALTER TABLE `Admins`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Baskets`
--
ALTER TABLE `Baskets`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'آیدی کامنت', AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Offs`
--
ALTER TABLE `Offs`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'آیدی محصول', AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'آیدی کاربر', AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Baskets`
--
ALTER TABLE `Baskets`
  ADD CONSTRAINT `baskets_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `baskets_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `Products` (`id`);

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `Products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Offs`
--
ALTER TABLE `Offs`
  ADD CONSTRAINT `offs_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `Products` (`id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `Products` (`id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `Categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
