Ext.define("Uranium.view.login.LoginForm",{
    extend: 'Ext.form.Panel',
    xtype: 'loginform',

    usernameField: 'Username',
    passwordField: 'Password',
    loginButton: 'Login',
    warningText: 'Enter any non-blank password',

    requires: [
        'Uranium.view.login.LoginController',
        'Ext.form.Panel',
        'Ext.form.action.DirectLoad',
        'Ext.form.action.DirectSubmit'
    ],

    controller: 'login',

    url: '/api2/lib/Authentication',
    jsonSubmit: true,
    baseParams: {
        controller: 'Authentication',
        method: 'passwd'
    },
    initComponent: function() {
        this.alias = 'widget.loginForm';
        this.items = [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: this.usernameField,
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: this.passwordField,
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: this.warningText
        }];
        this.buttons = [{
            text: this.loginButton,
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }];
        this.callParent();
    }

});
