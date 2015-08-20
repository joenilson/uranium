Ext.define('Uranium.model.Customers', {
    extend: 'Uranium.model.Base',
    fields: [{
        name: 'id'
    }, {
        name: 'real_name'
    }, {
        name: 'legal_name'
    }, {
        name: 'nif'
    }, {
        name: 'description'
    },{
        name: 'id_position'
    }, {
        name: 'position'
    }, {
        name: 'id_organization'
    }, {
        name: 'organization'
    }, {
        name: 'work'
    },{
        name: 'punctuality',
        mapping: 'summary.punctuality'
    },{
        name: 'appearance',
        mapping: 'summary.appearance'
    },{
        name: 'visit_customers',
        mapping: 'summary.visit_customers'
    },{
        name: 'posters',
        mapping: 'summary.posters'
    },{
        name: 'product_expired',
        mapping: 'summary.product_expired'
    },{
        name: 'wrong_order',
        mapping: 'summary.wrong_order'
    },{
        name: 'contaminated',
        mapping: 'summary.contaminated_fridge'
    }],
    idField: 'id',
    idProperty: 'id'

});
