//Récupération section paramètres
let sectionParameters = document.getElementById("gameParameters");
let playersParameters = document.getElementById("playersParameters");
let buttonParameters = document.getElementById("buttonParameters");
//Récupération div game
let divGame = document.getElementById("game");
//Récupération  input bouton gameParameters
let choiceNbPlayers = document.getElementById("choixNbJoueurs");
let choiceNamePlayer1 = document.getElementById("namePlayer1");
let play = document.getElementById("play");
let replay = document.getElementById("rePlay");

//Condition affichage name player 2
choiceNbPlayers.addEventListener("change", function() {
    if (choiceNbPlayers.value == 2) {
        let label = document.createElement("label");
        label.id = "labelPlayer2";
        label.for = "namePlayer2";
        label.textContent = "Nom du joueur 2";
        playersParameters.appendChild(label);
        let input = document.createElement("input");
        input.id = "namePlayer2";
        input.type = "text";
        playersParameters.appendChild(input);
    } else {
        let label = document.getElementById("labelPlayer2");
        playersParameters.removeChild(label);
        let input = document.getElementById("namePlayer2");
        playersParameters.removeChild(input);
    }
});

//Quand on clique sur jouer
play.onclick = function startNewGame() {
        //Récupération input namePlayer2 gameParameters
        let choiceNamePlayer2 = document.getElementById("namePlayer2");

        //Stockage dans variable paramètre partie
        let nbPlayers = choiceNbPlayers.value;
        let namePlayer1 = choiceNamePlayer1.value;

        //CREATION PLAYERS
        let Player1 = new Object();
        Player1.name = namePlayer1;
        Player1.win = 0;
        Player1.value = 1;
        let Player2 = new Object();
        Player2.value = 2;
        Player2.win = 0;

        //Définition Player2.name
        if (choiceNamePlayer2 != null) {
            Player2.name = choiceNamePlayer2.value;
        } else {
            Player2.name = "Tuvetula Computer";
        }

        //CREATION GAME
        //Verification si le game existe deja et si oui l'efface
        if (document.getElementById("tableauMorpion") != null) {
            let morpionGameTable = document.getElementById("tableauMorpion");
            divGame.removeChild(morpionGameTable);
        }
        //Création de la grille
        let morpionGameTable = document.createElement("table");
        morpionGameTable.id = "tableauMorpion";
        for (let i = 1; i <= 3; i++) {
            let line = document.createElement("tr");
            for (let j = 1; j <= 3; j++) {
                let td = document.createElement("td");
                td.id = ("case" + i + j);
                line.appendChild(td);
            }
            morpionGameTable.appendChild(line);
        }
        divGame.appendChild(morpionGameTable);

        //Définition qui commence à jouer
        let playerStart = Math.round(Math.random() + 1);

        //Redirection vers fonction Game
        game(Player1, Player2, nbPlayers, playerStart);
    }
    //---------------------------------------------------------------------------------------

