const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to API.'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'Shhhh', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created!',
                authData
            })
        }
    });
});

app.post('/api/login', (req, res) => {
    // Demo user
    const user = {
        id: 1,
        username: 'Test',
        email: 'test@test.com'
    }
    jwt.sign({
        user
    }, 'Shhhh', (err, token) => {
        res.json({
            token
        });
    });
});

// Format of Token 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader != undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log(`Server started on port`);
});