-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2016 at 08:57 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sample2`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCategory`( name VARCHAR(255), keywords TEXT, active BOOLEAN, url VARCHAR(255))
BEGIN
	INSERT INTO categories( name, keywords, active, url ) values( name, keywords, active, url );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addProduct`( 
	name VARCHAR(255), 
	SKU VARCHAR(255), 
	price DECIMAL(10, 2), 
	quantity INT, 
	in_stock BOOLEAN, 
	description TEXT, 
	short_description TEXT,
	date_added DATE,
	valid_from DATE,
	valid_till DATE
)
BEGIN
	INSERT INTO products( name, SKU, price, quantity,in_stock, description,short_description, date_added, valid_from, valid_till) values( name, SKU, price, quantity,in_stock, description,short_description, date_added, valid_from, valid_till );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addProductCategories`( 
	pid INT,
	cid INT
)
BEGIN
	INSERT INTO product_categories( pid, cid ) values( pid, cid );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addProductImages`( 
	pid INT,
	role_id INT,
	url VARCHAR(255)
)
BEGIN
	INSERT INTO product_images( pid, role_id, url ) values( pid, role_id, url );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addProductImagesRole`( 
	role_id INT,
	role_value VARCHAR(255)
)
BEGIN
	INSERT INTO product_images_role( role_id, role_value ) values( role_id, role_value );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCategory`(IN `cid` INT)
BEGIN
	DELETE from categories where id=cid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProduct`( pid INT )
BEGIN
	UPDATE products SET is_deleted=1 WHERE id=pid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCategories`()
BEGIN
	select * from categories;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllProducts`()
BEGIN
	select * from products;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCategoryById`( cid INT )
BEGIN
	select * from categories where id=cid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductById`( pid INT )
BEGIN
	select * from products where id=pid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductCategories`( productId INT )
BEGIN
	select * from product_categories where pid=productId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductImages`( productId INT )
BEGIN
	select * from product_images where pid=productId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCategory`( cid INT, cname VARCHAR(255), ckeywords TEXT, cactive BOOLEAN, curl VARCHAR(255) )
BEGIN
	UPDATE categories SET name = cname, keywords = ckeywords, active = cactive, url = curl where id = cid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProduct`( pid INT, pname VARCHAR(255), pSKU VARCHAR(255), pprice DECIMAL(10,2), pquantity INT, pin_stock BOOLEAN, pdescription TEXT, pshort_description TEXT, pvalid_from DATE, pvalid_till DATE  )
BEGIN
	UPDATE products SET name = pname, SKU = pSKU, price = pprice, quantity = pquantity, in_stock = pin_stock, description = pdescription, short_description = pshort_description,
	valid_from = pvalid_from, valid_till = pvalid_till where id = pid;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `keywords` text,
  `active` tinyint(1) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `keywords`, `active`, `url`) VALUES
