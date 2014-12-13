/**
 * The Controller for the BigData view.
 *
 * Provides logic which is referenced by listeners, handlers and renderers in the view which are configured
 * as strings. They are resolved to members of this class.
 *
 */
Ext.define('Uranium.view.sales.SalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesview',

    init: function() {
        // RowEditing not appropriate for touch devices
        /*
        if (!Ext.supports.Touch) {
            // Plugins are instantiated at this time, we must add an instantiated Plugin, not a config
            this.getView().getPlugins().push(Ext.create({
                xclass: 'Ext.grid.plugin.RowEditing',
                clicksToMoveEditor: 1,
                autoCancel: false
            }));
        }
        */
    }
});
