package Users;

import constants.CodeResponses;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by dmitry on 13.09.14.
 */
public class AccountService {
    public Map<String, UserProfile> sessions = new HashMap<>();
    public Map<String, UserProfile> users = new HashMap<>();

    public CodeResponses register(UserProfile profile) {

        String login = profile.getLogin();

        if (this.users.get(login) != null) {
            return CodeResponses.REGISTRED;
        }
        else {
            this.users.put(login, profile);
            System.out.println(this.users.toString());
            return CodeResponses.OK;
        }
    }

    public CodeResponses login(UserProfile profile, String sessionId) {

        String login = profile.getLogin();
        String password = profile.getPassword();
        System.out.println(login);
        System.out.println(this.users.toString());
        if ((this.users.get(login) != null) & (password.equals(this.users.get(login).getPassword()))) {
            this.sessions.put(sessionId, profile);
            return CodeResponses.OK;
        }
        else {
            if (password.equals(this.users.get(login).getPassword()))
                return CodeResponses.NOT_REGISTRED;
            else
                return CodeResponses.WRONG_PASSWORD;
        }
    }

    public CodeResponses logout(UserProfile profile) {

        String login = profile.getLogin();
        String password = profile.getPassword();
        System.out.println(login);
        System.out.println(this.users.toString());
        if (this.sessions.get(profile) != null) {
            this.sessions.remove(profile);
            return CodeResponses.OK;
        }
        else
            return CodeResponses.NOT_LOGINED;
    }
}
