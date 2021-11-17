### Express (NodeJS) App Configuration

# Configuration

### 1. Import Database 
- Install MongoDB and run it
- Create a `tmp` directory in the project root (required by the notebook import script)
- Import the MongoDB database using notebook script called `garments_to_mongo.ipynb`

### 2. Environment
rename the file `.env.sample` to `.env` and update the variables with your values

#### Variables:

`DB_HOST` Mongo Database endpoint (ex. `mongodb://localhost:27017/`)

`DB_NAME` Mongo Database name (ex. `intelistyle`)

### 3. Installation
run the command `npm install`

# Running

### Run
run the command `npm run start`

# Testing

### Test
run the command `npm run test`

### Test with coverage
run the command `npm run test-with-coverage`