function game(Player1, Player2, nbPlayers, playerStart) {
    console.log("coucou new game");

    //Définition Tour
    let tourNumber = 1;

    //Définition value player selon qui joue en premier
    if (playerStart % 2 == 0) {
        Player2.value = 1;
        Player1.value = 2;
    }

    //Affichage du joueur qui doit jouer (en premier)
    whosTurn(tourNumber, Player1, Player2);

    //Création tableau 
    let array = [
        ["A", "A", "A"],
        ["A", "A", "A"],
        ["A", "A", "A"]
    ]

    //Récupération bouton  table de jeu morpion
    let case11 = document.getElementById("case11");
    let case12 = document.getElementById("case12");
    let case13 = document.getElementById("case13");
    let case21 = document.getElementById("case21");
    let case22 = document.getElementById("case22");
    let case23 = document.getElementById("case23");
    let case31 = document.getElementById("case31");
    let case32 = document.getElementById("case32");
    let case33 = document.getElementById("case33");

    //Case11
    case11.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case12
    case12.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case13
    case13.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case21
    case21.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case22
    case22.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case23
    case23.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case31
    case31.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case32
    case32.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });
    //Case33
    case33.addEventListener("click", function(e) {
        tourNumber = writeInCase(e, Player1, Player2, tourNumber, array);
        if (nbPlayers == 1 && tourNumber % 2 == Player2.value % 2 && Player1.win == 0) {
            let caseToPlayNow = verifyGamePlayer1(array);
            document.getElementById(caseToPlayNow).click();
        }
    }, { once: true });

    //Choix premiere case a jouer ordinateur + click sur la case
    if (Player2.value == 1 && nbPlayers == 1) {
        let arrayComputer = ["case11", "case13", "case22", "case31", "case33"];
        let choiceFirstCaseComputer = arrayComputer[Math.floor(Math.random() * 5)];
        document.getElementById(choiceFirstCaseComputer).click();
    }
}

