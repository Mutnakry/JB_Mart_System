-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 07:08 AM
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
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `acount`
--

CREATE TABLE `acount` (
  `id` int(11) NOT NULL,
  `acc_names` varchar(255) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `acc_num` varchar(255) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `delete_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `acount`
--

INSERT INTO `acount` (`id`, `acc_names`, `bank_id`, `acc_num`, `balance`, `description`, `user_at`, `user_update`, `create_at`, `update_at`, `delete_at`) VALUES
(2, 'Nakry', 2, '111220008776', 10, NULL, 'admin', 'admin', '2024-10-19 03:36:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'ស្រីស្អាត', 3, '1000223888331', 100, 'លក់លុះខ្ស័យ', 'admin', 'admin', '2024-10-18 15:51:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'កញ្ញាបុផ្ផាស្រស់', 6, '1100093773733', 0, 'លក់ទាល់តែអស់បានឈប់', 'admin', 'admin', '2024-10-18 16:26:05', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `bank_names` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `delete_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `bank_names`, `created_at`, `update_at`, `delete_at`) VALUES
(2, 'ប្រាសាក់', '2024-10-18 13:33:45', '2024-10-18 13:33:45', '0000-00-00 00:00:00'),
(3, 'អម្រឹត', '2024-10-18 14:35:00', '2024-10-18 14:35:00', '0000-00-00 00:00:00'),
(4, 'Vatanac', '2024-10-18 14:38:10', '2024-10-18 14:38:10', '0000-00-00 00:00:00'),
(6, 'PPCBank', '2024-10-18 14:41:49', '2024-10-18 14:41:49', '0000-00-00 00:00:00'),
(7, 'ABA', '2024-10-18 14:48:56', '2024-10-18 14:48:56', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `brand_names` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_names`, `description`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'LV', 'ថ្មី', '2024-10-18 04:25:59', '2024-10-18 04:25:59', NULL),
(4, 'Gatsby', '', '2024-10-18 05:17:03', '2024-10-18 05:17:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `cat_names` varchar(255) DEFAULT NULL,
  `detail` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `cat_names`, `detail`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'ក្រែម', '2', '2024-10-16 06:34:15', '2024-10-16 08:33:39', NULL),
(4, 'ម្ស៉ៅតប់', '1', '2024-10-16 08:16:37', '2024-10-16 08:31:51', NULL),
(5, 'ស្ព្រាយបាញ់ខ្លួន', '1', '2024-10-16 08:17:01', '2024-10-17 15:47:18', NULL),
(7, 'ឡេលាបខ្លួន', '', '2024-10-16 08:24:35', '2024-10-16 08:42:23', NULL),
(8, 'ស្រាបៀកំប៉ុង', 'មានរស់ជាតិឆ្ងុយខ្ងាញ់', '2024-10-16 08:41:32', '2024-10-16 08:41:32', NULL),
(9, NULL, NULL, '2024-10-18 05:14:37', '2024-10-18 05:14:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cost`
--

CREATE TABLE `cost` (
  `id` int(11) NOT NULL,
  `cost_type_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `tax` decimal(8,2) DEFAULT 0.00,
  `price` decimal(8,2) DEFAULT 0.00,
  `payment` decimal(10,2) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `decription` text DEFAULT NULL,
  `interval` int(11) DEFAULT NULL,
  `interval_type` varchar(10) DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `delete_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cost`
--

INSERT INTO `cost` (`id`, `cost_type_id`, `account_id`, `tax`, `price`, `payment`, `dob`, `decription`, `interval`, `interval_type`, `user_at`, `user_update`, `create_at`, `update_at`, `delete_at`) VALUES
(2, 1, NULL, 100.00, 2500.00, 2000.00, '2024-10-20', 'This is a test', 12, 'ឆ្នាំ', 'admin', '2024-10-20 10:30:00', '2024-10-21 05:56:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 2, NULL, 5.00, 10.00, 15.00, NULL, NULL, 1, 'ថ្ងៃ', 'admin', NULL, '2024-10-21 06:11:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 2, 4, 0.00, 100.00, 0.00, '2024-10-21', NULL, 1, 'ថ្ងៃ', 'admin', NULL, '2024-10-21 06:11:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, NULL, 100.00, 1500.00, 0.00, '2024-10-20', 'This is a test', 12, 'ឆ្នាំ', 'admin', NULL, '2024-10-21 05:55:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 2, 4, 10.00, 10.00, 20.00, '2024-10-17', NULL, 10, 'ថ្ងៃ', 'admin', NULL, '2024-10-21 05:26:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 1, 5, 10.00, 10.00, 10.00, '2024-10-22', NULL, 10, 'ថ្ងៃ', 'admin', 'admin', '2024-10-22 05:23:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 2, NULL, 10.00, 100.00, 22.01, '2024-10-22', NULL, 12, 'ឆ្នាំ', 'admin', 'admin', '2024-10-21 06:18:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cost_type`
--

CREATE TABLE `cost_type` (
  `id` int(11) NOT NULL,
  `type_names` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `delete_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cost_type`
--

INSERT INTO `cost_type` (`id`, `type_names`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'បង់ភ្លើង', '2024-10-20 05:02:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'ថ្លៃសម្រាម', '2024-10-20 05:11:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'ថ្លៃទឹក', '2024-10-20 05:03:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `contect_type` enum('ផ្ទាល់ខ្លួន','អជីវកម្ម') DEFAULT 'ផ្ទាល់ខ្លួន',
  `group_id` int(11) DEFAULT NULL,
  `contect_phone` varchar(20) DEFAULT NULL,
  `mobile_phone` varchar(20) DEFAULT NULL,
  `business_names` varchar(255) DEFAULT NULL,
  `full_names` varchar(255) DEFAULT NULL,
  `half_names` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `user_at` text DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `contect_type`, `group_id`, `contect_phone`, `mobile_phone`, `business_names`, `full_names`, `half_names`, `description`, `email`, `user_at`, `user_update`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'ផ្ទាល់ខ្លួន', NULL, NULL, '0965752080', 'Walk-In Customer', 'Walk-In Customer', NULL, 'ហាមលុប( Walk-In Customer​)', NULL, '', '', '2024-10-14 03:50:08', '2024-10-21 18:25:00', NULL),
(3, 'អជីវកម្ម', NULL, '123456789', NULL, 'ហាងបាយ', NULL, NULL, NULL, 'nakry@example.com', 'admin', 'admin', '2024-10-21 15:12:06', '2024-10-21 17:54:35', NULL),
(8, 'ផ្ទាល់ខ្លួន', 2, '9654322', '098765', '', 'nakry', 'Vp', 'yes', 'lv@gmail.com', 'admin', 'admin', '2024-10-21 17:34:12', '2024-10-21 18:18:56', NULL),
(9, 'អជីវកម្ម', NULL, '០០៩៩៨៧៦៦៥៥៤', NULL, 'ហាងលក់កុំព្យូទ័រ', NULL, NULL, NULL, NULL, 'admin', NULL, '2024-10-21 17:34:49', '2024-10-21 17:34:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deposit_payment`
--

CREATE TABLE `deposit_payment` (
  `id` int(11) NOT NULL,
  `account_to_id` int(11) DEFAULT NULL,
  `number` decimal(8,2) NOT NULL,
  `account_from_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_at` text DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `edit_stock`
--

CREATE TABLE `edit_stock` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `by_date` date DEFAULT NULL,
  `user_at` text DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_customer`
--

CREATE TABLE `group_customer` (
  `id` int(11) NOT NULL,
  `group_names` varchar(255) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `detail` mediumtext DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_customer`
--

INSERT INTO `group_customer` (`id`, `group_names`, `discount`, `detail`, `user_at`, `user_update`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'មិនមាន', 0.00, 'ហាមលុប', 'supperadmin', NULL, '2024-10-14 03:46:27', '2024-10-21 09:04:14', NULL),
(2, 'VIP', 10.00, NULL, 'admin', NULL, '2024-10-21 08:56:42', '2024-10-21 09:01:39', NULL),
(3, 'Happy Student', 50.00, 'លកើដោយណាគ្រី', 'admin', 'admin', '2024-10-21 08:58:24', '2024-10-21 09:02:56', NULL),
(4, 'Foodball', 2.00, '', 'admin', 'admin', '2024-10-21 13:49:31', '2024-10-21 13:55:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_detail_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `date_by` datetime DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `balance_amount` decimal(10,2) DEFAULT NULL,
  `changes` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `pro_names` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `include_tax` decimal(10,2) DEFAULT NULL,
  `exclude_tax` decimal(10,2) DEFAULT NULL,
  `profit` decimal(10,2) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type_of_tax` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

CREATE TABLE `product_discount` (
  `id` int(11) NOT NULL,
  `names` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `user_at` mediumtext DEFAULT NULL,
  `user_update` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `date_by` datetime DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `included_tax` decimal(10,2) DEFAULT NULL,
  `excluded_tax` decimal(10,2) DEFAULT NULL,
  `profit` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `user_at` text DEFAULT NULL,
  `user_update` text DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `contect_type` enum('ផ្ទាល់ខ្លួន','អជីវកម្ម') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contect_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_names` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_names` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `half_names` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_at` varchar(255) DEFAULT NULL,
  `user_update` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `contect_type`, `contect_phone`, `mobile_phone`, `business_names`, `full_names`, `half_names`, `description`, `email`, `user_at`, `user_update`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'អជីវកម្ម', '0123456789', '0965752080', 'ហាងបាយ', 'Resturant', 'SR', 'មានរស់ជាតិឆ្ងាញ់', 'nakry@example.com', 'admin', 'admin', '2024-10-22 03:48:38', '2024-10-22 03:50:31', NULL),
(2, 'ផ្ទាល់ខ្លួន', NULL, '098765', '', 'nakry', 'Vp', NULL, NULL, 'admin', 'admin', '2024-10-22 04:24:01', '2024-10-22 04:25:05', NULL),
(3, 'អជីវកម្ម', '9654322', '', 'ហាងលក់កុំព្យូទ័រ', '', '', '', '', 'admin', 'admin', '2024-10-22 04:24:18', '2024-10-22 04:51:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `names` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `names`, `description`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'គ្រាប់', 'ថ្មី', '2024-10-18 08:08:20', '2024-10-18 08:08:20', NULL),
(2, 'កញ្ចប់', '', '2024-10-18 08:08:43', '2024-10-18 08:10:15', NULL),
(3, 'ដប', '', '2024-10-18 08:10:31', '2024-10-18 08:20:30', NULL),
(4, 'កំប៉ុង', '', '2024-10-18 08:26:36', '2024-10-18 08:29:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_names` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_rol` enum('user','admin','superadmin') DEFAULT 'user',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `delete_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_names`, `user_email`, `user_pass`, `user_rol`, `create_at`, `update_at`, `delete_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2a$08$IjdaOfXus6FUhr6D04Fg3ei60p/aOcT41jfwmy1b6W9fNVhbgqSZm', 'admin', '2024-10-15 05:14:32', '2024-10-15 13:10:48', NULL),
(2, 'User', 'user@gmail.com', '$2a$08$Ib.idtd7dcyWTsoHZGlea.B0afXAdVIwL7shmuYSLUrlFU6gIkYJW', 'user', '2024-10-15 05:20:01', '2024-10-15 05:20:01', NULL),
(3, 'SuperAdmin', 'superadmin@gmail.com', '$2a$08$W3B2AnU2doEHxYmB4ZJtTO8tP17p6h7xbCwhcRV.ohr1ZGschdtiK', 'superadmin', '2024-10-15 13:09:51', '2024-10-15 13:09:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `warranty`
--

CREATE TABLE `warranty` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `create_at` bigint(20) DEFAULT NULL,
  `update_at` bigint(20) DEFAULT NULL,
  `delete_at` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acount`
--
ALTER TABLE `acount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acount_ibfk_1` (`bank_id`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cost`
--
ALTER TABLE `cost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cost_ibfk_1` (`cost_type_id`),
  ADD KEY `cost_ibfk_2` (`account_id`);

--
-- Indexes for table `cost_type`
--
ALTER TABLE `cost_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_ibfk_1` (`group_id`);

--
-- Indexes for table `deposit_payment`
--
ALTER TABLE `deposit_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_to_id` (`account_to_id`),
  ADD KEY `account_from_id` (`account_from_id`);

--
-- Indexes for table `edit_stock`
--
ALTER TABLE `edit_stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_customer`
--
ALTER TABLE `group_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_detail_id` (`order_detail_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`category_id`),
  ADD KEY `products_ibfk_2` (`brand_id`),
  ADD KEY `products_ibfk_3` (`unit_id`);

--
-- Indexes for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_ibfk_1` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `warranty`
--
ALTER TABLE `warranty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warranty_ibfk_1` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acount`
--
ALTER TABLE `acount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cost`
--
ALTER TABLE `cost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cost_type`
--
ALTER TABLE `cost_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `deposit_payment`
--
ALTER TABLE `deposit_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `edit_stock`
--
ALTER TABLE `edit_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `group_customer`
--
ALTER TABLE `group_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_discount`
--
ALTER TABLE `product_discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `warranty`
--
ALTER TABLE `warranty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `acount`
--
ALTER TABLE `acount`
  ADD CONSTRAINT `acount_ibfk_1` FOREIGN KEY (`bank_id`) REFERENCES `bank` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `cost`
--
ALTER TABLE `cost`
  ADD CONSTRAINT `cost_ibfk_1` FOREIGN KEY (`cost_type_id`) REFERENCES `cost_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cost_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `acount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `deposit_payment`
--
ALTER TABLE `deposit_payment`
  ADD CONSTRAINT `deposit_payment_ibfk_1` FOREIGN KEY (`account_to_id`) REFERENCES `acount` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `deposit_payment_ibfk_2` FOREIGN KEY (`account_from_id`) REFERENCES `acount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`order_detail_id`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `acount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD CONSTRAINT `product_discount_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `supplier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `warranty`
--
ALTER TABLE `warranty`
  ADD CONSTRAINT `warranty_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
