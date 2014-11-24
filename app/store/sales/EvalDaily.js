Ext.define('Uranium.store.sales.EvalDaily', {
    extend: 'Ext.data.Store',

    model: 'Uranium.model.sales.EvalDaily',

    groupField: 'position',
    /*
    params: {
            eid: 10002199
        },
    */
    proxy: {
        type: 'ajax',
        //limitParam: null,
        //url: '/api/sales/evaldaily',
        url: '/api/sapconnector/empleado',
        extraParams: {
            eid: 10001925
        },
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
