# Next.js Ecommerce Store

In this Ecommerce store you can buy Pokemon cards. You can pick the products you want to order, add them to your cart and fill out an order form to finish the process.

## Dependencies

Next
Typescript
PostgreSQL
Postgres.js
@emotion/css
JS Cookie
dotenv-safe
ley

## Setup

Clone the repo from GitHub and then install the dependencies:
```
git clone https://github.com/flo951/next-js-ecommerce-store
cd next-js-ecommerce-store
yarn
```
Setup a database with postgres on your computer:
```
psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```
Create a .env file with the userinfo for the database and create .env.example as a template file for userinfo

Use migrations:
```
yarn migrate up
```
To delete data from database run:
```
yarn migrate down
```
To run the development server:
```
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To create the production build of the project run:
```
yarn build
yarn start
```
## Deployment

To deploy this project, create a [Heroku Account](https://signup.heroku.com/) and follow the instructions

## Project Preview

<img src="/public/images/expamplepic1.png" width="382" height="586">
<img src="/public/images/examplepic2.png" width="382" height="586">
<img src="/public/images/examplepic3.png" width="382" height="586">