//-----------------------------------------------------------------------------------------------
//Affiche le O ou X dans la case cliquée, modifie le tableau des valeurs,
//appelle la fonction pour vérifier s'il y a un gagnant
function writeInCase(e, Player1, Player2, tourNumber, array) {
    //Si aucun joueur n'a gagné
    if (Player1.win == 0 && Player2.win == 0) {
        //Si c'est au tour du Player1
        if (tourNumber % 2 == Player1.value % 2) {
            e.target.textContent = "X";
            e.target.style.color = "black";
            //Sinon player2 joue
        } else {
            e.target.textContent = "O";
            e.target.style.color = "red";
        }
        //sinon
    } else {
        e.target.textContent = "";
    }

    //Récupération des 2 chiffres de la fin de l'id et inscription tableau
    let indice1 = e.target.id.slice(4, 5);
    let indice2 = e.target.id.slice(5, 6);
    array[indice1 - 1][indice2 - 1] = e.target.textContent;

    //Incrémentation tour
    tourNumber = increment(tourNumber);

    //Check s'il y a un gagnant
    if (checkIfThereIsAWinner(array)) {
        if (e.target.textContent == "X") {
            Player1.win = 1;
            winnerIs(Player1);
        } else {
            Player2.win = 1;
            winnerIs(Player2);
        }
    } else {
        //Si toutes les cases sont pleines
        if (tourNumber == 10) {
            matchNul();
            //Sinon changement de joueur
        } else {
            //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
            whosTurn(tourNumber, Player1, Player2);
        }
    }
    return tourNumber;
}
//-----------------------------------------------------------------------------------------------
//Incrémente le numéro du tour
function increment(tourNumber) {
    return ++tourNumber;
}
//-----------------------------------------------------------------------------------------------
//Calcule et affiche c'est a qui de jouer
function whosTurn(tourNumber, Player1, Player2) {
    //Affichage "A qui de jouer"
    if (document.getElementById("whoPlay") != null) {
        let whoPlay1 = document.getElementById("whoPlay");
        divGame.removeChild(whoPlay1);
    }
    let whoPlay = document.createElement("p");
    whoPlay.id = "whoPlay";
    if (tourNumber % 2 == Player1.value % 2) {
        whoPlay.textContent = "C'est au tour de " + Player1.name;
    } else {
        whoPlay.textContent = "C'est au tour de " + Player2.name;
    }
    divGame.appendChild(whoPlay);
}
//------------------------------------------------------------------------------------------------
//Verifie s'il y a un gagnant
function checkIfThereIsAWinner(array) {
    //Vérification alignement par ligne
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == array[i][1] && array[i][1] == array[i][2] && array[i][0] != "A") {
            //Colorie les 3 cases alignées en vert
            for (let j = 1; j <= 3; j++) {
                let caseToColor = ("case" + (i + 1)) + j;
                document.getElementById(caseToColor).style.backgroundColor = "rgb(102, 255, 0)";
            }
            return true;
        }
    }

    //Vérification alignement par colonne
    for (let i = 0; i < array.length; i++) {
        if (array[0][i] == array[1][i] && array[1][i] == array[2][i] && array[0][i] != "A") {
            //Colorie les 3 cases alignées en vert
            for (let j = 1; j <= 3; j++) {
                let caseToColor = ("case" + j) + (i + 1);
                document.getElementById(caseToColor).style.backgroundColor = "rgb(102, 255, 0)";
            }
            return true;
        }
    }

    //Vérification alignement diagonale
    if (array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[0][0] != "A") {
        //Colorie les 3 cases en vert
        for (let j = 1; j <= 3; j++) {
            let caseToColor = ("case" + j) + j;
            document.getElementById(caseToColor).style.backgroundColor = "rgb(102, 255, 0)";
        }
        return true;
    }
    if (array[2][0] == array[1][1] && array[1][1] == array[0][2] && array[2][0] != "A") {
        //Colorie les 3 cases en vert
        let variableToColorCase = 3;
        for (let j = 1; j <= 3; j++) {
            let caseToColor = ("case" + variableToColorCase) + j;
            document.getElementById(caseToColor).style.backgroundColor = "rgb(102, 255, 0)";
            variableToColorCase -= 1;
        }
        return true;
    }
    return false;
}
//-------------------------------------------------------------------------------------------------
//Affiche le nom du gagnant
function winnerIs(Player) {
    let winnerIs = document.getElementById("whoPlay");
    winnerIs.textContent = "" + Player['name'] + " a gagné";
}
//--------------------------------------------------------------------------------------------------
//Affiche s'il y a match nul
function matchNul(tourNumber) {
    let winnerIs = document.getElementById("whoPlay");
    winnerIs.textContent = "Match Nul";
}
//--------------------------------------------------------------------------------------------------
function verifyGamePlayer1(array) {
    //Verification si 2 O alignés sur une meme ligne pour jouer la case vide
    for (let i = 0; i < array.length; i++) {
        let countX = [];
        let countO = [];
        let countEmpty = [];
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] == "X") {
                countX.push(("case" + (i + 1)) + (j + 1));
            } else if (array[i][j] == "O") {
                countO.push(("case" + (i + 1)) + (j + 1));
            } else {
                countEmpty.push(("case" + (i + 1)) + (j + 1));
            }
        }

        if (countO.length == 2 && countX.length == 0) {
            let caseToReturn = countEmpty[0];
            return caseToReturn;
        }
    }

    //Verification si 2 O alignés sur une meme colonne pour jouer la case vide
    for (let i = 0; i < array.length; i++) {
        let countX = [];
        let countO = [];
        let countEmpty = [];
        for (let j = 0; j < array[i].length; j++) {
            if (array[j][i] == "X") {
                countX.push(("case" + (j + 1)) + (i + 1));
            } else if (array[j][i] == "O") {
                countO.push(("case" + (j + 1)) + (i + 1));
            } else {
                countEmpty.push(("case" + (j + 1)) + (i + 1));
            }
        }
        if (countO.length == 2 && countX.length == 0) {
            let caseToReturn = countEmpty[0];
            return caseToReturn;
        }
    }

    //Vérification si 2 0 alignés sur la diagonale hautGauche à basDroit pour jouer la case vide
    let column = 0;
    let countX = [];
    let countO = [];
    let countEmpty = [];
    for (let line = 0; line < 3; line++) {
        if (array[line][column] == "X") {
            countX.push(("case" + (line + 1)) + (column + 1));
            column++;
        } else if (array[line][column] == "O") {
            countO.push(("case" + (line + 1)) + (column + 1));
            column++;
        } else {
            countEmpty.push(("case" + (line + 1)) + (column + 1));
            column++;
        }
    }
    if (countO.length == 2 && countX.length == 0) {
        let caseToReturn = countEmpty[0];
        return caseToReturn;
    }

    //Vérification si 2 O alignés sur la diagonale basGauche à hautDroit pour jouer la case vide
    let line = 2;
    countX = [];
    countO = [];
    countEmpty = [];
    for (let column = 0; column < 3; column++) {
        if (array[line][column] == "X") {
            countX.push(("case" + (line + 1)) + (column + 1));
            line--;
        } else if (array[line][column] == "O") {
            countO.push(("case" + (line + 1)) + (column + 1));
            line--;
        } else {
            countEmpty.push(("case" + (line + 1)) + (column + 1));
            line--;
        }
    }
    if (countO.length == 2 && countX.length == 0) {
        let caseToReturn = countEmpty[0];
        return caseToReturn;
    }

    //Verification si 2 X alignés sur une meme ligne pour jouer la case vide
    for (let i = 0; i < array.length; i++) {
        let countX = [];
        let countO = [];
        let countEmpty = [];
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] == "X") {
                countX.push(("case" + (i + 1)) + (j + 1));
            } else if (array[i][j] == "O") {
                countO.push(("case" + (i + 1)) + (j + 1));
            } else {
                countEmpty.push(("case" + (i + 1)) + (j + 1));
            }
        }
        if (countX.length == 2 && countO.length == 0) {
            let caseToReturn = countEmpty[0];
            return caseToReturn;
        }
    }

    //Verification si 2 X alignés sur une meme colonne pour jouer la case vide
    for (let i = 0; i < array.length; i++) {
        let countX = [];
        let countO = [];
        let countEmpty = [];
        for (let j = 0; j < array[i].length; j++) {
            if (array[j][i] == "X") {
                countX.push(("case" + (j + 1)) + (i + 1));
            } else if (array[j][i] == "O") {
                countO.push(("case" + (j + 1)) + (i + 1));
            } else {
                countEmpty.push(("case" + (j + 1)) + (i + 1));
            }
        }
        if (countX.length == 2 && countO.length == 0) {
            let caseToReturn = countEmpty[0];
            return caseToReturn;
        }
    }

    //Vérification si 2 X alignés sur la diagonale hautGauche à basDroit pour jouer la case vide
    column = 0;
    countX = [];
    countO = [];
    countEmpty = [];
    for (let line = 0; line < 3; line++) {
        if (array[line][column] == "X") {
            countX.push(("case" + (line + 1)) + (column + 1));
            column++;
        } else if (array[line][column] == "O") {
            countO.push(("case" + (line + 1)) + (column + 1));
            column++;
        } else {
            countEmpty.push(("case" + (line + 1)) + (column + 1));
            column++;
        }
    }
    if (countX.length == 2 && countO.length == 0) {
        let caseToReturn = countEmpty[0];
        return caseToReturn;
    }

    //Vérification si 2 X alignés sur la diagonale basGauche à hautDroit pour jouer la case vide
    line = 2;
    countX = [];
    countO = [];
    countEmpty = [];
    for (let column = 0; column < 3; column++) {
        if (array[line][column] == "X") {
            countX.push(("case" + (line + 1)) + (column + 1));
            line--;
        } else if (array[line][column] == "O") {
            countO.push(("case" + (line + 1)) + (column + 1));
            line--;
        } else {
            countEmpty.push(("case" + (line + 1)) + (column + 1));
            line--;
        }
    }
    if (countX.length == 2 && countO.length == 0) {
        let caseToReturn = countEmpty[0];
        return caseToReturn;
    }

    //Verification case vide
    countEmpty = [];
    for (let line = 0; line < 3; line++) {
        for (let column = 0; column < 3; column++) {
            if (array[line][column] != "X" && array[line][column] != "O") {
                countEmpty.push(("case" + (line + 1)) + (column + 1));
            }
        }
    }
    return countEmpty[Math.floor(Math.random() * countEmpty.length)];

}