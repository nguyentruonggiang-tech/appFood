-- ============================================================
-- BÀI TẬP SQL - APP FOOD
-- ============================================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS app_food
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE app_food;

-- ------------------------------------------------------------
-- 1. Bảng users (người dùng)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. Bảng restaurants (nhà hàng)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  res_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  res_name VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NULL,
  `desc` VARCHAR(255) NOT NULL DEFAULT "Chưa có thông tin",
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (res_name)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. Bảng like_res (người dùng like nhà hàng)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS like_res;

CREATE TABLE like_res (
  user_id INT UNSIGNED NOT NULL,
  res_id INT UNSIGNED NOT NULL,
  date_like DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_like BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (res_id) REFERENCES restaurants(res_id) ON DELETE CASCADE,
  INDEX idx_res (res_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. Bảng rate_res (đánh giá nhà hàng)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS rate_res;
CREATE TABLE rate_res (
  user_id INT UNSIGNED NOT NULL,
  res_id INT UNSIGNED NOT NULL,
  amount TINYINT UNSIGNED NOT NULL,
  date_rate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (res_id) REFERENCES restaurants(res_id) ON DELETE CASCADE,
  INDEX idx_res (res_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 5. Bảng food_type (loại món ăn)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS food_type;
CREATE TABLE food_type (
  type_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- 6. Bảng foods (món ăn)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS foods;
CREATE TABLE foods (
  food_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  food_name VARCHAR(150) NOT NULL,
  `image` VARCHAR(255) NULL,
  price DECIMAL(10,2) NOT NULL,
  `desc` VARCHAR(255) NOT NULL DEFAULT "Chưa có thông tin",
  type_id INT UNSIGNED NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (type_id) REFERENCES food_type(type_id) ON DELETE CASCADE,
  INDEX idx_type (type_id)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- 7. Bảng sub_food (chi tiết đơn hàng - optional)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS sub_food;
CREATE TABLE sub_food (
  sub_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sub_name VARCHAR(255) NOT NULL,
  sub_price DECIMAL(10,2) NOT NULL,
  food_id INT UNSIGNED NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE,
  INDEX idx_sub_food (sub_id)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- 8. Bảng orders (đơn hàng)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  user_id INT UNSIGNED NOT NULL,
  food_id INT UNSIGNED NOT NULL,
  amount INT UNSIGNED NOT NULL,
  `code` VARCHAR(255) NOT NULL,
  arr_sub_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, food_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_food (food_id),
  INDEX idx_code (`code`)
) ENGINE=InnoDB;



-- ============================================================
-- DỮ LIỆU MẪU (Sample data)
-- ============================================================

INSERT INTO users (full_name, email, password) VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', '123456'),
('Trần Thị B', 'tranthib@gmail.com', '123456'),
('Lê Văn C', 'levanc@gmail.com', '123456'),
('Phạm Thị D', 'phamthid@gmail.com', '123456'),
('Hoàng Văn E', 'hoangvane@gmail.com', '123456'),
('Võ Thị F', 'vothif@gmail.com', '123456'),
('Đặng Văn G', 'dangvang@gmail.com', '123456'),
('Bùi Thị H', 'buithih@gmail.com', '123456'),
('Ngô Văn I', 'ngovani@gmail.com', '123456'),
('Dương Thị K', 'duongthik@gmail.com', '123456');


INSERT INTO restaurants (res_name, `image`, `desc`) VALUES
('Nhà hàng 1', 'res1.jpg', 'Mô tả nhà hàng 1'),
('Nhà hàng 2', 'res2.jpg', 'Mô tả nhà hàng 2'),
('Nhà hàng 3', 'res3.jpg', 'Mô tả nhà hàng 3');


INSERT INTO food_type (type_name) VALUES
('Phở & Bún'),
('Cơm'),
('Bánh mì'),
('Lẩu & Nướng');


INSERT INTO foods (food_name, `image`, price, `desc`, type_id) VALUES
('Phở bò', 'phobo.jpg', 45000, 'Phở bò', 1),
('Phở gà', 'phoga.jpg', 40000, 'Phở gà', 1),
('Bún bò Huế', 'bunbohue.jpg', 35000, 'Bún bò Huế', 1),
('Bún bò đặc biệt', 'bunbo_db.jpg', 45000, 'Bún bò đặc biệt', 1),
('Cơm tấm sườn', 'comtam_suon.jpg', 40000, 'Cơm tấm sườn', 2),
('Cơm tấm bì', 'comtam_bi.jpg', 35000, 'Cơm tấm bì', 2),
('Bánh mì thịt', 'banhmi_thit.jpg', 25000, 'Bánh mì thịt', 3),
('Bánh mì pate', 'banhmi_pate.jpg', 22000, 'Bánh mì pate', 3),
('Lẩu thái hải sản', 'laut_hai_san.jpg', 120000, 'Lẩu thái hải sản', 4),
('Lẩu thái gà', 'laut_ga.jpg', 100000, 'Lẩu thái gà', 4);

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Thêm tái', 10000, 1),
('Thêm nạm', 10000, 1),
('Thêm trứng', 5000, 5),
('Thêm bì', 8000, 5),
('Size L', 5000, 7),
('Size L', 5000, 8);

INSERT INTO like_res (user_id, res_id) VALUES
(1,1),(1,2),(1,3),
(2,1),(2,2),(2,3),
(3,1),(3,2),(3,3),
(4,1),(4,2),(4,3),
(5,1),(5,2),
(6,1),(6,2),(6,3),
(7,1),(7,2),(7,3),
(8,1),
(9,1),(9,2),(9,3);

INSERT INTO rate_res (user_id, res_id, amount) VALUES
(1,1,5),(1,2,4),(2,1,4),(2,2,5),(3,1,3),(3,3,4),
(4,2,5),(5,1,4),(6,3,4),(7,1,5),(8,2,4),(9,1,4);


INSERT INTO orders (user_id, food_id, amount, `code`, arr_sub_id) VALUES
(1,1,2,'ORD001','1,2'),(1,3,1,'ORD002',''),(1,5,2,'ORD003','3'),(1,7,3,'ORD004','5'),(1,9,1,'ORD005',''),
(2,1,1,'ORD006',''),(2,3,2,'ORD007',''),
(3,2,1,'ORD008',''),(3,5,1,'ORD009','4'),
(4,3,2,'ORD010',''),(4,6,1,'ORD011',''),
(5,1,1,'ORD012',''),
(6,5,1,'ORD013','3'),
(7,1,1,'ORD014',''),(7,3,1,'ORD015',''),
(8,3,1,'ORD016',''),
(9,1,2,'ORD017',''),(9,7,1,'ORD018','5');
