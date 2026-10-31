-- STORED PROCEDURES -> CREATE CLIENT
CREATE OR REPLACE FUNCTION sp_create_client(
	p_first_name VARCHAR(100),
	p_last_name VARCHAR(100),
	p_email VARCHAR(150),
	p_password TEXT,
	p_avatar_url VARCHAR(300) DEFAULT NULL,
	p_role BOOLEAN DEFAULT FALSE
)
RETURNS TABLE(
	mensaje TEXT,
	success BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE v_email VARCHAR(150);
BEGIN
	-- VALIDACIONES
	-- Nombre y apellido
	IF p_first_name IS NULL OR TRIM(p_first_name) = '' THEN
		RETURN QUERY SELECT 
			'Por favor, escriba su nombre.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	IF p_first_name !~ '^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$' THEN
	    RETURN QUERY SELECT
	        'El nombre solo debe contener letras y espacios.'::TEXT,
	        FALSE;
	    RETURN;
	END IF;

	IF p_last_name IS NULL OR TRIM(p_last_name) = '' THEN
		RETURN QUERY SELECT 
			'Por favor, escriba su apellido.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	IF p_last_name !~ '^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$' THEN
	    RETURN QUERY SELECT
	        'El apellido solo debe contener letras y espacios.'::TEXT,
	        FALSE;
	    RETURN;
	END IF;

	-- Correo
	IF p_email IS NULL OR TRIM(p_email) = '' THEN
		RETURN QUERY SELECT 
			'Por favor, escriba su correo electrónico.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	v_email := LOWER(TRIM(p_email));

	IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
		RETURN QUERY SELECT 
			'Lo siento, el correo ingresado no tiene un formato válido.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	IF EXISTS (SELECT 1 FROM CLIENT c WHERE c.email = v_email) THEN
		RETURN QUERY SELECT 
			'Lo siento, ya existe una cuenta registrada con ese correo electrónico.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	-- Contraseña
	IF p_password IS NULL OR LENGTH(p_password) < 8 THEN
		RETURN QUERY SELECT 
			'La contraseña debe tener al menos 8 caracteres.'::TEXT, 
			FALSE;
		RETURN;
	END IF;

	-- Insertar
	INSERT INTO CLIENT(first_name, last_name, avatar_url, email, password_hash, role)
	VALUES (
		TRIM(p_first_name),
		TRIM(p_last_name),
		NULLIF(TRIM(p_avatar_url), ''),
		v_email,
		crypt(p_password, gen_salt('bf')),
		CASE 
			WHEN p_role THEN 'Admin' 
			ELSE 'User' 
		END
	);

	RETURN QUERY SELECT 
		'Cuenta creada correctamente.'::TEXT, 
		TRUE;
END;
$$;