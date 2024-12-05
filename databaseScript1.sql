CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(100) NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Harper Lee'),(2,'George R. R. Martin'),(22,'Jane Austen'),(23,'George Orwell'),(24,'Erin Morgenstern'),(25,'Fredrik Backman'),(26,'Liane Moriarty'),(27,'Frank Herbert'),(28,'Orson Scott Card'),(29,'Yuval Noah Harari'),(30,'Tara Westover'),(31,'Barbara W. Tuchman'),(32,'Mary Beard'),(33,'Walter Isaacson'),(34,'Anne Frank'),(35,'Jon Krakauer'),(36,'J.R.R. Tolkien'),(37,'Yann Martel');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_image`
--

DROP TABLE IF EXISTS `book_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_image` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `position` bigint NOT NULL,
  `url` varchar(255) NOT NULL,
  `book_book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `FKhv7mnjdau0ydlj8u9wipanbbt` (`book_book_id`),
  CONSTRAINT `book_image_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `FKhv7mnjdau0ydlj8u9wipanbbt` FOREIGN KEY (`book_book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_image`
--

LOCK TABLES `book_image` WRITE;
/*!40000 ALTER TABLE `book_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reservations`
--

DROP TABLE IF EXISTS `book_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reservations` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `reservation_date` date DEFAULT NULL,
  `status` enum('reserved','cancelled') NOT NULL DEFAULT 'reserved',
  `book_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `FKg5kli21h3rfndgsed1pkgnucc` (`book_id`),
  CONSTRAINT `FKg5kli21h3rfndgsed1pkgnucc` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reservations`
--

LOCK TABLES `book_reservations` WRITE;
/*!40000 ALTER TABLE `book_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reviews`
--

DROP TABLE IF EXISTS `book_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review_text` varchar(255) DEFAULT NULL,
  `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `book_reviews_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reviews`
--

LOCK TABLES `book_reviews` WRITE;
/*!40000 ALTER TABLE `book_reviews` DISABLE KEYS */;
INSERT INTO `book_reviews` VALUES (12,6,3,4,'Very interesting.','2024-10-15 02:22:38'),(13,3,3,3,'It was okay.','2024-10-15 02:22:38'),(14,6,4,5,'Loved it!','2024-10-15 02:22:38'),(29,3,3,1,'test comment','2024-12-02 04:01:00'),(30,3,3,1,'aaa','2024-12-02 04:04:17'),(31,3,3,1,'aaa11','2024-12-02 04:04:40'),(32,3,3,1,'aaa2','2024-12-02 04:04:55'),(34,5,24,5,'good bôk','2024-12-02 16:43:55'),(35,3,5,4,'nike bôk','2024-12-02 16:45:01'),(36,3,33,5,'ươ!!','2024-12-02 16:46:07'),(37,6,32,5,'very nice! :)','2024-12-02 16:47:15'),(38,6,31,5,'!!!!','2024-12-02 16:48:02'),(39,6,30,1,'#@#@','2024-12-02 16:48:07'),(40,6,29,3,'ádasdasd','2024-12-02 16:48:14'),(41,3,32,5,'ádasdasdasd','2024-12-02 16:48:36'),(42,3,31,5,'@@@@','2024-12-02 16:48:43'),(43,3,30,5,':)))','2024-12-02 16:48:53'),(44,3,29,5,'aaaaaaaa','2024-12-02 16:49:08'),(45,3,27,5,'good','2024-12-02 16:49:15'),(46,3,26,5,'aaaaaa','2024-12-02 16:49:20'),(47,17,33,5,'nice one 1','2024-12-02 16:54:05'),(48,17,32,5,'wow','2024-12-02 16:54:26'),(49,17,31,4,'skibidi','2024-12-02 16:54:39'),(50,17,30,3,'yes sir','2024-12-02 16:54:51'),(51,17,22,4,'qweqweqweq','2024-12-02 17:01:20');
/*!40000 ALTER TABLE `book_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  `publication_year` int DEFAULT NULL,
  `copies` int DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `status` enum('NEW','USED','DAMAGED') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `category_id` (`category_id`),
  KEY `author_id` (`author_id`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`),
  CONSTRAINT `books_ibfk_3` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (3,'A Game of Thrones',1,2,2,1996,9,'10','USED','2024-10-11 10:37:38','2024-11-02 18:30:47','https://drive.google.com/uc?export=view&id=1KtJ0oIIBL2m-D0hzgOrX7XxXFOET4Lb7'),(4,'1984 ',1,23,3,2020,9,'A dystopian tale set in a totalitarian society under constant surveillance, where independent thought is suppressed. It follows Winston Smith’s struggle against the Party and its leader, Big Brother.','USED','2024-10-15 02:17:38','2024-12-02 16:16:57','https://drive.google.com/uc?export=view&id=1Z4-2d8k4WWqD93a7od_z7UbxObfICs8R'),(5,'Pride and Prejudice',1,22,3,2019,9,'A timeless love story about misunderstandings, prejudice, and self-discovery between the intelligent and independent Elizabeth Bennet and the wealthy but aloof Mr. Darcy, set in 19th-century English society.','NEW','2024-10-15 02:17:38','2024-12-02 16:17:30','https://drive.google.com/uc?export=view&id=15wEjMTNuAY6Hz4C3qPR8YOtzzNQGiBMw'),(20,'The Night Circus',2,24,4,2003,11,'A whimsical and enchanting tale of two young magicians, Celia and Marco, who are bound in a competition to the death, set within the mysterious and magical confines of a traveling circus.','NEW','2024-12-02 16:20:36','2024-12-02 16:20:36','https://drive.google.com/uc?export=view&id=1tNfVhCUjCt-PHhPPCzoJYdVgQS_ASbSF'),(21,'A Man Called Ove',2,25,5,2012,1,'A heartwarming story about a grumpy old man named Ove whose life changes when a lively young family moves in next door, uncovering his hidden kindness and tragic past.','USED','2024-12-02 16:22:00','2024-12-02 16:22:00','https://drive.google.com/uc?export=view&id=1OdWV6c9ypbbgArZLBTJ8yYjEK88F5hwH'),(22,'Big Little Lies',2,26,6,2002,1,'A cleverly woven tale of secrets, lies, and murder in an affluent suburban community, focusing on the lives of three women and the dark truths beneath their perfect facades.','NEW','2024-12-02 16:23:08','2024-12-02 16:23:08','https://drive.google.com/uc?export=view&id=1Y-mrp0AniIi4oeR_clEc17I9eWsRRL9O'),(23,'Dune ',4,27,7,1998,1,'A monumental tale of politics, religion, and power set on the desert planet Arrakis, focusing on Paul Atreides as he becomes a leader in a battle for control of a precious resource.','USED','2024-12-02 16:24:45','2024-12-02 16:24:45','https://drive.google.com/uc?export=view&id=1HQ4MLd_MUi7saaRwk8KOOkEXFAYo0jQT'),(24,'Ender’s Game',4,28,9,1999,4,'A thrilling story about a young genius, Ender Wiggin, who is trained in a space-based military academy to fight an alien race, delving into morality and leadership.','DAMAGED','2024-12-02 16:25:35','2024-12-02 16:25:35','https://drive.google.com/uc?export=view&id=18n8JSWq8BteckSZmlIojebk6RqSTqY5Q'),(25,'Sapiens: A Brief History of Humankind',3,29,8,2001,1,'A fascinating exploration of the history of humanity, from the evolution of Homo sapiens to the modern age, examining how culture, science, and technology have shaped the world.','DAMAGED','2024-12-02 16:31:19','2024-12-02 16:31:19','https://drive.google.com/uc?export=view&id=11RPQmP1jAjsjxupD3Ug2J7UjfSAK8-us'),(26,'Educated',3,30,9,2012,2,'A powerful memoir of a woman who grows up in a strict and abusive household in rural Idaho and escapes through education, ultimately earning a Ph.D. at Cambridge University.','USED','2024-12-02 16:32:51','2024-12-02 16:32:51','https://drive.google.com/uc?export=view&id=18VJnEzoZtKtnyQnwdBGD2p-WU34kj2vM'),(27,'The Guns of August',6,31,10,1989,0,'A Pulitzer Prize-winning account of the events leading up to World War I, offering a gripping narrative of the decisions, misunderstandings, and alliances that shaped one of history’s deadliest conflicts.','DAMAGED','2024-12-02 16:35:01','2024-12-02 16:35:01','https://drive.google.com/uc?export=view&id=1JBYAxXL3GdezZKcJjV3OS8GEtcoK8L_9'),(28,'SPQR: A History of Ancient Rome',6,32,12,1998,3,'A detailed and engaging exploration of the history of Rome, from its founding to the rise of its empire, focusing on its people, politics, and culture.','DAMAGED','2024-12-02 16:35:51','2024-12-02 16:35:51','https://drive.google.com/uc?export=view&id=1uCEZJKeBRnzcySE0yJLtS9Yutfn4fc6U'),(29,'Steve Jobs',7,33,10,2012,11,'A definitive biography of Steve Jobs, the visionary co-founder of Apple, chronicling his creative genius, personal struggles, and impact on technology and culture.','USED','2024-12-02 16:37:28','2024-12-02 16:37:28','https://drive.google.com/uc?export=view&id=1cGdbGnptF_4-yo3EKYvHD6UP1SZrUmMq'),(30,'The Diary of a Young Girl',7,34,11,2001,5,'The poignant and powerful diary of Anne Frank, a young Jewish girl hiding from the Nazis during World War II, offering an intimate look at courage and humanity.','USED','2024-12-02 16:38:12','2024-12-02 16:38:12','https://drive.google.com/uc?export=view&id=1Th2niKT-99BgBrRHvQ1QwqAaiURQ9PbE'),(31,'Into the Wild',8,35,5,2001,2,'The true story of Christopher McCandless, who abandoned modern life to explore the Alaskan wilderness, uncovering themes of adventure, freedom, and the cost of living on the edge.','NEW','2024-12-02 16:41:06','2024-12-02 16:41:06','https://drive.google.com/uc?export=view&id=1GZu09Z8g5MMQuRIBt672u6HiRgv3kCoM'),(32,'The Hobbit',8,36,4,2011,2,'A classic fantasy adventure following Bilbo Baggins, a reluctant hobbit, as he embarks on a quest to reclaim a treasure guarded by a dragon, discovering courage and friendship along the way.','NEW','2024-12-02 16:42:00','2024-12-02 16:42:00','https://drive.google.com/uc?export=view&id=1j1_SH37-amT_p-wsDpm3DdHRmujCRcwE'),(33,'Life of Pi',8,37,8,2004,30,'The gripping tale of Pi Patel, stranded on a lifeboat in the Pacific Ocean with a Bengal tiger, blending survival, spirituality, and adventure.','USED','2024-12-02 16:43:24','2024-12-02 16:43:24','https://drive.google.com/uc?export=view&id=13YzLwdqp00qu_7UcFD_FIIy_8YaDhMAt');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_records`
--

DROP TABLE IF EXISTS `borrow_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_records` (
  `borrow_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('BORROWED','RETURNED','LOST','OVERDUE','PENDING_APPROVAL') NOT NULL,
  `fine` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`borrow_id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrow_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `borrow_records_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_records`
--

LOCK TABLES `borrow_records` WRITE;
/*!40000 ALTER TABLE `borrow_records` DISABLE KEYS */;
INSERT INTO `borrow_records` VALUES (12,6,3,'2024-08-20','2024-09-03','2024-09-02','RETURNED',1.50),(13,3,3,'2024-09-10','2024-09-24',NULL,'BORROWED',0.00),(14,6,4,'2024-08-01','2024-08-15','2024-08-14','RETURNED',0.00),(22,3,NULL,'2024-10-18','2024-10-20',NULL,'RETURNED',0.00),(23,3,3,'2024-12-07','2024-12-14',NULL,'BORROWED',0.00),(24,3,4,'2024-12-06','2024-12-16',NULL,'BORROWED',0.00),(26,3,23,'2024-12-06','2024-12-21',NULL,'BORROWED',0.00),(27,3,29,'2024-12-06','2024-12-20',NULL,'BORROWED',0.00),(28,17,30,'2024-12-13','2024-12-26',NULL,'BORROWED',0.00),(29,17,33,'2024-12-06','2024-12-19',NULL,'BORROWED',0.00),(30,17,23,'2024-12-06','2024-12-13',NULL,'BORROWED',0.00),(31,17,26,'2024-12-08','2024-12-13',NULL,'BORROWED',0.00),(32,3,30,'2024-12-06','2024-12-20',NULL,'PENDING_APPROVAL',0.00),(33,5,22,'2024-12-21','2025-01-01',NULL,'PENDING_APPROVAL',0.00),(34,5,25,'2024-12-21','2024-12-31',NULL,'PENDING_APPROVAL',0.00),(35,3,27,'2024-12-12','2024-12-30',NULL,'PENDING_APPROVAL',0.00);
/*!40000 ALTER TABLE `borrow_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Novel'),(2,'Fiction'),(3,'Non-fiction'),(4,'Science Fiction'),(6,'History'),(7,'Biography'),(8,'Adventure'),(9,'Science'),(10,'Romance'),(11,'Mystery');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_resources`
--

DROP TABLE IF EXISTS `digital_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_resources` (
  `resource_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `resource_type` enum('pdf','ebook','audiobook') NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_resources`
--

LOCK TABLES `digital_resources` WRITE;
/*!40000 ALTER TABLE `digital_resources` DISABLE KEYS */;
INSERT INTO `digital_resources` VALUES (1,'Resource 1','pdf','https://example.com/resource1.pdf','2024-10-15 02:20:25'),(2,'Resource 2','ebook','https://example.com/resource2.epub','2024-10-15 02:20:25'),(3,'Resource 3','audiobook','https://example.com/resource3.mp3','2024-10-15 02:20:25'),(4,'Resource 4','pdf','https://example.com/resource4.pdf','2024-10-15 02:20:25'),(5,'Resource 5','ebook','https://example.com/resource5.epub','2024-10-15 02:20:25'),(6,'Resource 6','audiobook','https://example.com/resource6.mp3','2024-10-15 02:20:25'),(7,'Resource 7','pdf','https://example.com/resource7.pdf','2024-10-15 02:20:25'),(8,'Resource 8','ebook','https://example.com/resource8.epub','2024-10-15 02:20:25'),(9,'Resource 9','audiobook','https://example.com/resource9.mp3','2024-10-15 02:20:25'),(10,'Resource 10','pdf','https://example.com/resource10.pdf','2024-10-15 02:20:25');
/*!40000 ALTER TABLE `digital_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Book Fair','2024-10-10','A large book fair event with many publishers.','2024-10-15 02:21:28'),(2,'Reading Day','2024-10-15','A day dedicated to reading and sharing books.','2024-10-15 02:21:28'),(3,'Author Meet','2024-10-20','Meet with famous authors and get your books signed.','2024-10-15 02:21:28'),(4,'Children Story Hour','2024-09-01','Storytelling for children in the community.','2024-10-15 02:21:28'),(5,'Poetry Night','2024-09-05','A night dedicated to poetry readings.','2024-10-15 02:21:28'),(6,'History Talk','2024-09-10','Learn about history through books.','2024-10-15 02:21:28'),(7,'Science Week','2024-09-15','Science-themed book event.','2024-10-15 02:21:28'),(8,'Book Donation','2024-09-20','Donate your old books to the library.','2024-10-15 02:21:28'),(9,'Art and Literature','2024-09-25','Discover the connection between art and books.','2024-10-15 02:21:28'),(10,'Local History Day','2024-10-25','Learn about local history through books.','2024-10-15 02:21:28');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` text,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('sent','pending') DEFAULT 'pending',
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (11,3,'Please return your book.','2024-10-15 02:20:25','sent'),(12,6,'Your book is due soon.','2024-10-15 02:20:25','pending'),(13,3,'A new book is available for you.','2024-10-15 02:20:25','sent'),(14,6,'Your book reservation is ready.','2024-10-15 02:20:25','pending'),(15,3,'Please return your book.','2024-10-15 02:20:25','sent'),(16,6,'Your book is overdue.','2024-10-15 02:20:25','sent'),(17,3,'A new event is coming up.','2024-10-15 02:20:25','pending'),(18,6,'Your reservation has been cancelled.','2024-10-15 02:20:25','sent'),(19,3,'Your book is ready for pickup.','2024-10-15 02:20:25','pending'),(20,6,'Please return your book.','2024-10-15 02:20:25','sent');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishers` (
  `publisher_id` int NOT NULL AUTO_INCREMENT,
  `publisher_name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishers`
--

LOCK TABLES `publishers` WRITE;
/*!40000 ALTER TABLE `publishers` DISABLE KEYS */;
INSERT INTO `publishers` VALUES (1,'	J. B. Lippincott & Co','U.S','0947199561'),(2,'	Bantam Spectra','US','0947199561'),(3,'Publisher A','123 Publisher St','1234567890'),(4,'Publisher B','234 Publisher Ave','2345678901'),(5,'Publisher C','345 Publisher Blvd','3456789012'),(6,'Publisher D','456 Publisher Ln','4567890123'),(7,'Publisher E','567 Publisher Rd','5678901234'),(8,'Publisher F','678 Publisher Dr','6789012345'),(9,'Publisher G','789 Publisher Ct','7890123456'),(10,'Publisher H','890 Publisher Pl','8901234567'),(11,'Publisher I','901 Publisher Cir','9012345678'),(12,'Publisher J','012 Publisher Sq','0123456789');
/*!40000 ALTER TABLE `publishers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_LIBRARIAN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,3,'268621b4-55c0-4a1f-b709-ae9ce2d3660b','2024-11-08 03:32:12','2024-11-15 03:32:12',1),(2,17,'dfd3ce04-7069-4318-ac75-8d4681241765','2024-12-02 16:51:48','2024-12-09 16:51:48',1),(3,3,'06f93374-820b-4396-aa79-78b9dde2bc10','2024-12-05 02:14:41','2024-12-12 02:14:41',1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'bangdinh','$2a$10$R2.HNX1nSwnunnVPq/PsTewvFglADBgfbVx103mp2Ul2kNwopEI0.','dinhbang121@gmail.com','0901231234','Hoa hai Ngu hanh son',2,'2024-10-09 07:39:32','2024-12-05 02:15:08','https://drive.google.com/uc?export=view&id=1y8ZgaB8FXFXhpn-HLA-G0yUgJ4mE6vhW'),(5,'admin','$2a$12$vlQzoDWxbbwlB9kPosp62exinQg9TLD1wvpqQAtZ4k59JMTjKpT1G','admin@gmail.com','0912345678','Bộ công thương Việt Nam',1,'2024-10-09 08:05:36','2024-12-02 16:44:28','https://drive.google.com/uc?export=view&id=1LgECgyC2Q-4Wnm18Xp4AaVhLEiPdTQow'),(6,'nguyentuan','$2a$10$Sj6qM6j3WD6Ah7bOKyYNc.XzciSDw3LUxEwINv4zrEA69K7lXewEW','nguyentuan299@gmail.com','0912312312','10 phuoc ly 19',2,'2024-10-11 04:48:07','2024-12-02 16:47:50','https://drive.google.com/uc?export=view&id=13w2zY6DiivzA7LcmQw4d5ImHKogick0u'),(12,'nhantkds170577','$2a$10$ElHNGIIpTHOJs6w.BfAqtOspI54SW4dVH/RgN2fOTbGCnBygohtXO','nhantkds170577@fpt.edu.vn','0947199QKA','vcl',2,'2024-10-28 15:26:43','2024-11-22 03:05:45','https://drive.google.com/uc?export=view&id=1-qZl9lAHyENk9uZuSJqL232Cr5UlvdUz'),(17,'dinkbank1201','$2a$10$bCOQGMBEQyemH9dc/vofS.BdeCshpmIuz8QJj6YfucotDrqRUMUsW','dinkbank1201@gmail.com',NULL,NULL,2,'2024-12-02 16:51:28','2024-12-02 16:53:48','https://drive.google.com/uc?export=view&id=1MusHTIJMaUV_DOYvRJO_EL80em-Cqe6q');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'library'
--

--
-- Dumping routines for database 'library'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 14:59:15
