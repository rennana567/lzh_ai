const people = [
    {name: 'Alice',age: 20,role: "user"},
    {name: 'Bob',age: 25,role: "admin"},
    {name: 'Charlie',age: 30,role: "user"}
]
const allAdults = people.every(person => person.age >= 18);
const hasAdmin = people.some(person => person.role === "admin");