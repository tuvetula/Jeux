import javax.annotation.Generated;
import javax.swing.JButton;
import javax.swing.text.StyledEditorKit.ForegroundAction;

public class Flood{
	private Box[][] flood;
	private int widthHeight;
	private int nbColors;
	private int nbMaxShot;
	private int countPlay=0;
	private boolean win = false;
	private boolean loose = false;

	public int getNbMaxShot() {
		return nbMaxShot;
	}
	public boolean isWin() {
		return win;
	}
	public void setWin(boolean win) {
		this.win = win;
	}
	public int getCountPlay() {
		return countPlay;
	}
	public boolean isLoose() {
		return loose;
	}
	public int getWidthHeight() {
		return widthHeight;
	}
	public Box[][] getFlood() {
		return flood;
	}
	
	// Constructeur
	public Flood(int n, int nbColorsUserChoice) {
		widthHeight = n;
		nbColors = nbColorsUserChoice;
		flood = new Box[n][n];
	
		// Remplissage flood avec des box
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				flood[i][j] = new Box();
			}
		}
		
		//Paramétrage des couleurs des box
		GeneratedColorBox();
		
		//Parmétrage nombre de coups maxi
		nbMaxShot=nbMaxShots();
	}
	
	//Methode pour initialiser la grille
	public void initializeFlood(int nbColors) {
		this.nbColors = nbColors;
		GeneratedColorBox();
		nbMaxShot = nbMaxShots();
	}
	
	
	//Methode générer couleurs et paramétrage par box
	private void GeneratedColorBox() {
		int codeColor;
		for (int i = 0 ; i < widthHeight ; i++) {
			for (int j = 0 ; j < widthHeight ; j++) {
				codeColor= (int) (Math.random()*nbColors);
				flood[i][j].setCodeColor(codeColor);
			}
		}	
	}

	
	//Methode pour afficher le flood
	public void displayFlood() {
		for (int i = 0 ; i < widthHeight ; i++) {
			for (int j = 0 ; j < widthHeight ; j++) {
				System.out.print(flood[i][j].displayBox());
			}
			System.out.print("\n");
		}		
	}
	
	//Methode getBox pour afficher box dans window
	public Box getBox (int i, int j) {
		return flood[i][j];
	}
	
	//Methode getColor pour recuperer couleur box
	public int getColor (int i, int j) {
		return flood[i][j].getCodeColor();
	}
	
	//Methode Play
	public void play(int newColor) {
		int oldColor = flood[0][0].getCodeColor();
		if (oldColor == newColor) {
			return;
		}
		if (countPlay < nbMaxShot) {
			countPlay++;
			playRecursif(newColor, 0, 0,oldColor);			
		}
	}
	
	//Methode extension Play
	private void playRecursif(int newColor , int line , int column, int oldColor) {
		flood[line][column].setCodeColor(newColor);
		
		for(int i = line-1 ; i <line+2 ; i++) {
			for (int j = column-1 ; j < column+2 ;j++){
				//Si la case est bien comprise dans le tableau
				if((i>=0 && i<widthHeight)&&(j>=0 && j<widthHeight)) {
					//Pas de diagonale
					if ((i==line-1 && j==column)||(i==line && j!=column)|| (i==line+1 && j==column)){
						//Si la case est égale à l'ancienne couleur
						if (flood[i][j].getCodeColor()== oldColor) {
							playRecursif(newColor,i,j,oldColor);
							
						}
					}					
				}
			}
		}
		verif();
	}
	
	//Methode verification si gagné ou perdu
	private void verif() {
		//Verif si gagné
		int nbCases = widthHeight*widthHeight;
		int nbBoxSameColor = 0;
		int colorRef = flood[0][0].getCodeColor();
		for (int i = 0 ; i<widthHeight ; i++) {
			for (int j = 0 ; j < widthHeight ; j++) {
				if (flood[i][j].getCodeColor()==colorRef) {
					nbBoxSameColor++;
				}
			}
		}
		if (nbBoxSameColor==nbCases) {
			win=true;
		}
		
		//Verif si perdu
		if (countPlay==nbMaxShot && win==false) {
			loose=true;
		}
		
	}
	
	//Methode pour génerer le nombre de coup max
	private int nbMaxShots() {
	if(nbColors==3) {
		if(widthHeight==2) {
			nbMaxShot=1;
		}else if (widthHeight==6) {
			nbMaxShot=5;
		}else if (widthHeight==10) {
			nbMaxShot=8;
		}else if (widthHeight==14) {
			nbMaxShot=12;
		}else if (widthHeight==18) {
			nbMaxShot=16;
		}else if (widthHeight==22) {
			nbMaxShot=19;
		}else if (widthHeight==26) {
			nbMaxShot=23;
		}	
	}
	if(nbColors==4) {
		if(widthHeight==2) {
			nbMaxShot=2;
		}else if (widthHeight==6) {
			nbMaxShot=7;
		}else if (widthHeight==10) {
			nbMaxShot=11;
		}else if (widthHeight==14) {
			nbMaxShot=16;
		}else if (widthHeight==18) {
			nbMaxShot=21;
		}else if (widthHeight==22) {
			nbMaxShot=26;
		}else if (widthHeight==26) {
			nbMaxShot=30;
		}	
	}
	if(nbColors==5) {
		if(widthHeight==2) {
			nbMaxShot=2;
		}else if (widthHeight==6) {
			nbMaxShot=8;
		}else if (widthHeight==10) {
			nbMaxShot=14;
		}else if (widthHeight==14) {
			nbMaxShot=20;
		}else if (widthHeight==18) {
			nbMaxShot=26;
		}else if (widthHeight==22) {
			nbMaxShot=32;
		}else if (widthHeight==26) {
			nbMaxShot=38;
		}	
	}
	if(nbColors==6) {
		if(widthHeight==2) {
			nbMaxShot=3;
		}else if (widthHeight==6) {
			nbMaxShot=10;
		}else if (widthHeight==10) {
			nbMaxShot=17;
		}else if (widthHeight==14) {
			nbMaxShot=25;
		}else if (widthHeight==18) {
			nbMaxShot=32;
		}else if (widthHeight==22) {
			nbMaxShot=39;
		}else if (widthHeight==26) {
			nbMaxShot=46;
		}	
	}
	if(nbColors==7) {
		if(widthHeight==2) {
			nbMaxShot=4;
		}else if (widthHeight==6) {
			nbMaxShot=12;
		}else if (widthHeight==10) {
			nbMaxShot=20;
		}else if (widthHeight==14) {
			nbMaxShot=29;
		}else if (widthHeight==18) {
			nbMaxShot=37;
		}else if (widthHeight==22) {
			nbMaxShot=45;
		}else if (widthHeight==26) {
			nbMaxShot=54;
		}	
	}
	if(nbColors==8) {
		if(widthHeight==2) {
			nbMaxShot=4;
		}else if (widthHeight==6) {
			nbMaxShot=14;
		}else if (widthHeight==10) {
			nbMaxShot=23;
		}else if (widthHeight==14) {
			nbMaxShot=33;
		}else if (widthHeight==18) {
			nbMaxShot=42;
		}else if (widthHeight==22) {
			nbMaxShot=52;
		}else if (widthHeight==26) {
			nbMaxShot=61;
		}	
	}
		return nbMaxShot;
	}
}	

