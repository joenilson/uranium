/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('Uranium.view.sales.eval.result', {
    extend: 'Ext.Panel',
    xtype: 'sales-eval-result',

    requires: [
        'Ext.draw.Color',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Scatter',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.*',
        'Uranium.store.sales.EvalResultGeneralChart'
    ],

    layout: 'fit',

    width: 650,
    textTitle: 'Evaluation Results Graph',
    textToolAdd: 'First Eval',
    textToolEval: 'Survey',
    textToolClose: 'Close Window',

    textId: 'Id',
    textName: 'Name',
    textRating: 'Rating',
    textHierachy: 'Hierachy',
    textDate: 'Last Eval Date',
    textPunctuality: 'Punctuality',
    textAppearance: 'Appearance',
    textVisitCustomers: 'Visit<br>Customers',
    textPosters: 'Placing<br>Posters',
    textProductExpired: 'Product<br>Expired',
    textWrongOrder: 'Wrong<br>Order',
    textContaminated: 'Contaminated<br>Fridge',
    textSales: 'AVG Sales',
    titleEval: 'Evaluation of: ',
    titleFirstEval: 'First Evaluation',
    titleSurvey: 'Survey',

    buttonViewDetails: 'View Evaluations Details',
    buttonFirstEval: 'Add First Eval',
    buttonRouteEvals: 'Add Route Evals',
    buttonRefresh: 'Refresh List',
    buttonAssign: 'Assign Employee',
    buttonRemove: 'Remove Assignment',
    buttonExport: 'Export to Excel',
    textAlertTitle: 'No selection',
    textAlertMsg: 'Please select one employee to process...',

    textActionTitleAdd: 'Assign Employee',
    textActionTitleDel: 'Remove Assignment',
    textActionMsgAdd: 'Do you want to assign this employee to you?',
    textActionMsgDel: 'Do you want to remove the employee assignment?',
    
    textLoadingMask: 'Loading, please wait...',
    textAjaxFailure: 'Please try again, the server was busy...',

    initComponent: function(){
        var me  = this;
        this.title = this.textTitle;
        me.tbar = ['->',{
            xtype: 'monthfield',
            format: 'F, Y',
            submitFormat: 'm-Y',
            name: 'date_eval',
            width: 150,
            id: 'date-eval'
        }, {
            text: me.buttonRefresh,
            iconCls: 'button-refresh',
            scope: this,
            name: 'refresh',
            handler: function(){
                me.callStore();
            }
        }, {
            text: me.buttonViewDetails,
            iconCls: 'button-view-list',
            scope: this,
            handler: me.viewDetails
        }, {
            text: me.buttonExport,
            iconCls: 'button-save',
            scope: this,
            handler: function(b, e) {
                console.log(b);
            }
        }];
    
        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
            store: Ext.create('Uranium.store.sales.EvalResultGeneralChart'),
            insetPadding: 40,
            interactions: [
                {
                    type: 'panzoom',
                    zoomOnPanGesture: true
                },
                'itemhighlight'
            ],
            axes: [{
                type: 'numeric',
                position: 'bottom',
                fields: ['average'],
                grid: true
            }, {
                type: 'numeric',
                position: 'left',
                fields: ['average'],
                grid: true
            }],
            series: [{
                type: 'scatter',
                xField: 'average',
                yField: 'average',
                marker: {
                    radius: 4
                },
                highlight: {
                    fillStyle: 'yellow',
                    radius: 7,
                    lineWidth: 2
                },
                label: {
                    field: 'average',
                    display: 'over',
                    renderer: function(text, label, labelCfg, data, index) {
                        var record = data.store.getAt(index);
                        return record.get('name') + ',' + record.get('average');
                    }
                }
            }]
        }];
    
    
        this.callParent();
        
        var panzoom = this.down('cartesian').getInteractions()[0];
        this.down('toolbar').add(panzoom.getModeToggleButton());
        
    },
    
    callStore: function(){
        var me = this;
        var datePicker = Ext.getCmp('date-eval');
        var values = datePicker.getSubmitData().date_eval.split('-');

        var store = me.down('cartesian').getStore();  
        store.load({params: {
                params: {
                    system: localStorage.getItem('systemId'),
                    locale: localStorage.getItem('user_lang'),
                    pernr: localStorage.getItem('employeeId'),
                    month: values[0],
                    year: values[1]
                }
            }
        });
    }

});
