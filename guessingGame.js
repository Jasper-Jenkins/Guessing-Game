document.body.onload = CreateGame();

function CreateGame() {
    const totalNumber = 100;//the max of the number line
    const gameWidth = 1000;
    let randomNumber = Math.floor(Math.random() * totalNumber) + 1; //secret number to guess
    let guessCount = 1;

    let resetButton;
    let guessLow = null;
    let guessHigh = null; 
    const totalPlayersAllowed = new Number(3);

    const gameHolder = document.createElement("div");
    gameHolder.setAttribute("id", "game");
    const playersArea = document.createElement("div");
    playersArea.setAttribute('id', 'playersArea');
    gameHolder.appendChild(playersArea);

    /*
     * This element currently exists in the index.html
     * change this to gameHolder being attached to body element.
     */
    const first = document.getElementById("first");
    document.body.insertBefore(gameHolder, first);

    /* 
     * Multiplayer creation beginning
     * change total player guess number to 10; not 10 combined, 10 each.     
     */

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
    const playersFieldInput = document.createElement("input");
    playersFieldInput.setAttribute("type", "text");
    playersFieldInput.setAttribute("id", "playersField");
    playersFieldInput.setAttribute("class", "playersField");
    choosePlayers.appendChild(playersFieldInput);

    const players = gameHolder.querySelector('.playersField');
    players.addEventListener('keydown', choosePlayersByKeyPress);
    
    function choosePlayersByKeyPress(e) {
        let numberKeyCheck = 1;
        console.log(e.key, 'players');
        if (e.key === "Enter") { totalPlayersSetup(); return; }
        if (e.key === "Backspace") { return; }
        do {
            if (e.code == "Numpad" + numberKeyCheck) { return; }
            if (e.code == "Digit" + numberKeyCheck) { return; }
            numberKeyCheck++;
        } while (numberKeyCheck <= totalPlayersAllowed);
        e.preventDefault();
    }

    function totalPlayersSetup() {
        const totalPlayerCount = Number(players.value);
        console.log("Total players being setup: ", totalPlayerCount);
        if (totalPlayerCount != 0 && totalPlayerCount <= totalPlayersAllowed) {
            let element = document.getElementById("playersArea");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            let totalPlayerIncrement = 1;
            do {
                //create player element
                const player = document.createElement("div");
                player.setAttribute('id', `player${totalPlayerIncrement}`);
                player.setAttribute('class', 'player');
                playersArea.appendChild(player);
                const newPlayer = playersArea.querySelector(`#player${totalPlayerIncrement}`);
                //label for guess input 
                const guessFieldLabel = document.createElement("label");
                guessFieldLabel.setAttribute("for", `guessField${totalPlayerIncrement}`);
                player.appendChild(guessFieldLabel);
                const guessFieldLabelText = document.createTextNode(`Player ${totalPlayerIncrement} Enter a guess: `);
                guessFieldLabel.appendChild(guessFieldLabelText);
                console.log(newPlayer);
                //Input field for player guess
                const guessFieldInput = document.createElement("input");
                player.appendChild(guessFieldInput);
                guessFieldInput.setAttribute("type", "text");
                guessFieldInput.setAttribute("id", `guessField${totalPlayerIncrement}`);
                guessFieldInput.setAttribute("class", "guessField");
                //Container to show results of guess
                const resultParas = document.createElement("div");
                resultParas.setAttribute("class", "resultParas");
                player.appendChild(resultParas);
                //create child elements for guess container
                const guessResultRange = ["guessRange", "guesses", "lastResult", "lowOrHi"];
                for (element in guessResultRange) {
                    const htmlElement = document.createElement("p");
                    console.log(guessResultRange[element]);
                    htmlElement.setAttribute("class", guessResultRange[element]);
                    htmlElement.setAttribute('id', `${guessResultRange[element]}${Number(totalPlayerIncrement)}`);
                    resultParas.appendChild(htmlElement);
                }
                totalPlayerIncrement++;
                console.log(totalPlayerIncrement);              
            } while (totalPlayerIncrement <= totalPlayersAllowed && totalPlayerIncrement <= totalPlayerCount);
            if (totalPlayerIncrement == totalPlayerCount + 1) {
                setUpMultiPlayerSubmitFunctionality(totalPlayerCount);
            }            
        } else {
            console.log("NO");
            players.value = '';
            players.focus();
            return;
        }
        players.value = '';
        players.focus();
    }

    function setUpMultiPlayerSubmitFunctionality(totalPlayersCreated) {
        let totalPlayers = Number(totalPlayersCreated);
        console.log("YOWTF", totalPlayers);
        do {
            const guessField = playersArea.querySelector(`#guessField${totalPlayers}`);
            console.log(guessField);            
            guessField.addEventListener('keydown', submitAnswerByKeyPress);
            totalPlayers--;
        } while (totalPlayers > 0);    
    }


    /*
     * 
     * Multiplayer creation end
     * 
     */ 







    function createNumberLine() {
        let numberLineIncrement = 0;
        const numberLine = document.createElement('div');
        numberLine.setAttribute('id', 'numberLine');
        gameHolder.insertBefore(numberLine, playersArea);
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
  //  guessField.focus();


    // checkGuess() is ALOT, break functionality up a bit?
    function checkGuess(numberId) {//should be fed >0 values, should be checked here or at call, or both?
        //console.log();

        if (numberId == 0) {
            console.log("found you lil bastard");
        }
        const guessField = playersArea.querySelector(`#guessField${numberId}`);
        const playerGuesses = playersArea.querySelector(`#guesses${numberId}`);
        const playerLastResult = playersArea.querySelector(`#lastResult${numberId}`);
        const playerLowOrHi = playersArea.querySelector(`#lowOrHi${numberId}`);

        let userInputValue = Number(guessField.value);
        console.log(`userInputValue: ${userInputValue}, current low value: ${guessLow}, current high value: ${guessHigh}` );
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
            playerGuesses.textContent = 'Previous guesses: ';
        }
        /*guesses.textContent += `(${userGuess}) `;*/
        if (userGuess === randomNumber) {
            playerLastResult.textContent = 'Congratulations! You got it right!';
            playerLastResult.style.backgroundColor = 'green';
            playerLowOrHi.textContent = '';
            setGameOver();
        } else if (guessCount === 10) {
            playerLastResult.textContent = '!!!GAME OVER!!!';
            playerLowOrHi.textContent = `The number to guess was: ${randomNumber}`;
            setGameOver();
        } else {
            playerLastResult.textContent = 'Wrong!';
            playerLastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
                if (guessLow == null) {
                    guessLow = userGuess;
                    console.log(`guessLow is being populated with a value for the first time: ${guessLow}`)
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `First low end guess: ${userGuess} was a too low!`;
                } else if (userGuess < guessLow) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} is lower than the range! (${guessLow} - ${guessHigh})`;                   
                } else if (userGuess == guessLow) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;                   
                } else {
                    guessLow = userGuess;
                    console.log(`User guess: ${userGuess} is still lower than the secret number`);
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `Current guess: ${userGuess} was too low!`;
                }           
            }
            else if (userGuess > randomNumber) {
                if (guessHigh == null) {
                    guessHigh = userGuess;
                    console.log(`guessHigh is being populated with a value for the first time: ${guessHigh}`)
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `First high end guess: ${userGuess} was too high!`;
                } else if (userGuess > guessHigh) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} is higher than the range! (${guessLow} - ${guessHigh})`;                   
                } else if (userGuess == guessHigh) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;                    
                } else {
                    guessHigh = userGuess;
                    console.log(`User guess: ${userGuess} is still higher than the secret number`);
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `Current guess: ${userGuess} was too high!`;
                }               
            }
        }
      
        playerGuesses.textContent += `(${userGuess}) `;
        console.log(`guessField: ${guessField.value}, playerGuesses: ${playerGuesses.innerHTML}, playerLastResult: ${playerLastResult.innerHTML}, playerLowOrHi: ${playerLowOrHi.innerHTML}`);
        guessCount++;
        guessField.value = '';
        guessField.focus();
    } 
       
           
    function submitAnswerByKeyPress(e) {
        let numberKeyCheck = 0;
        var num = parseInt(e.srcElement.id.match(/\d+/), 10)
        if (e.key === "Enter") { checkGuess(num); return; }
        if (e.key === "Backspace") { return; }
        do {
            console.log(e.code)
            if (e.code == "Numpad" + numberKeyCheck) { return; }
            if (e.code == "Digit" + numberKeyCheck) { return; }
            numberKeyCheck++;
        } while (numberKeyCheck < 10);
        e.preventDefault();        
    }

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
    }
   //setGuessingRange(null, null);

    function setGameOver() {
      //playersArea.querySelectorAll()
        const container = document.querySelector("#playerArea");
        const guessFields = container.querySelectorAll("input.guessField");
       for (let g = 0; g < guessFields.length; g++) {
            console.log(`Input ${g} being disabled`);
            guessFields[g].disabled = true;
        }

        resetButton = document.createElement('button');
        //resetButton.setAttribute('id', 'resetButton');
        resetButton.textContent = 'Start new game';
        gameHolder.append(resetButton);       
        resetButton.addEventListener('click', resetGame);
    }

    //function resetGuessingRange() {
    //    guessRange.style.width = `${gameWidth}px`;
    //    guessRange.style.marginLeft = '0px';
    //    guessRange.style.marginRight = '0px';
    //}

    function resetGame() {
      //  resetGuessingRange();
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
        const container = document.querySelector("#playerArea");
        const guessFields = container.querySelectorAll("input.guessField");
        for (let g = 0; g < guessFields.length; g++) {
            console.log(`Input ${g} being disabled`);
            guessFields[g].disabled = false;
            guessFields[g].value = '';
        }       
        guessFields[0].focus();
        playerLastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * totalNumber) + 1;
    }

};
