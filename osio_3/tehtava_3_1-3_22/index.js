// const http = require("http");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./person");
const person = require("./person");

const app = express();
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  cors({
    origin: "https://fullstack-website-e7px.onrender.com",
  })
);
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.use(
  morgan("tiny", {
    skip: (req) => req.method === "POST",
  })
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req) => req.method !== "POST",
    }
  )
);

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: "1",
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: "2",
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: "3",
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: "4",
//   },
// ];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(persons))
// })

// const generateId = () => {
// let id = Math.floor(Math.random() * 1000000).toString();
// if (persons.find((person) => person.id === id)) {
//   return generateId();
// }
// return id;
//   return Math.floor(Math.random() * 1000000).toString();
// };

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
    // } else if (persons.find((person) => person.name === body.name)) {
    //   return response.status(400).json({
    //     error: "name must be unique",
    //   });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));

  // persons = persons.concat(person);
  // response.json(person);
});

app.get("/api/persons", (request, response, next) => {
  // response.json(persons);
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // const id = request.params.id;
  // const person = persons.find((person) => person.id === id);
});

app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
      );
    })
    .catch((error) => next(error));
  // const date = new Date();
  // response.send(
  //   `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  // );
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).json({ error: "Person not found" });
    }
    person.name = name;
    person.number = number;

    return person
      .save()
      .then((updatedPerson) => {
        response.json(updatedPerson);
      })
      .catch((error) => next(error));
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  // const id = request.params.id;
  // persons = persons.filter((person) => person.id !== id);

  // response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
