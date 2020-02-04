## About the project

This is the backend project for the movie database (movdb for short) application.

It was built with expressjs and mongodb.

It uses JWT to protect the routes.

For unit testing it uses mocha and chai.

### How to run the project locally

1. Clone the repo
2. Go to the repo folder
3. Run `yarn install`
4. Create .env file in the root of your project's folder and paste the following content:

```
PORT=3014
DB_URL=mongodb://admin:abc123@ds231207.mlab.com:31207/movdb
JWT_PRIVATE_KEY=M0vDBPr1v4t3K3y
```

5. From the command line and in the project's folder run `yarn dev`

### How to run the unit tests

1. Create a .env.test file with the following content:

```
PORT=3014
DB_URL=mongodb://admin:abc123@ds233258.mlab.com:33258/movdb-test
JWT_PRIVATE_KEY=M0vDBPr1v4t3K3y
```

2. From the command line and in the project's folder run `yarn test`

### Live Demo

Find it [here](https://lit-beach-83931.herokuapp.com/). 
