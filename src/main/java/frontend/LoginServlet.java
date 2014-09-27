package frontend;

import Users.AccountService;
import constants.CodeResponses;
import Users.UserProfile;
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
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        String login = request.getParameter("login");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);// перенести вниз, тк не знаем ок или неок
        HttpSession session = request.getSession();

        Map<String, Object> pageVariables = new HashMap<>();

        UserProfile profile = new UserProfile(login, "", password, "");
        if (accountService.login(profile, session.getId()) == CodeResponses.OK) {
            pageVariables.put("status", 200);
            pageVariables.put("login", login);
            pageVariables.put("avatar", login);
        }
        else {
            pageVariables.put("status", 404);
            pageVariables.put("login", 0);
            pageVariables.put("avatar", 0);
        }
        response.setHeader("Content-type", "application/json");

        response.getWriter().println(PageGenerator.getPage("loginresponse.txt", pageVariables));
    }
}
