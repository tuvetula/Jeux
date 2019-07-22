import java.util.Scanner;

import javax.print.DocFlavor.INPUT_STREAM;

public class Main {

	public static void main(String[] args) {

		// Niveau choisi par le joueur
		int level;
		// Choix joueur ligne
		int line;
		// Choix joueur Colonne
		int column;
		// Choix joueur option
		int flag;

		// Question Joueur choix niveau
		System.out.println("Choisissez votre niveau? 1 (Facile), 2 (Intermédiaire),3 (Expert)");
		Scanner scanner = new Scanner(System.in);
		level = scanner.nextInt();

		// Génération grille
		Grille g1 = new Grille(level);

		

		do {
			// Question choix case
			g1.display();
			System.out.println("Choisissez votre case (x y)");
			
			flag = scanner.nextInt();
			line = scanner.nextInt();
			column = scanner.nextInt();
			
			if (flag!=1) {
				g1.play(line, column);
			}else {
				g1.playFlag(line,column);
			}
			
			if (g1.isLoose()) {
				g1.displayEnd();
			}
		} while (!g1.isWin() && !g1.isLoose());

	}

}
