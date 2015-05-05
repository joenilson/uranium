Ext.define('Uranium.store.sales.EvalResult', {
    extend: 'Ext.data.Store',
    storeId: 'salesEvalResult',
    model: 'Uranium.model.sales.EvalDaily',

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
            method: 'hierarchy_override'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
