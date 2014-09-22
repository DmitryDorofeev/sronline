package table;

//import org.hibernate.annotations.Entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Андрей on 21.09.2014.
 */
@Entity
@Table(name="players")
public class Player {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="login")
    private String login;

    @Column(name="pass")
    private String pass;

    public void setId(int id) {
        this.id = id;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public void setPass(String pass) {
        this.pass = pass;
    }

    public int getId() {
        return id;
    }
    public String getLogin() {
        return login;
    }
    public String getPass() {
        return pass;
    }
}
