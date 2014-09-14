package main;

/**
 * Created by dmitry on 13.09.14.
 */
public class UserProfile {
    private String email;
    private String password;
    private String login;

    public UserProfile(String login, String email, String password) {
        this.email = email;
        this.password = password;
        this.login = login;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
