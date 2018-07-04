
import { Component } from '@angular/core';

@Component({})
export class Config {
    static socketurl = "http://51.15.139.27:8080/";
    // static socketurl = "http://192.168.2.172:8080/";

    static providerurl = "http://datingapp.bizdevtrade.com/";
    // static providerurl = "http://192.168.2.172:3000/";



    // for video
    // public static server = 'https://tranquil-refuge-43804.herokuapp.com/';
    public static server = 'http://51.15.139.27:1337/';
    // public static server = 'http://192.168.2.172:1337/';

    // enables or disables chat sounds. usefull for development
    public static audio = true;

    // STUN/TURN ice servers for connection negotiation
    public static ice = [
        {
            urls: 'stun:stun.l.google.com:19302'
        }, {
            urls: 'stun:stun.services.mozilla.com'
        }, {
            urls: 'stun:numb.viagenie.ca',
            //username: 'minami',
            //credential: 'zero1127'
            username: 'yuriupwork@gmail.com',

            credential: 'jupiter12345'
        }, {
            urls: 'turn:numb.viagenie.ca',
            //username: 'minami',
            //credential: 'zero1127'
            
            username: 'yuriupwork@gmail.com',

            credential: 'jupiter12345'
        }
    ];
    // if we allow attachments or not.
    // be sure to configure your AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and S3_BUCKET in the server config
    public static attachments = true;

    // whether or enable markdown parsing client side
    public static markdown = true;

}