(1, 'Electronics', 'Electronics', 1, 'electronics'),
(2, 'Men', 'Men', 1, 'men'),
(3, 'Baby & Kids', 'Baby & Kids', 1, 'baby-kids'),
(4, 'Home & Furniture', 'Home & Furniture', 1, 'home-furniture'),
(5, 'Books & Media', 'Books & Media', 1, 'books-media'),
(6, 'Auto & Sports', 'Auto & Sports', 1, 'auto-sports'),
(7, 'Women', 'Women', 1, 'women');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `SKU` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `in_stock` tinyint(1) NOT NULL,
  `description` text,
  `short_description` text,
  `date_added` date DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_till` date DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `SKU`, `price`, `quantity`, `in_stock`, `description`, `short_description`, `date_added`, `valid_from`, `valid_till`, `is_deleted`) VALUES
(1, 'Micromax Canvas Pulse 4G', 'GFSW94217WF39', '9999.00', 100, 1, 'It''s time you bid goodbye to your clunky old phone and experience a brand new way of staying connected. The Micromax Canvas Pulse 4G offers you the reliability of a laptop and the ease of using a phone - all in one smart device. With a 3 GB DDR3 RAM, this device packs a punch so you can multitask between apps, browse the Web and play your favorite games without lag.', 'It''s time you bid goodbye to your clunky old phone and experience a brand new way of staying connected.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(2, 'Letv Le 1S', 'RSVL36348HX29', '10999.00', 100, 1, 'If you''re looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet.', 'If you''re looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(3, 'Moto G (3rd Generation)(Black, 16 GB)', 'LTPU16934PG19', '10999.00', 35, 1, 'Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that''ll always be there for you.', 'Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that''ll always be there for you.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(4, 'Club Vintage Slim Fit Men''s Trousers', 'HEWZ47104KE38', '1399.00', 24, 1, 'Club Vintage High Quality Men''s Chinos-Trousers range for comfort wear and smart slim fit.', '', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(5, 'Feels Good Slim Fit Men''s Trousers', 'BUHW13209IJ64', '1899.00', 67, 1, 'Feels Good is featuring this attractive Trousers made of Satin cotton lycra fabric. This material gives you the comfort and style also. You can team up this chinos with your choice of Shirt.', '', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(6, 'Alia Hand-held Bag (Pink003)', 'OEJB98024TB54', '799.00', 35, 1, 'Quality bags at affordable price, its great for office, parties, markets and all occassions. This pu leather hand bag is a very durable utility item you can carry this hand bag with its twin grab handles to look classy with a fashionable apeal.', 'Quality bags at affordable price, its great for office, parties, markets and all occassions.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(7, 'Incraze Hand-held Bag(White)', 'EOYI63441LY65', '999.00', 35, 1, 'Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.', 'Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(8, 'Rosemary Hand-held Bag(Pink With Blue)', 'SSEE90455WQ18', '1249.00', 28, 1, 'This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel. This handbag is a must-have for women,who prefer stylish handbag, featuring enough room to carry your essentials easily,this non-leather handbag i', 'This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(9, 'Durian DOM/58601 Solid Wood King Bed(Finish Color - High Quality Glossy Polish)', 'LBXR20850AR66', '48000.00', 6, 1, 'Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom. :: Neatly presented with contemporary styling, the Wooden Bed features a sumptuous high slatted headboard with a complimenting low foot end that is perfect for creating a sense of space within your room.', 'Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(10, 'Durian Berry Solid Wood 2 Seater Sofa(Finish Color - DARK BROWN)', 'CWJG63147HV44', '56400.00', 3, 1, 'The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.', 'The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.', '2016-01-01', '2016-01-01', '2022-12-31', 0),
(13, 'TEST', 'test1', '6789.00', 34, 1, 'werwer', 'werwer', '2016-02-25', '2016-02-24', '2018-02-24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE IF NOT EXISTS `product_categories` (
  `pid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  KEY `pid` (`pid`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`pid`, `cid`) VALUES
(1, 1),
(2, 1),
(6, 7),
(7, 7),
(8, 7),
(3, 1),
(4, 2),
(5, 2),
(9, 4),
(10, 4),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE IF NOT EXISTS `product_images` (
  `pid` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  KEY `pid` (`pid`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`pid`, `role_id`, `url`) VALUES
(1, 0, 'http://product1skuview1'),
(1, 0, 'http://product1skuview2'),
(1, 1, 'http://product1skuview3'),
(1, 0, 'http://product1skuview4'),
(1, 2, 'http://product1skuview5'),
(2, 0, 'http://product2skuview1'),
(2, 0, 'http://product2skuview2'),
(2, 1, 'http://product2skuview3'),
(2, 0, 'http://product2skuview4'),
(2, 2, 'http://product2skuview5');

-- --------------------------------------------------------

--
-- Table structure for table `product_images_role`
--

CREATE TABLE IF NOT EXISTS `product_images_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `role_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `product_images_role`
--

INSERT INTO `product_images_role` (`id`, `role_id`, `role_value`) VALUES
(1, 0, 'T'),
(2, 1, 'S'),
(3, 2, 'L');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_categories_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_images_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `product_images_role` (`role_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
