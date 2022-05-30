document.body.onload = CreateGame();

/*TO DOS
 * Need to have user input being disabled once they have guessed.  
 * 
 * individual user guess pools (DONE!)
 * 
 * different colors for user guesses.
 */


function CreateGame() {
    const totalNumber = 100;// max number to guess
    const gameWidth = 1000;
    let randomNumber = Math.floor(Math.random() * totalNumber) + 1; //secret number to guess
    let guessCount = 1; 
    const totalGuesses = 3; // max guesses allowed
    let guessCountArray = []; // multiplayer guess pool.

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
     * change total player guesses to 10, not 10 combined, 10 each.     
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
    players.focus();
    
    function choosePlayersByKeyPress(e) {
        let numberKeyCheck = 1;
       // console.log(e.key, 'players');
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
        //console.log("Total players being setup: ", totalPlayerCount);
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
                //initializing array for separate player guess pools.
                guessCountArray.push({ player: `player${totalPlayerIncrement}`, guess: 1, });
                //console.log("Is it happening?", guessCountArray[totalPlayerIncrement-1]);
                //label for guess input
                const guessFieldLabel = document.createElement("label");
                guessFieldLabel.setAttribute("for", `guessField${totalPlayerIncrement}`);
                player.appendChild(guessFieldLabel);
                const guessFieldLabelText = document.createTextNode(`Player ${totalPlayerIncrement} Enter a guess: `);
                guessFieldLabel.appendChild(guessFieldLabelText);
                //console.log(newPlayer);
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
                   // console.log(guessResultRange[element]);
                    htmlElement.setAttribute("class", guessResultRange[element]);
                    htmlElement.setAttribute('id', `${guessResultRange[element]}${Number(totalPlayerIncrement)}`);
                    resultParas.appendChild(htmlElement);
                }
                totalPlayerIncrement++;
               // console.log(totalPlayerIncrement);              
            } while (totalPlayerIncrement <= totalPlayersAllowed && totalPlayerIncrement <= totalPlayerCount);
            if (totalPlayerIncrement == totalPlayerCount + 1) {
                setUpMultiPlayerSubmitFunctionality(totalPlayerCount);
            }            
        } else {
          //  console.log("NO");
            players.value = '';
            players.focus();
            return;
        }
        players.value = '';
        //players.focus();

        const guessField = playersArea.querySelector(`#guessField1`);
        guessField.focus();

    }

    function setUpMultiPlayerSubmitFunctionality(totalPlayersCreated) {
        let totalPlayers = Number(totalPlayersCreated);
       // console.log("YOWTF", totalPlayers);
        do {
            const guessField = playersArea.querySelector(`#guessField${totalPlayers}`);
           // console.log(guessField);            
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
  


    // checkGuess() is ALOT, break functionality up a bit?
    function checkGuess(numberId) {//should be fed >0 values, should be checked here or at call, or both?
        //console.log();
        const guessField = playersArea.querySelector(`#guessField${numberId}`);
        let userGuess = Number(guessField.value);
        console.log(`userGuess: ${userGuess}, current low value: ${guessLow}, current high value: ${guessHigh}`);
        if (userGuess < 1 || userGuess > totalNumber) { //checking for user input to be valid input (1 -> totalNumber)
            userGuess = null;
            console.log("A value was entered that resulted in a 'null' value");
            guessField.value = '';
            guessField.focus();
            return;
        }

        if (numberId == 0) {
            console.log("found you lil bastard");
        }
        const playerGuesses = playersArea.querySelector(`#guesses${numberId}`);
        const playerLastResult = playersArea.querySelector(`#lastResult${numberId}`);
        const playerLowOrHi = playersArea.querySelector(`#lowOrHi${numberId}`);


        /*
         * this doesnt work for multiplayer, the message only writes on the first guess for player 1.
         * due to shared total guesses. Need to create separate guessing pools.
         */
        const playerGuessing = {
            player: "",
            guess: 0,
            
        };
       
        for (playerGuess in guessCountArray) {
            console.log(guessCountArray[playerGuess].player);
            if (guessCountArray[playerGuess].player == `player${numberId}`) {               
                playerGuessing.player = guessCountArray[playerGuess].player;
                playerGuessing.guess = guessCountArray[playerGuess].guess;
            }            
        }

        console.log(playerGuessing);
        if (playerGuessing.guess == 1) {
            playerGuesses.textContent = 'Previous guesses: ';
        }
        //if (guessCount === 1) {       
        //    playerGuesses.textContent = 'Previous guesses: ';
        //}






        if (userGuess === randomNumber) {
            playerLastResult.textContent = 'Congratulations! You got it right!';
            playerLastResult.style.backgroundColor = 'green';
            playerLowOrHi.textContent = '';
            setGameOver();
        } else if (playerGuessing.guess == totalGuesses) { //this needs to be changed to account for all players total pools being used up. 
            playerLastResult.textContent = '!!!GAME OVER!!!';
            playerLowOrHi.textContent = `The number to guess was: ${randomNumber}`;
            setGameOver();
        } else {
            playerLastResult.textContent = 'Wrong!';
            playerLastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
                if (guessLow == null) {
                    guessLow = userGuess;
                   // console.log(`guessLow is being populated with a value for the first time: ${guessLow}`)
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `First low end guess: ${userGuess} was a too low!`;
                } else if (userGuess < guessLow) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} is lower than the range! (${guessLow} - ${guessHigh})`;                   
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else if (userGuess == guessLow) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;                   
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else {
                    guessLow = userGuess;
                  //  console.log(`User guess: ${userGuess} is still lower than the secret number`);
                    setGuessingRange(userGuess, guessHigh);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `Current guess: ${userGuess} was too low!`;
                }           
            }
            else if (userGuess > randomNumber) {
                if (guessHigh == null) {
                    guessHigh = userGuess;
                    //console.log(`guessHigh is being populated with a value for the first time: ${guessHigh}`)
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `First high end guess: ${userGuess} was too high!`;
                } else if (userGuess > guessHigh) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} is higher than the range! (${guessLow} - ${guessHigh})`;                   
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else if (userGuess == guessHigh) {
                    playerLowOrHi.textContent = `Current guess: ${userGuess} has already been chosen! (${guessLow} - ${guessHigh})`;                    
                    guessField.value = '';
                    guessField.focus();
                    return;
                } else {
                    guessHigh = userGuess;
                    //console.log(`User guess: ${userGuess} is still higher than the secret number`);
                    setGuessingRange(guessLow, userGuess);
                    setNumbersGuessed(guessLow, guessHigh);
                    playerLowOrHi.textContent = `Current guess: ${userGuess} was too high!`;
                }               
            }
        }
      
        playerGuesses.textContent += `(${userGuess}) `;
      //  console.log(`guessField: ${guessField.value}, playerGuesses: ${playerGuesses.innerHTML}, playerLastResult: ${playerLastResult.innerHTML}, playerLowOrHi: ${playerLowOrHi.innerHTML}`);

        if (guessCount === 10) {
            console.log("YOOOOOOO");
        }
        //console.log("player guess before incremenent: ",playerGuessing);
       // playerGuessing.guess++

        for (playerGuess in guessCountArray) {
            console.log(guessCountArray[playerGuess].player);
            if (guessCountArray[playerGuess].player == `player${numberId}`) {
                guessCountArray[playerGuess].guess++;
            }
        }



       // console.log("player after before incremenent: ", playerGuessing);
        //guessCount++;
        guessField.value = '';
        guessField.focus();
    } 
       
           
    function submitAnswerByKeyPress(e) {
        let numberKeyCheck = 0;
        var num = parseInt(e.srcElement.id.match(/\d+/), 10)
        if (e.key === "Enter") { checkGuess(num); return; }
        if (e.key === "Backspace") { return; }
        do {
         //   console.log(e.code)
            if (e.code == "Numpad" + numberKeyCheck) { return; }
            if (e.code == "Digit" + numberKeyCheck) { return; }
            numberKeyCheck++;
        } while (numberKeyCheck < 10);
        e.preventDefault();        
    }

    //Number line UI for showing current guesses and range of what is left to guess
    function setNumbersGuessed(low, high) {
        let numLineIncr = 1;
        //console.log(`low: ${low} high: ${high}`)
        do {            
            if (numLineIncr <= low && low != null) {
                //  console.log(`setting number ${numLineIncr} to red from low side.`);
                document.querySelector(`#number${numLineIncr}`).style.color = 'white';
                document.querySelector(`#number${numLineIncr}`).style.backgroundColor = 'red';
            } else if (numLineIncr >= high && high != null) {
                //     console.log(`setting number ${numLineIncr} to red from high side.`);
                //console.log("tock");
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
       // console.log('setGuessingRange() ', low, high);
        let newWidth = new Number(0);
        let newLeftMargin = new Number(0);
        if (low == null || high == null) {
           // console.log('setGuessingRange() NULL check ||', low, high);
            if (low == null && high == null) { //This never fires... which may be from null catch. 
           //     console.log('setGuessingRange() NULL check &&', low, high);
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
        const container = document.querySelector("#playersArea");
        const guessFields = container.querySelectorAll("input.guessField");
        console.log('setGameOver() fired', container, guessFields);
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
        for (playerGuess in guessCountArray) {
            console.log(guessCountArray[playerGuess].player);
            if (guessCountArray[playerGuess].player == `player${playerGuess + 1}`) {
                console.log("is it getting here");
                guessCountArray[playerGuess].guess = 1;
            }
        }

        //guessCountArray = [];

        guessLow = null;
        guessHigh = null;
        const resetNumbers = document.querySelectorAll('#numberLine p');
        for (const resetNumber of resetNumbers) {
            resetNumber.style.color = 'black';
            resetNumber.style.backgroundColor = 'white';
        }
        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
            resetPara.textContent = '';
        }
        resetButton.parentNode.removeChild(resetButton);
        const container = document.querySelector("#playersArea");
        const guessFields = container.querySelectorAll("input.guessField");
        console.log(guessFields);


        for (let g = 0; g < guessFields.length; g++) {           
            guessFields[g].disabled = false;
            guessFields[g].value = '';
        }       
        guessFields[0].focus();
        //playerLastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * totalNumber) + 1;
    }

};
