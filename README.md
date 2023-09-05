![Alt text](image.png)

## Overview
Fit Pal is an all-in-one fitness app designed to simplify and enhance workout experiences for fitness enthusiasts.

 The app aims to solve the problem of managing workout routines, tracking progress, fitness programs, and providing personalized exercise recommendations through AI and from a library consisting of around 1000 exercises. Fit Pal is a user-friendly and comprehensive tool that helps individuals achieve their fitness goals efficiently.


Target Audience: The Fit Pal app is targeted towards fitness enthusiasts of all levels - from beginners to trainers and coaches and experienced athletes. It caters to individuals who wish to log information about their workouts, establish or maintain a regular workout routine, track their progress, customizable training programs, and receive personalized exercise suggestions based on their goals, preferences, and fitness levels. 


This project has been completed from scratch using the PERN Stack (PostgreSQL, Express, React, Node) for the [Lighthouse Labs](https://www.lighthouselabs.ca/) Web Development Bootcamp Program. It took 13 days to complete, including planning and presentation prep, with development taking up 8 days.

## Team 
Our team consists of [Rishad Alam](https://github.com/rishadsanian), [Phat Luong](https://github.com/luongtanphat25), and [Dylan Burnham](https://github.com/dburnham1212).




## Table of Contents
- [Overview](#overview)
- [Team](#team)
- [Features](#features)
- [Screenshot and Demo](#screenshots-and-demo)
- [Setup](#setup)
- [Tech Stacks and Dependencies
](#tech-stacks-and-dependencies)
- [Future Features](#future-features)
- [Known Issues](#known-issues)

## Features

 - User Authentication
 - Chat GPT generated motivational messages and daily workout plans based on user profile
 - Editable User Profile
 - CRUD Workout Log
 - Library of Exercises, instructions and details from external API
 - Workout History
 - Program Schedule 
 - Public Programs and CRUD logging and tracking capabilities
 - CRUD Customizable Programs with customizable daily sessions 
- Weekly Exercise Tracking chart
- Weight Tracker Chart - Aggregate Average weight tracking over 7 days, 30 days, or 1 year. 
- Weekly Exercise Statistics

[Back to Table of Contents](#table-of-contents)

## Screenshots and Demo
![Alt text](docs/FitPal_mobile_screenshots.png)

### Mobile View
<img src="docs/FitPal_animation_mobile.gif" alt="Mobile Animation" width="300">


### Desktop View
<img src="docs/FitPal_animation_lg_screen.gif" alt="Large Screen Animation" width="600">

[Back to Table of Contents](#table-of-contents)


## Setup

- Install dependencies with `npm install` in each respective `/server` and `/client` folders.

- Setup PSQL by seting up .env file, following the exapmle in .env.example file and mirgrating schema and seeds to the database in the server side. 

- Setup API Ninja and Open AI key in .env file in client side following the .env.example file in the client side. 

[Back to Table of Contents](#table-of-contents)


## Tech Stacks and Dependencies
 - Planning: Jira, Trello, Draw.io, Photoshop
 - Database: PostgreSQL
 - External APIs: Open AI, API-Ninja Exercise

 - Server:   

   bcryptjs: 2.4.3 | body-parser: 1.20.2 | cookie-parser: 1.4.6 | cors: 2.8.5 | dotenv: 16.3.1 | express: 4.18.2 | express-session: 1.17.3 | morgan: 1.10.0 | pg: 8.11.2

- Client: 

  @emotion/react: 11.11.1, @emotion/styled: 11.11.0, @emotion/react: 11.11.1 | @emotion/styled: 11.11.0 | @mui/material: 5.14.3 | @testing-library/jest-dom: 5.17.0 | @testing-library/react: 13.4.0 | @testing-library/user-event: 13.5.0 | @types/react-slick: 0.23.10 | axios: 1.4.0 | chart.js: 4.3.3 | chartjs-adapter-moment: 1.0.1 | dotenv: 16.3.1 | moment: 2.29.4 | react: 18.2.0 | react-chartjs-2: 5.2.0 | react-dom: 18.2.0 | react-router-dom: 6.14.2 | react-scripts: 5.0.1 | react-slick: 0.29.0 | react-transition-group: 4.4.5 | slick-carousel: 1.8.1 | web-vitals: 2.1.4



[Back to Table of Contents](#table-of-contents)

## Future Features
- Connect to smart wear though Google Fit API via WebSocket
- Further integration of Chat-GPT
- Ratings, sharing, and subscription of programs between users
- Calendar

[Back to Table of Contents](#table-of-contents)

## Known Issues
 - Loading of Chat GPT Daily Summary
 
[Back to Table of Contents](#table-of-contents)




