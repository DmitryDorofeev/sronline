package main;

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
        System.out.println(login);
        System.out.println(this.users.toString());
        if (this.users.get(login) != null) {
            this.sessions.put(sessionId, profile);
            return CodeResponses.OK;
        }
        else {
            return CodeResponses.NOT_REGISTRED;
        }
    }
}
