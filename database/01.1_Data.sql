-- CLIENT
-- Create using the stored procedure 
-- 'sp_create_client(p_first_name VARCHAR(100), p_last_name VARCHAR(100), p_email VARCHAR(150), p_password TEXT, p_avatar_url VARCHAR(300), p_role BOOLEAN)'
SELECT * FROM sp_create_client(
	'Carmen',
	'Mota Sandoval',
	'carmen@gmail.com',
	'12345678',
	NULL,
	TRUE
);

-- Login using the stored procedure 'sp_login(p_email VARCHAR(150), p_password TEXT)'
SELECT * FROM sp_login('yuri@gmail.com', '12345678');

SELECT * FROM CLIENT;


-- REVIEW
-- Data required for the Review Table, using the stored procedure 
-- 'sp_create_review(p_client_id VARCHAR(200), p_comment VARCHAR(200), p_rating INT)'
SELECT * FROM sp_create_review(1, 'El Dragon Roll es mi favorito. Todo se siente fresco y la presentación está preciosa. ¡Ya quiero volver!', 4);

-- Publish a review using the stored procedure 'sp_post_review(p_admin_id INT, p_review_id INT, p_published BOOLEAN)'
SELECT * FROM sp_post_review(3, 1, TRUE);

SELECT * FROM REVIEW;


-- CATEGORY
-- Data required for the Category Table, using the stored procedure 'sp_create_category(name VARCHAR(100))'
SELECT * FROM sp_create_category('Entradas');
SELECT * FROM sp_create_category('Rolls');
SELECT * FROM sp_create_category('Nigiri');
SELECT * FROM sp_create_category('Combos');
SELECT * FROM sp_create_category('Postres');
SELECT * FROM sp_create_category('Bebidas');

SELECT * FROM CATEGORY;


-- PRODUCT
-- Create using the stored procedure 
-- 'sp_create_product(p_category VARCHAR(100), p_name VARCHAR(100), p_description VARCHAR(200), p_price DECIMAL(10, 2), p_image_url VARCHAR(300))'
SELECT * FROM sp_create_product(
	'Entradas',
	'Spring Rolls',
	'Rollitos crujientes rellenos de camarón y vegetales salteados.',
	75,
	'.......'
);

-- Update a product using the stored procedure 'sp_update_product(p_product_id INT, ..data...)'
SELECT * FROM sp_update_product(1, 'Entradas', NULL, NULL, NULL, NULL, TRUE);

-- List using the stored procedure 'sp_get_products(p_category VARCHAR(100), p_page 1)'
SELECT * FROM sp_get_products('Entradas', 1);  -- first 8
SELECT * FROM sp_get_products('Entradas', 2);  -- next 8

-- Delete a product using the stored procedure 'sp_delete_product(p_product_id INT)'
SELECT * FROM sp_delete_product(1);

SELECT * FROM PRODUCT;