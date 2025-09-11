const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
//Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    credentials: true, // cookie/credentials allow করবে
  })
);

app.use(express.json());
// Mongodb client
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Connect the client to the server
    const usersCollection = client.db("Friends-Zone").collection("users");
    const allPostsCollection = client.db("Friends-Zone").collection("all-posts");
    const allCommentsCollection = client.db("Friends-Zone").collection("all-comments");

    // User registration route
    app.post("/register", async (req, res) => {
      try {
        const { name, userName, email, password, image } = req.body;

        if (!name || !email || !password || !userName || !image) {
          return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const existingUserName = await usersCollection.findOne({ userName });
        if (existingUserName) {
          return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({
          name,
          userName,
          email,
          password: hashedPassword,
          image,
          createdAt: new Date(),
        });
        const token = jwt.sign(
          {
            userId: result.insertedId,
            email,
            name,
            userName,
            image,
            createdAt: new Date(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        // Send cookie
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: false, // development-এ false
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        const createdUser = await usersCollection.findOne({
          _id: result.insertedId,
        });
        res.status(201).json({
          message: "User created successfully",
          user: createdUser,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
      }
    });
    // Signin
    app.post("/signin", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: "All fields required" });
        }

        // Find user by email
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
          { userId: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: false, // development-এ false
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Login successful", user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.get("/allusers", async (req, res) => {
      const getAllusers = await usersCollection.find().toArray();
      res.send(getAllusers);
    });
    app.get("/me", async (req, res) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
          return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usersCollection.findOne({
          _id: new ObjectId(decoded.userId),
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
          name: user.name,
          email: user.email,
          userName: user.userName,
          image: user.image,
        });
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    });

    app.post("/all-posts", async (req, res) => {
      try {
        const { userId, text, image, audience, likes, createdAt } = req.body;
        if (!userId) {
          return res
            .status(400)
            .json({ message: "UserId and text are required" });
        }
        const data = {
          userId,
          text,
          image,
          audience,
          likes,
          createdAt,
        };
        const response = await allPostsCollection.insertOne(data);
        res.status(201).json({ message: "Post created", post: response });
      } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });
// POST /posts/:postId/like
app.post("/all-posts/:postId/like", async (req, res) => {

  const { userId } = req.body;

  const { postId } = req.params;
console.log("postId from params:", userId);


const post = await allPostsCollection.findOne({ _id: postId });
console.log(post);
  if (!post) return res.status(404).json({ message: "Post not found" });
  let updatedLikes;
  if (post.likes.includes(userId)) {
    // unlike
    updatedLikes = post.likes.filter(id => id !== userId);
  } else {
    // like
    updatedLikes = [...post.likes, userId];
  }

  await allPostsCollection.updateOne(
    { _id:  (postId) },
    { $set: { likes: updatedLikes } }
  );

  res.json({ likes: updatedLikes });
});

    app.get('/all-posts', async(req, res) =>{

      const result = await allPostsCollection.find().toArray()
      // console.log(result);
      res.send(result)
    })
    // Comments
    app.get('/all-comments', async(req, res) =>{
      const result = await allCommentsCollection.find().toArray()

      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server ok ${port}`);
});
