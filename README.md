<h1 align="center" id="title">BillEasy</h1>

<p align="center"><img src="https://socialify.git.ci/UmeshSingh2000/Billeasy-assesment/image?language=1&amp;name=1&amp;owner=1&amp;stargazers=1&amp;theme=Dark" alt="project-image"></p>

<p id="description">Billeasy Backend Assessment – Book API (Node.js) This project is a backend API built using Node.js that allows users to sign up log in and manage a collection of books. Authenticated users can add books write reviews and access protected routes using JWT-based authentication. The API ensures secure access control and supports basic CRUD operations for books and reviews.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the Repository</p>

```
git clone https://github.com/UmeshSingh2000/Billeasy-assesment
```

<p>2. Install Dependencies</p>

```
npm install
```

<p>3. Environment Variables</p>

```
PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret_key NODE_ENV = development
```

<p>4. Run the Server</p>

```
npm run dev
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node.js
*   JavaScript
*   MongoDB
*   Express
*   JWT

## 📘 Database Schema
User Collection
| Field       | Type   | Required | Description                           |
| ----------- | ------ | -------- | ------------------------------------- |
| `name`      | String | ✅        | Full name of the user                |
| `email`     | String | ✅        | Unique email with regex validation   |
| `password`  | String | ✅        | Hashed password                      |
| `createdAt` | Date   | Auto     | Automatically set timestamp           |
| `updatedAt` | Date   | Auto     | Automatically updated on modification |


Book Collection
| Field       | Type   | Required | Description                   |
| ----------- | ------ | -------- | ----------------------------- |
| `title`     | String | ✅        | Unique title of the book      |
| `author`    | String | ✅        | Author of the book            |
| `genre`     | String | ✅        | Genre or category of the book |
| `createdAt` | Date   | Auto     | Timestamp when created        |
| `updatedAt` | Date   | Auto     | Timestamp when last modified  |



## 📘 API Documentation

This project uses a RESTful API. You can access the complete API documentation via Postman:

[![View in Postman](https://img.shields.io/badge/Postman-View%20Docs-orange?logo=postman)](https://documenter.getpostman.com/view/36796105/2sB2qah1fC)

