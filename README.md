## About the project

This is the backend project for the movie database (movdb for short) application.

It was built with expressjs and mongodb.

It uses JWT to protect the routes.

For unit testing it uses mocha and chai.

### How to run the project locally

1. git clone https://github.com/diegoot/movdb-be.git
2. cd movdb-be
3. npm install
4. Create .env file in the root of your project's folder and paste the following content:

```
PORT=9000
DB_URL=mongodb+srv://admin:admin1234@cluster0.xwduwts.mongodb.net/?retryWrites=true&w=majority
JWT_PRIVATE_KEY=M0vDBPr1v4t3K3y
```

5. npm run dev

### How to run the unit tests

I am sorry but the are outdated right now, I need to work on them.
