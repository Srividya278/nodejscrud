const express = require("express");
const { all } = require("express/lib/application");
const pool = require("./db");
const app = express();

app.use(express.json()) // req.body

//ROUTES//

//get a student
app.get("/students/:college_id", async (req,res) => {
  const {college_id} = req.params
  try {
    const allStudents = await pool.query("SELECT student_id,student_name,college.college_id FROM students INNER JOIN college ON students.college_id = college.college_id where college.college_id = $1", [college_id]);
    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
  }
})

//get all students
app.get("/students", async (req,res) => {
  try {
    const allStudents = await pool.query("select * from students inner join college on college.college_id = students.college_id");

    res.json(allStudents);
  } catch (err) {
    console.error(err.message);
  }
})

//create a student
app.post("/students",async (req,res) => {
  try {
    const {college_name} = req.body;
    const newStudent = await pool.query("INSERT INTO students (student_name,college_id) SELECT 'Joe', college_id FROM college WHERE college_name = $1 LIMIT 1", [college_name]);
  }catch(err) {
    console.error(err.message);
  }
})

//update a student
app.put("/student/:college_id", async(req,res) => {
  try {
    const {college_id} = req.params;
    const {student_name} = req.body;
    const update_student = await pool.query("UPDATE students SET student_name = $1 from college WHERE college.college_id = $2", [student_name, college_id]);
    res.json("STUDENT was Updated");
  } catch (err) {
    console.error(err.message);
  }
})

//delete a student
app.delete("/student/:college_id" , async (req,res) => {
  try {
    const {college_id} = req.params;
    const delete_students = await pool.query("DELETE from students where college_id = $1", [college_id]);
    res.json("STUDENT was succesfully deleted");
  } catch (err) {
    console.error(err.message);    
  }
})

app.listen(3000, () => {
  console.log("Server is listening to port 3000")
})