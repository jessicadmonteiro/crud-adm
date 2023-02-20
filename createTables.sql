CREATE DATABASE user_admin;

CREATE TABLE IF NOT EXISTS users(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"email" VARCHAR(100) UNIQUE NOT NULL,
	"password" VARCHAR(120) NOT NULL,
	"admin" BOOLEAN NOT NULL DEFAULT FALSE,
	"active" BOOLEAN NOT NULL DEFAULT TRUE 
);


SELECT
     u."id",
     u."name",
     u."email",
     u."admin",
     u."active" 
FROM
     users 
WHERE  "id" = 14;


UPDATE 
	users 
SET
	"active" = false
WHERE 
	"id" = 14;

	
UPDATE 
    users 
SET
    "active" = true
WHERE 
    "id"= 14;