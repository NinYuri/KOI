-- STORED PROCEDURES -> DELETE PRODUCT
CREATE OR REPLACE FUNCTION sp_delete_product(
	p_product_id INT
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
	IF p_product_id IS NULL THEN
		RETURN QUERY SELECT
			'Por favor, indique el producto a eliminar.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	DELETE FROM PRODUCT p
	WHERE p.product_id = p_product_id;

	IF NOT FOUND THEN
		RETURN QUERY SELECT
			'Lo siento, el producto a eliminar no existe.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	RETURN QUERY SELECT
		'Producto eliminado correctamente.'::TEXT,
		TRUE;
END;
$$;