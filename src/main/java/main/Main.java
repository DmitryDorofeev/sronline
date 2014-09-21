package main;

import admin.AdminPageServlet;
import dao.PlayerDao;
import frontend.Frontend;
import frontend.SignUpServlet;
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
        if (args.length != 1) {
            System.out.append("Use port as the first argument");
            System.exit(1);
        }

        String portString = args[0];
        int port = Integer.valueOf(portString);
        System.out.append("Starting at port: ").append(String.valueOf(port)).append('\n');
        ////////////// Это шняга не работает почему-то, не находит конфиг файл :(((
//        Factory factory = Factory.getInstance();
//        PlayerDao playerDao = factory.getPlayerDao();
//
//        List<Player> players = playerDao.getPlayers();
//
//        System.out.println("id  login   pass");
//
//        for(Player player : players) {
//            System.out.println(player.getId() + " " + player.getLogin() + " " + player.getPass());
//        }

        ////////
        Servlet frontend = new Frontend();

        Server server = new Server(port);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.addServlet(new ServletHolder(new AdminPageServlet()), AdminPageServlet.adminPageURL);
        context.addServlet(new ServletHolder(frontend), "/api/v1/auth/signin");
        AccountService accountService = new AccountService();
        Servlet signUp = new SignUpServlet(accountService);
        context.addServlet(new ServletHolder(signUp), "/api/v1/auth/signup");

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