package main;

import Users.AccountService;
import admin.AdminPageServlet;
import dao.PlayerDao;
import frontend.*;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import table.Player;

import javax.servlet.Servlet;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        int port = 8000;
        if (args.length == 1) {
            String portString = args[0];
            port = Integer.valueOf(portString);
        }

        System.out.append("Starting at port: ").append(String.valueOf(port)).append('\n');

        Server server = new Server(port);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);

        AccountService accountService = new AccountService();
//        Factory factory = Factory.getInstance();
//        PlayerDao playerDao = factory.getPlayerDao();
//        List<Player> players = playerDao.getPlayers();
//
//        System.out.println("id login pass");
//
//        for(Player player : players) {
//            System.out.println(player.getId() + " " + player.getLogin() + " " + player.getPass());
//        }


        Servlet login = new LoginServlet(accountService);
        context.addServlet(new ServletHolder(login), "/api/v1/auth/signin");
        Servlet signUp = new SignUpServlet(accountService);
        context.addServlet(new ServletHolder(signUp), "/api/v1/auth/signup");
        Servlet logout = new LogoutServlet(accountService);
        context.addServlet(new ServletHolder(logout), "/api/v1/auth/logout");
        Servlet admin = new AdminPageServlet();
        context.addServlet(new ServletHolder(admin), "/admin");

        Servlet score = new ScoreServlet();
        context.addServlet(new ServletHolder(score), "/api/v1/score");


        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setResourceBase("public_html");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[]{resource_handler, context});
        server.setHandler(handlers);

        server.start();
        server.join();
    }
}