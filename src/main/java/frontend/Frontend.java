package frontend;

import main.UserProfile;
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
 * @author v.chibrikov
 */
public class Frontend extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession();
        Long userId = (Long)session.getAttribute("userId");
        if (userId == null) {
            userId = Long.parseLong("1");
        }


        Map<String, Object> pageVariables = new HashMap<>();
        pageVariables.put("lo", email == null ? "" : email);
        pageVariables.put("password", password == null ? "" : password);
        response.setHeader("Content-type", "application/json");

        response.getWriter().println(PageGenerator.getPage("authresponse.txt", pageVariables));
    }
}
