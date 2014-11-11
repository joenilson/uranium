Ext.define('Uranium.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    onLoginClick: function (button, event, action) {
        var me = this;
        var panel = button.up('panel');
        var loginWindow = panel.up('panel');
        var form = button.up('panel').getForm();
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    if (obj.success === true) {
                        // Set the localStorage value to true
                        localStorage.setItem("LoggedIn", true);
                        // Remove Login Window
                        loginWindow.destroy();
                        // Add the main view to the viewport
                        Ext.widget('app-main');
                    } else {
                        alert('login failed');
                    }
                },
                failure: function (form, action) {
                    console.log('server-side failure with status code ' + action.response.status);
                    if (action.response.status === 404) {
                        Ext.Msg.alert('Warning', 'Backend is not online<br \>Please contact your Systems Admin');
                        Ext.Msg.show({
                            title: 'Warning',
                            message: 'Backend is not online<br \>Please contact your Systems Admin',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    }
                }
            });

        }
    }
})
