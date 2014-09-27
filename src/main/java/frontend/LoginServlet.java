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

        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession();

        Map<String, Object> pageVariables = new HashMap<>();

        UserProfile profile = new UserProfile(login, "", password, "");
        if (accountService.login(profile, session.getId()) == CodeResponses.OK) {
            pageVariables.put("status", 200);
        }
        else {
            pageVariables.put("status", 404);
        }
        response.setHeader("Content-type", "application/json");

        response.getWriter().println(PageGenerator.getPage("loginresponse.txt", pageVariables));
    }
}
