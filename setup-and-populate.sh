#!/bin/bash

# Start the Node.js application
echo "Starting the Node.js application..."
node database.js

# Wait for the database file to be created
DATABASE_FILE="database.db"
while [ ! -f "$DATABASE_FILE" ]; do
  echo "Waiting for the database file to be created..."
  sleep 2
done

echo "Database file found. Running population scripts..."

# Run the population scripts
node populate-script/populate-drivers-reviews.js
node populate-script/populate-merchants-products.js
node populate-script/populate-stickers.js

echo "Population scripts completed."

node ./bin/www.js