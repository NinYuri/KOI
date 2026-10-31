-- STORED PROCEDURES -> CREATE PRODUCT
CREATE OR REPLACE FUNCTION sp_create_product(
	p_category VARCHAR(100),
	p_name VARCHAR(100),
	p_description VARCHAR(200),
	p_price DECIMAL(10, 2),
	p_image_url VARCHAR(300)
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE v_category_id INT;
BEGIN
	-- VALIDACIONES
	-- Categoría
	IF p_category IS NULL OR TRIM(p_category) = '' THEN
		RETURN QUERY SELECT
			'Por favor, indique la categoría a la que pertenece el platillo.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Nombre
	IF p_name IS NULL OR TRIM(p_name) = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba el nombre del platillo.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Descripción
	IF p_description IS NULL OR TRIM(p_description) = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba la descripción correspondiente al platillo.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Precio
	IF p_price IS NULL OR p_price <= 0 THEN
		RETURN QUERY SELECT
			'El precio debe ser mayor a 0.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Imagen
	IF p_image_url IS NULL OR TRIM(p_image_url) = '' THEN
		RETURN QUERY SELECT
			'Por favor, indique la URL de la imagen.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Buscar category_id
	SELECT c.category_id
	INTO v_category_id
	FROM CATEGORY c
	WHERE LOWER(c.name) = LOWER(TRIM(p_category));

	IF v_category_id IS NULL THEN
		RETURN QUERY SELECT
			'Lo siento, la categoría que buscas no existe.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Validar que no exista un producto con el mismo nombre en esa categoría
	IF EXISTS (
		SELECT 1 FROM PRODUCT p WHERE p.category_id = v_category_id AND LOWER(p.name) = LOWER(TRIM(p_name))
	) THEN
		RETURN QUERY SELECT
			'Lo siento, ya existe un producto con ese nombre en la categoría.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Insertar producto
	INSERT INTO PRODUCT(category_id, name, description, price, image_url)
	VALUES (
		v_category_id,
		TRIM(p_name),
		TRIM(p_description),
		p_price,
		TRIM(p_image_url)
	);

	RETURN QUERY SELECT
		'Producto creado correctamente.'::TEXT,
		TRUE;
END;
$$;