package com.zinidata.util.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnFactorySms {

    private String DRIVER = "com.mysql.jdbc.Driver";
    private String URL = "jdbc:mysql://10.81.190.121:3306/cmapt";
    private String USER = "cmapap";
    private String PASSWORD = "nice1234";

    public Connection createConnection() throws SQLException{
        Connection con = null;

        try{
            Class.forName(DRIVER);
            con = DriverManager.getConnection(URL, USER, PASSWORD);
        }catch(Exception e){
            e.printStackTrace();
        }

        return con;
    }
}
