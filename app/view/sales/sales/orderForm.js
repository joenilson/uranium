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
    customerCodeField: undefined,
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
    basicDataFieldset: 'Basic Data',
    orderDetailsFieldset: 'Order Details',
    initComponent: function(){
        var TodayValue = new Date();
        var minDateValue = new Date(TodayValue.getTime() - 1 * 24 * 60 * 60 * 1000);
        var TomorrowValue = new Date(TodayValue.getTime() + 1 * 24 * 60 * 60 * 1000);
        
        this.customerCodeField = this.customerCodeField || [];
        this.customerCodeField = Ext.Object.merge({
            afterLabelTextTpl: this.required,
            emptyText: this.customerCodeEmptyText,
            xtype: 'numberfield',
            name: 'customer',
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
            anchor: '100%',
            allowBlank:false,
            value: this.customerNameValue
        }, this.customerNameField);

        this.orderDateField = this.orderDateField || [];
        this.orderDateField = Ext.Object.merge({
            fieldLabel: this.orderDateText,
            xtype: 'datefield',
            name: 'order_date',
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
                        //enter is pressed call the next buttons handler function here.
                        console.log(textfield);
                        
                    }
                }
            }
        }, this.productQtyField);
        
        this.items = [{
            xtype: 'fieldset',
            title: this.basicDataFieldset,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Name',
                layout: 'hbox',
                combineErrors: true,
                bodyPadding: 5,
                defaults: {
                    hideLabel: 'true'
                },
                items: [
                    this.customerCodeField,
                    this.customerNameField
                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyPadding: 5,
                items: [
                    this.orderDateField,
                    this.deliveryDateField
                ]
            }]
        },{
            xtype: 'fieldset',
            title: this.orderDetailsFieldset,
            layout: 'hbox',
            defaultS: {
                labelWidth: 60
            },
            items: [
                this.productCodeField,
                this.productQtyField
            ]
        }];
        
        this.callParent();
    }
    
});