import generateRandom from '../utils';
import startGame from '..';

const greatestCommonDivisor = (first, second) => {
  if (!first) {
    return second;
  }
  return greatestCommonDivisor(second % first, first);
};

const generateGameData = () => {
  const first = generateRandom(10, 300);
  const second = generateRandom(300, 500);
  const correctAnswer = String(greatestCommonDivisor(first, second));
  const questionPair = `${first} ${second}`;
  const questionPack = {
    question: questionPair,
    answer: correctAnswer,
  };

  return questionPack;
};

const description = 'Find the greatest common divisor of given numbers.';

export default () => startGame(description, generateGameData);
