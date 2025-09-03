const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://Joni:${password}@fullstack.rhsgaug.mongodb.net/?retryWrites=true&w=majority&appName=fullstack`;

mongoose.set(`strictQuery`, false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Person = mongoose.model(`Person`, personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
  return;
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: Math.floor(Math.random() * 1000000).toString(),
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
  return;
} else {
  console.log("Jotain meni nyt väärin!");
  mongoose.connection.close();
  return;
}
