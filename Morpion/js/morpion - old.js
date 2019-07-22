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
        Player1.value = 1;
        let Player2 = new Object();
        Player2.value = 2;

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
        Player2['value'] = 1;
        Player1['value'] = 2;
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
            console.log("coucou case11");
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id et inscription tableau
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);
                array[indice1 - 1][indice2 - 1] = e.target.textContent;

                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //Case12
    case12.addEventListener("click", function(e) {
        //Si la case est vide
        if (e.target.textContent == "") {
            //Si player1 joue
            if (tourNumber % 2 == Player1['value'] % 2) {
                e.target.textContent = "X";
                e.target.style.color = "black";
                //Sinon si player2 joue
            } else {
                e.target.textContent = "0";
                e.target.style.color = "red";
            }
            //Récupération des 2 chiffres de la fin de l'id
            let indice1 = e.target.id.slice(4, 5);
            let indice2 = e.target.id.slice(5, 6);

            array[indice1 - 1][indice2 - 1] = e.target.textContent;
            //Check s'il y a un gagnant
            if (checkIfThereIsAWinner(array)) {
                if (e.target.textContent == "X") {
                    winnerIs(Player1);
                } else {
                    winnerIs(Player2);
                }
            } else {
                //Incrémentation tour
                tourNumber = increment(tourNumber);
                //Si toutes les cases sont pleines
                if (tourNumber == 10) {
                    matchNul();
                    //Sinon changement de joueur
                } else {
                    //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                    whosTurn(tourNumber, Player1, Player2);
                }
            }
            //Sinon si la case n'est pas vide
        } else {
            playAnotherCase(tourNumber);
        }
    }, { once: true })

    //Case13
    case13.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //Case21
    case21.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //case22
    case22.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //case23
    case23.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //case31
    case31.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //case32
    case32.addEventListener("click", function(e) {
            //Si la case est vide
            if (e.target.textContent == "") {
                //Si player1 joue
                if (tourNumber % 2 == Player1['value'] % 2) {
                    e.target.textContent = "X";
                    e.target.style.color = "black";
                    //Sinon si player2 joue
                } else {
                    e.target.textContent = "0";
                    e.target.style.color = "red";
                }
                //Récupération des 2 chiffres de la fin de l'id
                let indice1 = e.target.id.slice(4, 5);
                let indice2 = e.target.id.slice(5, 6);

                array[indice1 - 1][indice2 - 1] = e.target.textContent;
                //Check s'il y a un gagnant
                if (checkIfThereIsAWinner(array)) {
                    if (e.target.textContent == "X") {
                        winnerIs(Player1);
                    } else {
                        winnerIs(Player2);
                    }
                } else {
                    //Incrémentation tour
                    tourNumber = increment(tourNumber);
                    //Si toutes les cases sont pleines
                    if (tourNumber == 10) {
                        matchNul();
                        //Sinon changement de joueur
                    } else {
                        //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                        whosTurn(tourNumber, Player1, Player2);
                    }
                }
                //Sinon si la case n'est pas vide
            } else {
                playAnotherCase(tourNumber);
            }
        }, { once: true })
        //case33
    case33.addEventListener("click", function(e) {
        //Si la case est vide
        if (e.target.textContent == "") {
            //Si player1 joue
            if (tourNumber % 2 == Player1['value'] % 2) {
                e.target.textContent = "X";
                e.target.style.color = "black";
                //Sinon si player2 joue
            } else {
                e.target.textContent = "0";
                e.target.style.color = "red";
            }
            //Récupération des 2 chiffres de la fin de l'id
            let indice1 = e.target.id.slice(4, 5);
            let indice2 = e.target.id.slice(5, 6);

            array[indice1 - 1][indice2 - 1] = e.target.textContent;
            //Check s'il y a un gagnant
            if (checkIfThereIsAWinner(array)) {
                if (e.target.textContent == "X") {
                    winnerIs(Player1);
                } else {
                    winnerIs(Player2);
                }
            } else {
                //Incrémentation tour
                tourNumber = increment(tourNumber);
                //Si toutes les cases sont pleines
                if (tourNumber == 10) {
                    matchNul();
                    //Sinon changement de joueur
                } else {
                    //if Si c'est au tour de l'ordi de jouer (a programmer pour v2)
                    whosTurn(tourNumber, Player1, Player2);
                }
            }
            //Sinon si la case n'est pas vide
        } else {
            playAnotherCase(tourNumber);
        }
    }, { once: true })
}
//-----------------------------------------------------------------------------------------------
function increment(tourNumber) {
    return ++tourNumber;
}
//-----------------------------------------------------------------------------------------------
function whosTurn(tourNumber, Player1, Player2) {
    //Affichage "A qui de jouer"
    if (document.getElementById("whoPlay") != null) {
        let whoPlay1 = document.getElementById("whoPlay");
        divGame.removeChild(whoPlay1);
    }
    let whoPlay = document.createElement("p");
    whoPlay.id = "whoPlay";
    if (tourNumber % 2 == Player1['value'] % 2) {
        whoPlay.textContent = "C'est au tour de " + Player1['name'];
    } else {
        whoPlay.textContent = "C'est au tour de " + Player2['name'];
    }
    divGame.appendChild(whoPlay);
}
//------------------------------------------------------------------------------------------------
function checkIfThereIsAWinner(array) {

    //Vérification alignement par ligne
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == array[i][1] && array[i][1] == array[i][2] && array[i][0] != "A") {
            return true;
        }
    }
    //Vérification alignement par colonne
    for (let i = 0; i < array.length; i++) {
        if (array[0][i] == array[1][i] && array[1][i] == array[2][i] && array[0][i] != "A") {
            return true;
        }
    }
    //Vérification alignement diagonale
    if (array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[0][0] != "A") {
        return true;
    }
    if (array[2][0] == array[1][1] && array[1][1] == array[0][2] && array[2][0] != "A") {
        return true;
    }
    return false;
}
//-------------------------------------------------------------------------------------------------
function winnerIs(Player) {
    let winnerIs = document.getElementById("whoPlay");
    winnerIs.textContent = "" + Player['name'] + " a gagné";
    winnerIs.style.fontSize = "2em";
    winnerIs.style.fontWeight = "bold";

}
//--------------------------------------------------------------------------------------------------
function matchNul(tourNumber) {
    let winnerIs = document.getElementById("whoPlay");
    winnerIs.style.fontSize = "2em";
    winnerIs.style.fontWeight = "bold";
    winnerIs.textContent = "Match Nul";
}
//--------------------------------------------------------------------------------------------------
function playAnotherCase(tourNumber) {
    let winnerIs = document.getElementById("whoPlay");
    if (tourNumber >= 9) {
        winnerIs.textContent = "Partie finie";
    } else {
        winnerIs.textContent = "Veuillez jouer une autre case";
    }
}
//--------------------------------------------------------------------------------------------------