let ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/bankDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const historySchema = new Schema({
  day: Number,
  month: Number,
  year: Number,
  hour: Number,
  minute: Number,
  From: String,
  To: String,
  status: String,
  amountExchange: Number,
});

const History = mongoose.model("History", historySchema);

const userSchema = new Schema({
  name: String,
  account: Number,
  balance: Number,
  ifsc: Number,
  email: String,
  history: [historySchema],
});

const User = mongoose.model("User", userSchema);

const defaultUserNames = [
  "Harshad Pachore",
  "Shivam Sable",
  "Shubham Pachore",
  "Siddhesh Gaykar",
  "Shrikant Rahane",
  "Sayli Sirsath",
  "kusum kamdh",
  "Yash Mahajan",
  "Sunil Pawar",
  "Harsh Gudipudi",
];
const defaultUsersEmail = [
  "hp21@gmail.com",
  "ss14@gmail.com",
  "sp10@gmail.com",
  "sg9@gmail.com",
  "sp123@gmail.com",
  "ss2@gmail.com",
  "kk@gmail.com",
  "ym21@gmail.com",
  "sp21@gmail.com",
  "hg@gmail.com",
];

const defaultUsers = [];
for (let i = 0; i < defaultUserNames.length; i++) {
  const newUser = new User({
    name: defaultUserNames[i],
    account: Math.floor(Math.random() * Math.pow(10, 11)),
    balance: 1000 + Math.floor(Math.random() * 10000),
    ifsc: 6 * Math.pow(10, 9) + Math.floor(Math.random() * 3 * Math.pow(10, 9)),
    email: defaultUsersEmail[i],
  });
  defaultUsers.push(newUser);
}
app.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers.length === 0) {
        User.insertMany(defaultUsers, function (err, result) {
          if (err) {
            console.log(err);
          }
        });
        res.redirect("/");
      } else {
        const users = JSON.stringify(defaultUserNames);
        res.render("home", { usersNames: users });
      }
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/details", (req, res) => {
  User.find({}, (err, foundUsers) => {
    const users = JSON.stringify(defaultUserNames);
    res.render("details", {
      users: foundUsers,
      usersNames: users,
    });
  });
});

app.post("/users", (req, res) => {
  const user = JSON.parse(req.body.user);
  res.redirect("/profile/" + user.name);
});

app.get("/profile/:userName", (req, res) => {
  const userName = req.params.userName;
  const users = JSON.stringify(defaultUserNames);
  User.findOne({ name: userName }, function (err, foundUser) {
    res.render("profile", {
      currentUser: foundUser,
      usersNames: users,
    });
  });
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.post("/succes", function (req, res) {
  res.render("success");
});

app.get("/transaction", (req, res) => {
  res.render("transaction");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
