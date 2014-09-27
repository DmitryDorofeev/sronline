package Users;

/**
 * Created by dmitry on 13.09.14.
 */
public class UserProfile {
    private String email;
    private String password;
    private String login;
    private String avatar;

    public UserProfile(String login, String email, String password, String avatar) {
        this.email = email;
        this.password = password;
        this.login = login;
        this.avatar = avatar;
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

    public String getAvatar() {
        return avatar;
    }

}
