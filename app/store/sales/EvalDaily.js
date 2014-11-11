Ext.define('Uranium.store.sales.EvalDaily', {
    extend: 'Ext.data.Store',

    model: 'Uranium.model.sales.EvalDaily',

    groupField: 'department',

    proxy: {
        type: 'ajax',
        limitParam: null,
        url: '/api/sales/evaldaily',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
