const express = require('express');
const app = express();
const expressWs = require('express-ws');
const websocket = require('./utils/websocket.js');
expressWs(app);

app.use('/ws', websocket);

app.use('/', express.static('public/views/'));
app.use('/lemur', express.static('public/views/lemur.html'));
app.use('/monkey', express.static('public/views/monkey.html'));
app.use(express.static('public'));

app.get('*', (req, res) => {});

app.listen(5566, () => {
  console.log(`Server is running at http://localhost:5566`);
});
