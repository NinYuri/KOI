CREATE OR REPLACE FUNCTION sp_get_published_reviews()
RETURNS TABLE(
    review_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(300),
    comment VARCHAR(200),
    rating INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.review_id,
        c.first_name,
        c.last_name,
        c.avatar_url,
        r.comment,
        r.rating
    FROM REVIEW r
    INNER JOIN CLIENT c ON r.client_id = c.client_id
    WHERE r.is_published = TRUE
    ORDER BY r.review_id DESC;
END;
$$;