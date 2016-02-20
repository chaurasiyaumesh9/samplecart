-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2016 at 06:21 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `samplecart`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `keywords` text,
  `active` tinyint(1) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `keywords`, `active`, `url`) VALUES
(1, 'Electronics', 'Electronics', 1, 'electronics'),
(2, 'Men', 'Men', 1, 'men'),
(3, 'Women', 'Women', 1, 'women'),
(4, 'Baby & Kids', 'Baby & Kids', 1, 'baby-kids'),
(5, 'Home & Furniture', 'Home & Furniture', 1, 'home-furniture'),
(6, 'Books & Media', 'Books & Media', 0, 'books-media'),
(7, 'Auto & Sports', 'Auto & Sports', 0, 'auto-sports');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_ids` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `SKU` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `description` text,
  `short_description` text,
  PRIMARY KEY (`id`),
  KEY `fk_categories_id` (`category_ids`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_ids`, `name`, `SKU`, `price`, `quantity`, `enabled`, `description`, `short_description`) VALUES
(11, '[1]', 'Micromax Canvas Pulse 4G', 'GFSW94217WF39', '9999.00', 100, 1, 'It''s time you bid goodbye to your clunky old phone and experience a brand new way of staying connected. The Micromax Canvas Pulse 4G offers you the reliability of a laptop and the ease of using a phone - all in one smart device. With a 3 GB DDR3 RAM, this device packs a punch so you can multitask between apps, browse the Web and play your favorite games without lag.', 'It''s time you bid goodbye to your clunky old phone and experience a brand new way of staying connected.'),
(12, '[1]', 'Letv Le 1S', 'RSVL36348HX29', '10999.00', 100, 1, 'If you''re looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet.', 'If you''re looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet.'),
(13, '1', 'Moto G (3rd Generation)(Black, 16 GB)', 'LTPU16934PG19', '10999.00', 35, 1, 'Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that''ll always be there for you.', 'Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that''ll always be there for you.'),
(14, '[2]', 'Club Vintage Slim Fit Men''s Trousers', 'HEWZ47104KE38', '1399.00', 24, 1, 'Club Vintage High Quality Men''s Chinos-Trousers range for comfort wear and smart slim fit.', ''),
(15, '[2]', 'Feels Good Slim Fit Men''s Trousers', 'BUHW13209IJ64', '1899.00', 67, 1, 'Feels Good is featuring this attractive Trousers made of Satin cotton lycra fabric. This material gives you the comfort and style also. You can team up this chinos with your choice of Shirt.', ''),
(16, '[3]', 'Alia Hand-held Bag (Pink003)', 'OEJB98024TB54', '799.00', 35, 1, 'Quality bags at affordable price, its great for office, parties, markets and all occassions. This pu leather hand bag is a very durable utility item you can carry this hand bag with its twin grab handles to look classy with a fashionable apeal.', 'Quality bags at affordable price, its great for office, parties, markets and all occassions.'),
(17, '[3]', 'Incraze Hand-held Bag(White)', 'EOYI63441LY65', '999.00', 35, 1, 'Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.', 'Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.'),
(18, '[3]', 'Rosemary Hand-held Bag(Pink With Blue)', 'SSEE90455WQ18', '1249.00', 28, 1, 'This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel. This handbag is a must-have for women,who prefer stylish handbag, featuring enough room to carry your essentials easily,this non-leather handbag i', 'This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel.'),
(19, '[5]', 'Durian DOM/58601 Solid Wood King Bed(Finish Color - High Quality Glossy Polish)', 'LBXR20850AR66', '48000.00', 6, 1, 'Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom. :: Neatly presented with contemporary styling, the Wooden Bed features a sumptuous high slatted headboard with a complimenting low foot end that is perfect for creating a sense of space within your room.', 'Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom.'),
(20, '[5]', 'Durian Berry Solid Wood 2 Seater Sofa(Finish Color - DARK BROWN)', 'CWJG63147HV44', '56400.00', 3, 1, 'The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.', 'The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
