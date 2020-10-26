# Simple Clock

From an idea in JavaScript30 course by [Wes Bos](//github.com/wesbos), I wrote my version of this simple clock using HTML, CSS, and vanilla Javascript. I have slightly improved the project by making it responsive and changing the moving algorytm for hour and minutes hands.

**Demo: [https://pasor1.netsons.org/clock/](https://pasor1.netsons.org/clock/)**

## info

- main style: /src/assets/scss/main.scss
- main js: /src/assets/js/main.js

- Install: `npm install`
- Test: `npm run test` or `gulp` (local live view and browser sync at http://localhost:3000)
- Build: `npm run build` or `gulp build` (build in /dist)
- Clean: `npm run clean` or `gulp clen`  (clean /dist folder)
- Deploy: `npm run deploy` or `gulp deploy` (deploy via FTP, edit the connection details in gulpfile.js)

## to Do

Apply transition to the second hand movement, pay attention to the transition from 59 to 0 seconds.
