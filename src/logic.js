import readlineSync from 'readline-sync';

// sub-functions:
const generateRandomNumber = (max = 20) => {
  const perhapsNumber = Math.floor(Math.random() * Math.floor(max));
  const readyNumber = perhapsNumber !== 0 ? perhapsNumber : generateRandomNumber();

  return readyNumber;
};

const pickMathOperator = (operators = ['+', '-', '*']) => {
  const operatorsNumber = operators.length;
  const randomPickIndex = Math.floor(Math.random() * Math.floor(operatorsNumber));

  return operators[randomPickIndex];
}

const generateExpression = () => {
  const firstOperand = generateRandomNumber();
  const mathOperator = pickMathOperator();
  const secondOperand = generateRandomNumber();

  return `${firstOperand} ${mathOperator} ${secondOperand}`;
};

const buildQuestion = (gameType) => {
  let question;

  switch (gameType) {
    case 'even':
      question = generateRandomNumber();
      break;
    case 'calc':
      question = generateExpression();
      break;
    default:
      break;
  }

  return String(question);
};

const askQuestion = (question) => {
  console.log(`Question: ${question}`);
};

const isEven = (number) => Number(number) % 2 === 0;

const getUserAnswer = () => readlineSync.question('Your answer: ');

const calculateCorrectAnswer = (gameType, question) => {
  switch (gameType) {
    case 'even':
      return isEven(question) ? 'yes' : 'no';
    case 'calc':
      return eval(question);
    }
};

const checkUserAnswer = (gameType, question, userAnswer) => {
  switch (gameType) {
    case 'even':
      return calculateCorrectAnswer(gameType, question) === userAnswer;
    case 'calc':

      return calculateCorrectAnswer(gameType, question) === Number(userAnswer);
    default:
      console.error(`checkUserAnswer: call with invalid arguments!`);
  }
};

// export main flow functions:
export const sayWelcome = () => {
    console.log('Welcome to the Brain Games!');
};

export const tellRules = (gameType = 'empty') => {
  switch (gameType) {
    case 'even':
      console.log('Answer "yes" if the number is even, otherwise answer "no".');
      break;
    case 'calc':
      console.log('What is the result of the expression?');
      break;
    default:
      break;
  }
  return;
};

export const requestUserName = () => readlineSync.question('\nMay I have your name? ');

export const greetUser = (userName) => {
  console.log(`Hello, ${userName}!\n`);
};

export const startGame = (gameType = 'empty', userName, roundLimit = 0) => {
  if (roundLimit === 3) {
    console.log(`Congratulations, ${userName}!`);
    return;
  }
  if (gameType === 'empty') {
    return;
  }

  const question = buildQuestion(gameType);
  askQuestion(question);
  const userAnswer = getUserAnswer();
  const correctAnswer = calculateCorrectAnswer(gameType, question);
  const result = checkUserAnswer(gameType, question, userAnswer);
  if (!result) {
    console.log(`"${userAnswer}" is wrong answer ;(. Correct answer was "${correctAnswer}".\nLet's try again, ${userName}!`);
    return;
  }
  console.log('Correct!');
  return startGame(gameType, userName, roundLimit + 1);
};