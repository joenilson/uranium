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
Ext.define('Uranium.view.sales.sales.order', {
    extend: 'Ext.panel.Panel',
    xtype: 'sales-order',
    id: 'sales-order',
    /*width: 660,*/
    layout: 'fit',
    requires: [
        'Uranium.view.sales.sales.OrderController',
        'Uranium.view.sales.sales.orderForm',
        'Uranium.view.sales.sales.orderTab'
    ],
    
    controller: 'salesorder',
    
    flex: 1,
    titleText: 'Sales Orders',
    
    buttonRemoveSelectedText: 'Remove Selected',
    buttonOpenOrder: 'Open Order',
    buttonClearOrder: 'Clear Data',
    buttonSaveOrder: 'Save',
    
    openOrderText: 'order number',
    
    initComponent: function () {
        var me = this;
        
        this.title = this.titleText;
        this.tools = [{
            type: 'close',
            scope: this,
            tooltip: this.textToolClose,
            handler: function(){
                me.destroy();
                var TreePanel = Ext.getCmp('navigation-tree');
                TreePanel.getSelectionModel().clearSelections();
                Ext.defer(function(){
                    Uranium.getApplication().redirectTo(Uranium.getApplication().getDefaultToken());
                },200);
            }
        }];
        this.items = [
        {
            layout: 'vbox',
            items: [{
                xtype: 'orderform'
            },{
                xtype: 'ordertab'
            }]

        }];

        this.buttons = [{
            text: this.buttonRemoveSelectedText   
        },'->',{
            xtype: 'numberfield',
            emptyText: this.openOrderText,
            id: 'order-number',
            name: 'order-number',
            width: 100,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            listeners: {
                change : function(textfield, eo){
                    if (textfield.value !== '' && textfield.value !== null ) {
                        Ext.getCmp('button-open-order').setDisabled(false);
                    }else{
                        Ext.getCmp('button-open-order').setDisabled(true);
                    }
                }
            }
        },{
            text: this.buttonOpenOrder,
            disabled: true,
            id: 'button-open-order',
            handler: 'openOrder'
        },'-',{
            text: this.buttonClearOrder
        },{
            text: this.buttonSaveOrder
        }];

        this.callParent();
    }
});



