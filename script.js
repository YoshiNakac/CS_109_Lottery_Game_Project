let totalEarnings = 0;
const costPerPlay = {
  3: 10,
  4: 8,
  5: 5,
  6: 2,
};

function simulateLottery() {
  // Get the user-selected number of balls
  const ballCount = parseInt(document.getElementById('ballCount').value);

  // Check if the input is within the allowed range (3 to 6)
  if (ballCount < 3 || ballCount > 6) {
    alert('Please choose a number of balls between 3 and 6.');
    return;
  }

  // Get the user-inputted values for each ball
  const userValuesInput = document.getElementById('ballValues').value;
  const userValues = userValuesInput.split(',').map(value => parseInt(value.trim()));

  // Check if the number of user values matches the number of balls
  if (userValues.length !== ballCount) {
    alert('Please enter values for each selected ball.');
    return;
  }

  // Grab cost per draw to deduct from counter
  const playCost = costPerPlay[ballCount];
  
  // Deduct the cost of playing
  totalEarnings -= playCost;

  // Simulate a lottery draw
  const drawnNumbers = drawNumbers(ballCount);

  // Calculate winnings
  const winnings = checkWinnings(drawnNumbers, userValues);

  // Update the total earnings/losses
  totalEarnings += winnings;

  // Display the results and update the counter
  displayResults(drawnNumbers, userValues, winnings);

  updateCounter();
}

function drawNumbers(ballCount) {
  const drawnNumbers = [];
  const totalBalls = 5; // Assume a total of 10 balls in the lottery machine

  // Randomly draw 'ballCount' numbers
  while (drawnNumbers.length < ballCount) {
    const randomNumber = Math.floor(Math.random() * totalBalls) + 1;

    // Ensure the drawn number is unique
    if (!drawnNumbers.includes(randomNumber)) {
      drawnNumbers.push(randomNumber);
    }
  }

  return drawnNumbers;
}

// Update the displayResults function to use the new styling
function displayResults(drawnNumbers, userValues, winnings) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  const resultHeading = document.createElement('h2');
  resultHeading.textContent = 'Lottery Draw Result:';

  const resultList = document.createElement('div');
  resultList.classList.add('result-list');

  drawnNumbers.forEach((number, index) => {
    const ballElement = document.createElement('div');
    ballElement.textContent = number;
    ballElement.classList.add('lottery-ball');
    resultList.appendChild(ballElement);
  });

  const userValuesHeading = document.createElement('h2');
  userValuesHeading.textContent = 'Your Selection:';

  const userValuesList = document.createElement('div');
  userValuesList.classList.add('result-list');

  userValues.forEach(value => {
    const ballElement = document.createElement('div');
    ballElement.textContent = value;
    ballElement.classList.add('user-ball');
    userValuesList.appendChild(ballElement);
  });

  const winningsMessage = document.createElement('p');
  if (winnings > 0) {
    winningsMessage.textContent = `Congratulations! You won $${winnings}.`;
  } else {
    winningsMessage.textContent = `Sorry, you didn't win this time.`;
  }

  resultContainer.appendChild(resultHeading);
  resultContainer.appendChild(resultList);
  resultContainer.appendChild(userValuesHeading);
  resultContainer.appendChild(userValuesList);
  if (winnings > 0) {
    resultContainer.appendChild(winningsMessage);
  }
}


// Add a function to check for winnings
function checkWinnings(drawnNumbers, userValues) {
  // Check if all user-chosen balls match the drawn numbers in order
  const isWin = userValues.every((value, index) => drawnNumbers[index] === value);

  // Return the respective prize amount for a complete match
  if (isWin) {
    const ballCount = userValues.length;
    switch (ballCount) {
      case 3:
        return 250;
      case 4:
        return 3000;
      case 5:
        return 6500;
      case 6:
        return 15000;
      default:
        return 0; // No prize for other cases
    }
  }

  return 0; // No prize for incomplete match
}

function updateCounter() {
  const counterElement = document.getElementById('counter');
  counterElement.textContent = `Total Earnings/Losses: $${totalEarnings}`;
}
