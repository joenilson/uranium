Ext.define("Uranium.view.login.Login",{
    extend: 'Ext.window.Window',
    xtype: 'login',


    requires: [
        'Uranium.view.login.LoginController',
        'Uranium.view.login.LoginForm'
    ],

    controller: 'login',
    bodyPadding: 10,
    titleText: 'Login Window',
    closable: false,
    autoShow: true,

    initComponent: function() {
        this.title = this.titleText;
        this.items = [{
            xtype: 'loginform'
        }];
        this.callParent();
    }

});
