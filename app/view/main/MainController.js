/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Uranium.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.state.CookieProvider',
        'Ext.MessageBox',
        'Ext.tip.QuickTipManager',
        'Uranium.store.Navigation'
    ],

    alias: 'controller.main',

    logoutTitle: 'Confirm',
    logoutMessage: 'Are you sure?',

    onClickButton: function () {
        Ext.Msg.confirm(this.logoutTitle, this.logoutMessage, 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            // Remove the localStorage key/value
            localStorage.removeItem('LoggedIn');
            // Remove Main View
            this.getView().destroy();
            // Add the Login Window
            Ext.widget('login');
        }
    },

    applyState: function(state) {
        var refs = this.getReferences();

        if (state.hasTreeNav) {
            this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            }, refs.contentPanel);

            refs.breadcrumb.hide();
            refs.contentPanel.header.hidden = false;
            this._hasTreeNav = true;
        } else {
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },

    showBreadcrumbNav: function() {
        var refs = this.getReferences(),
            breadcrumbNav = refs.breadcrumb,
            treeNav = refs.tree,
            selection = treeNav.getSelectionModel().getSelection()[0];

        if (breadcrumbNav) {
            breadcrumbNav.show();
        } else {
            refs.contentPanel.addDocked({
                xtype: 'navigation-breadcrumb',
                selection: selection
            });
        }
        refs['breadcrumb.toolbar'].setSelection(selection || 'root');
        treeNav.hide();
        refs.contentPanel.getHeader().hide();

        this._hasTreeNav = false;
        this.getView().saveState();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            breadcrumbNav = refs.breadcrumb,
            selection = refs['breadcrumb.toolbar'].getSelection();
        if (treeNav) {
            treeNav.show();
        } else {
            treeNav = this.getView().moveBefore({
                region: 'west',
                reference: 'tree',
                xtype: 'navigation-tree'
            }, refs.contentPanel);
        }
        if (selection) {
            treeNav.getSelectionModel().select([
                selection
            ]);

            breadcrumbNav.hide();
            refs.contentPanel.getHeader().show();

            this._hasTreeNav = true;
            this.getView().saveState();
        }
    },

    init: function(){
        var me = this;
        loggedIn = localStorage.getItem("LoggedIn");
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    }
});
