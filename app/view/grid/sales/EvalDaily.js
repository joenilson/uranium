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
    /*
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'app/view/grid/sales/EvalController.js'
    },{
        type: 'Store',
        path: 'app/store/sales/EvalDaily.js'
    },{
        type: 'Model',
        path: 'app/model/sales/EvalDaily.js'
    }],
    //</example>
    */
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
    }, {
        ptype: 'rowexpander',

        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
    }],

    textId: 'Id',
    textName: 'Name (Filter)',
    textRating: 'Rating',
    textDateBirth: 'Date of birth',
    textDateJoin: 'Join date',
    textNoticePeriod: 'Notice<br>period',
    textEmailAddress: 'Email address',
    textDepartment: 'Department',
    textAbsences: 'Absences',
    textIllness: 'Illness',
    textHolidays: 'Holidays',
    textHoldayAllowance: 'Holday Allowance',
    textSalary: 'Sales',

    textDate: 'Eval Date',
    //textName: 'Name (Filter)',
    textPunctuality: 'Punctuality',
    textAppearance:'Appearance',
    textVisitCustomers: 'Visit<br>Customers',
    textPosters: 'Placing<br>Posters',
    textProductExpired: 'Product<br>Expired',
    textWrongOrder: 'Wrong<br>Order',
    textContaminated: 'Contaminated<br>Fridge',
    //textRating: 'Rating',

    initComponent: function()
    {
        var me = this;
        this.title = this.textTitle;

        this.tools = [
        {
            type: 'plus',
            scope: this,
            handler: function(){
                console.log(this);
                //me.destroy();
            }
        },{
            type: 'button',
            glyph: '128196',
            scope: this,
            handler: function(){
                console.log(this);
                //me.destroy();
            }
        },{
            type: 'close',
            scope: this,
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
        /*
        {
            text: this.textDateBirth,
            dataIndex: 'dob',
            xtype: 'datecolumn',
            groupable: false,
            width: 115,
            filter: {

            },
            editor: {
                xtype: 'datefield'
            }
        },
        */
        {
            text: this.textDateJoin,
            dataIndex: 'joinDate',
            xtype: 'datecolumn',
            groupable: false,
            width: 120,
            filter: {

            },
            editor: {
                xtype: 'datefield'
            }
        }, {
            text: this.textNoticePeriod,
            dataIndex: 'noticePeriod',
            groupable: false,
            width: 115,
            filter: {
                type: 'list'
            },
            editor: {
                xtype: 'combobox',
                initComponent: function() {
                    this.store = this.column.up('tablepanel').store.collect(this.column.dataIndex, false, true);
                    Ext.form.field.ComboBox.prototype.initComponent.apply(this, arguments);
                }
            }
        }, {
            text: this.textEmailAddress,
            dataIndex: 'email',
            width: 200,
            groupable: false,
            renderer: function(v) {
                return '<a href="mailto:' + v + '">' + v + '</a>';
            },
            editor: {
                xtype: 'textfield'
            },
            filter: {

            }
        }, {
            text: this.textDepartment,
            dataIndex: 'department',
            hidden: true,
            hideable: false,
            filter: {
                type: 'list'
            }
        }, {
            text: this.textAbsences,
            columns: [{
                text: this.textIllness,
                dataIndex: 'sickDays',
                width: 100,
                groupable: false,
                summaryType: 'sum',
                summaryFormatter: 'number("0")',
                filter: {

                },
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            }, {
                text: this.textHolidays,
                dataIndex: 'holidayDays',
                // Size column to title text
                width: null,
                groupable: false,
                summaryType: 'sum',
                summaryFormatter: 'number("0")',
                filter: {

                },
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            }, {
                text: this.textHoldayAllowance,
                dataIndex: 'holidayAllowance',
                // Size column to title text
                width: null,
                groupable: false,
                filter: {

                },
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            }]
        }, {
            text: this.textSalary,
            width: 155,
            sortable: true,
            dataIndex: 'salary',
            align: 'right',
            formatter: 'usMoney',
            groupable: false,
            summaryType: 'average',
            summaryFormatter: 'usMoney',
            filter: {

            },
            editor: {
                xtype: 'numberfield',
                decimalPrecision: 2
            }
        }];
        this.callParent();
    }

});
