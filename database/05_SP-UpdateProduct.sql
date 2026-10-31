-- STORED PROCEDURES -> UPDATE PRODUCT
CREATE OR REPLACE FUNCTION sp_update_product(
	p_product_id INT,
	p_category VARCHAR(100) DEFAULT NULL,
	p_name VARCHAR(100) DEFAULT NULL,
	p_description VARCHAR(200) DEFAULT NULL,
	p_price DECIMAL(10, 2) DEFAULT NULL,
	p_image_url VARCHAR(300) DEFAULT NULL,
	p_is_available BOOLEAN DEFAULT NULL
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
	v_product PRODUCT%ROWTYPE;
	v_category_id INT;
	v_name VARCHAR(100);
BEGIN
	-- Validar existencia
	IF p_product_id IS NULL THEN
		RETURN QUERY SELECT
			'Por favor, indique el producto a actualizar.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	SELECT p.*
	INTO v_product
	FROM PRODUCT p
	WHERE p.product_id = p_product_id;

	IF NOT FOUND THEN
		RETURN QUERY SELECT
			'Lo siento, el producto que buscas no existe.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Validar campos de texto si se envían
	IF p_name IS NOT NULL AND TRIM(p_name) = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba el nuevo nombre del platillo.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	IF p_description IS NOT NULL AND TRIM(p_description) = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba la nueva descripción del platillo.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	IF p_price IS NOT NULL AND p_price <= 0 THEN
		RETURN QUERY SELECT
			'El nuevo precio debe ser mayor a 0.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	IF p_image_url IS NOT NULL AND TRIM(p_image_url) = '' THEN
		RETURN QUERY SELECT
			'Por favor, indique la nueva URL de la imagen.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Resolver la categoría
	v_category_id := v_product.category_id;

	IF p_category IS NOT NULL THEN
		IF TRIM(p_category) = '' THEN
			RETURN QUERY SELECT
				'Por favor, indique la nueva categoría del platillo.'::TEXT,
				FALSE;
			RETURN;
		END IF;

		SELECT c.category_id
		INTO v_category_id
		FROM CATEGORY c
		WHERE LOWER(c.name) = LOWER(TRIM(p_category));

		IF v_category_id IS NULL THEN
			RETURN QUERY SELECT
				'Lo siento, la categoría que buscas no existe'::TEXT,
				FALSE;
			RETURN;
		END IF;
	END IF;

	-- Nombre final (nuevo o actual)
	v_name := COALESCE(TRIM(p_name), v_product.name);

	-- Validar duplicados en la categoría
	IF EXISTS (
		SELECT 1
		FROM PRODUCT p
		WHERE p.category_id = v_category_id
		  AND LOWER(p.name) = LOWER(v_name)
		  AND p.product_id <> p_product_id
	) THEN
		RETURN QUERY SELECT
			'Lo siento, ya existe un producto con ese nombre en esa categoría.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Actualizar
	UPDATE PRODUCT
	SET category_id = v_category_id,
		name = v_name,
		description = COALESCE(TRIM(p_description), description),
		price = COALESCE(p_price, price),
		image_url = COALESCE(TRIM(p_image_url), image_url),
		is_available = COALESCE(p_is_available, is_available)
	WHERE product_id = p_product_id;

	RETURN QUERY SELECT
		'Producto actualizado correctamente.'::TEXT,
		TRUE;
END;
$$;