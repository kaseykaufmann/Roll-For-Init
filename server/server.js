const express = require('./config/express.js');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

if (!process.env.NODE_ENV) {
    console.log(process.env.NODE_ENV)
    console.log("Node environment not found, using development by default.")
}

const app = express.init();

app.listen(port, host, err => {
    if (err) {
        console.log(err);
    }

    console.info(">>> 🌎 Open http://%s:%s/ in your browser.", host, port);
});
