Ext.define('Uranium.store.sales.EvalResultGeneral', {
    extend: 'Ext.data.Store',
    storeId: 'salesEvalResultGeneral',
    model: 'Uranium.model.sales.EvalDailyResults',

    groupField: 'position',
    proxy: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        paramsAsJson: true,
        type: 'ajax',
        //url: '/api/sapconnector/empleado',
        url: '/api2/sap/Employee',
        extraParams: {
            controller: 'sap/hcm/Employee',
            method: 'hierarchy_w_parents'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
