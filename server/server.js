const express = require('./config/express.js');

const port = process.env.PORT || 8080;

const app = express.init();

app.listen(port, "0.0.0.0", err => {
    if (err) {
        console.log(err);
    }

    console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});
