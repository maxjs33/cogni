// Sample implementation for starting each test

function startFigureWeights() {
    document.getElementById('figure-weights-start').style.display = 'none';
    document.getElementById('figure-weights-test').style.display = 'block';
    // Initialize Figure Weights Test
    console.log("Starting Figure Weights Test...");
}

function startDigitSpan() {
    document.getElementById('digit-span-start').style.display = 'none';
    document.getElementById('digit-span-test').style.display = 'block';
    digitSpanIndex = 0;
    digitSpanScore = 6; // Starting with 6 raw score
    currentSequenceType = 'forward';
    speakDigitSpanSequence();
}

function startLetterNumberSequencing() {
    document.getElementById('letter-number-sequencing-start').style.display = 'none';
    document.getElementById('letter-number-sequencing-test').style.display = 'block';
    // Initialize Letter-Number Sequencing Test
    console.log("Starting Letter-Number Sequencing Test...");
}

function startArithmetic() {
    document.getElementById('arithmetic-start').style.display = 'none';
    document.getElementById('arithmetic-test').style.display = 'block';
    currentIndex = 0;
    arithmeticScore = 6; // Starting with 6 raw score
    repeatCount = 0;
    speakArithmeticQuestion();
}

// Digit Span Test Logic
const digitSpanSequences = {
    forward: ['9-7', '6-3', '5-8-2', '6-9-4', '7-2-8-6', '6-4-3-9', '4-2-7-3-1', '7-5-8-3-6'],
    backward: ['3-1', '2-4', '6-4', '7-5', '9-2-6', '5-7-4', '9-7-2-8', '8-6-9-4'],
    sequencing: ['1-2', '4-2', '3-1-6', '0-9-4', '8-7-9-2', '4-8-7-1', '2-6-9-1-7', '3-8-3-5-8']
};

let digitSpanIndex = 0;
let digitSpanScore = 0;
let currentSequenceType = 'forward';

function speakDigitSpanSequence() {
    const sequence = digitSpanSequences[currentSequenceType][digitSpanIndex];
    const utterance = new SpeechSynthesisUtterance(sequence.replace(/-/g, ' '));
    utterance.rate = 0.5;
    utterance.onend = () => {
        document.getElementById('response').disabled = false;
        document.getElementById('response').focus();
    };
    document.getElementById('response').value = '';
    document.getElementById('response').disabled = true;
    window.speechSynthesis.speak(utterance);
}

function submitDigitSpanResponse() {
    const response = document.getElementById('response').value.split('').join('-');
    const sequence = digitSpanSequences[currentSequenceType][digitSpanIndex];
    const correctResponse = getCorrectDigitSpanResponse(sequence);

    if (response === correctResponse) {
        digitSpanScore++;
    }
    digitSpanIndex++;
    if (digitSpanIndex >= digitSpanSequences[currentSequenceType].length) {
        if (currentSequenceType === 'forward') {
            currentSequenceType = 'backward';
        } else if (currentSequenceType === 'backward') {
            currentSequenceType = 'sequencing';
        } else {
            showDigitSpanResults();
            return;
        }
        digitSpanIndex = 0;
    }
    speakDigitSpanSequence();
}

function getCorrectDigitSpanResponse(sequence) {
    if (currentSequenceType === 'forward') {
        return sequence;
    } else if (currentSequenceType === 'backward') {
        return sequence.split('-').reverse().join('-');
    } else {
        return sequence.split('-').sort().join('-');
    }
}

function showDigitSpanResults() {
    document.getElementById('digit-span-test').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('header').innerText = 'Digit Span Test Results';

    const scaledScore = getScaledScore(digitSpanScore);
    const percentile = getPercentile(scaledScore);

    let resultText = `Test completed. Your raw score: ${digitSpanScore}\n`;
    resultText += `Your scaled score: ${scaledScore}\n`;
    resultText += `Your percentile: ${percentile}\n`;

    document.getElementById('score').innerText = resultText;
}

