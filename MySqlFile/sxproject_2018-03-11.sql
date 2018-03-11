# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19)
# Database: sxproject
# Generation Time: 2018-03-11 05:57:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table dishes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dishes`;

CREATE TABLE `dishes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dishname` varchar(100) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;

INSERT INTO `dishes` (`id`, `dishname`, `price`, `userid`, `typeid`)
VALUES
	(2,'鱼',15,17,4),
	(3,'红烧肉',11,17,9),
	(4,'水煮鱼',55,17,9),
	(5,'馒头',0.5,17,8),
	(6,'米饭',1.52,17,4),
	(7,'tixiwg',153,17,4),
	(9,'测试',10,17,7),
	(10,'啊啊啊啊啊',20,17,11),
	(11,'a',1,17,4),
	(12,'b',1,17,4),
	(13,'c',1,17,4),
	(14,'d',1,17,4),
	(15,'e',1,17,4),
	(16,'f',1,17,4),
	(17,'aaa',1,22,12),
	(18,'ccc',111,22,13);

/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dishorder
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dishorder`;

CREATE TABLE `dishorder` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dishid` int(11) DEFAULT NULL,
  `dishname` varchar(100) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `tablenum` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `dishorder` WRITE;
/*!40000 ALTER TABLE `dishorder` DISABLE KEYS */;

INSERT INTO `dishorder` (`id`, `dishid`, `dishname`, `userid`, `tablenum`, `count`, `state`)
VALUES
	(3,4,'水煮鱼',17,12,1,1),
	(4,5,'馒头',17,12,2,1),
	(5,2,'鱼',17,13,10,1),
	(7,2,'鱼',18,2,1,2),
	(8,3,'红烧肉',17,2,1,1),
	(9,5,'馒头',17,2,3,1),
	(10,5,'馒头',17,2,3,1),
	(11,4,'水煮鱼',17,12,1,1),
	(12,5,'馒头',17,12,2,1),
	(13,2,'鱼',18,2,1,2),
	(14,3,'红烧肉',17,2,1,1),
	(15,2,'鱼',17,1,1,1),
	(16,2,'鱼',17,1,2,1),
	(17,6,'米饭',17,1,1,1),
	(18,7,'tixiwg',17,1,1,1),
	(19,2,'鱼',17,2,2,2),
	(20,2,'鱼',17,3,2,2),
	(21,2,'鱼',17,1,1,1),
	(22,2,'鱼',17,1,1,1),
	(23,2,'鱼',17,1,2,1),
	(24,2,'鱼',17,2,1,2),
	(25,6,'米饭',17,2,1,2),
	(26,6,'米饭',17,33,2,2),
	(27,2,'鱼',17,42,1,2),
	(28,6,'米饭',17,42,1,2),
	(29,7,'tixiwg',17,42,1,2),
	(30,2,'鱼',17,18,1,1),
	(31,6,'米饭',17,18,1,1),
	(32,11,'a',17,18,1,1),
	(33,2,'鱼',17,38,1,1),
	(34,6,'米饭',17,38,1,1),
	(35,2,'鱼',17,4,6,2),
	(36,6,'米饭',17,4,1,2),
	(37,7,'tixiwg',17,4,1,2),
	(38,11,'a',17,4,1,2),
	(39,12,'b',17,4,1,2),
	(40,13,'c',17,4,1,2),
	(41,14,'d',17,4,1,2),
	(42,15,'e',17,4,1,2),
	(43,16,'f',17,4,1,2),
	(44,9,'测试',17,4,1,2),
	(45,5,'馒头',17,4,1,2),
	(46,3,'红烧肉',17,4,1,2),
	(47,4,'水煮鱼',17,4,1,2),
	(48,10,'啊啊啊啊啊',17,4,1,2),
	(49,2,'鱼',17,5,1,2),
	(50,6,'米饭',17,5,1,2),
	(51,7,'tixiwg',17,5,1,2),
	(52,11,'a',17,5,1,2),
	(53,12,'b',17,5,1,2),
	(54,13,'c',17,5,1,2),
	(55,14,'d',17,5,1,2),
	(56,15,'e',17,5,1,2),
	(57,16,'f',17,5,1,2),
	(58,9,'测试',17,5,1,2),
	(59,5,'馒头',17,5,1,2),
	(60,3,'红烧肉',17,5,1,2),
	(61,4,'水煮鱼',17,5,1,2),
	(62,10,'啊啊啊啊啊',17,5,1,2),
	(63,2,'鱼',17,11,1,2),
	(64,6,'米饭',17,11,1,2),
	(65,7,'tixiwg',17,11,1,2),
	(66,11,'a',17,11,1,2),
	(67,12,'b',17,11,1,2),
	(68,13,'c',17,11,1,2),
	(69,14,'d',17,11,1,2),
	(70,15,'e',17,11,1,2),
	(71,16,'f',17,11,1,2),
	(72,9,'测试',17,11,1,2),
	(73,5,'馒头',17,11,1,2),
	(74,3,'红烧肉',17,11,1,2),
	(75,4,'水煮鱼',17,11,1,2),
	(76,2,'鱼',17,12,1,2),
	(77,6,'米饭',17,12,1,2),
	(78,2,'鱼',17,1,1,1),
	(79,6,'米饭',17,1,1,1),
	(80,7,'tixiwg',17,1,2,1),
	(81,2,'鱼',17,8,1,2),
	(82,6,'米饭',17,8,1,2),
	(83,7,'tixiwg',17,8,1,2),
	(84,11,'a',17,8,1,2),
	(85,17,'aaa',22,1,2,2),
	(86,18,'ccc',22,1,1,2);

/*!40000 ALTER TABLE `dishorder` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dishtype
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dishtype`;

CREATE TABLE `dishtype` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typename` varchar(100) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `dishtype` WRITE;
/*!40000 ALTER TABLE `dishtype` DISABLE KEYS */;

INSERT INTO `dishtype` (`id`, `typename`, `userid`)
VALUES
	(3,'test',18),
	(4,'汤',17),
	(5,'烧烤',17),
	(7,'凉菜',17),
	(8,'主食',17),
	(9,'热菜',17),
	(11,'测试啊',17),
	(12,'a',22),
	(13,'c',22);

/*!40000 ALTER TABLE `dishtype` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET latin1 DEFAULT '',
  `password` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `nickname` varchar(100) CHARACTER SET gbk DEFAULT NULL,
  `tablenum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `tablenum`)
VALUES
	(17,'17854294082','123123','体验店',132),
	(18,'17854294081','12212121','商家用户',0),
	(19,'13111111111','121212','商家用户',0),
	(22,'14111111111','111111','商家用户',1),
	(23,'15111111111','111111','商家用户',13),
	(24,'17854294092','111111','nick啊',12),
	(25,'12312312312','13221321312','商家用户',12321312),
	(26,'12434546464','102022','秘密花园',12435),
	(27,'12313213123','32ewq12','123123',312),
	(28,'12312312321','312321','12312',321321),
	(29,'12811111111','1111111','nick',11);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
