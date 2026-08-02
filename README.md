# Code-Ground
A simple jsfiddle/jsbin like tool for testing and sharing small HTML, JS, CSS snippets

# Demo 

https://code-ground.herokuapp.com/

# Features:
1) Automatically insert closing matching tags
2) Line number
3) Highlight current line
4) Expandable editor panels
5) Fork the current snippet
6) Open output in new tab
7) Syntax highlighting
8) Easy to use
9) Loads faster
10) Autocomplete suggestions
11) Tab complete snippets
12) Include libraries from cdnjs
14) Highlight mactcing braces/tags


# Installation instructions

1) Git clone the repo.
2) Create a `.env` file at the project root.
3) Add the mongoDB credentials in the `.env` file as below:

```
USERNAME=userName
PASSWORD=password
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.x7hyqvg.mongodb.net/?appName=Cluster0
PORT=3000

```
4) Run `npm install` to install the depencies.
5) Run `npm run start` to start the application.
