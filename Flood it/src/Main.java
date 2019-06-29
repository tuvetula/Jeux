import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int nbColors;
		int size =0;
		int nbPlays = 0;
		
		
		// Question Joueur nombre de couleurs
		do {
			System.out.println("Nombre de couleurs? (entre 3 et 8)");
			Scanner scanner = new Scanner(System.in);
			nbColors = 	scanner.nextInt();		
		}while(nbColors<3 || nbColors > 8);
		
		//Question choix taille de la grille
		do {
			System.out.println("Taille de la grille? choix possible: 2, 6, 10, 14, 18, 22, 26");
			Scanner scanner1 = new Scanner(System.in);
			size = scanner1.nextInt();
		}while(size!=2 && size!=6 && size!=10 && size!=14 && size!=18 && size!=22 && size!=26);
		
		
		
		
		//Construction grille
		Flood g1 = new Flood(size,nbColors);
		int color = 0;
		do {
			// Question choix couleur
						g1.displayFlood();
						System.out.println("Nombre de coups déja joué: "+g1.getCountPlay()+"/"+g1.getNbMaxShot());
						do {
							if(color>=nbColors) {
								System.out.println("Je n'ai pas compris votre choix");
							}
							System.out.println("Choisissez votre couleur?");
							Scanner scanner2 = new Scanner(System.in);
							color = scanner2.nextInt();
						}while(color>=nbColors);
						
						g1.play(color);
						
						if (g1.isWin()) {
							System.out.println("Vous avez gagné");
						}
						if (g1.isLoose()) {
							System.out.println("Vous avez perdu");
						}
		}while(!g1.isWin()||!g1.isLoose()) ;
	
		
		
	}

}
