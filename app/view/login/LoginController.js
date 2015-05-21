Ext.define('Uranium.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    onLoginClick: function (button, event, action) {
        var me = this;
        var panel = button.up('panel');
        var loginWindow = panel.up('panel');
        var form = button.up('panel').getForm();
        if (form.isValid()) {
            var dataForm = form.getValues();
            form.submit({
                params: {
                    params: {
                        //system: "1000",
                        username: dataForm.username,
                        password: dataForm.password
                    }
                },
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    if (obj.success === true) {
                        // Set the localStorage value to true
                        localStorage.setItem("LoggedIn", true);
                        localStorage.setItem("employeeId", obj.data.object.id);
                        localStorage.setItem("userId", obj.data.object.id);
                        localStorage.setItem("username", obj.data.object.username);
                        localStorage.setItem("user_lang", obj.data.object.user_lang);
                        localStorage.setItem("employeeFN", obj.data.message);
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
                    if (action.response.status === 404 || action.response.status === 503) {
                        //Ext.Msg.alert('Warning', 'Backend is not online<br>Please contact your Systems Admin');
                        Ext.Msg.show({
                            title: 'Warning',
                            message: 'Backend is not online<br>Please contact your Systems Admin',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    }else if(action.response.status === 200 ){
                        //Ext.Msg.alert('Warning', 'Wrong credentials');
                        Ext.Msg.show({
                            title: 'Warning',
                            message: 'Wrong credentials.<br>Credenciales no validas.<br>informations d\'identification incorrectes.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    }
                }
            });

        }
    }
});
