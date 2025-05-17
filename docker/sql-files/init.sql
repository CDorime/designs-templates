CREATE TABLE IF NOT EXISTS clients (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(46) UNIQUE NOT NULL,
  client_password VARCHAR(32) NOT NULL,
  client_email VARCHAR(191) NOT NULL UNIQUE,
  client_phone VARCHAR(13) NOT NULL UNIQUE,
  client_address VARCHAR(78) NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  card_id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  card_name VARCHAR(32) NOT NULL,
  card_pin CHAR(4) NOT NULL,
  card_balance DECIMAL(15,2) DEFAULT 0,
  is_blocked BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_name VARCHAR(46) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  transaction_date DATETIME NOT NULL,
  from_client_id INT NOT NULL,
  to_client_id INT NOT NULL,
  card_id INT NOT NULL,
  FOREIGN KEY (card_id) REFERENCES cards(card_id) ON DELETE CASCADE
);