package frontend;

import Users.AccountService;
import Users.UserProfile;
import constants.CodeResponses;
import dao.PlayerDao;
import main.Factory;
import org.json.simple.JSONObject;
import table.Player;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

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

        Factory factory = Factory.getInstance();
        PlayerDao playerDao = factory.getPlayerDao();
        Player player = new Player();
        player.setLogin(login);
        player.setPass(password);
        player.setMail(email);
        try {
            playerDao.addPlayer(player);
        } catch (SQLException e) {
            e.printStackTrace();
        }

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
