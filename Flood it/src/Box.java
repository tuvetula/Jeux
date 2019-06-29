import java.awt.Color;

import javax.print.attribute.standard.RequestingUserName;
import javax.swing.JButton;

public class Box extends JButton{

	private int codeColor;
	
	//getters and setters
	public void setCodeColor(int codeColor) {
		this.codeColor = codeColor;
		if (codeColor==0) {
			setBackground(Color.red);
		}else if (codeColor==1) {
			setBackground(Color.green);
		}else if (codeColor==2) {
			setBackground(Color.yellow);
		}else if (codeColor==3) {
			setBackground(Color.blue);
		}else if (codeColor==4) {
			setBackground(Color.orange);
		}else if (codeColor==5) {
			setBackground(Color.black);
		}else if (codeColor==6) {
			setBackground(Color.gray);
		}else if (codeColor==7) {
			setBackground(Color.cyan);
		}
	}
	
	public int getCodeColor() {
		return codeColor;
	}

	//Constructeur
	public Box() {
		codeColor=0;
	}
	
	//Afficher box (display box)
	public int displayBox() {
		return codeColor;
	}

	
	
}
