import java.awt.Color;

import javax.swing.JButton;
import javax.swing.text.StyledEditorKit.ForegroundAction;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter.DEFAULT;

public class Box extends JButton {
	private boolean mined;
	private boolean flag;
	private boolean checked;
	private int numberMineAround;
	private char caractere;

	// Constructeur
	public Box() {
		mined = false;
		flag = false;
		checked = false;
		numberMineAround = 0;
		caractere = '-';

	}

	// Getters and setters
	public boolean isMined() {
		return mined;
	}

	public void setMined(boolean isMined) {
		this.mined = isMined;
	}

	public boolean isFlag() {
		return flag;
	}

	public void setFlag(boolean ischeckedFlag) {
		this.flag = ischeckedFlag;
		if (isFlag()) {
			setBackground(Color.YELLOW);
			setText("F");	
		}else {
			setText("");
			setBackground(null);
		}
	}

	public boolean ischecked() {
		return checked;
	}

	public void setIschecked(boolean ischecked) {
		this.checked = ischecked;
		setText("" + displayBox());
		if (ischecked) {
			if (isMined()) {
				setBackground(Color.RED);
			} else {
				setBackground(Color.GREEN);
			}
			
		}
	}

	public int getnumberMineAround() {
		return numberMineAround;
	}

	public void setNumberMineAround(int mineAround) {
		this.numberMineAround = mineAround;
	}

	// Methode displayDefaultBox
	public char displayBox() {
		// Quand la case est jouée
		if (checked) {
			if (mined) {
				return '*';
			}
			return (char) ('0' + numberMineAround);
		} else if (flag) {
			return 'F';
		}
		return caractere;
	}

	// Methode displayBoxEnd()
	public char displayBoxEnd() {
		if (mined) {
			return '*';
		}
		if (checked) {
			return (char) ('0' + numberMineAround);
		}
		return caractere;
	}

	// Methode pour remettre grille à zero
	public void initializeBox() {
		mined = false;
		flag = false;
		checked = false;
		numberMineAround = 0;
		setText("");
		setBackground(null);

	}
}
