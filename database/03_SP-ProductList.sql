-- STORED PROCEDURES -> PRODUCT INFORMATION
CREATE OR REPLACE FUNCTION sp_get_products(
	p_category_name VARCHAR(100) DEFAULT 'Entradas',
	p_page INTEGER DEFAULT 1
)
RETURNS TABLE(
	mensaje TEXT,
	product_id INT,
	product_name VARCHAR(100),
	description VARCHAR(200),
	price DECIMAL(10, 2),
	image_url VARCHAR(300),
	has_more BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
	v_category_id INT;
	v_page_size CONSTANT INT := 8;
BEGIN
	-- Evitar páginas inválidas
	IF p_page IS NULL OR p_page < 1 THEN
		p_page := 1;
	END IF;

	-- Buscar category_id
	SELECT c.category_id
	INTO v_category_id
	FROM CATEGORY c
	WHERE LOWER(c.name) = LOWER(TRIM(p_category_name));

	IF v_category_id IS NULL THEN
		RETURN QUERY SELECT
			'Lo siento, la categoría que busca no existe.'::TEXT,
			NULL::INT,
			NULL::VARCHAR,
			NULL::VARCHAR,
			NULL::DECIMAL,
			NULL::VARCHAR,
			FALSE;
		RETURN;
	END IF;

	-- Productos de la categoría
	RETURN QUERY
    SELECT
		NULL::TEXT,
        p.product_id,
        p.name,
        p.description,
        p.price,
        p.image_url,
		(p_page * v_page_size) < COUNT(*) OVER ()
    FROM PRODUCT p
	WHERE p.category_id = v_category_id 
		AND p.is_available = TRUE
    ORDER BY p.product_id
    LIMIT v_page_size
    OFFSET (p_page - 1) * v_page_size;

	IF NOT FOUND THEN
		RETURN QUERY SELECT
			'No hay más productos en esta categoría.'::TEXT,
			NULL::INT,
			NULL::VARCHAR,
			NULL::VARCHAR,
			NULL::DECIMAL,
			NULL::VARCHAR,
			FALSE;
	END IF;
END;
$$;