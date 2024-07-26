const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

let correctAnswers = [1, 1, 2, 3, 4, 1, 4, 4, 5, 1, 4, 3, 3, 1, 1, 3, 4, 3, 1, 5, 2, 5, 3, 2, 3, 3, 3];
let userAnswers = [];
let startTime;

const percentiles = {
    1: 0.1,
    2: 0.4,
    3: 1,
    4: 2,
    5: 5,
    6: 9,
    7: 16,
    8: 25,
    9: 37,
    10: 50,
    11: 63,
    12: 75,
    13: 84,
    14: 91,
    15: 95,
    16: 98,
    17: 99,
    18: 99.6,
    19: 99.9
};

app.get('/', (req, res) => {
    res.redirect('/instructions');
});

app.get('/instructions', (req, res) => {
    res.render('instructions');
});

app.get('/item/:number', (req, res) => {
    const itemNumber = parseInt(req.params.number, 10);
    if (itemNumber === 1) {
        startTime = Date.now();
    }
    const timeLimit = itemNumber <= 12 ? 30 : 60;
    res.render('item', { itemNumber, timeLimit });
});

app.post('/item/:number', (req, res) => {
    const itemNumber = parseInt(req.params.number, 10);
    const userAnswer = parseInt(req.body[`item${itemNumber}`], 10);
    userAnswers.push(userAnswer);

    if (itemNumber < correctAnswers.length) {
        res.redirect(`/item/${itemNumber + 1}`);
    } else {
        res.redirect('/result');
    }
});

app.get('/result', (req, res) => {
    let correctCount = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i] === userAnswers[i]) {
            correctCount++;
        }
    }
    let scaledScore = Math.min(19, Math.max(1, Math.ceil(correctCount / 1.42)));
    let percentile = percentiles[scaledScore] || 0;
    res.render('result', { correctCount, scaledScore, percentile });
    userAnswers = []; // Reset for the next test session
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
