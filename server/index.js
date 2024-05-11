//=====IMPORTS=====//
const express = require('express');
const app = express();
const cors = require("cors");

//=====MIDDLEWARE=====//
app.use(cors());
app.use(express.json());



//=====ROUTES=====//

//Exercise Routes
app.use("/api/exercises", require("./routes/exerciseRoutes"));

//Set Routes
app.use("/api/setStructures", require("./routes/setRoutes"));

//Workout Routes
app.use("/api/workoutStructures", require("./routes/workoutRoutes"));

//Split Routes








//======SERVER======//
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
