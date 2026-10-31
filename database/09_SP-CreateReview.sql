-- STORED PROCEDURES -> CREATE A REVIEW
CREATE OR REPLACE FUNCTION sp_create_review(
	p_client_id INT,
	p_comment VARCHAR(200),
	p_rating INT
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
	-- VALIDACIONES
	-- Cliente
	IF p_client_id IS NULL OR NOT EXISTS (SELECT 1 FROM CLIENT c WHERE c.client_id = p_client_id) THEN
		RETURN QUERY SELECT 
			'Lo siento, el cliente que buscas no existe.'::TEXT, 
			FALSE;
		RETURN;
	END IF;
	
	-- Comentario
	IF p_comment IS NULL OR TRIM(p_comment) = '' THEN 
		RETURN QUERY SELECT 
			'Por favor, escriba un comentario.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	-- Calificación
	IF p_rating IS NULL OR p_rating NOT BETWEEN 1 AND 5 THEN
		RETURN QUERY SELECT
			'Lo siento, la calificación debe ser de 1 a 5 estrellas.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	-- Insertar
	INSERT INTO REVIEW(client_id, comment, rating)
	VALUES(p_client_id, TRIM(p_comment), p_rating);

	RETURN QUERY SELECT
		'Reseña enviada, será revisada antes de publicarse.'::TEXT,
		TRUE;
END;
$$;