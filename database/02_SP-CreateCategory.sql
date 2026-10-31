-- STORED PROCEDURES - CREATE CATEGORY
CREATE OR REPLACE FUNCTION sp_create_category(
	p_name VARCHAR(100)
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
	-- Validar que no sea NULL ni vacía
	IF p_name IS NULL OR TRIM(p_name) = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba una categoría para añadir.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Validar existencia
	IF EXISTS(SELECT 1 FROM CATEGORY WHERE LOWER(name) = LOWER(TRIM(p_name))) THEN
		RETURN QUERY SELECT
			'Lo siento, la categoría que busca añadir ya existe.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	-- Insertar
	INSERT INTO CATEGORY(name)
	VALUES (TRIM(p_name));

	RETURN QUERY SELECT
		'La nueva categoría ha sido creada correctamente.'::TEXT,
		TRUE;
END;
$$;