//=====IMPORTS=====//
const express = require('express');
const app = express();
const cors = require("cors");

//=====MIDDLEWARE=====//
app.use(cors());
app.use(express.json());



//=====ROUTES=====//

//==WORKOUTS==//
app.get('/', (req, res) => {
  res.send("System be runnin Gucci Mane")
})

//Exercise Routes
app.use("/api/exercises", require("./routes/ProgramRoutes/exerciseRoutes"));

//Set Routes
app.use("/api/setStructures", require("./routes/ProgramRoutes/setRoutes"));

//Workout Routes
app.use("/api/workoutStructures", require("./routes/ProgramRoutes/workoutRoutes"));

//Split Routes
app.use("/api/splitStructures", require("./routes/ProgramRoutes/splitRoutes"));

//Program Routes
app.use("/api/programStructures", require("./routes/ProgramRoutes/programRoutes"));

//==USER==//
app.use("/api/userLogin", require("./routes/UserRoutes/userLoginRoutes"));


//======SERVER======//
const PORT = process.env.PORT ?? 5001;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
