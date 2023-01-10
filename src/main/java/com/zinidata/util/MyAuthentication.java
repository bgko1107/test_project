package com.zinidata.util;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MyAuthentication extends Authenticator {
    PasswordAuthentication account;

    public MyAuthentication() {
        String id = "nicebizmap";
        String pw = "2011nice^^";
        this.account = new PasswordAuthentication(id, pw);
    }

    public PasswordAuthentication getPasswordAuthentication() {
        return this.account;
    }
}