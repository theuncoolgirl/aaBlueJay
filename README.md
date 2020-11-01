# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

```bash
$ git clone https://github.com/appacademy-starters/react-project-starter.git --branch flask-project-starter --single-branch
```
https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#connection-uri-format
2. Install dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   pipenv install alembic Flask-Migrate
   ```
   Open psql and make the below
   ---
   Create user "bluejay" with password 'password'
   create database bluejay_dev_db with owner bluejay
   ---

   If you dont have a .flaskenv in root make one and name put in the below
   ---
   FLASK_APP=starter_app
   ---

   create a .env and add below
   ---
   DATABASE_URL=postgresql://bluejay:password@localhost/bluejay_dev_db
   SECRET_KEY=super_secret_key123124eqsdasdaswe221
   ---

   run the commands
   pipenv shell

   $ flask db init
   $ flask db migrate
   $ flask db upgrade
   

   check to see if your data is made

5. Get into your pipenv, seed your database, and run your flask app

   ```bash
   $ pipenv shell
   ```

   ```bash
   $ python -m database && flask run
   ```
6. To run the React App in development, checkout the [README](./client/README.md) inside the client directory.




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run
   ```bash
   heroku login
   ```
5. Login to the heroku container registry
   ```bash
   heroku container:login
   ```
6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry
   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```
8. Release your docker container to heroku
   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```
9. set up your database:
   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} python -m database
   ```
10. Under Settings find "Config Vars" and add any additional/secret .env variables.
11. profit


## Features 
***
- [Features Overview](#Features-Overview)
- Explore currencies 
- Interactive candlestick stockchart
- Dynamically genereated simulation 
- Search currencies
- Coingecko stocks API integration
- User authentication and authorization
- User currency watchlists 
- Robinhood sparkline integration

## Technologies 
***
- Flask
- SqlAlchemy
- Postgresql
- React/Redux
- Coingecko API
- Docker/Heroku deploy

## Installation
***
1. Clone the repository

   ```bash
   $ git clone https://github.com/theuncoolgirl/aaBlueJay.git
   ```
2. Install dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   $ pipenv install alembic Flask-Migrate
   ```

3. Open psql and create user and database

   - Create user "bluejay" with password "<<super_strong_secret_password>>"
   - Create database bluejay_dev_db with owner bluejay


4. Create .flaskenv with:
    ```bash
   FLASK_APP=starter_app
   ```

5. create a .env and add configuration modeled below: 

   ```
   DATABASE_URL=postgresql://username:password@localhost/database_name
   SECRET_KEY=<<super_secret_key>>
   ```


6. migrate to database

   ``` pipenv shell
    $ flask db init
    $ flask db migrate 
    $ flask db upgrade
   ```

5. Activate python shell and seed database

   ```bash
   $ pipenv shell
   ```

   ```
   $ python -m database && flask run
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
    $ pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   $ psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.



### Features Overview
***
BlueJay is a robinhood clone meant to explore, retrieve, and graphically model crypto currency data from the Coingecko API of which gives access to current and historical currency/stock information. Major features are highlighted below, but the app has much potenitial in implementing additional goals of social iteraction (friends list), recommendations (made by friends), account profile settings, networth calculation, and dark mode to name a few.

> Current Status: ongoing development



