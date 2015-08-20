Ext.define('Uranium.store.Customers', {
    extend: 'Ext.data.Store',
    storeId: 'Customers',
    model: 'Uranium.model.Customers',
    valueCustomer: [],
    typeCustomer: [],
    proxy: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        paramsAsJson: true,
        type: 'ajax',
        url: '/api2/Customers',
        extraParams: {
            controller: 'Customers',
            method: 'advanced_list'            
        },
        reader: {
            type: 'json',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
