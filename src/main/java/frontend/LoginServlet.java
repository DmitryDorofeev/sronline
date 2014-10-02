package frontend;

import Users.AccountService;
import constants.CodeResponses;
import Users.UserProfile;
import org.json.simple.JSONObject;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by dmitry on 14.09.14.
 */
public class LoginServlet extends HttpServlet {

    public AccountService accountService;

    public LoginServlet(AccountService accountService) {
        this.accountService = accountService;
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        String sessionId = request.getSession().getId();
        UserProfile currentUser = accountService.getCurrentUser(sessionId);
        if (currentUser != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            JSONObject output = new JSONObject();
            output.put("login", currentUser.getLogin());
            output.put("email", currentUser.getEmail());
            output.put("avatar", currentUser.getAvatar());
            response.setHeader("Content-type", "application/json");

            response.getWriter().println(output);
        }
        else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        String login = request.getParameter("login");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);// перенести вниз, тк не знаем ок или неок
        HttpSession session = request.getSession();

        JSONObject output = new JSONObject();
        if (accountService.login(login, password, session.getId()) == CodeResponses.OK) {
            UserProfile currentProfile = accountService.getCurrentUser(session.getId());
            output.put("status", 200);
            output.put("login", currentProfile.getLogin());
            output.put("email", currentProfile.getEmail());
            output.put("avatar", currentProfile.getAvatar());
        }
        else {
            output.put("status", 403);
        }
        response.setHeader("Content-type", "application/json");

        response.getWriter().println(output);
    }
}
