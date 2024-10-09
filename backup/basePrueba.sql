-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table servicios_web.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table servicios_web.usuarios: ~0 rows (approximately)
INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `activo`) VALUES
	(1, 'actualizado', 'try@gmail.com', 'eddy123', 1),
	(2, 'eddy', 'alexande@gmail.com', '123', 1),
	(4, 'eddySilva', 'eddy@gmail.com', '$2b$10$bPHsLbklgDpkftFVT6pGmuOZ9jQCKoXWaUoUNBTMSqgz0JX.VL3qS', 1),
	(6, 'carlos', 'carlos@gmail.com', '$2b$10$eXEfI46bEkXRX0.U6vh7SuX4kq1dMERkwbUkJM.yi9FKKhmSwAjWS', 1),
	(7, 'vendedor1', 'vendedor1@gmail.com', '$2b$10$GLcpvG0ZpWjw5ZsMrxJXZuGWj6j/O3t0vkt2nEAVrCwkLVgaQ3G4G', 1),
	(8, 'vendedor2', 'vendedor2@gmail.com', '$2b$10$OVwi947fF/YdPMRSeQhVcO.bd5au0DjnLTAfgKHGie5TYmw0q/Gjq', 1);

-- Dumping structure for table servicios_web.usuario_carro
CREATE TABLE IF NOT EXISTS `usuario_carro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `kilometraje` int NOT NULL,
  `color` varchar(100) NOT NULL,
  `terminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `usuario_carro_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table servicios_web.usuario_carro: ~0 rows (approximately)
INSERT INTO `usuario_carro` (`id`, `usuario_id`, `modelo`, `marca`, `kilometraje`, `color`, `terminado`) VALUES
	(2, 4, 'spresso', 'suzuki', 24000, 'azul', 1),
	(5, 6, 'fron-x', 'suzuki', 2000, 'azul', 1),
	(6, 6, 'sportage', 'suzuki', 2000, 'black', 1),
	(7, 4, 'camaro', 'Chevrolet', 24000, 'black', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
