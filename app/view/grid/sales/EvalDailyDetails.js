Ext.define('Uranium.view.grid.sales.EvalDailyDetails', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.filters.Filters',
        'Uranium.view.main.MainModel',
        'Uranium.store.sales.EvalDailyDetails'
    ],
    xtype: 'grid-sales-evaldailydetails',

    titleFirstEval: 'First Evaluation',
    titleSurvey: 'Survey',

    buttonRemoveEval: 'Remove Eval',
    buttonFirstEval: 'Add First Eval',
    buttonRouteEvals: 'Add Route Evals',

    textAlertTitle: 'No selection',
    textAlertMsg: 'Please select one employee to evaluate...',

    textId: 'Id',
    textSurveyType: 'Type Survey',
    textRating: 'Rating',
    textDate: 'Eval Date',
    textPunctuality: 'Punctuality',
    textAppearance:'Appearance',
    textVisitCustomers: 'Visit<br>Customers',
    textPosters: 'Placing<br>Posters',
    textProductExpired: 'Product<br>Expired',
    textWrongOrder: 'Wrong<br>Order',
    textContaminated: 'Contaminated<br>Fridge',
    buttonRefresh: 'Refresh List',
    columnLines: true,
    viewModel: {
        type: 'main'
    },

    selType: 'checkboxmodel',

    viewConfig: {
        stripeRows: true
    },

    plugins: [{
        ptype: 'gridfilters'
    }],
     features: [{
        ftype : 'groupingsummary',
        groupHeaderTpl : '{name}',
        hideGroupedHeader : false,
        enableGroupingMenu : false
    }],
    width: '100%',
    layout: 'border',
    employeeId: null,
    employeeName: '',
    multiColumnSort: true,
    flex: 1,
    initComponent: function(){
        var me = this;
        this.tbar = ['->', {
            text: this.buttonRefresh,
            iconCls: 'button-refresh',
            scope: this,
            name: 'refresh',
            handler: function(){
                me.getStore().reload();
            }
        }, {
            text: this.buttonRemoveEval,
            iconCls: 'button-remove',
            scope: this,
            handler: this.removeEval
        }, {
            text: this.buttonFirstEval,
            iconCls: 'button-add',
            scope: this,
            name: 'first',
            handler: this.createEval
        }, {
            text: this.buttonRouteEvals,
            iconCls: 'button-form-add',
            scope: this,
            name: 'eval',
            handler: this.createEval
        }];

        this.columns = [{
            xtype: 'rownumberer',
            width: 40,
            sortable: false,
            locked: true
        }, {
            text: this.textId,
            sortable: true,
            dataIndex: 'employeeId',
            groupable: false,
            width: 80,
            hidden: true
        }, {
            text: this.textId,
            sortable: true,
            dataIndex: '_id',
            groupable: false,
            width: 80,
            hidden: true
        },
        {
            text: this.textDate,
            dataIndex: 'eval_date',
            //xtype: 'datecolumn',
            locked: true,
            groupable: false,
            width: 120,
            filter: {

            }
        }, {
            text: this.textPunctuality,
            dataIndex: 'punctuality',
            groupable: false,
            width: 100
        }, {
            text: this.textAppearance,
            dataIndex: 'appearance',
            width: 100,
            groupable: false
        }, {
            text: this.textVisitCustomers,
            dataIndex: 'visit_customers',
            width: 100,
            groupable: false
        }, {
            text: this.textPosters,
            dataIndex: 'posters',
            width: 100,
            groupable: false
        }, {
            text: this.textProductExpired,
            dataIndex: 'product_expired',
            width: 100,
            groupable: false
        }, {
            text: this.textWrongOrder,
            dataIndex: 'wrong_order',
            width: 100,
            groupable: false
        }, {
            text: this.textContaminated,
            dataIndex: 'contaminated_fridge',
            width: 100,
            groupable: false
        }, {
            text: this.textSurveyType,
            dataIndex: 'type_survey',
            hidden: true,
            hideable: false,
            filter: {
                type: 'list'
            }
        }];
        var store = Ext.create('Uranium.store.sales.EvalDailyDetails');
        this.store = store;
        var d = new Date();
        var n = d.getMonth();
        console.log(n);
        store.load({ params: {
                params: {
                    eid: this.employeeId,
                    system: localStorage.getItem('userSystem'),
                    month: (n+1)
                }
            }
        });
        this.callParent();
    },

    createWindow: function(){
        var window = Ext.create('Ext.window.Window',{
            width: 400,
            autoScroll: true,
            closable: true,
            layout: 'fit',
            modal:true
        });
        return window;
    },

    createEval: function(button, event) {
        var me = this;
        var win = this.createWindow();
        var actionName = button.name;
        var content;
        if(actionName === 'first'){
            win.setTitle(this.titleFirstEval+': '+this.employeeName);
            content = Ext.create('Uranium.view.sales.eval.FirstEvaluation', { employeeNo: this.employeeId, gridOrigin: this });
        } else {
            win.setTitle(this.titleSurvey+': '+this.employeeName);
            content = Ext.create('Uranium.view.sales.eval.Survey', { employeeNo: this.employeeId, gridOrigin: this });
        }
        win.add(content);
        win.show();
    }

});
