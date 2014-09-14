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

        if (users.get(login) != null) {
            return CodeResponses.REGISTRED;
        }
        else {
            users.put(login, profile);
            return CodeResponses.OK;
        }
    }

    public CodeResponses login(UserProfile profile, String sessionId) {
        sessions.put(sessionId, profile);
        return CodeResponses.OK;
    }
}
