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
            sprites: [{
                type: 'text',
                text: 'Scatter Charts - Basic',
                fontSize: 22,
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
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
        
    },
    
    callStore: function(){
        var me = this;
        var datePicker = Ext.getCmp('date-eval');
        var values = datePicker.getSubmitData().date_eval.split('-');

        //me.mask(me.textLoadingMask);
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
            /*
        Ext.Ajax.request({
            url: '/api2/sap/Employee',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            jsonData: {
                controller: 'sap/hcm/Employee',
                method: ' hierarchy_w_parents_tree',
                params: {
                    system: localStorage.getItem('systemId'),
                    locale: localStorage.getItem('user_lang'),
                    pernr: localStorage.getItem('employeeId'),
                    month: values[0],
                    year: values[1]
                }
            },

            scope: this,
            success: function(responseData){
                me.unmask();
                var store = me.down('cartesian').getStore();            
                store.removeAll();
                // Parse AJAX response to get store structure
                var ajaxData = Ext.JSON.decode(responseData.responseText);                        
                var storeData = ajaxData.data.object;
                
                store.setData(storeData);
            },
            failure: function(error){
                me.unmask();
                Ext.Msg.alert(me.textAjaxFailure);
            }
        }, me);
        */
    }
    /*
    constructor: function(config) {
        this.callParent(arguments);
        this.down('cartesian').getStore().setData(createData(50));

        fromHSL = Ext.draw.Color.fly('blue').getHSL();
        toHSL = Ext.draw.Color.fly('red').getHSL();
        fromHSL[2] = 0.3;
    }
    */
});

var fromHSL, toHSL, seed = 1.3;

// Controllable random.
function random() {
    seed *= 7.3;
    seed -= Math.floor(seed);
    return seed;
}

function createData(count, allNull) {
    var data = [],
        record = allNull ?
        {
            'id': randomBetween(0,100),
            'g0': randomBetween(0,100),
            'g1': randomBetween(0,100),
            'g2': randomBetween(0,100),
            'g3': randomBetween(0,100),
            'name': 'Item-0'
        } : {
            'id': randomBetween(0,100),
            'g0': randomBetween(0,100),
            'g1': randomBetween(0,100),
            'g2': randomBetween(0,100),
            'g3': randomBetween(0,100),
            'name': 'Item-0'
        },
        i;

    data.push(record);
    for (i = 1; i < count; i++) {
        record = allNull ?
        {
            'id': randomBetween(-100,100),
            'g0': randomBetween(-100,100),
            'g1': randomBetween(-100,100),
            'g2': randomBetween(-100,100),
            'g3': randomBetween(-100,100)
        } : {
            'id': i,
            'g0': randomBetween(-100,100),
            'g1': randomBetween(-100,100),
            'g2': randomBetween(-100,100),
            'g3': randomBetween(-100,100)
        };
        data.push(record);
    }
    return data;
}

function interpolate(lambda, minSrc, maxSrc, minDst, maxDst) {
    return minDst + (maxDst - minDst) * Math.max(0, Math.min(1, (lambda - minSrc) / (maxSrc - minSrc)));
}

function interpolateColor(lambda, minSrc, maxSrc) {
    return Ext.draw.Color.fly(0, 0, 0, 0).setHSL(
        interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
        interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
        interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
    ).toString();
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
    /*
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
    */
}
