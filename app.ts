import express from "express";
import  index from './api/index'
import calendar from './api/calendar'

const app = express();
app.get("/api", index);
app.get("/api/calendar", calendar);

app.listen(process.env.port || 9000, () => {
  console.log(`Server is running: http://localhost:${process.env.port || 9000}`)
});


