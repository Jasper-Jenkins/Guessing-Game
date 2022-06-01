document.body.onload = CreateGame();

function CreateGame() {
    //The html 'div' element that holds the entire game
    const gameHolder = document.createElement("div");
    gameHolder.setAttribute("id", "game");

    const playersArea = document.createElement("div");
    playersArea.setAttribute('id', 'playerArea');



    const choosePlayers = document.createElement('div');
    choosePlayers.setAttribute('id', 'choosePlayers');
    gameHolder.appendChild(choosePlayers);
    //label for input of player count
    const playersFieldLabel = document.createElement("label");
    playersFieldLabel.setAttribute("for", "playersField");
    choosePlayers.appendChild(playersFieldLabel);
    const playersFieldLabelText = document.createTextNode("How many players want to play?: ");
    playersFieldLabel.appendChild(playersFieldLabelText);
    //Input for player count
    const playersFieldInput = document.createElement("input")
    choosePlayers.appendChild(playersFieldInput);
    playersFieldInput.setAttribute("type", "text");
    playersFieldInput.setAttribute("id", "playersField");
    playersFieldInput.setAttribute("class", "playersField");

    const players = document.querySelector('.playersField');
    // players.addEventListener('keydown', choosePlayersByKeyPress);




    function choosePlayersByKeyPress(e) {
        let numberKeyCheck = 0;
        console.log(e.key, 'players');
        if (e.key === "Enter") { totalPlayersSetup(); return; }
        if (e.key === "Backspace") { return; }
        do {
            if (e.code == "Numpad" + numberKeyCheck) { return; }
            if (e.code == "Digit" + numberKeyCheck) { return; }
            numberKeyCheck++;
        } while (numberKeyCheck < 4);
        e.preventDefault();
    }



    function totalPlayersSetup() {
        const totalplayerCount = Number(players.value);
        console.log("Did it work: ", totalplayerCount);
    }

    /*
     * This element currently exists in the index.html
     * change this to gameHolder being attached to body element.
     */
    const first = document.getElementById("first");
    document.body.insertBefore(gameHolder, first);

    const guessFieldLabel = document.createElement("label");
    guessFieldLabel.setAttribute("for", "guessField");
    gameHolder.appendChild(guessFieldLabel);
    const guessFieldLabelText = document.createTextNode("Enter a guess: ");
    guessFieldLabel.appendChild(guessFieldLabelText);

    //Input button
    const guessFieldInput = document.createElement("input");
    gameHolder.appendChild(guessFieldInput);
    guessFieldInput.setAttribute("type", "text");
    guessFieldInput.setAttribute("id", "guessField");
    guessFieldInput.setAttribute("class", "guessField");

    //Submit button
    const submitField = document.createElement("input");
    gameHolder.appendChild(submitField);
    submitField.setAttribute("type", "submit");
    submitField.setAttribute("value", "Submit guess");
    submitField.setAttribute("class", "guessSubmit");

    //Results of guess
    const resultParas = document.createElement("div");
    resultParas.setAttribute("class", "resultParas");
    gameHolder.appendChild(resultParas);

    const guessResultRange = ["guessRange", "guesses", "lastResult", "lowOrHi"];
    //const guessResults = new Array()
    for (element in guessResultRange) {
        const htmlElement = document.createElement("p");
        console.log(guessResultRange[element]);
        htmlElement.setAttribute("class", guessResultRange[element]);
        resultParas.appendChild(htmlElement);
    }
    //const numberLineMax = 200;
    const totalNumber = 200;
    const gameWidth = 1000;

    let randomNumber = Math.floor(Math.random() * totalNumber) + 1; //secret number

    const guessRange = document.querySelector('.guessRange');
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');

    let guessCount = 1;
    let resetButton;

    let guessLow = null;
    let guessHigh = null;

    function createNumberLine() {
        let numberLineIncrement = 0;
        const numberLine = document.createElement('div');
        numberLine.setAttribute('id', 'numberLine');
        gameHolder.insertBefore(numberLine, resultParas);
        do { //creating number line.
            const numberForLine = document.createElement('p');
            numberForLine.setAttribute('class', 'numberLineNumbers');
            numberForLine.setAttribute('id', `number${numberLineIncrement + 1}`);
            numberForLine.innerHTML = `${numberLineIncrement + 1}`;
            numberLine.appendChild(numberForLine);

            numberLineIncrement++;

        } while (numberLineIncrement < totalNumber);
    }
    createNumberLine();
    guessField.focus();

    function checkGuess() {
        let userInputValue = Number(guessField.value);
        console.log(`userInputValue: ${userInputValue}, current low value: ${guessLow}, current high value: ${guessHigh}`);
        if (userInputValue < 1 || userInputValue > totalNumber) {
            userInputValue = null;
        }
        const userGuess = userInputValue;

        if (userGuess == null) {
            console.log("A value was entered that resulted in a 'null' value");
            guessField.value = '';
            guessField.focus();
            return;
        }

        if (guessCount === 1) {
            guesses.textContent = 'Previous guesses: ';
        }

        /*guesses.textContent += `(${userGuess}) `;*/
        if (userGuess === randomNumber) {
            lastResult.textContent = 'Congratulations! You got it right!';
            lastResult.style.backgroundColor = 'green';
            lowOrHi.textContent = '';
            setGameOver();
        } else if (guessCount === 10) {
            lastResult.textContent = '!!!GAME OVER!!!';
            lowOrHi.textContent = `The number to guess was: ${randomNumber}`;
            setGameOver();
        } else {
            lastResult.textContent = 'Wrong!';
            lastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
                if (guessLow == null) {
                    guessLow = userGuess;
                    console.log(`guessLow is being populated with a value for the first time: ${guessLow}`)
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    lowOrHi.textContent = `First low end guess: ${userGuess} was a too low!`;
                } else if (userGuess < guessLow) {
                    lowOrHi.textContent = `Current guess: ${userGuess} is lower than the range! (${guessLow} - ${guessHigh})`;
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else if (userGuess == guessLow) {
                    lowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else {
                    guessLow = userGuess;
                    console.log(`User guess: ${userGuess} is still lower than the secret number`);
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    lowOrHi.textContent = `Current guess: ${userGuess} was too low!`;
                }
            } else if (userGuess > randomNumber) {
                if (guessHigh == null) {
                    guessHigh = userGuess;
                    console.log(`guessHigh is being populated with a value for the first time: ${guessHigh}`)
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    lowOrHi.textContent = `First high end guess: ${userGuess} was too high!`;
                } else if (userGuess > guessHigh) {
                    lowOrHi.textContent = `Current guess: ${userGuess} is higher than the range! (${guessLow} - ${guessHigh})`;
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else if (userGuess == guessHigh) {
                    lowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else {
                    guessHigh = userGuess;
                    console.log(`User guess: ${userGuess} is still higher than the secret number`);
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    lowOrHi.textContent = `Current guess: ${userGuess} was too high!`;
                }
            }
        }

        guesses.textContent += `(${userGuess}) `;
        guessCount++;
        guessField.value = '';
        guessField.focus();
    }

    guessSubmit.addEventListener('click', checkGuess);
    guessField.addEventListener('keydown', submitAnswerByKeyPress);

    function submitAnswerByKeyPress(e) {
        let numberKeyCheck = 0;
        console.log(e.key);
        if (e.key === "Enter") { checkGuess(); return; }
        if (e.key === "Backspace") { return; }
        do {
            if (e.code == "Numpad" + numberKeyCheck) { return; }
            if (e.code == "Digit" + numberKeyCheck) { return; }
            numberKeyCheck++;
        } while (numberKeyCheck < 10);
        e.preventDefault();
    }

    //function choosePlayersByKeyPress(e) {
    //    let numberKeyCheck = 0;
    //    console.log(e.key);
    //    if (e.key === "Enter") { checkGuess(); return; }
    //    if (e.key === "Backspace") { return; }
    //    do {
    //        if (e.code == "Numpad" + numberKeyCheck) { return; }
    //        if (e.code == "Digit" + numberKeyCheck) { return; }
    //        numberKeyCheck++;
    //    } while (numberKeyCheck < 4);
    //    e.preventDefault();
    //}


    //Number line UI for showing current guesses and range of what is left to guess
    function setNumbersGuessed(low, high) {
        let numLineIncr = 1;
        console.log(`low: ${low} high: ${high}`)
        do {

            if (numLineIncr <= low && low != null) {
                //  console.log(`setting number ${numLineIncr} to red from low side.`);
                document.querySelector(`#number${numLineIncr}`).style.color = 'white';
                document.querySelector(`#number${numLineIncr}`).style.backgroundColor = 'red';

            } else if (numLineIncr >= high && high != null) {
                //     console.log(`setting number ${numLineIncr} to red from high side.`);
                console.log("tock");
                document.querySelector(`#number${numLineIncr}`).style.color = 'white';
                document.querySelector(`#number${numLineIncr}`).style.backgroundColor = 'red';
            } else {

                document.querySelector(`#number${numLineIncr}`).style.color = 'black';
                document.querySelector(`#number${numLineIncr}`).style.backgroundColor = 'white';

            }

            //if ()
            numLineIncr++;
        } while (numLineIncr <= totalNumber);
    }

    //UI for showing range of guesses
    function setGuessingRange(low, high) {
        console.log('setGuessingRange() ', low, high);
        let newWidth = new Number(0);
        let newLeftMargin = new Number(0);
        if (low == null || high == null) {
            console.log('setGuessingRange() NULL check ||', low, high);
            if (low == null && high == null) { //This never fires... which may be from null catch. 
                console.log('setGuessingRange() NULL check &&', low, high);
                newWidth = gameWidth;
                guessRange.style.width = `${newWidth}px`;
                guessRange.style.marginLeft = `${newLeftMargin}px`;
                //console.log();
                //return;
            } else if (low == null) {
                console.log("low is: ", low);
            } else {
                console.log("high is: ", high);
            }
        }

        //if (userGuess < guessLow) {
        //    lowOrHi.textContent = 'Last guess was lower than the range!';
        //} else {
        //    guessLow = userGuess;
        //    console.log(`guessHigh ${guessHigh}, userGuess: ${userGuess}`)
        //    setGuessingRange(userGuess, guessHigh);
        //    setNumbersGuessed(guessLow, guessHigh);
        //    lowOrHi.textContent = 'Last guess was too low!';
        //}          







        //let newWidth = new Number((high-low) * widthRatioMultiplier);
        //let newLeftMargin = new Number(low * widthRatioMultiplier);
        ////let newRightMargin = new Number((gameWidth - newWidth) * widthRatioMultiplier);       
        //guessRange.style.width = `${newWidth}px`;
        //guessRange.style.marginLeft = `${newLeftMargin}px`;
        //guessRange.style.marginRight = `${newRightMargin}px`;
        console.log('setGuessingRange() ', guessRange);
    }
    setGuessingRange(null, null);

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');

        //resetButton.setAttribute('id', 'resetButton');
        resetButton.textContent = 'Start new game';

        gameHolder.append(resetButton);

        resetButton.addEventListener('click', resetGame);
    }

    function resetGuessingRange() {
        guessRange.style.width = `${gameWidth}px`;
        guessRange.style.marginLeft = '0px';
        //    guessRange.style.marginRight = '0px';

    }

    function resetGame() {
        resetGuessingRange();
        guessCount = 1;
        guessLow = null;
        guessHigh = null;
        const resetNumbers = document.querySelectorAll('#numberLine p');
        for (const resetNumber of resetNumbers) {
            resetNumber.style.color = 'black';
        }
        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
            resetPara.textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';

        randomNumber = Math.floor(Math.random() * totalNumber) + 1;
    }

};
