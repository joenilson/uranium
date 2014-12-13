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
    requires: [
        'Ext.grid.filters.Filters',
        'Uranium.view.main.MainModel'
    ],
    xtype: 'grid-sales-evaldaily',
    columnLines: true,
    viewModel: {
        type: 'main'
    },
    width: '100%',

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

    textToolAdd: 'First Eval',
    textToolEval: 'Survey',
    textToolClose: 'Close Window',

    textId: 'Id',
    textName: 'Name (Filter)',
    textRating: 'Rating',
    textHierachy: 'Hierachy',
    textDate: 'Last Eval Date',
    textPunctuality: 'Punctuality',
    textAppearance:'Appearance',
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

    textAlertTitle: 'No selection',
    textAlertMsg: 'Please select one employee to process...',

    textActionTitleAdd: 'Assign Employee',
    textActionTitleDel: 'Remove Assignment',
    textActionMsgAdd: 'Do you want to assign this employee to you?',
    textActionMsgDel: 'Do you want to remove the employee assignment?',

    employeeId: null,

    initComponent: function()
    {
        var me = this;
        this.title = this.textTitle;
        this.tools = [{
            type: 'close',
            scope: this,
            tooltip: this.textToolClose,
            handler: function(){
                me.destroy();
            }
        }];

        this.tbar = ['->', {
            text: this.buttonRefresh,
            iconCls: 'button-refresh',
            scope: this,
            name: 'refresh',
            handler: function(){
                me.getStore().reload();
            }
        }, {
            text: this.buttonAssign,
            iconCls: 'button-add',
            scope: this,
            name: 'add',
            handler: this.processPersonal
        }, {
            text: this.buttonRemove,
            iconCls: 'button-remove',
            scope: this,
            name: 'del',
            handler: this.processPersonal
        }, {
            text: this.buttonViewDetails,
            iconCls: 'button-view-list',
            scope: this,
            handler: this.viewDetails
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
            locked: true
        }, {
            text: this.textName,
            sortable: true,
            dataIndex: 'name',
            groupable: false,
            width: 280,
            layout: 'hbox',
            locked: true
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

            }
        }, {
            text: this.textPunctuality,
            dataIndex: 'punctuality',
            groupable: false,
            width: 100,
            xtype: 'numbercolumn',
            format:'0'
        }, {
            text: this.textAppearance,
            dataIndex: 'appearance',
            width: 100,
            groupable: false,
            xtype: 'numbercolumn',
            format:'0'
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
            dataIndex: 'contaminated',
            width: 100,
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

            }
        }];
        var store = Ext.create('Uranium.store.sales.EvalDaily');
        this.store = store;
        var d = new Date();
        var n = d.getMonth();
        store.load({
            params: {
                params: {
                    system: localStorage.getItem('userSystem'),
                    locale: localStorage.getItem('user_lang'),
                    pernr: localStorage.getItem('employeeId'),
                    month: (n+1)
                }
            }
        });
        this.callParent();
    },

    createWindow: function(){
        var window = Ext.create('Ext.window.Window',{
            //height: 400,
            width: 600,
            autoScroll: true,
            layout: 'fit',
            //bodyPadding: 10,
            modal: true,
            closable: true
        });
        return window;
    },

    processPersonal: function(button, event){
        var actionName = button.name;
        var me = this;
        var gridSel = this.getSelectionModel().getSelection();
         if(gridSel[0] === undefined){
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        }else{
            var records = gridSel[0].getData();
            this.makeTreatment(records.employeeNo, actionName, '0000000');
        }
    },

    createEval: function(button, event) {
        var me = this;
        var win = this.createWindow();
        var actionName = button.name;
        var content;
        var gridSel = this.getSelectionModel().getSelection();
        if(gridSel[0] === undefined){
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        }else{
            win.setHeight(400);
            var records = gridSel[0].getData();
            if(actionName === 'first'){
                win.setTitle(this.titleFirstEval+': '+records.firstname+' '+records.surname);
                content = Ext.create('Uranium.view.sales.eval.FirstEvaluation', { employeeNo: records.employeeNo });
            } else {
                win.setTitle(this.titleSurvey+': '+records.firstname+' '+records.surname);
                content = Ext.create('Uranium.view.sales.eval.Survey', { employeeNo: records.employeeNo });
            }
            win.add(content);
            win.show();
        }
    },

    makeTreatment: function(employee, actionType, parent){
        var me = this;
        Ext.Msg.show({
            title: (actionType === 'add')?this.textActionTitleAdd:this.textActionTitleDel,
            message: (actionType === 'add')?this.textActionMsgAdd:this.textActionMsgDel,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        //url: '/api/sales/assignment',

                        url: '/api2/lib/sap/hcm/Employee',
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        jsonData: {
                            controller: 'sap/hcm/Employee',
                            method: 'assign',
                            params: {
                                eid: employee,
                                parentEid: localStorage.getItem('employeeId'),
                                system: localStorage.getItem('userSystem'),
                                action: actionType
                            }
                        },
                        success: function(response){
                            var text = response.responseText;
                            me.getStore().reload();
                        }
                    });
                } else if (btn === 'no') {
                    this.close();
                }
            }
        });
    },

    viewDetails: function(button, event){
        var me = this;
        var win = this.createWindow();
        var gridSel = this.getSelectionModel().getSelection();
        if(gridSel[0] === undefined){
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        }else{
            win.setHeight(600);
            win.setWidth(document.documentElement.clientWidth - 100);
            var records = gridSel[0].getData();
            win.setTitle(this.titleFirstEval+': '+records.firstname+' '+records.surname);
            content = Ext.create('Uranium.view.grid.sales.EvalDailyDetails', { employeeId: records.employeeNo, employeeName: records.firstname+' '+records.surname });
            win.add(content);
            win.show();
        }
    }

});
