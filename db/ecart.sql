
----------- table categories ----------------

	create table categories( id INT, name varchar(255), keywords text );
	ALTER TABLE categories ADD PRIMARY KEY ( id );
	ALTER TABLE categories MODIFY COLUMN id INT auto_increment;
	ALTER TABLE categories MODIFY name varchar(255) NOT NULL;
	ALTER TABLE categories ADD active boolean NOT NULL;
	ALTER TABLE categories ADD url varchar(255) NOT NULL;

	DESCRIBE categories;

	Insert into categories(name, keywords, active ) values('Electronics', 'Electronics', 1), ('Men', 'Men', 1),('Women', 'Women', 1),('Baby & Kids', 'Baby & Kids', 1),('Home & Furniture', 'Home & Furniture', 1),('Books & Media', 'Books & Media', 1),('Auto & Sports', 'Auto & Sports', 0);

	select  * from categories;

	update categories set url="electronics" where id =1;
	update categories set url="men" where id =2;
	update categories set url="women" where id =3;
	update categories set url="baby-kids" where id =4;
	update categories set url="home-furniture" where id =5;
	update categories set url="books-media" where id =6;
	update categories set url="auto-sports" where id =7;

	DELIMITER //
	CREATE PROCEDURE getProductById
	(IN productId INT)
	BEGIN
	  SELECT * FROM products
	  WHERE id = productId;
	END //
	DELIMITER ;

	DELIMITER //
	CREATE PROCEDURE addNewProduct
	( category_ids, name, SKU, price, quantity, enabled, description, short_description )
	BEGIN
	  	INSERT INTO products( category_ids, name, SKU, price, quantity, enabled, description, short_description ) values("[1]", "Micromax Canvas Pulse 4G", "GFSW94217WF39", 9999.00,100,1,"It's time you bid goodbye to your clunky old phone and experience a brand new way of staying connected. The Micromax Canvas Pulse 4G offers you the reliability of a laptop and the ease of using a phone - all in one smart device. With a 3 GB DDR3 RAM, this device packs a punch so you can multitask between apps, browse the Web and play your favorite games without lag.","It's time you bid goodbye to your clunky old phone and experience a brand new way of staying connected.");
	END //
	DELIMITER ;

----------- table products ----------------
	create table products( id INT NOT NULL PRIMARY KEY,category_id INT NOT NULL, name varchar(255) NOT NULL, SKU varchar(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, quantity INT NOT NULL, enabled boolean NOT NULL, description text, short_description text );

	DESCRIBE products;

	ALTER TABLE products ADD CONSTRAINT fk_categories_id FOREIGN KEY (category_id) REFERENCES categories(id);
	ALTER TABLE products MODIFY COLUMN id INT auto_increment;
	//ALTER TABLE products DROP FOREIGN KEY fk_categories_id;
	ALTER TABLE products MODIFY COLUMN id INT NOT NULL auto_increment;

	ALTER TABLE products MODIFY COLUMN category_ids varchar(255) NOT NULL;

	//ALTER TABLE products CHANGE description description text;



	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values("[1]", "Micromax Canvas Pulse 4G", "GFSW94217WF39", 9999.00,100,1,"It's time you bid goodbye to your clunky old phone and experience a brand new way of staying connected. The Micromax Canvas Pulse 4G offers you the reliability of a laptop and the ease of using a phone - all in one smart device. With a 3 GB DDR3 RAM, this device packs a punch so you can multitask between apps, browse the Web and play your favorite games without lag.","It's time you bid goodbye to your clunky old phone and experience a brand new way of staying connected.");

	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[1]', 'Letv Le 1S', 'RSVL36348HX29', 10999.00,100,1,"If you're looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet.","If you're looking for a stylish, high-performing smartphone that is economical, then the Le 1s is a worthy bet."), (1, 'Moto G (3rd Generation)(Black, 16 GB)', 'LTPU16934PG19', 10999.00,35,1,"Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that'll always be there for you.","Advanced IPX7 water resistance, a 13 MP rear camera and a 5 MP front camera, a long-lasting 2470 mAh battery and Android Lollipop. Meet the beautifully crafted Moto G (3rd Gen), the phone that'll always be there for you.");


	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[2]', "Club Vintage Slim Fit Men's Trousers", 'HEWZ47104KE38', 1399.00,24,1,"Club Vintage High Quality Men's Chinos-Trousers range for comfort wear and smart slim fit.", "");
	
	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[2]', "Feels Good Slim Fit Men's Trousers", 'BUHW13209IJ64', 1899.00,67,1,"Feels Good is featuring this attractive Trousers made of Satin cotton lycra fabric. This material gives you the comfort and style also. You can team up this chinos with your choice of Shirt.","");

	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[3]', "Alia Hand-held Bag (Pink003)", 'OEJB98024TB54', 799.00,35,1,"Quality bags at affordable price, its great for office, parties, markets and all occassions. This pu leather hand bag is a very durable utility item you can carry this hand bag with its twin grab handles to look classy with a fashionable apeal.","Quality bags at affordable price, its great for office, parties, markets and all occassions.");

	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[3]', "Incraze Hand-held Bag(White)", 'EOYI63441LY65', 999.00,35,1,"Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.","Presenting From The House Of Incraze, Stylish Handbags That Are Designed For Casual Purpose. This One Exhibits The Preferences Of The Modern Indian Women Due To Its Captivating Design.");
	
	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[3]', "Rosemary Hand-held Bag(Pink With Blue)", 'SSEE90455WQ18', 1249.00,28,1,"This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel. This handbag is a must-have for women,who prefer stylish handbag, featuring enough room to carry your essentials easily,this non-leather handbag i","This handbag is made of beautiful non leather tote in traditional methods in order to maintain it soft feel.");

	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[5]', "Durian DOM/58601 Solid Wood King Bed(Finish Color - High Quality Glossy Polish)", 'LBXR20850AR66', 48000.00,6,1,"Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom. :: Neatly presented with contemporary styling, the Wooden Bed features a sumptuous high slatted headboard with a complimenting low foot end that is perfect for creating a sense of space within your room.","Wooden Slatted Bed is elegantly presented with its clean, crisp lines and beautiful detailing that will enhance the look and feel of your bedroom.");

	Insert into products( category_ids, name, SKU, price, quantity, enabled, description, short_description) values('[5]', "Durian Berry Solid Wood 2 Seater Sofa(Finish Color - DARK BROWN)", 'CWJG63147HV44', 56400.00,3,1,"The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.","The classic English roll arm,dropping arm and plush sink-in comfort are the features that adorn this sofa.");


	// stock keeping unit

	