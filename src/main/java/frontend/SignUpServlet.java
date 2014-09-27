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
        String avatar = request.getParameter("avatar");

        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession();

        UserProfile profile = new UserProfile(login, email, password, avatar);
        System.out.print("ok\n");
        CodeResponses resp = accountService.register(profile);

        Map<String, Object> pageVariables = new HashMap<>();

        if (resp == CodeResponses.OK)
            pageVariables.put("status", 200);
        else
            pageVariables.put("status", 404);

        response.setHeader("Content-type", "application/json");

        response.getWriter().println(PageGenerator.getPage("authresponse.txt", pageVariables));


    }
}
