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
Ext.define('Uranium.view.grid.sales.EvalResultGeneral', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Uranium.view.form.field.Month',
        'Uranium.view.main.MainModel',
        'Uranium.store.sales.EvalResultGeneral',
        'Uranium.model.sales.EvalDailyResults'
    ],
    xtype: 'sales-eval-global',
    model: 'Uranium.model.sales.EvalDailyResults',
    viewModel: {
        type: 'main'
    },
    width: '100%',
    textTitle: 'Evaluation Results',
    reserveScrollbar: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: false,
    controller: 'eval',
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
    textAlertEmptyMsg: 'There is no data to process...',
    
    allowedIndex: [{
        "employeeNo":"Employee Number",
        "cargo":"Position",
        "description":"Full Name",
        "average":"Average",
        "punctuality":"Punctuality",
        "appearance":"Appearance",
        "visit_customers":"Visit Customers",
        "posters":"Placing Posters",
        "product_expired":"Product Expired",
        "wrong_order":"Wrong Order",
        "contaminated_fridge":"Contaminated Fridge",
        "summary":"null",
        "children":"null"
        
    }],
    
    allowedDetail: [{
        "employeeNo":"Employee Number",
        "cargo":"Position",
        "description":"Full Name",
        "summary":"null",
        "children":"null"
    }],

    summaryIndex: [{
        "average":"Average",
        "punctuality":"Punctuality",
        "appearance":"Appearance",
        "visit_customers":"Visit Customers",
        "posters":"Placing Posters",
        "product_expired":"Product Expired",
        "wrong_order":"Wrong Order",
        "contaminated_fridge":"Contaminated Fridge"
    }],
    
    employeeId: null,
    initComponent: function ()
    {
        var me = this;
        this.title = this.textTitle;
        this.tools = [{
                type: 'close',
                scope: this,
                tooltip: this.textToolClose,
                handler: function () {
                    me.destroy();
                    var TreePanel = Ext.getCmp('navigation-tree');
                    TreePanel.getSelectionModel().clearSelections();
                    Ext.defer(function () {
                        Uranium.getApplication().redirectTo(Uranium.getApplication().getDefaultToken());
                    }, 200);
                }
            }];

        this.tbar = ['->', {
                xtype: 'monthfield',
                format: 'F, Y',
                submitFormat: 'm-Y',
                name: 'date_eval',
                width: 150,
                id: 'date-eval'
            }, {
                text: this.buttonRefresh,
                iconCls: 'button-refresh',
                scope: this,
                name: 'refresh',
                handler: this.callNodes
            }, {
                text: this.buttonViewDetails,
                iconCls: 'button-view-list',
                scope: this,
                handler: this.viewDetails
            }, {
                text: this.buttonExport,
                iconCls: 'button-save',
                scope: this,
                name: 'export',
                handler: this.callNodes
            }];

        this.columns = [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: this.textName,
                width: 380,
                sortable: true,
                dataIndex: 'description',
                locked: true
            }, {
                text: this.textRating,
                dataIndex: 'average',
                groupable: false,
                width: 100,
                xtype: 'numbercolumn',
                format: '0'
            }, {
                text: this.textPunctuality,
                dataIndex: 'punctuality',
                groupable: false,
                width: 100,
                xtype: 'numbercolumn',
                format: '0'
            }, {
                text: this.textAppearance,
                dataIndex: 'appearance',
                width: 100,
                groupable: false,
                xtype: 'numbercolumn',
                format: '0'
            }, {
                text: this.textVisitCustomers,
                dataIndex: 'visit_customers',
                width: 100,
                xtype: 'numbercolumn',
                groupable: false,
                format: '0'
            }, {
                text: this.textPosters,
                dataIndex: 'posters',
                width: 100,
                xtype: 'numbercolumn',
                groupable: false,
                format: '0'
            }, {
                text: this.textProductExpired,
                dataIndex: 'product_expired',
                width: 100,
                groupable: false,
                xtype: 'numbercolumn',
                format: '0'
            }, {
                text: this.textWrongOrder,
                dataIndex: 'wrong_order',
                width: 100,
                groupable: false,
                xtype: 'numbercolumn',
                format: '0'
            }, {
                text: this.textContaminated,
                dataIndex: 'contaminated',
                width: 100,
                groupable: false,
                xtype: 'numbercolumn',
                format: '0'
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

        //this.store = this.callNodes();

        this.callParent();
    },
    callNodes: function (button) {
        var me = this;
        var datePicker = Ext.getCmp('date-eval');
        var values = datePicker.getSubmitData().date_eval.split('-');

        me.mask(me.textLoadingMask);

        Ext.Ajax.request({
            url: '/api2/sap/Employee',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
            success: function (responseData) {
                me.unmask();
                var root = me.getRootNode();
                root.removeAll();
                // Parse AJAX response to get tree structure
                var ajaxData = Ext.JSON.decode(responseData.responseText);
                var treeNodes = ajaxData.data.object;
                if(button.name==='export'){
                    me.exportCSV(treeNodes);
                }
                root.replaceChild(treeNodes);    // To add JSON response to tree
            },
            failure: function (error) {
                me.unmask();
                Ext.Msg.alert(me.textAjaxFailure);
            }
        }, me);
    },
    createWindow: function () {
        var window = Ext.create('Ext.window.Window', {
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
    processPersonal: function (button, event) {
        var actionName = button.name;
        var me = this;
        var gridSel = this.getSelectionModel().getSelection();
        if (gridSel[0] === undefined) {
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        } else {
            var records = gridSel[0].getData();
            this.makeTreatment(records.employeeNo, actionName, '0000000');
        }
    },
    createEval: function (button, event) {
        var me = this;
        var win = this.createWindow();
        var actionName = button.name;
        var content;
        var gridSel = this.getSelectionModel().getSelection();
        if (gridSel[0] === undefined) {
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        } else {
            win.setHeight(400);
            var records = gridSel[0].getData();
            if (actionName === 'first') {
                win.setTitle(this.titleFirstEval + ': ' + records.firstname + ' ' + records.surname);
                content = Ext.create('Uranium.view.sales.eval.FirstEvaluation', {employeeNo: records.employeeNo});
            } else {
                win.setTitle(this.titleSurvey + ': ' + records.firstname + ' ' + records.surname);
                content = Ext.create('Uranium.view.sales.eval.Survey', {employeeNo: records.employeeNo});
            }
            win.add(content);
            win.show();
        }
    },
    makeTreatment: function (employee, actionType, parent) {
        var me = this;
        Ext.Msg.show({
            title: (actionType === 'add') ? this.textActionTitleAdd : this.textActionTitleDel,
            message: (actionType === 'add') ? this.textActionMsgAdd : this.textActionMsgDel,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/api2/lib/sap/hcm/Employee',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        jsonData: {
                            controller: 'sap/hcm/Employee',
                            method: 'assign',
                            params: {
                                eid: employee,
                                parentEid: localStorage.getItem('employeeId'),
                                system: localStorage.getItem('systemId'),
                                action: actionType
                            }
                        },
                        success: function (response) {
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
    viewDetails: function (button, event) {
        var me = this;
        var win = this.createWindow();
        var gridSel = this.getSelectionModel().getSelection();

        var datePicker = Ext.getCmp('date-eval');
        var values = datePicker.getSubmitData().date_eval.split('-');

        if (gridSel[0] === undefined) {
            Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
        } else {
            win.setHeight(600);
            win.setWidth(document.documentElement.clientWidth - 100);
            var records = gridSel[0].getData();
            win.setTitle(this.titleFirstEval + ': ' + records.firstname + ' ' + records.surname);
            content = Ext.create('Uranium.view.grid.sales.EvalDailyDetails', {employeeId: records.employeeNo, employeeName: records.firstname + ' ' + records.surname, monthValue: values[0], yearValue: values[1], viewMode: 'view'});
            win.add(content);
            win.show();
        }
    },
    
    exportCSV: function (data) {
        var me = this;
        var datePicker = Ext.getCmp('date-eval');
        var values = datePicker.getSubmitData().date_eval.split('-');
        if (data.lenght === 0) {
            Ext.Msg.alert(this.textAlertTitle, this.textAlertEmptyMsg);
        } else {
            var JSONData = data;
            var ReportTitle = "Evaluaciones de " + values[0] + ' del ' + values[1];
            var ShowLabel = true;
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
            var arrIndex = me.allowedIndex;
            var CSV = '';
            
            //Set Report title in first row or line
            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrIndex[0]) {
                    if(arrIndex[0][index] && index !== 'children' && index !== 'summary'){
                        //Now convert each value to string and comma-seprated
                        row += arrIndex[0][index] + ',';
                    }
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            row.slice(0, row.length - 1);
            CSV += this.processLoop(arrData,this.allowedDetail[0]);
            
            if (CSV === '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = localStorage.getItem('systemId')+"_"+localStorage.getItem('username')+"_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return;
        }
    },
    
    processAverage: function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            for (var idx in this.summaryIndex[0]) {
                if(idx !== 'average' && data[i][idx] !== undefined){
                    sum += data[i][idx];
                }
            }
        }
        var avg = sum/7;
        return Math.round(avg);
    },
    
    processSummary: function(arrayValues){
        var arrayData = [arrayValues];
        var contentData = "";
        var averageData = this.processAverage(arrayData);
        for (var i = 0; i < arrayData.length; i++) {
            for (var idx in this.summaryIndex[0]) {
                if(idx === 'average' && arrayData.length > 0){
                    contentData += '"' + averageData + '",';
                }else{
                    if(arrayData[i][idx] !== undefined){
                        contentData += '"' + arrayData[i][idx] + '",';
                    }else{
                        contentData += '"",';
                    }
                }
            }
        }
        return contentData;
        
    },
    
    processLoop: function(arrayValues,arrayHeader){
        var arrayData = arrayValues;
        var contentData = "";
        
        var process = false;
        
        //Begin the data loop to process the elements
        for (var i = 0; i < arrayData.length; i++) {
            //Process the items for each row in the Header order
            for (var idx in arrayHeader) {
                //Add the content to the row if the header index is not a children value
                if(arrayData[i][idx] !== undefined && idx !== 'children' && idx !== 'summary'){
                    contentData += '"' + arrayData[i][idx] + '",';
                    process = true;
                }
                //If the row is valid and is a children we reprocess the data with this 
                else if((arrayData[i][idx]) !== undefined && idx === 'children'){
                    contentData.slice(0, contentData.length - 1);
                    contentData += '\r\n';
                    var contentLoop = this.processLoop(arrayValues[i][idx],arrayHeader);
                    contentLoop.slice(0, contentLoop.length - 1);
                    contentData += contentLoop;
                    process = true;
                }
                else if((arrayData[i][idx]) !== undefined && idx === 'summary'){
                    var contentSummary = this.processSummary(arrayData[i][idx]);
                    contentSummary.slice(0, contentSummary.length - 1);
                    contentData += contentSummary;
                    process = true;
                }
                //If no data is set then we write a empty cell
                else {
                    //contentData += '"",';
                    process = false;
                }
            }
            if(!process){
                contentData.slice(0, contentData.length - 1);
                contentData += '\r\n';
            }
        }
        //return the content data processed
        return contentData;
    }
});
