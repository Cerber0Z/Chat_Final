import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
      })
});



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Cerber0Z:d8NRUjnISIPv3ElW@intopcol.myecm.mongodb.net/Intopcol?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("DB connected");
    }
);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    });
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" });
        } else {
            const user = new User({
                name,
                email,
                password,
            });
            user.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        message: "Successfully Registered, Please login now.",
                    });
                }
            });
        }
    });
});


const PORT = process.env.PORT || 9002;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
