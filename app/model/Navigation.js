Ext.define('Uranium.model.Navigation', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'path',
        type: 'string'
    }, {
        name: 'leaf',
        type: 'boolean'
    }, {
        name: 'description',
        type: 'string'
    },{
        name: 'expanded',
        type: 'boolean'
    },{
        name: 'children',
        type: 'auto'
    }]
});
