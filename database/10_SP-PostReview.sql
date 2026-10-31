-- STORED PROCEDURES -> POST A REVIEW
CREATE OR REPLACE FUNCTION sp_post_review(
	p_admin_id INT,
	p_review_id INT,
	p_published BOOLEAN DEFAULT TRUE
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
	-- Solo un Admin puede publicar o despublicar
	IF p_admin_id IS NULL OR NOT EXISTS (
		SELECT 1 FROM CLIENT c WHERE c.client_id = p_admin_id AND c.role = 'Admin'
	) THEN
		RETURN QUERY SELECT
			'Lo siento, no tienes permisos para realizar esta acción.'::TEXT,
			FALSE;
		RETURN;
	END IF;

	IF p_review_id IS NULL OR p_published IS NULL THEN
		RETURN QUERY SELECT 
			'Lo siento, los datos están incompletos.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	UPDATE REVIEW
	SET is_published = p_published
	WHERE review_id = p_review_id;

	IF NOT FOUND THEN
		RETURN QUERY SELECT 
			'Lo siento, la reseña no existe.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	RETURN QUERY SELECT
		CASE WHEN p_published
			THEN '¡Reseña publicada correctamente!'
			ELSE '¡Reseña ocultada correctamente!'
		END::TEXT,
		TRUE;
END;
$$;