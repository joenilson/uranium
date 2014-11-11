Ext.define('Uranium.view.navigation.Breadcrumb', {
    extend: 'Ext.toolbar.Toolbar',
    id: 'navigation-breadcrumb',
    xtype: 'navigation-breadcrumb',

    config: {
        selection: null
    },

    bcTooltip: 'Switch to Tree View',

    initComponent: function() {
        this.items = [{
            xtype: 'tool',
            type: 'down',
            tooltip: this.bcTooltip,
            listeners: {
                click: 'showTreeNav'
            }
        }, {
            xtype: 'breadcrumb',
            reference: 'toolbar',
            selection: this.getSelection(),
            flex: 1,
            store: Ext.StoreMgr.get('navigation')
        }];
        this.callParent();
        this._breadcrumbBar = this.items.getAt(1);
    },

    updateSelection: function(node) {
        if (this.rendered) {
            this._breadcrumbBar.setSelection(node);
        }
    }
});
