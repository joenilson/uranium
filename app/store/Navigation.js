Ext.define('Uranium.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    model: 'Uranium.model.Navigation',
    autoLoad: false,
    storeId: 'navigation',
    textRoot: 'Start',

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
                        locale: localStorage.getItem("user_lang"),
                        system: localStorage.getItem("systemId")
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
