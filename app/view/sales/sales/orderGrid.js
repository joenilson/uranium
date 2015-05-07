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
    
    productCodeText: 'Code',
    productDescText: 'Product',
    productQtyText: 'Qty',
    productWeightText: 'Weight',
    productTypeText: 'Type',
    titleText: 'Order Details',
    initComponent: function () {
        var me = this;
        me.title = this.titleText;
        me.columns = [
            { text: this.productCodeText, dataIndex: 'code', flex: 1 },
            { text: this.productDescText, dataIndex: 'description', flex: 3 },
            { text: this.productQtyText, dataIndex: 'code', flex: 1 },
            { text: this.productWeightText, dataIndex: 'code', flex: 1 },
            { text: this.productTypeText, dataIndex: 'code', flex: 1 }
        ];
        
        this.callParent();
    }
});


