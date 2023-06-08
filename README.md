# Knight Travails

This project is the closing piece of the DSA mini course of The Odin Project.
You can find more about it on
[the website](https://www.theodinproject.com/lessons/javascript-knights-travails)
of the project.

## Solution

I will create a website, which will demonstrate the algorithm on a chess board.
The JavaScript is going to be written with Typescript in a webpack setup. The
webpack setup is the simplest possible. The dist folder contains the index.html
file and all the assets. The client-side JS code is built up in the dist folder
too. It is webpack production build, so it is minified.

## Usage

You can simply try the deployed version on gh-pages. You can also clone the
repositiory in the following steps. I suppose Linux opertaional system and
Node.js latest stable version installed on your computer.

```
git clone git@github.com:AlexErdei73/knight-travails.git
cd knight-travails
npm i
npm run start
```

This will compile the Typescript source code in the src folder and creates the
main.js bundle in the dist folder. Webpack is in watch mode, so whenever you
change the typescript code the bundle is changing automatically. It is worth to
use a live server plugin in your editor to watch the index.html file. The
algorithm is in the tree.ts file, index.ts contains the main program. The other
files are responsible for the working of the simple UI.
