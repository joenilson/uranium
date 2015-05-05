Ext.define('Uranium.model.sales.EvalDailyResults', {
    extend: 'Uranium.model.Base',
    fields: [{
        name: 'employeeNo'
    }, {
        name: 'rating'
    }, {
        name: 'firstname'
    }, {
        name: 'surname'
    }, {
        name: 'lastname'
    }, {
        name: 'name',
        convert: function(v, rec) {
            return rec.editing ? v : rec.get('firstname') + ' ' + rec.get('surname')+ ' ' + rec.get('lastname');
        }
    }, {
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
    idField: 'employeeNo',
    idProperty: 'employeeNo',

    // Override set to update dependent fields
    set: function(data, value) {
        var dataObj;

        // Convert 2 arg form to object form
        if (Ext.isString(data)) {
            dataObj = {};
            dataObj[data] = value;
            data = dataObj;
        }

        // "name" is a calculated field, so update it on edit of "forename" or "surname".
        if (data.firstname || data.surname || data.lastname) {
            data.name = (data.firstname || this.get('firstname')) + ' ' + (data.surname || this.get('surname')) + ' ' + (data.lastname || this.get('lastname'));
        }
        // Likewise, update two name fields if whole name gets updated
        else if (data.name) {
            var names = this.convertName(data.name);
            data.firstname = names[0];
            data.surname = names[1];
            data.lastname = names[2];
        }
        return this.callParent([data]);
    },

    convertName: function(name) {
        var names = /([^\s+]+)(?:\s+(.*))?/.exec(name);
        return names ? [names[0], names[1], names[2]||''] : ['', ''];
    }
});
