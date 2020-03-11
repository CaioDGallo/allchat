## AllChat

A live chat written in JavaScript, using websocket. The front end was created using ReactJS and the backend using NodeJS.


Front-end repo: https://github.com/CaioDGallo/allchat-web

Back-end repo: https://github.com/CaioDGallo/allchat

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

It is necessary to start a redis instance for all the features to work properly
docker run --name redis -p 6379:6379 -d -t redis