// Arithmetic Test Logic
const arithmeticQuestions = [
    "Lou has six cricket balls. He loses three. How many cricket balls does he have left?",
    "Anna has 4 cats and 20 fish. If each cat gets an equal number of fish, how many fish does each cat get?",
    "Ben is 40 years old. Jake is 23 years old. How many years older is Ben than Jake?",
    "Lily has 32 books. She sells half of them to a second-hand bookstore and then donates 7 more. How many books does she have left?",
    "Sophia has 56 stamps. She gives 7 people 6 stamps each. How many stamps does she have left?",
    "There are 18 marbles in each box. How many marbles are there in 11 boxes?",
    "Ethan gives 6 friends 4 candies each. He has 2 candies left for himself. How many candies did he start with?",
    "Jessica exercises 20 minutes each day from Monday through Friday. She exercises 35 minutes on Saturday. How many minutes does she exercise all together?",
    "Tom waits in line behind 140 people. He allows 25 more people in line ahead of him. Five people get to the front of the line each minute. How many minutes until Tom gets to the front of the line?",
    "You can bake 4 pies in 20 minutes. How long does it take to bake 12 pies?",
    "Emily sells two-thirds the number of posters that David sold. David sold 450 posters. How many did Emily sell?",
    "Sam worked 160 hours in 4 weeks. If he worked an equal number of hours each week, how many hours did he work each week?",
    "Alice has twice as many oranges as Mark. Alice has 88 oranges. How many oranges does Mark have?",
    "Chloe usually jogs 40 laps around the gym. She jogs 15 percent fewer laps today. How many laps does she jog today?",
    "If 6 machines can complete a project in 5 days, how many machines are needed to complete the project in 2.5 days?",
    "A mail center processes 25,000 pieces of mail in August. In September, the pieces of mail processed increase by 12 percent. In October, the pieces increase by another 8 percent. How many pieces are processed in October after both increases?"
];

const arithmeticAnswers = [3, 5, 17, 9, 14, 198, 26, 135, 33, 60, 300, 40, 44, 34, 12, 30240];
let currentIndex = 0;
let arithmeticScore = 0;
let repeatCount = 0;

function speakArithmeticQuestion() {
    const question = arithmeticQuestions[currentIndex];
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.rate = 0.5;
    utterance.onend = () => {
        document.getElementById('arithmetic-response').disabled = false;
        document.getElementById('arithmetic-response').focus();
    };
    document.getElementById('arithmetic-response').value = '';
    document.getElementById('arithmetic-response').disabled = true;
    window.speechSynthesis.speak(utterance);
}

function submitArithmeticResponse() {
    const response = parseInt(document.getElementById('arithmetic-response').value, 10);
    if (response === arithmeticAnswers[currentIndex]) {
        arithmeticScore++;
    }
    currentIndex++;
    repeatCount = 0;
    if (currentIndex < arithmeticQuestions.length) {
        speakArithmeticQuestion();
    } else {
        showArithmeticResults();
    }
}

function repeatArithmeticQuestion() {
    if (repeatCount < 1) {
        repeatCount++;
        speakArithmeticQuestion();
    } else {
        alert("You can only ask to repeat the question once.");
    }
}

function getScaledScore(rawScore) {
    if (rawScore <= 3) return 1;
    if (rawScore === 4) return 2;
    if (rawScore === 5) return 3;
    if (rawScore === 6) return 4;
    if (rawScore <= 8) return 5;
    if (rawScore === 9) return 6;
    if (rawScore === 10) return 7;
    if (rawScore === 11) return 8;
    if (rawScore <= 13) return 9;
    if (rawScore === 14) return 10;
    if (rawScore === 15) return 11;
    if (rawScore <= 17) return 12;
    if (rawScore === 18) return 13;
    if (rawScore === 19) return 14;
    if (rawScore === 20) return 15;
    if (rawScore === 21) return 16;
    if (rawScore === 22) return 18;
    if (rawScore === 23) return 19;
}

function getPercentile(scaledScore) {
    const percentiles = {
        1: 2, 2: 9, 3: 16, 4: 25, 5: 37, 6: 50, 7: 63, 8: 75, 9: 84,
        10: 90, 11: 95, 12: 98, 13: 99, 14: 99, 15: 99, 16: 99, 17: 99,
        18: 99, 19: 99
    };
    return percentiles[scaledScore] || 0;
}

function showArithmeticResults() {
    document.getElementById('arithmetic-test').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('header').innerText = 'Arithmetic Test Results';

    const scaledScore = getScaledScore(arithmeticScore);
    const percentile = getPercentile(scaledScore);

    let resultText = `Test completed. Your raw score: ${arithmeticScore}\n`;
    resultText += `Your scaled score: ${scaledScore}\n`;
    resultText += `Your percentile: ${percentile}\n`;

    document.getElementById('score').innerText = resultText;
}
