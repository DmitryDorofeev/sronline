package main;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by dmitry on 13.09.14.
 */
public class AccountService {
    public Map<String, UserProfile> sessions = new HashMap<>();
    public Map<String, UserProfile> users = new HashMap<>();

    public String register(UserProfile profile, String sessionId) {
        if (users.get(sessionId) == null) {
            return "User logined!!";
        }
        else {
            users.put(sessionId, profile);
            return "OK";
        }
    }
}
