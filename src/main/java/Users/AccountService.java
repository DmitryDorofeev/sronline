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

    public CodeResponses login(String login, String password, String sessionId) {
        UserProfile currentUser = this.users.get(login);
        if ((currentUser != null) && (password.equals(currentUser.getPassword()))) {
            this.sessions.put(sessionId, currentUser);
            return CodeResponses.OK;
        }
        else {
            return CodeResponses.NOT_LOGINED;
        }
    }

    public UserProfile getCurrentUser(String sessionId) {
        return this.sessions.get(sessionId);
    }

    public CodeResponses logout(String sessionId) {
        sessions.remove(sessionId);

        return CodeResponses.OK;
    }
}
