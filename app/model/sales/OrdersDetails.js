Ext.define('Uranium.model.sales.OrdersDetails', {
    extend: 'Uranium.model.Base',
    fields: [{
        name: 'id',
        convert: function(value, record) {
            var newValue;
            var valCode = record.get('code');
            var valType = record.get('type');
            var newValue = valCode+'-'+valType;
            return newValue;
        }
    }, {
        name: 'code',
        type: 'int'
    }, {
        name: 'product',
        type: 'string'
    }, {
        name: 'quantity',
        type: 'float'
    },{
        name: 'weight',
        type: 'float'
    }, {
        name: 'type',
        type: 'string'
    }, {
        name: 'amount',
        type: 'float'
    }],
    idProperty: 'id'
});
