CREATE DATABASE  IF NOT EXISTS `accounting` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `accounting`;

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
-- Table structure for table `account_types`
--

DROP TABLE IF EXISTS `account_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_types` (
  `account_type_pk` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`account_type_pk`),
  UNIQUE KEY `account_type_pk_UNIQUE` (`account_type_pk`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_pk` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `account_type_pk` int(11) NOT NULL,
  `company_pk` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`account_pk`),
  UNIQUE KEY `account_pk_UNIQUE` (`account_pk`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_account_account_type_idx` (`account_type_pk`),
  KEY `fk_account_companies_idx` (`company_pk`),
  CONSTRAINT `fk_account_account_type` FOREIGN KEY (`account_type_pk`) REFERENCES `account_types` (`account_type_pk`),
  CONSTRAINT `fk_account_companies` FOREIGN KEY (`company_pk`) REFERENCES `companies` (`company_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `code` varchar(10) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`company_pk`),
  UNIQUE KEY `company_pk_UNIQUE` (`company_pk`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `can_add_transactions` tinyint(4) NOT NULL,
  `can_add_accounts` tinyint(4) NOT NULL,
  `can_add_3_party_companies` tinyint(4) NOT NULL,
  `can_add_own_companies` tinyint(4) NOT NULL,
  `can_invite_users_to_company` tinyint(4) NOT NULL,
  `can_edit_transactions` tinyint(4) NOT NULL,
  `can_edit_accounts` tinyint(4) NOT NULL,
  `can_edit_3_party_companies` tinyint(4) NOT NULL,
  `can_edit_own_companies` tinyint(4) NOT NULL,
  `can_edit_user_roles` tinyint(4) NOT NULL,
  `can_delete_transaction` tinyint(4) NOT NULL,
  `can_delete_accounts` tinyint(4) NOT NULL,
  `can_delete_3_party_companies` tinyint(4) NOT NULL,
  `can_delete_own_companies` tinyint(4) NOT NULL,
  `can_remove_users_from_companies` tinyint(4) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`role_pk`),
  UNIQUE KEY `role_pk_UNIQUE` (`role_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaction_types`
--

DROP TABLE IF EXISTS `transaction_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_types` (
  `transaction_type_pk` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`transaction_type_pk`),
  UNIQUE KEY `transaction_type_pk_UNIQUE` (`transaction_type_pk`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_pk` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `comments` varchar(150) DEFAULT NULL,
  `account_pk` int(11) NOT NULL,
  `user_pk` int(11) NOT NULL,
  `transaction_type_pk` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`transaction_pk`),
  UNIQUE KEY `transaction_pk_UNIQUE` (`transaction_pk`),
  KEY `fk_transaction_account_pk_idx` (`account_pk`),
  KEY `fk_transaction_transaction_type_pk_idx` (`transaction_type_pk`),
  KEY `fk_transaction_users_idx` (`user_pk`),
  CONSTRAINT `fk_transaction_account_pk` FOREIGN KEY (`account_pk`) REFERENCES `accounts` (`account_pk`),
  CONSTRAINT `fk_transaction_transaction_type_pk` FOREIGN KEY (`transaction_type_pk`) REFERENCES `transaction_types` (`transaction_type_pk`),
  CONSTRAINT `fk_transaction_users` FOREIGN KEY (`user_pk`) REFERENCES `users` (`user_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_companies`
--

DROP TABLE IF EXISTS `user_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_companies` (
  `user_company_pk` int(11) NOT NULL AUTO_INCREMENT,
  `user_pk` int(11) NOT NULL,
  `company_pk` int(11) NOT NULL,
  `role_pk` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`user_company_pk`),
  UNIQUE KEY `user_company_pk_UNIQUE` (`user_company_pk`),
  KEY `fk_user_companies_users_idx` (`user_pk`),
  KEY `fk_user_companies_companies_idx` (`company_pk`),
  KEY `fk_user_companies_roles_idx` (`role_pk`),
  CONSTRAINT `fk_user_companies_companies` FOREIGN KEY (`company_pk`) REFERENCES `companies` (`company_pk`),
  CONSTRAINT `fk_user_companies_roles` FOREIGN KEY (`role_pk`) REFERENCES `roles` (`role_pk`),
  CONSTRAINT `fk_user_companies_users` FOREIGN KEY (`user_pk`) REFERENCES `users` (`user_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_pk` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`user_pk`),
  UNIQUE KEY `user_pk_UNIQUE` (`user_pk`),
  UNIQUE KEY `user_UNIQUE` (`user`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
