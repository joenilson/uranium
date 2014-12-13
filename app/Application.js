/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.define('Uranium.Application', {
    extend: 'Ext.app.Application',

    name: 'Uranium',

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'Uranium.view.login.Login',
        'Uranium.view.main.Main'
    ],

    controllers: [

        'Menu',

        'Sales'
    ],

    glyphFontFamily: 'entypo',

    launch: function () {
        // Check whether the browser supports LocalStorage
        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var me = this;
        var supportsLocalStorage = Ext.supports.LocalStorage,
            loggedIn;

        // other stuff

        if (!supportsLocalStorage) {
            // Alert the user if the browser does not support localStorage
            Ext.Msg.alert('Your Browser Does Not Support Local Storage');
            return;
        }

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("LoggedIn");
        me.setDefaultToken('all');
        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view


        Ext.widget(loggedIn ? 'app-main' : 'login');
    }
});
