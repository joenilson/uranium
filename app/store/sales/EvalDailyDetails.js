Ext.define('Uranium.store.sales.EvalDailyDetails', {
    extend: 'Ext.data.Store',

    model: 'Uranium.model.sales.EvalDailyDetails',

    groupField: 'type_survey',
    proxy: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        paramsAsJson: true,
        type: 'ajax',
        //url: '/api/sales/surveys',
        url: '/api2/lib/sap/hcm/Survey',
        extraParams: {
            controller: 'sap/hcm/Survey',
            method: 'list'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.object'
        }
    },
    autoLoad: false
});
