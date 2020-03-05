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

### NEXT STEPS

 - Create private chats: use a hash function on both user _ids and check to see the biggest one among them, then make it the room id. Connect both users to this room id.

 - Create pending messages system, to allow users to send messages to offline users and to receive this offline messages once online.
