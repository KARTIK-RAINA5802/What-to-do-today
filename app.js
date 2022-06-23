const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your To Do list"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    Item.find({}, function(err, foundItems) {
        if(foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if(err) {
                    console.log(err);
                } else{
                    console.log("Successfully saved default items to DB")
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {
                kindOfDay: day,
                newListItems: foundItems
            });
        }

    })

   
})

app.post("/", function(req, res) {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server is up and running!!!!");
});