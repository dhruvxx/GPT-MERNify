import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

// get requests - get, post, put, delete (HTTP verbs)
// put is used to update in the database
// three callback parameters: request, response, next
// there are two types of routes - static and dynamic : static is "/hello" and dynamic is "/hello/:id"
// app.delete("/user/:id", (req, res, next) => {
  // req.body is the body of the request
  // name is the key of the body
  // console.log(req.body.name);
//   console.log(req.params.id);
//   res.json({ message: `Hello ${req.body.name}` });
// })
const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {  
// open development server on port 3000 (param 1) and the callback (param 2)
  app.listen(PORT, ()=>console.log("Database running and connected"));
}).catch(err=>console.log(err));
