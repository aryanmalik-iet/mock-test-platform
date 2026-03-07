# Mock Test Platform

A simple mock test platform I built while learning JavaScript and trying to understand how real online exam systems work.

The idea behind this project was not just building a UI, but implementing the **logic behind an exam engine** like question navigation, palette states, timers, and test flow.

This project started as a single HTML file and I gradually rebuilt it step by step into a more structured project.

---

## Features

- Start test screen with question count and time limit  
- Countdown timer with **auto submit when time runs out**  
- Question navigation (**Next / Previous**)  
- **Question palette** for direct navigation  
- Question states:
  - Answered
  - Marked for Review
  - Answered & Marked for Review
  - Visited but Unanswered
  - Not Visited
- Automatic palette state updates
- Result screen with score calculation
- Restart test option
- Fixed exam layout with sidebar palette

---

## Project Structure
mock-test-platform
│
├── css
│   └── style.css
├── js
│   ├── exam.js
│   ├── questions.js
│   ├── timer.js
│   └── ui.js
└── index.html

**exam.js**  
Handles exam flow, navigation logic, palette generation, and question states.

**ui.js**  
Responsible for rendering questions and options.

**timer.js**  
Manages the countdown timer and automatic submission.

**questions.js**  
Contains the question data used in the test.

---

## Tech Used

- HTML  
- CSS  
- JavaScript (Vanilla JS)

No frameworks were used because the goal was to **understand core logic and DOM manipulation first**.

---

## Vision

This project is currently a **front-end exam engine prototype**, but the goal is to gradually turn it into a **full scale mock test system**.

Future plans include:

- Admin panel for creating tests
- Question upload system
- Multiple test handling
- Attempt history
- Result analytics
- Backend integration
- Learning **system design and scalability** while building it
- Handling large question sets and multiple concurrent exams

The long-term goal is to understand how **real exam platforms are designed and scaled**.

---

## Running the Project

Just open:
index.html

in a browser.

No setup or dependencies required.