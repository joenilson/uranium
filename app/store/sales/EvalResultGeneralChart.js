Ext.define('Uranium.store.sales.EvalResultGeneralChart', {
    extend: 'Ext.data.Store',
    storeId: 'salesEvalResultGeneralChart',
    model: 'Uranium.model.sales.EvalDailyResults',
    proxy: {
        
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        
        paramsAsJson: true,
        type: 'ajax',
        url: '/api2/sap/Employee',
        extraParams: {
            controller: 'sap/hcm/Employee',
            /*method: 'hierarchy_w_parents_tree'*/
            method: 'hierarchy_override'
        },
        
        reader: {
            type: 'json',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
