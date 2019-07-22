import java.io.Console;

public class Grille {
	private Box[][] demineur;
	private int width;
	private int height;
	private boolean win = false;
	private boolean loose = false;
	private int playCount = 0;

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}

	public boolean isWin() {
		return win;
	}

	public boolean isLoose() {
		return loose;
	}

	// Constructeur
	public Grille(int n) {
		// Construction de la grille
		sizeDemineur(n);
		// tableau de box demineur = tableau de box[height][width]
		demineur = new Box[height][width];

		// Remplissage de la grille avec des box
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				demineur[i][j] = new Box();
			}
		}
	}

	// Methode calcul taille grille
	private void sizeDemineur(int n) {
		if (n == 2) {
			width = 16;
			height = 16;
		} else if (n == 3) {
			width = 32;
			height = 16;
		} else {
			width = 8;
			height = 8;
		}
	}

	// Methode pour remettre à zero la grille
	public void initializeGrille(int difficulty) {
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				demineur[i][j].initializeBox();
			}
		}
		playCount=0;
		win=false;
		loose=false;
	}

	// Methode pour afficher
	public Box getBox(int i, int j) {
		return demineur[i][j];
	}

	// Methode pour afficher la grille
	public void display() {
		if (loose) {
			displayEnd();
		} else {
			for (int i = 0; i < height; i++) {
				for (int j = 0; j < width; j++) {
					System.out.print(demineur[i][j].displayBox());
				}
				System.out.print("\n");
			}
		}
	}

	// Methode pour afficher la grille pleine (si win ou loose)
	public void displayEnd() {
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				System.out.print(demineur[i][j].displayBoxEnd());
				if (demineur[i][j].isMined()) {
					demineur[i][j].setIschecked(true);
				}
			}
			System.out.print("\n");
		}
	}

	// Methode calcul nombre de mines
	private int numberMine() {
		if (width == 16) {
			return 40;
		} else if (width == 32) {
			return 99;
		} else {
			return 10;
		}
	}

	// Methode pour placer une mine dans une box
	private boolean placeMineInABox(int line, int column) {
		if (!demineur[line][column].ischecked() && !demineur[line][column].isMined()) {
			demineur[line][column].setMined(true);
			return true;
		}
		return false;
	}

	// Methode qui génère les mines et les place dans la grille
	private void mineGenerator(int linePlayer, int columnPlayer) {
		int compteur = 0;
		while (compteur != numberMine()) {
			int line;
			int column;
			line = (int) (Math.random() * height);
			column = (int) (Math.random() * width);

			// Conditions pour placer bombe pas autour de la première case checkée
			if (line >= linePlayer - 1 && line <= linePlayer + 1) {
				if (column < columnPlayer - 1 || column > columnPlayer + 1) {
					if (placeMineInABox(line, column)) {
						compteur++;
					}
				}
			}
			if (column >= columnPlayer - 1 && column <= columnPlayer + 1) {
				if (line < linePlayer - 1 || line > linePlayer + 1) {
					if (placeMineInABox(line, column)) {
						compteur++;
					}
				}
			}
			if ((line < linePlayer - 1 || line > linePlayer + 1)
					|| (column < columnPlayer - 1 || column > columnPlayer + 1)) {
				if (placeMineInABox(line, column)) {
					compteur++;
				}
			}
		}
		// Paramètre les valeurs des box
		changeSetMineAround();
	}

	// Changer setMineAround sur toutes les box
	private void changeSetMineAround() {
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				demineur[i][j].setNumberMineAround(boxNumberMineAround(i, j));
			}
		}
	}

	// Methode calcul nombre de mines autour
	private int boxNumberMineAround(int valueLine, int valueColumn) {
		int result = 0;
		// Boucle nombre de lignes
		for (int j = -1; j < 2; j++) {
			// Boucle nombre de colonnes
			for (int k = -1; k < 2; k++) {
				if (j != 0 || k != 0) {
					if (verifTarget(valueLine + j, valueColumn + k)) {
						result += 1;
					}
				}
			}
		}
		return result;
	}

	// Methode pour verifier si mine dans case voulue
	private boolean verifTarget(int line, int column) {
		if (line >= 0 && line < height && column >= 0 && column < width) {
			return demineur[line][column].isMined();
		}
		return false;
	}

	// Methode quand on joue une case
	public void play(int line, int column) {

		// Si gagné ou perdu alors return (fin de la méthode)
		if (isLoose() || isWin()) {
			return;
		}

		// Si la case n'est pas checkée
		if (!demineur[line][column].ischecked()) {

			// Si la case a un drapeau
			if (demineur[line][column].isFlag()) {
				return;
			}

			// Si la case ne contient pas de drapeau
			if (!demineur[line][column].isFlag()) {
				demineur[line][column].setIschecked(true);
			}

			// Si c'est le premier play
			if (++playCount == 1) {
				mineGenerator(line, column);
			}

			// Si la case a 0 mine autour et que la case n'est pas minée
			if (demineur[line][column].getnumberMineAround() == 0 && !demineur[line][column].isMined()) {

				// Boucle tour de la case
				for (int i = line - 1; i <= line + 1; i++) {
					if (i >= 0 && i < height) {
						for (int j = column - 1; j <= column + 1; j++) {
							if (j >= 0 && j < width) {
								play(i, j);
							}
						}
					}
				}
			}
		} else {
			// Verification nombre de flags autour de la case
			int numberOfFlags = 0;
			// boucle nombre de lignes
			for (int i = line - 1; i <= line + 1; i++) {
				if (i >= 0 && i < height) {
					// Boucle nombre de colonnes
					for (int j = column - 1; j <= column + 1; j++) {
						if (j >= 0 && j < width) {
							if (demineur[i][j].isFlag()) {
								numberOfFlags++;
							}
						}
					}
				}
			}
			// Si le nombre de mines autour de la case = nombre de flags autour de la case
			if (demineur[line][column].getnumberMineAround() == numberOfFlags && numberOfFlags > 0) {
				// Boucle nombre de lignes
				for (int i = line - 1; i <= line + 1; i++) {
					if (i >= 0 && i < height) {
						// Boucle nombre de colonnes
						for (int j = column - 1; j <= column + 1; j++) {
							if (j >= 0 && j < width) {
								if (!demineur[i][j].ischecked() && !demineur[i][j].isFlag()) {
									play(i, j);
								}
							}
						}
					}
				}
			}
		}
		verif(line, column);
	}

	// Methode playFlag pour placer un flag
	public void playFlag(int line, int column) {
		if (!demineur[line][column].isFlag()) {
			demineur[line][column].setFlag(true);
		} else {
			demineur[line][column].setFlag(false);
		}
	}

	// Methode verification
	private void verif(int line, int column) {
		// Vérif si perdu
		if (demineur[line][column].isMined()) {
			System.out.println("Vous avez perdu!!!");
			loose = true;
		}
		// Verif si gagné
		int winResult = width * height - numberMine();
		int testResult = 0;
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				if (demineur[i][j].ischecked() && !demineur[i][j].isMined()) {
					testResult++;
				}
			}
		}
		if (winResult == testResult) {
			System.out.println("Vous avez gagné");
			win = true;
		}
	}

}
