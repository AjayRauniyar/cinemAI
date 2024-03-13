const express =require('express');
const dotenv= require('dotenv');
const port =process.env.PORT || 5000;
const path=require("path");


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "frontend")));
app.use('/openai',require('./routes/openaiRoutes'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});