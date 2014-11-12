/**
 * This is an example of using the ExtJS grid to show very large datasets
 * without overloading the DOM. It also uses locking columns, and incorporates the
 * GroupSummary feature. Filtering is enabled on certain columns using the FilterFeature.
 *
 * As an illustration of the ability of grid columns to act as containers, the Title
 * column has a filter text field built in which filters as you type.
 *
 * The grid is editable using the RowEditing plugin.
 *
 * The `multiColumnSort` config is used to allow multiple columns to have sorters.
 */
Ext.define('Uranium.view.grid.sales.EvalDaily', {
    extend: 'Ext.grid.Panel',
    requires: 'Ext.grid.filters.Filters',
    xtype: 'grid-sales-evaldaily',
    store: 'sales.EvalDaily',
    columnLines: true,

    //autoHeight: true,
    width: '100%',

    //layout: 'fit',
    //flex: 1,
    textTitle: 'Daily Evaluation',
    multiColumnSort: true,
    controller: 'eval',

    features: [{
        ftype : 'groupingsummary',
        groupHeaderTpl : '{name}',
        hideGroupedHeader : false,
        enableGroupingMenu : false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],

    selType: 'checkboxmodel',

    viewConfig: {
        stripeRows: true
    },

    plugins: [{
        ptype: 'gridfilters'
    }],

    textDateBirth: 'Date of birth',
    textDateJoin: 'Join date',
    textNoticePeriod: 'Notice<br>period',
    textEmailAddress: 'Email address',
    textDepartment: 'Department',
    textAbsences: 'Absences',
    textIllness: 'Illness',
    textHolidays: 'Holidays',
    textHoldayAllowance: 'Holday Allowance',

    textToolAdd: 'First Eval',
    textToolEval: 'Survey',
    textToolClose: 'Close Window',

    textId: 'Id',
    textName: 'Name (Filter)',
    textRating: 'Rating',
    textHierachy: 'Hierachy',
    textDate: 'Eval Date',
    textPunctuality: 'Punctuality',
    textAppearance:'Appearance',
    textVisitCustomers: 'Visit<br>Customers',
    textPosters: 'Placing<br>Posters',
    textProductExpired: 'Product<br>Expired',
    textWrongOrder: 'Wrong<br>Order',
    textContaminated: 'Contaminated<br>Fridge',
    textSales: 'AVG Sales',

    titleFirstEval: 'First Evaluation',
    titleSurvey: 'Survey',

    initComponent: function()
    {
        var me = this;
        this.title = this.textTitle;

        this.tools = [
        {
            type: 'plus',
            scope: this,
            tooltip: this.textToolAdd,
            name: 'first',
            handler: this.createEval
        },{
            type: 'eval',
            scope: this,
            tooltip: this.textToolEval,
            name: 'eval',
            handler: this.createEval
        },{
            type: 'close',
            scope: this,
            tooltip: this.textToolClose,
            handler: function(){
                me.destroy();
            }
        }];

        this.columns = [{
            xtype: 'rownumberer',
            width: 40,
            sortable: false,
            locked: true
        }, {
            text: this.textId,
            sortable: true,
            dataIndex: 'employeeNo',
            groupable: false,
            width: 80,
            locked: true,
            editRenderer: 'bold'
        }, {
            text: this.textName,
            sortable: true,
            dataIndex: 'name',
            groupable: false,
            width: 140,
            layout: 'hbox',
            locked: true,
            renderer: 'concatNames',
            editor: {
                xtype: 'textfield'
            },
            items    : {
                xtype: 'textfield',
                reference: 'nameFilterField',  // So that the Controller can access it easily
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onNameFilterKeyup',
                    buffer: 500
                }
            }
        }, {
            text: this.textRating,
            width: 100,
            sortable: true,
            dataIndex: 'rating',
            groupable: false,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'sparklineline'
            }
        },
        {
            text: this.textDate,
            dataIndex: 'eval_date',
            xtype: 'datecolumn',
            groupable: false,
            width: 120,
            filter: {

            },
            editor: {
                xtype: 'datefield'
            }
        }, {
            text: this.textPunctuality,
            dataIndex: 'punctuality',
            groupable: false,
            width: 115
        }, {
            text: this.textAppearance,
            dataIndex: 'appearance',
            width: 200,
            groupable: false
        }, {
            text: this.textVisitCustomers,
            dataIndex: 'visit_customers',
            width: 200,
            groupable: false
        }, {
            text: this.textPosters,
            dataIndex: 'posters',
            width: 200,
            groupable: false
        }, {
            text: this.textProductExpired,
            dataIndex: 'product_expired',
            width: 200,
            groupable: false
        }, {
            text: this.textWrongOrder,
            dataIndex: 'wrong_order',
            width: 200,
            groupable: false
        }, {
            text: this.textContaminated,
            dataIndex: 'contaminated',
            width: 200,
            groupable: false
        }, {
            text: this.textHierachy,
            dataIndex: 'hierachy',
            hidden: true,
            hideable: false,
            filter: {
                type: 'list'
            }
        }, {
            text: this.textSales,
            width: 155,
            sortable: true,
            dataIndex: 'avg_sales',
            align: 'right',
            groupable: false,
            summaryType: 'average',
            filter: {

            },
            editor: {
                xtype: 'numberfield',
                decimalPrecision: 2
            }
        }];
        this.callParent();
    },

    createWindow: function(){
        var window = Ext.create('Ext.window.Window',{
            height: 300,
            width: 400,
            autoScroll: true,
            bodyPadding: 10,
            //constrain: true,
            closable: true
        });
        return window;
    },

    createEval: function(event, item, header, button) {
        var win = this.createWindow();
        var actionName = button.name;
        var content;
        console.log(actionName);
        if(actionName === 'first'){
            win.setTitle(this.titleFirstEval);
            content = Ext.create('Uranium.view.sales.eval.FirstEvaluation');
        }else{
            win.setTitle(this.titleSurvey);
            content = Ext.create('Uranium.view.sales.eval.Survey');
        }
        win.add(content);
        win.show();
    }

});
