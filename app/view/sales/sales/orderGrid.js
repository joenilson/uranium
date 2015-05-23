/* 
 * Copyright (C) 2015 Joe Nilson <joenilson@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('Uranium.view.sales.sales.orderGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ordergrid',
    viewConfig: {
        enableTextSelection: true
    },
    selType: 'checkboxmodel',
    id: 'sales-order-grid',
    productCodeText: 'Code',
    productDescText: 'Product',
    productQtyText: 'Qty',
    productWeightText: 'Weight',
    productTypeText: 'Type',
    productAmountText: 'Amount',
    titleText: 'Order Details',
    salesText: 'Sales',
    freeText: 'Free',
    removeItemText: 'Remove Item',
    messageBoxTitle: 'Confirm',
    messageBoxText: 'Are you sure you want to do that?',
    
    selModel: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    },

    initComponent: function () {
        var me = this;
        me.title = this.titleText;
        me.store = Ext.create('Uranium.store.sales.OrdersDetails');
        
        me.columns = [
            { text: this.productCodeTypeText, dataIndex: 'id', hidden: true },
            { text: this.productCodeText, dataIndex: 'code', flex: 1 },
            { text: this.productDescText, dataIndex: 'product', flex: 3 },
            { text: this.productQtyText, dataIndex: 'quantity', flex: 1 },
            { text: this.productWeightText, dataIndex: 'weight', flex: 1 },
            { text: this.productTypeText, dataIndex: 'type', flex: 1,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    store: [
                        ['S',me.salesText],
                        ['F',me.freeText]
                    ]
                }) },
            { text: this.productAmountText, dataIndex: 'amount', flex: 1 },
            {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'resources/images/icons/fam/delete.gif',
                    tooltip: this.removeItemText,
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }
        ];
        me.listeners = {
            'edit': this.updateData
        };
        this.callParent();
    },
    onRemoveClick: function(grid, rowIndex){
        var me = this;
        Ext.MessageBox.confirm(
            me.messageBoxTitle, 
            me.messageBoxText, 
            function(btn, text) {
                if(btn === 'yes'){
                    this.getStore().removeAt(rowIndex);
                }
            }, 
            this);
    },
    updateData: function(view, records) {
        var me = this;
        records.record.set({id: records.record.data.id+'-'+records.record.data.type});
        this.getStore().commitChanges();
    }
});


