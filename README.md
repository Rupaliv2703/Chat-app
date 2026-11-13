# 💬 Chat App — Real-Time Messaging Platform

A full-stack real-time chat application that allows users to create accounts, connect with other users, and exchange messages through an interactive messaging interface.

Built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.IO** for real-time communication and **Cloudinary** for media storage.

The application focuses on providing a simple and responsive messaging experience with user authentication, online status tracking, profile management, and support for sharing images.

---

## 🚀 Features

### 1. User Authentication
- User registration with name, email, password, and bio.
- Login using registered credentials.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API routes for authenticated users.
- Persistent login using browser local storage.

### 2. Real-Time Messaging
- Send and receive messages between users.
- Real-time message delivery using Socket.IO.
- Individual conversations between users.
- Fetch previous chat conversations.
- Message timestamps.
- Track whether messages have been seen.

### 3. Online User Status
- Real-time online user tracking.
- Display online and offline status.
- Socket connection and disconnection handling.
- Automatically update connected users when their status changes.

### 4. Media Sharing
- Upload and share images through conversations.
- Cloudinary integration for image hosting.
- Display shared media in the chat interface.

### 5. User Profile Management
- Update profile information.
- Edit username and bio.
- Upload and update profile pictures.
- View user profile details.

### 6. Responsive User Interface
- Modern chat interface.
- User sidebar for accessing conversations.
- Dedicated chat window.
- User information and media sidebar.
- Responsive layout for different screen sizes.
- Toast notifications for user feedback.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Real-Time Communication | Socket.IO |
| Authentication | JSON Web Token (JWT) |
| Password Security | bcryptjs |
| Image Storage | Cloudinary |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Notifications | React Hot Toast |
| Icons | React Icons |

---

## 📁 Project Structure

```text
Chat-app/
│
├── client/
│   ├── public/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images
│   │   │   ├── icons
│   │   │   └── assets.js
│   │   │
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── RightSidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── About.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── utils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── messageController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── lib/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── utils.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- npm (Node Package Manager)
- [Cloudinary Account](https://cloudinary.com/)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Rupaliv2703/Chat-app.git
```

Navigate into the project directory:

```bash
cd Chat-app
```

### 2. Setup the Backend

Navigate to the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace the placeholder values with your actual configuration credentials.

Start the backend development server:

```bash
npm run server
```

The backend uses port `5000` by default.

### 3. Setup the Frontend

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_BACKEND_URL=http://127.0.0.1:5000
```

Start the frontend development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser to access the application.

---

## 🔄 How the Application Works

The application follows a client-server architecture.

### 1. Authentication Flow

1. A user registers or logs into the application.
2. The backend validates the provided credentials.
3. Passwords are securely hashed and verified using bcrypt.
4. A JWT token is generated after successful authentication.
5. The frontend stores the token and uses it for protected API requests.
6. Authentication middleware verifies the token before allowing access to protected resources.

### 2. Messaging Flow

1. An authenticated user selects another user from the sidebar.
2. The frontend requests the conversation history from the backend.
3. The user composes a message and sends it through the messaging API.
4. The backend stores the message in MongoDB.
5. Socket.IO delivers the new message to the receiver when they are connected.
6. The message can be marked as seen when the conversation is opened.

### 3. Online Status Flow

1. A user connects to the application.
2. The frontend establishes a Socket.IO connection with the backend.
3. The user's ID and socket connection are associated.
4. The server maintains a mapping of connected users.
5. Online-user information is broadcast to connected clients.
6. When a user disconnects, their connection is removed and the online-user list is updated.

### 4. Image Upload Flow

1. The user selects an image.
2. The frontend prepares the image for upload.
3. The backend sends the image to Cloudinary.
4. Cloudinary returns a hosted image URL.
5. The image URL is stored with the corresponding message or profile information.

---

## 🔌 API Endpoints

The backend exposes REST APIs for authentication, profile management, and messaging.

### Authentication Routes

Base URL:

```text
/api/auth
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | Authenticate an existing user | Public |
| GET | `/check` | Verify authentication and retrieve user information | Protected |
| PUT | `/update-profile` | Update user profile information | Protected |

### Message Routes

Base URL:

```text
/api/messages
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/users` | Retrieve users for the chat sidebar | Protected |
| GET | `/:id` | Retrieve conversation messages with a user | Protected |
| GET | `/mark/:id` | Mark a message as seen | Protected |
| POST | `/send/:id` | Send a message to a selected user | Protected |

### Socket.IO Events

The application uses Socket.IO for real-time communication.

| Event | Description |
|---|---|
| `connection` | Handles a new socket connection |
| `disconnect` | Handles a user's disconnection |
| `newMessage` | Delivers a new message to the receiver |
| Online user updates | Broadcasts connected user information |

---

## 🗄️ Database Models

The application uses MongoDB with Mongoose schemas.

### User Model

Stores user account and profile information.

| Field | Description |
|---|---|
| `fullName` | User's full name |
| `email` | Unique email address |
| `password` | Hashed password |
| `bio` | User profile description |
| `createdAt` | Account creation timestamp |
| `updatedAt` | Last update timestamp |

### Message Model

Stores individual messages exchanged between users.

| Field | Description |
|---|---|
| `senderId` | ID of the message sender |
| `receiverId` | ID of the message receiver |
| `text` | Message text |
| `image` | Image URL, if an image is attached |
| `seen` | Indicates whether the message has been seen |
| `createdAt` | Message creation timestamp |
| `updatedAt` | Last update timestamp |

---

## 🔐 Environment Variables

The project requires environment variables for connecting external services.

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Backend server base URL |

**Important:** Never commit real API keys, database credentials, JWT secrets, or `.env` files to a public repository.

---

## 🧪 Available Scripts

### Frontend

Run these commands inside the `client` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

### Backend

Run these commands inside the `server` directory.

| Command | Description |
|---|---|
| `npm run server` | Start backend using Nodemon |
| `npm start` | Start backend using Node.js |

---

## 🎯 Project Objectives

The primary objectives of this project are:

- To develop a full-stack messaging application.
- To understand client-server communication.
- To implement secure authentication using JWT.
- To integrate real-time communication using WebSockets through Socket.IO.
- To work with MongoDB for storing users and messages.
- To integrate third-party services for image uploads.
- To design a responsive and interactive React-based interface.

---

## 🚀 Future Enhancements

Potential improvements for the application include:

- Group chat functionality.
- Message editing and deletion.
- Typing indicators.
- Read receipts and delivery status.
- Message search functionality.
- Push notifications.
- Voice and video calling.
- Improved media gallery.
- Better mobile responsiveness.
- Improved input validation and error handling.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a Pull Request.

---

## 👩‍💻 Author

**Rupali**

GitHub: [@Rupaliv2703](https://github.com/Rupaliv2703)

Project Repository: [Chat-app](https://github.com/Rupaliv2703/Chat-app)

---

## 📄 License

This project currently does not specify a license.

Please contact the repository owner for permission before redistributing or using the project.

---

<p align="center">
  <b>Built with ❤️ using the MERN Stack</b>
</p>
