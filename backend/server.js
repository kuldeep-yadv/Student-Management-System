const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Get All Students
app.get("/students", (req, res) => {

  db.query("SELECT * FROM students", (err, result) => {

    if (err) return res.status(500).send(err);

    res.json(result);
  });
});


// Add Student
app.post("/students", (req, res) => {

  const { id, name, email, course, age } = req.body;

  if (!id || !name || !email || !course || !age) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql =
    "INSERT INTO students (id,name,email,course,age) VALUES (?,?,?,?,?)";

  db.query(sql, [id, name, email, course, age], (err) => {

    if (err) return res.status(500).send(err);

    res.send("Student Added");
  });
});


// Update Student
app.put("/students/:id", (req, res) => {

  const id = req.params.id;

  const { name, email, course, age } = req.body;

  const sql =
    "UPDATE students SET name=?,email=?,course=?,age=? WHERE id=?";

  db.query(sql, [name, email, course, age, id], (err) => {

    if (err) return res.status(500).send(err);

    res.send("Updated");
  });
});


// Delete Student
app.delete("/students/:id", (req, res) => {

  const id = req.params.id;

  db.query("DELETE FROM students WHERE id=?", [id], (err) => {

    if (err) return res.status(500).send(err);

    res.send("Deleted");
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
