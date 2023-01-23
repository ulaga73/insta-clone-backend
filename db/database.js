const mongoose = require("mongoose");

async function dbServer(){
    await mongoose.connect("mongodb+srv://Ulaganathan:Ulaganathan@instaclone.aep1ky8.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database is connected successfully...");
}

module.exports = dbServer;