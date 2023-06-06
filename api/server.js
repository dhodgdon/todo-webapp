const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to mongodb local database
mongoose.connect("mongodb://127.0.0.1:27017/todo-webapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to database"))
    .catch(console.error);

// Access the Todo model
const Todo = require("./models/todoModel");

// Get all the todos in the list
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

// Create a new todo
app.post("/todo/new", (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

// Delete a todo using its ID
app.delete("/todo/delete/:id", async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

// Complete a todo using its ID
app.get("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

// Print to the console when we are listening on the port
app.listen(3001, () => console.log("Server started on port 3001"));






// -------------------------------------------------------------------------------------


// const express = require('express');
// const app = express();
// const PORT = 3001;
// const cors = require('cors');
// require("dotenv").config();
// const db = require("./db/connection");

// app.use(express.json());
// app.use(cors());

// db
//     .then(() => console.log("Connected to database"))
//     .catch(console.error);

// const Todo = require("./models/todoModel");

// app.get("/todos", async (req, res) => {
//     const todos = await Todo.find();

//     res.json(todos);
// })

// app.post("/todo/new", (req, res) => {
//     const todo = new Todo({
//         text: req.body.text
//     });

//     todo.save();

//     res.json(todo);
// });

// app.delete("/todo/delete/:id", async (req, res) => {
//     const result = await Todo.findByIdAndDelete(req.params.id);

//     res.json(result);
// })

// app.get("/todo/complete/:id", async (req, res) => {
//     const todo = await Todo.findById(req.params.id);

//     todo.complete = !todo.complete;

//     todo.save();

//     res.json(todo);
// })

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

