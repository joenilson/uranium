Ext.define('Uranium.view.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',

    viewModel: {
        type: 'main'
    },
    header: {
        bind: {
            title: {
                text: '{name}',
                flex: 0,
                width: 150
            }
        },
        glyph: 9776
    },
    height: 52,

    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {

        this.items = [{
            xtype: 'component',
            id: 'app-header-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            bind: {
                html: '{name}'
            },
            flex: 1
        }];

        if (!Ext.getCmp('options-toolbar')) {
            this.items.push({
                xtype: 'setttings'
            });
        }

        this.callParent();
    }
});
