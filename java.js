// Each lesson: a title, a short explanation, and example code the learner can edit and run.
const lessons = [
  {
    title: "1. Variables",
    text: "A variable stores a value so you can use it later. Use const when the value will not change, and let when it will.",
    code: `const name = "Aziz";
let age = 20;

age = age + 1; // let can change

console.log("Name:", name);
console.log("Age:", age);`
  },
  {
    title: "2. Data types",
    text: "Values have types: string (text), number, boolean (true/false), undefined, null. Use typeof to check.",
    code: `console.log(typeof "hello");   // string
console.log(typeof 42);        // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined

const text = "JavaScript";
console.log(text.length);        // 10
console.log(text.toUpperCase()); // JAVASCRIPT`
  },
  {
    title: "3. Operators",
    text: "Operators do math and comparisons. === checks that value and type are equal. && means AND, || means OR.",
    code: `console.log(10 + 5);   // 15
console.log(10 % 3);   // 1 (remainder)
console.log(5 === "5"); // false
console.log(5 == "5");  // true (avoid ==)

const hasId = true;
const isAdult = false;
console.log(hasId && isAdult); // false
console.log(hasId || isAdult); // true`
  },
  {
    title: "4. If / else",
    text: "if runs code only when a condition is true. else runs when it is not.",
    code: `const score = 72;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 60) {
  console.log("Good");
} else {
  console.log("Keep practicing");
}`
  },
  {
    title: "5. Loops",
    text: "A loop repeats code. The for loop has three parts: start, condition, step.",
    code: `for (let i = 1; i <= 5; i++) {
  console.log("Round", i);
}

let count = 3;
while (count > 0) {
  console.log("Countdown:", count);
  count--;
}`
  },
  {
    title: "6. Functions",
    text: "A function is a reusable block of code. It can take inputs (parameters) and give back a result with return.",
    code: `function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b; // arrow function

console.log(add(2, 3));      // 5
console.log(multiply(4, 5)); // 20`
  },
  {
    title: "7. Arrays",
    text: "An array is an ordered list. Positions start at 0. Useful methods: push, map, filter.",
    code: `const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]);     // apple
fruits.push("mango");
console.log(fruits.length); // 4

const upper = fruits.map(f => f.toUpperCase());
console.log(upper);

const long = fruits.filter(f => f.length > 5);
console.log(long);`
  },
  {
    title: "8. Objects",
    text: "An object groups related data as key: value pairs. Access with a dot.",
    code: `const student = {
  name: "Aziz",
  course: "IT",
  skills: ["HTML", "CSS", "JavaScript"],
  greet() {
    return "Hi, I am " + this.name;
  }
};

console.log(student.name);
console.log(student.skills[2]);
console.log(student.greet());`
  },
  {
    title: "9. DOM and events",
    text: "JavaScript can change the page. Select an element, then change its text or style. Run this and look at the Page demo box.",
    code: `const box = document.getElementById("demo");

box.textContent = "Hello from JavaScript!";
box.style.background = "#f7c948";
box.style.color = "#1c2733";

box.addEventListener("click", () => {
  box.textContent = "You clicked the box!";
});

console.log("Now click the Page demo box.");`
  }
];

const list = document.getElementById("lesson-list");
const titleEl = document.getElementById("lesson-title");
const textEl = document.getElementById("lesson-text");
const codeEl = document.getElementById("code");
const outEl = document.getElementById("output");
let current = 0;

function show(i) {
  current = i;
  const lesson = lessons[i];
  titleEl.textContent = lesson.title;
  textEl.textContent = lesson.text;
  codeEl.value = lesson.code;
  outEl.textContent = "Press Run to see the result.";
  outEl.className = "";
  // Replace the demo box with a fresh one to remove old click listeners
  const oldDemo = document.getElementById("demo");
  const freshDemo = document.createElement("div");
  freshDemo.id = "demo";
  freshDemo.textContent = "This box is for the DOM lesson.";
  oldDemo.replaceWith(freshDemo);
  document.querySelectorAll(".lessons button").forEach((b, n) =>
    b.classList.toggle("active", n === i)
  );
}

function run() {
  const lines = [];
  const fakeConsole = {
    log: (...args) =>
      lines.push(
        args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")
      )
  };
  outEl.className = "";
  try {
    new Function("console", codeEl.value)(fakeConsole);
    outEl.textContent = lines.length ? lines.join("\n") : "(no output: use console.log to print)";
  } catch (err) {
    outEl.className = "error";
    outEl.textContent = err.name + ": " + err.message;
  }
}

lessons.forEach((lesson, i) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = lesson.title;
  btn.addEventListener("click", () => show(i));
  li.appendChild(btn);
  list.appendChild(li);
});

document.getElementById("run").addEventListener("click", run);
document.getElementById("reset").addEventListener("click", () => show(current));
document.getElementById("prev").addEventListener("click", () => show(Math.max(0, current - 1)));
document.getElementById("next").addEventListener("click", () => show(Math.min(lessons.length - 1, current + 1)));

show(0);