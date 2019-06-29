import java.awt.EventQueue;
import java.awt.Insets;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.print.attribute.Size2DSyntax;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JList;
import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JTextPane;

import org.omg.CORBA.PRIVATE_MEMBER;

import java.awt.Font;
import javax.swing.JSpinner;
import javax.swing.JSlider;
import javax.swing.JComboBox;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class FloodWindow {

	private JFrame frame;
	private Flood game;
	private JTextField txtNombreDeCouleurs;
	private JTextPane textPane;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					FloodWindow window = new FloodWindow();
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
	public FloodWindow() {

		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {

		// Construction grille
		game = new Flood(14, 3);

		// Construction fenetre
		frame = new JFrame();
		frame.setBounds(100, 100, 900, 800);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);

		// Zone de texte (nombre de coups)
		textPane = new JTextPane();
		textPane.setFont(new Font("Arial", Font.BOLD, 12));
		textPane.setBounds(10, 125, 84, 20);
		frame.getContentPane().add(textPane);
		textPane.setText(game.getCountPlay() + " / " + game.getNbMaxShot());

		// ComboBox Color
		JComboBox comboBox = new JComboBox();
		comboBox.setToolTipText("Couleurs");
		comboBox.setName("NumberColors");
		comboBox.setBounds(409, 12, 60, 20);
		comboBox.addItem(3);
		comboBox.addItem(4);
		comboBox.addItem(5);
		comboBox.addItem(6);
		comboBox.addItem(7);
		comboBox.addItem(8);
		frame.getContentPane().add(comboBox);

		// ComboBox Taille de la grille
		JComboBox size = new JComboBox();
		size.setBounds(626, 12, 60, 20);
		size.addItem("2*2");
		size.addItem("6*6");
		size.addItem("10*10");
		size.addItem("14*14");
		size.addItem("18*18");
		size.addItem("22*22");
		size.addItem("26*26");
		frame.getContentPane().add(size);

		// Bouton "Démarrer une nouvelle partie"
		JButton demarrer = new JButton("Démarrer une nouvelle partie");
		demarrer.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int nbCasesASuppr = game.getWidthHeight() * game.getWidthHeight();
				try {
					for (int i = 0; i < nbCasesASuppr; i++) {
						frame.getContentPane().remove(6);
						frame.revalidate();
						frame.repaint();
					}

				} catch (Exception e2) {
					// TODO: handle exception
				}
				game = new Flood(sizeOk(size.getSelectedItem()),(int)comboBox.getSelectedItem());
				construction();
				// game.initializeFlood((int)comboBox.getSelectedItem());
				textPane.setText(game.getCountPlay() + " / " + game.getNbMaxShot());
			}
		});
		demarrer.setBounds(10, 11, 247, 23);
		frame.getContentPane().add(demarrer);

		// Texte Nombre de couleurs
		JLabel lblNombreDeCouleurs = new JLabel("Nombre de couleurs");
		lblNombreDeCouleurs.setBounds(279, 15, 120, 14);
		frame.getContentPane().add(lblNombreDeCouleurs);

		// Texte Taille de la grille
		JLabel lblTailleDeLa = new JLabel("Taille de la grille");
		lblTailleDeLa.setBounds(523, 15, 93, 14);
		frame.getContentPane().add(lblTailleDeLa);

		// Construction grille
		int hauteurLine = 80;
		int coordonnéesColumn = 140;
		// Boucle ligne
		for (int i = 0; i < game.getWidthHeight(); i++) {
			// Création constante I
			final int I = i;
			// Boucle colonne
			for (int j = 0; j < game.getWidthHeight(); j++) {
				// Création constante J
				final int J = j;

				// Création des boutons qui sont des box
				JButton btnNewButton = game.getBox(I, J);
				btnNewButton.setBounds(coordonnéesColumn, hauteurLine, 23, 23);
				btnNewButton.setMargin(new Insets(0, 0, 0, 0));
				frame.getContentPane().add(btnNewButton);

				// Evènements au clic droit et clic gauche
				btnNewButton.addMouseListener(new MouseAdapter() {
					public void mouseReleased(MouseEvent event) {
						int color = game.getColor(I, J);
						game.play(color);
						game.displayFlood();
						textPane.setText(game.getCountPlay() + " / " + game.getNbMaxShot());
						// Si gagné ou perdu
						if (game.isLoose()) {
							JTextPane resultat = new JTextPane();
							resultat.setFont(new Font("Arial", Font.BOLD, 12));
							resultat.setBackground(Color.red);
							resultat.setBounds(10, 150, 120, 20);
							frame.getContentPane().add(resultat);
							resultat.setText("Vous avez perdu !!!");
						} else if (game.isWin()) {
							JTextPane resultat = new JTextPane();
							resultat.setFont(new Font("Arial", Font.BOLD, 12));
							resultat.setBackground(Color.green);
							resultat.setBounds(10, 150, 120, 20);
							frame.getContentPane().add(resultat);
							resultat.setText("Vous avez gagné !!!");
						}
					}
				});

				coordonnéesColumn += 23;
			}
			coordonnéesColumn = 140;
			hauteurLine += 23;
		}
	}

	private int sizeOk(Object size) {
		String sizeString = (String) size;
		String[] tableau = sizeString.split("\\*");
		String tab0 = tableau[0];
		int resultInt = Integer.parseInt(tab0);
		return resultInt;
	}

	private void construction() {
		// Construction grille
		int hauteurLine = 80;
		int coordonnéesColumn = 140;
		// Boucle ligne
		for (int i = 0; i < game.getWidthHeight(); i++) {
			// Création constante I
			final int I = i;
			// Boucle colonne
			for (int j = 0; j < game.getWidthHeight(); j++) {
				// Création constante J
				final int J = j;

				// Création des boutons qui sont des box
				JButton btnNewButton = game.getBox(I, J);
				btnNewButton.setBounds(coordonnéesColumn, hauteurLine, 23, 23);
				btnNewButton.setMargin(new Insets(0, 0, 0, 0));
				frame.getContentPane().add(btnNewButton);
				System.out.println("bouton"+j);
				coordonnéesColumn += 23;
				
				// Evènements au clic droit et clic gauche
				btnNewButton.addMouseListener(new MouseAdapter() {
					public void mouseReleased(MouseEvent event) {
						int color = game.getColor(I, J);
						game.play(color);
						game.displayFlood();
						textPane.setText(game.getCountPlay() + " / " + game.getNbMaxShot());
						// Si gagné ou perdu
						if (game.isLoose()) {
							JTextPane resultat = new JTextPane();
							resultat.setFont(new Font("Arial", Font.BOLD, 12));
							resultat.setBackground(Color.red);
							resultat.setBounds(10, 150, 120, 20);
							frame.getContentPane().add(resultat);
							resultat.setText("Vous avez perdu !!!");
						} else if (game.isWin()) {
							JTextPane resultat = new JTextPane();
							resultat.setFont(new Font("Arial", Font.BOLD, 12));
							resultat.setBackground(Color.green);
							resultat.setBounds(10, 150, 120, 20);
							frame.getContentPane().add(resultat);
							resultat.setText("Vous avez gagné !!!");
						}
					}
				});
			}
			coordonnéesColumn = 140;
			hauteurLine += 23;
		}

	}
}
