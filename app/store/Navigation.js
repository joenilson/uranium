Ext.define('Uranium.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    model: 'Uranium.model.Navigation',
    autoLoad: false,
    storeId: 'navigation',
    textRoot: 'Start',
    proxy: {
        type: 'ajax',
        url: '/api/navigation/tree',
        reader: {
            type: 'json'
        }
    },
    constructor: function(config) {
        var me = this;
        me.callParent([Ext.apply({
            root: {
                text: this.textRoot,
                id: 'all',
                expanded: true
            }
        }, config)]);
    },
    folderSort: false
});
