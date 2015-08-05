Ext.define('Uranium.store.sales.EvalResultGeneral', {
    extend: 'Ext.data.TreeStore',
    storeId: 'salesEvalResultGeneral',
    model: 'Uranium.model.sales.EvalDailyResults',

    //groupField: 'position',
    proxy: {
        paramsAsJson: true,
        type: 'ajax',
        url: '/api2/sap/Employee',
        extraParams: {
            controller: 'sap/hcm/Employee',
            method: 'hierarchy_w_parents_tree'
        },
        reader: {
            type: 'json',
            root: 'data',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
