package dao.impl;

import dao.PlayerDao;
import table.Player;
import org.hibernate.Session;
import util.HibernateUtil;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by Андрей on 21.09.2014.
 */
public class PlayerDaoImpl implements PlayerDao {
    @Override
    public void addPlayer(Player player) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();
            session.save(player);
            session.getTransaction().commit();
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if((session != null) && session.isOpen())session.close();
        }
    }

    @Override
    public void deletePlayer(Player player) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();
            session.delete(player);
            session.getTransaction().commit();
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if((session != null) && session.isOpen())session.close();
        }
    }

    @Override
    public Player getPlayer(int id) throws SQLException {
        Player result = null;

        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            result = (Player) session.load(Player.class, id);
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if((session != null) && session.isOpen())session.close();
        }
        return result;
    }

    @Override
    public List<Player> getPlayers() throws SQLException {
        List<Player> players = null;

        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            players = session.createCriteria(Player.class).list();
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if((session != null) && session.isOpen())session.close();
        }
        return null;
    }
}
