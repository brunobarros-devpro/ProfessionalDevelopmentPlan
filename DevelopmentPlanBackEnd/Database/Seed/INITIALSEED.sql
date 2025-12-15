DECLARE @CustomerId UNIQUEIDENTIFIER = NEWID();
DECLARE @RestaurantId UNIQUEIDENTIFIER = NEWID();
DECLARE @BurgerId UNIQUEIDENTIFIER = NEWID();
DECLARE @FriesId UNIQUEIDENTIFIER = NEWID();
DECLARE @OrderId UNIQUEIDENTIFIER = NEWID();

-- Customer
INSERT INTO Customer (Id, Name, Email, CreatedAt)
VALUES (@CustomerId, 'Bruno Barros', 'bruno@restaurant.com', SYSDATETIME());

-- Restaurant
INSERT INTO Restaurant (Id, Name, IsOpen, CreatedAt)
VALUES (@RestaurantId, 'Clean Architecture Burger', 1, SYSDATETIME());

-- Menu Items
INSERT INTO MenuItem (Id, RestaurantId, Name, Price, IsAvailable)
VALUES 
(@BurgerId, @RestaurantId, 'Cheeseburger', 25.90, 1),
(@FriesId, @RestaurantId, 'French Fries', 12.50, 1);

-- Order
INSERT INTO [Order] (Id, CustomerId, RestaurantId, Status, TotalAmount, CreatedAt)
VALUES (@OrderId, @CustomerId, @RestaurantId, 'Created', 38.40, SYSDATETIME());

-- Order Items
INSERT INTO OrderItem (Id, OrderId, MenuItemId, Quantity, UnitPrice)
VALUES 
(NEWID(), @OrderId, @BurgerId, 1, 25.90),
(NEWID(), @OrderId, @FriesId, 1, 12.50);
