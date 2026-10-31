-- STORED PROCEDURES -> LOGIN
CREATE OR REPLACE FUNCTION sp_login(
	p_email VARCHAR(150),
	p_password VARCHAR(8)
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN,
	out_client_id INT,
	out_role VARCHAR(5)
)
LANGUAGE plpgsql
AS $$
BEGIN
	IF p_email IS NULL OR TRIM(p_email) = ''
	   OR p_password IS NULL OR p_password = '' THEN
		RETURN QUERY SELECT
			'Por favor, escriba su correo y contraseña para iniciar sesión.'::TEXT, 
			FALSE,
			NULL::INT,
			NULL::VARCHAR(5);
		RETURN;
	END IF;

	RETURN QUERY SELECT
		'¡Inicio de sesión exitoso!'::TEXT,
		TRUE,
		c.client_id,
		c.role
	FROM CLIENT c
	WHERE c.email = LOWER(TRIM(p_email)) AND c.password_hash = crypt(p_password, c.password_hash);

	IF NOT FOUND THEN
		RETURN QUERY SELECT
			'Lo siento, el correo o contraseña son incorrectos'::TEXT,
			FALSE,
			NULL::INT,
			NULL::VARCHAR(5);
	END IF;
END;
$$;