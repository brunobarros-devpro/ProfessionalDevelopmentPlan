CREATE TABLE [dbo].[Order]
(
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    CustomerId UNIQUEIDENTIFIER NOT NULL,
    RestaurantId UNIQUEIDENTIFIER NOT NULL,
    Status VARCHAR(30) NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    CreatedAt DATETIME2 NOT NULL,
    CONSTRAINT FK_Order_Customer FOREIGN KEY (CustomerId)
        REFERENCES Customer(Id),
    CONSTRAINT FK_Order_Restaurant FOREIGN KEY (RestaurantId)
        REFERENCES Restaurant(Id)
)
