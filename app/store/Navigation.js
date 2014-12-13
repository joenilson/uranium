Ext.define('Uranium.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    model: 'Uranium.model.Navigation',
    autoLoad: true,
    storeId: 'navigation',
    textRoot: 'Start',

    /*
    initComponent: function(){
        var me = this;
        root= {
            text: this.textRoot,
            id: 'all',
            expanded: true
        };
        this.callParent();
    },
    */

    constructor: function (config) {
        var me = this;
        me.callParent([Ext.apply({
            proxy: {
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                paramsAsJson: true,
                extraParams: {
                    controller: 'Menu',
                    method: 'getall',
                    params: {
                        component: 'treestore',
                        id: localStorage.getItem("userId"),
                        locale: localStorage.getItem("user_lang")
                    }
                },
                type: 'ajax',
                url: '/api2/lib/Menu',
                reader: {
                    type: 'json'
                }
            },
            root: {
                text: this.textRoot,
                id: 'all',
                expanded: true
            }
        }, config)]);
    },

    folderSort: false
});
