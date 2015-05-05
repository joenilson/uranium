Ext.define('Uranium.store.Systems', {
    extend: 'Ext.data.Store',
    alias: 'store.systems',
    model: 'Uranium.model.Systems',
    autoLoad: true,
    storeId: 'systems',

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
                    controller: 'Commons',
                    method: 'getsystems',
                    params: {
                        id: localStorage.getItem("userId")
                    }
                },
                type: 'ajax',
                url: '/api2/lib/Commons',
                reader: {
                    type: 'json',
                    rootProperty: 'data.object'
                }
            }
        }, config)]);
    }
});
