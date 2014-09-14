package frontend;

import main.AccountService;
import main.CodeResponses;
import main.UserProfile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

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
        HttpSession session = request.getSession();

        UserProfile profile = new UserProfile(login, email, password);

        CodeResponses resp = accountService.register(profile);
        if (resp == CodeResponses.OK)
            response.getWriter().println("OK");
        else
            response.getWriter().println("Already registered");


    }
}
