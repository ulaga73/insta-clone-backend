const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const bodyParser = require("body-parser");
const cors = require("cors");
const dbServer = require("./db/database");
const Post = require("./models/post");
const fileUpload = require("express-fileupload");
const path = require("path");

dbServer()
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.get("/",(req, res) => {
    res.send("Backend server is on");
} )

app.post("/postview", (req, res) => {
    const {author, location, description} = req.body;
    const {imageFile} = req.files;
    console.log(req.body, imageFile);
    imageFile.mv("./uploads/"+imageFile.name, async(err) => {
        if(err){
            res.status(400).json({
                status: "failure",
                message: err.message
            })
        }
        else{
            try{
                const data = await Post.create({author, location, description, imageFile: imageFile.name})
                res.status(200).json({
                    status: "success",
                    data
                })
            }catch(err){
                res.status(400).json({
                    status: "failure",
                    message: err.message
                })
            }
        }
    })
})

app.get("/postview", async(req, res) => {
    try{
        const data = await Post.find().sort({$natural:-1});
        res.status(200).json({
            status: "success",
            data
        })
    }catch(err){
        res.status(404).json({
            status: "failure",
            message: err.message
        })
    }
    
})

app.get("/images/:fileName", (req, res) => {
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`));
})


app.listen(8080, () => {console.log("Port 8080 connected successfully...")});
