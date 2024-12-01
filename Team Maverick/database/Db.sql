-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Table structure for table `videoreco`
--

DROP TABLE IF EXISTS `videoreco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videoreco` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `score` int NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_videoreco_user_id` (`user_id`),
  CONSTRAINT `fk_videoreco_user_id` FOREIGN KEY (`user_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `videoreco`

LOCK TABLES `videoreco` WRITE;
/*!40000 ALTER TABLE `videoreco` DISABLE KEYS */;
INSERT INTO `videoreco` (`id`, `user_id`, `score`, `genre`, `video_name`, `video_url`) VALUES
(1, 1, 85, 'Happy', 'Inspiring Video 1', 'https://example.com/video1'),
(2, 2, 60, 'Good', 'Motivational Video 2', 'https://example.com/video2'),
(3, 3, 20, 'Sad', 'Comforting Video 3', 'https://example.com/video3'),
(4, 1, 45, 'Average', 'Educational Video 4', 'https://example.com/video4');
/*!40000 ALTER TABLE `videoreco` ENABLE KEYS */;
UNLOCK TABLES;
