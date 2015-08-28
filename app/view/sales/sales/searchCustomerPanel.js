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
 * Description of searchCustomerPanel
 *
 * @author Joe Nilson <joenilson@gmail.com>
 */
Ext.define('Uranium.view.sales.sales.searchCustomerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'search-customer-panel',
    layout: 'vbox',
    requires: [
        'Uranium.view.sales.sales.OrderController',
        'Uranium.view.sales.sales.searchCustomerForm',
        'Uranium.view.sales.sales.searchCustomerGrid'
    ],
    
    controller: 'salesorder',
    
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'search-customer-form'
        },{
            xtype: 'search-customer-grid'
        }];
        this.callParent();
    }
});