show DATABASE;

CREATE Table users(
  id VARCHAR(50) PRIMARY key,
  username VARCHAR(30) UNIQUE,
  email VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL
);

