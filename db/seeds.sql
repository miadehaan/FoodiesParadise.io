
use food_db;

-- restaurants
INSERT INTO `food_db`.`restaurants` ( `NAME`, `createdAt`, `updatedAt`) VALUES ('mexican', current_timestamp, current_timestamp);
INSERT INTO `food_db`.`restaurants` (`NAME`, `createdAt`, `updatedAt`) VALUES ('Indian', current_timestamp, current_timestamp);

INSERT INTO `food_db`.`restaurants` (`NAME`, `createdAt`, `updatedAt`) VALUES ('thai', current_timestamp, current_timestamp);

-- dishes

INSERT INTO `food_db`.`dishes` (`NAME`, `createdAt`, `updatedAt`,`RestaurantId`) VALUES ('Padthai', current_timestamp, current_timestamp,'3');
INSERT INTO `food_db`.`dishes` (`NAME`, `createdAt`, `updatedAt`,`RestaurantId`) VALUES ('mexicanbowl', current_timestamp, current_timestamp,'1');
INSERT INTO `food_db`.`dishes` (`NAME`, `createdAt`, `updatedAt`,`RestaurantId`) VALUES ('PanneerTikka', current_timestamp, current_timestamp,'2');

-- reviews
INSERT INTO `food_db`.`reviews` (`NAME`, `COMMENTS`, `RATING`,`createdAt`, `updatedAt`,`DishId`) VALUES ('Padthai','Good','4', current_timestamp, current_timestamp,'1');
INSERT INTO `food_db`.`reviews` (`NAME`, `COMMENTS`, `RATING`,`createdAt`, `updatedAt`,`DishId`) VALUES ('mexicanbowl','Good','3', current_timestamp, current_timestamp,'2');
INSERT INTO `food_db`.`reviews` (`NAME`, `COMMENTS`, `RATING`,`createdAt`, `updatedAt`,`DishId`) VALUES ('PanneerTikka','Good','2', current_timestamp, current_timestamp,'3');