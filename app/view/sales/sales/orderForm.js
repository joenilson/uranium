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
Ext.define('Uranium.view.sales.sales.orderForm', {
    extend: 'Ext.form.Panel',
    xtype: 'orderform',
    layout: 'vbox',
    width: '100%',
    
    customerCodeText: 'Customer',
    customerCodeEmptyText: '0000',
    customerNameText: 'Customer',
    orderDateText: 'Order Date',
    deliveryDateText: 'Delivery Date',
    productCodeText: 'Product',
    productQtyText: 'Quantity',
    
    basicDataFieldset: 'Basic Data',
    orderDetailsFieldset: 'Order Details',

    msgWarningProductTitle: 'Warning',
    msgWarningProductText: 'Please fill the required fields.<br>Product and Quantity.',
    
    searchCustomerTitle: 'Search Customer',
    
    bodyPadding: 10,
    customerCodeField: undefined,
    searchCustomerButton: undefined,
    customerNameField: undefined,
    orderDateField: undefined,
    deliveryDateField: undefined,
    productCodeField: undefined,
    productQtyField: undefined,
    customerCodeValue: '',
    customerNameValue: '',
    orderDateValue: '',
    deliveryDateValue: '',
    margin: '0 0 5 0',
    
    initComponent: function(){
        var me = this;
        var TodayValue = new Date();
        var minDateValue = new Date(TodayValue.getTime() - 1 * 24 * 60 * 60 * 1000);
        var TomorrowValue = new Date(TodayValue.getTime() + 1 * 24 * 60 * 60 * 1000);
        
        this.customerCodeField = this.customerCodeField || [];
        this.customerCodeField = Ext.Object.merge({
            afterLabelTextTpl: this.required,
            emptyText: this.customerCodeEmptyText,
            xtype: 'numberfield',
            name: 'customer',
            id: 'customer-id',
            anchor: '40%',
            margin: '0 10 0 0',
            allowBlank:false,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enableKeyEvents: true,
            listeners: {
                keypress : function(textfield, eo){
                    if (eo.getCharCode() === Ext.EventObject.ENTER) {
                        //enter is pressed call the next buttons handler function here.
                        console.log(textfield);
                        
                    }
                }
            },
            value: this.customerCodeValue
        }, this.customerCodeField);
        
        this.customerNameField = this.customerNameField || [];
        this.customerNameField = Ext.Object.merge({
            fieldLabel: this.customerCodeText,
            xtype: 'displayfield',
            name: 'customer_name',
            id: 'customer_name',
            anchor: '100%',
            allowBlank:false,
            value: this.customerNameValue
        }, this.customerNameField);

        this.orderDateField = this.orderDateField || [];
        this.orderDateField = Ext.Object.merge({
            fieldLabel: this.orderDateText,
            xtype: 'datefield',
            name: 'order_date',
            id: 'order_date',
            anchor: '45%',
            allowBlank:false,
            value: (this.orderDateValue === '')?TodayValue:this.orderDateValue,
            format: 'd-m-Y',
            margin: '0 10 0 0',
            minValue: minDateValue,
            submitFormat: 'd-m-Y',
            submitValue : true
        }, this.orderDateField);
        
        this.deliveryDateField = this.deliveryDateField || [];
        this.deliveryDateField = Ext.Object.merge({
            fieldLabel: this.deliveryDateText,
            xtype: 'datefield',
            name: 'delivery_date',
            id: 'delivery_date',
            anchor: '45%',
            allowBlank:false,
            value: (this.deliveryDateValue === '')?TomorrowValue:this.deliveryDateValue,
            format: 'd-m-Y',
            minValue: minDateValue,
            submitFormat: 'd-m-Y',
            submitValue : true
        }, this.deliveryDateField);
        
        this.productCodeField = this.productCodeField || [];
        this.productCodeField = Ext.Object.merge({
            afterLabelTextTpl: this.required,
            emptyText: this.productCodeText,
            fieldLabel: this.productCodeText,
            xtype: 'numberfield',
            name: 'product_code',
            id: 'product_code',
            width: 180,
            margin: '0 10 0 0',
            allowBlank:false,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false
        }, this.productCodeField);
        
        this.productQtyField = this.productQtyField || [];
        this.productQtyField = Ext.Object.merge({
            afterLabelTextTpl: this.required,
            emptyText: this.productQtyText,
            fieldLabel: this.productQtyText,
            xtype: 'numberfield',
            name: 'product_qty',
            id: 'product_qty',
            width: 180,
            margin: '0 10 0 0',
            decimalPrecision: 2,
            decimalSeparator: '.',
            allowDecimals: true,
            forceDecimals: true,
            allowBlank:false,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enableKeyEvents: true,
            listeners: {
                keypress : function(textfield, eo){
                    if (eo.getCharCode() === Ext.EventObject.ENTER) {
                        var panelForm = textfield.up('panel').getForm();
                        var formValues = panelForm.getValues();
                        var orderDetailsGrid = Ext.getCmp('sales-order-grid');
                        panelForm.getFields().get('product_code').setValue('');
                        textfield.setValue('');
                        panelForm.getFields().get('product_code').focus(true);
                        if(formValues.product_code !== '' || formValues.product_qty !== ''){
                            var productGrid = Ext.create('Uranium.model.sales.OrdersDetails',{
                                id: formValues.product_code+'-'+'S',
                                code: formValues.product_code,
                                quantity: formValues.product_qty,
                                type: 'S'
                            });
                            orderDetailsGrid.getStore().insert(0,productGrid);
                        }else{
                            Ext.Msg.show({
                                title: me.msgWarningProductTitle,
                                message: me.msgWarningProductText,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        }                       
                    }
                }
            }
        }, this.productQtyField);
        
        this.items = [{
            xtype: 'fieldset',
            title: this.basicDataFieldset,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                flex: 1
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: this.customerCodeText,
                layout: 'hbox',
                combineErrors: true,
                bodyPadding: 5,
                defaults: {
                    hideLabel: 'true'
                },
                items: [
                    this.customerCodeField,
                    this.customerNameField, 
                    {
                        icon: null,
                        glyph: '128269',
                        xtype: 'button',
                        scope: this,
                        handler: this.searchCustomer
                    }
                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyPadding: 5,
                defaults: {
                    labelWidth: 180
                },
                items: [
                    this.orderDateField,
                    this.deliveryDateField
                ]
            }]
        },{
            xtype: 'fieldset',
            title: this.orderDetailsFieldset,
            layout: 'hbox',
            bodyPadding: 5,
            defaults: {
                labelWidth: 60
            },
            items: [
                this.productCodeField,
                this.productQtyField
            ]
        }];
        
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
    
    searchCustomer: function(){
        var me = this;
        var win = this.createWindow();
        var content;
        win.setHeight(400);
        win.setTitle(this.searchCustomerTitle);
        content = Ext.create('Uranium.view.sales.sales.searchCustomerPanel');
        win.add(content);
        win.show();
    }
});