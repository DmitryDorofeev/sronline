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
 * Created by dmitry on 13.09.14.
 */
public class SignUpServlet extends HttpServlet {
    public AccountService accountService;

    public SignUpServlet(AccountService accountService) {
        this.accountService = accountService;
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        String login = request.getParameter("login");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);

        UserProfile profile = new UserProfile(login, email, password);
        CodeResponses resp = accountService.register(profile);

        JSONObject output = new JSONObject();

        if (resp == CodeResponses.OK)
            output.put("status", 200);
        else
            output.put("status", 404);

        response.setHeader("Content-type", "application/json");

        response.getWriter().println(output);


    }
}
