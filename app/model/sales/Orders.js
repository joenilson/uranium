Ext.define('Uranium.model.sales.Orders', {
    extend: 'Uranium.model.Base',
    fields: [{
        name: '_id'
    }, {
        name: 'employeeId'
    }, {
        name: 'customerId'
    },{
        name: 'rating'
    }, {
        name: 'eval_date'
    }, {
        name: 'type_survey'
    }, {
        name: 'punctuality'
    }, {
        name: 'appearance'
    }, {
        name: 'visit_customers'
    }, {
        name: 'posters'
    }, {
        name: 'product_expired'
    }, {
        name: 'wrong_order'
    }, {
        name: 'contaminated_fridge'
    }],
    idProperty: '_id'
});
