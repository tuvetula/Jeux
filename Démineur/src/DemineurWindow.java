import java.awt.Button;
import java.awt.EventQueue;
import java.awt.Insets;

import javax.swing.JFrame;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.ActionEvent;
import javax.swing.JRadioButton;
import javax.swing.JSlider;

public class DemineurWindow {

	private JFrame frame;
	private Grille game;
	private int difficulty = 2;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					DemineurWindow window = new DemineurWindow();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */

	public DemineurWindow() {
		// Construire un nouveau jeu
		game = new Grille(difficulty);
		
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {

		//Construction pop-up window
		


		// Définition taille fenêtre
		int largeurFenetre;
		int longueurFenetre;
		if (difficulty == 3) {
			longueurFenetre = 1000;
			largeurFenetre = 500;
		} else if (difficulty == 2) {
			longueurFenetre = 575;
			largeurFenetre = 500;
		} else {
			longueurFenetre = 400;
			largeurFenetre = 300;
		}

		// Construction fenetre
		frame = new JFrame();
		frame.setBounds(100, 100, longueurFenetre, largeurFenetre);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		

		// Construction Bouton Démarrer une partie
		JButton btnNewButton_1 = new JButton("Démarrer une partie");
		btnNewButton_1.setBounds(20, 5, 150, 30);
		frame.getContentPane().add(btnNewButton_1);
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				game.initializeGrille(difficulty);
			}
		});
		
		
		

		// Construction grille
		int hauteurLine = 40;
		int coordonnéesColumn = 140;
		// Boucle ligne
		for (int i = 0; i < game.getHeight(); i++) {
			// Création constante I
			final int I = i;

			// Boucle colonne
			for (int j = 0; j < game.getWidth(); j++) {
				// Création constante J
				final int J = j;
				
			
				//Création des boutons qui sont des box
				JButton btnNewButton = game.getBox(I, J);
				btnNewButton.setBounds(coordonnéesColumn, hauteurLine, 23, 23);
				btnNewButton.setMargin(new Insets(0, 0, 0, 0));
				frame.getContentPane().add(btnNewButton);
				
				//Evènements au clic droit et clic gauche
				btnNewButton.addMouseListener(new MouseAdapter() {
					public void mouseReleased(MouseEvent event) {
						if (event.getButton()!=1) {
							game.playFlag(I, J);
							game.display();
						} else {
							game.play(I, J);
							game.display();								
							
						}
					}
				});
				coordonnéesColumn += 23;
			}
			coordonnéesColumn = 140;
			hauteurLine += 23;
		}

		
		
	}
}
