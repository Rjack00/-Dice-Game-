const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');
const scoreSpans = document.querySelectorAll('#score-options span');
const roundElement = document.querySelector('#current-round');
const rollsElement = document.querySelector('#current-round-rolls');
const totalScoreElement = document.querySelector('#total-score');
const scoreHistory = document.querySelector('#score-history');
const rollDiceBtn = document.querySelector('#roll-dice-btn');
const keepScoreBtn = document.querySelector('#keep-score-btn');
const rulesBtn = document.querySelector('#rules-btn');
const rulesContainer = document.querySelector('.rules-container');

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
    diceValuesArr = [];

    for(let i = 5; i > 0; i--){
        diceValuesArr.push(Math.floor(Math.random() * 6 + 1));
    }
    listOfAllDice.forEach((dieElement, index) => {
        dieElement.textContent = diceValuesArr[index];
    })
}

const updateStats = () => {
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
  };

  const updateRadioOption = (index, score) => {
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].textContent = `, score = ${score}`;
  };

  const getHighestDuplicates = (arr) => {
    const counts = {};
  
    for (const num of arr) {
      if (counts[num]) {
        counts[num]++;
      } else {
        counts[num] = 1;
      }
    }
  
    let highestCount = 0;
  
    for (const num of arr) {
      const count = counts[num];
      if (count >= 3 && count > highestCount) {
        highestCount = count;
      }
      if (count >= 4 && count > highestCount) {
        highestCount = count;
      }
    }
  
    const sumOfAllDice = arr.reduce((a, b) => a + b, 0);
  
    if (highestCount >= 4) {
      updateRadioOption(1, sumOfAllDice);
    }
  
    if (highestCount >= 3) {
      updateRadioOption(0, sumOfAllDice);
    }
  
    updateRadioOption(5, 0);
  };

rollDiceBtn.addEventListener('click', () => {
    if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
  }
});


rulesBtn.addEventListener('click', () => {
    if(!isModalShowing) {
        isModalShowing = true;
        rulesContainer.style.display = "block";
        rulesBtn.textContent = "Hide rules";
    } else {
        isModalShowing = false;
        rulesContainer.style.display = "none";
        rulesBtn.textContent = "Show rules";
    }
});