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
/**
 * Description of searchCustomerForm
 *
 * @author Joe Nilson <joenilson@gmail.com>
 */
Ext.define('Uranium.view.sales.sales.searchCustomerForm', {
    extend: 'Ext.form.Panel',
    xtype: 'search-customer-form',
    id: 'search-customer-form',
    border: true,
    layout: 'auto',
    width: '100%',
    bodyPadding: 10,
    
    searchCustomerNameText: 'Name',
    searchCustomerAddressText: 'Address',
    searchCustomerNIFText: 'NIF',
    searchCustomerLocationText: 'Location',
    
    searchCustomerNameEmptyText: 'Please fill part of the name or leave empty',
    searchCustomerAddressEmptyText: 'Please fill part of the address or leave empty',
    searchCustomerNIFEmptyText: 'Please fill the NIF or part of it or leave blank',
    searchCustomerLocationEmptyText: 'Please fill part of the location or leave empty',
    
    buttonSearchCustomer: 'Search',
    
    searchCustomerNameField: undefined,
    searchCustomerAddressField: undefined,
    searchCustomerNIFField: undefined,
    searchCustomerLocationField: undefined,
    
    initComponent: function () {
        var me = this;
        
        this.searchCustomerNameField = this.searchCustomerNameField || [];
        this.searchCustomerNameField = Ext.Object.merge({
            emptyText: this.searchCustomerNameEmptyText,
            fieldLabel: this.searchCustomerNameText,
            xtype: 'textfield',
            name: 'customer_name',
            id: 'customer-name',
            width: 300,
            margin: '0 10 10 0',
            allowBlank: true
        }, this.searchCustomerNameField);
        
        this.searchCustomerAddressField = this.searchCustomerAddressField || [];
        this.searchCustomerAddressField = Ext.Object.merge({
            emptyText: this.searchCustomerAddressEmptyText,
            fieldLabel: this.searchCustomerAddressText,
            xtype: 'textfield',
            name: 'customer_address',
            id: 'customer-address',
            width: 300,
            margin: '0 10 10 0',
            allowBlank:true
        }, this.searchCustomerAddressField);
        
        this.searchCustomerNIFField = this.searchCustomerNIFField || [];
        this.searchCustomerNIFField = Ext.Object.merge({
            emptyText: this.searchCustomerNIFEmptyText,
            fieldLabel: this.searchCustomerNIFText,
            xtype: 'numberfield',
            name: 'customer_nif',
            id: 'cistomer-nif',
            width: 260,
            margin: '0 10 10 0',
            allowBlank:true,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false
        }, this.searchCustomerNIFField);
        
        this.searchCustomerLocationField = this.searchCustomerLocationField || [];
        this.searchCustomerLocationField = Ext.Object.merge({
            emptyText: this.searchCustomerLocationEmptyText,
            fieldLabel: this.searchCustomerLocationText,
            xtype: 'textfield',
            name: 'customer_location',
            id: 'customer-location',
            width: 300,
            margin: '0 10 0 0',
            allowBlank:true
        }, this.searchCustomerLocationField);

        this.items = [this.searchCustomerNameField, this.searchCustomerAddressField, this.searchCustomerNIFField, this.searchCustomerLocationField];

        this.buttons = [{
            text: this.buttonSearchCustomer,
            id: 'button-search-customer',
            handler: 'searchCustomer'
        }];

        this.callParent();
    }
});