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
 * Description of searchCustomerGrid
 *
 * @author Joe Nilson <joenilson@gmail.com>
 */
Ext.define('Uranium.view.sales.sales.searchCustomerGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'search-customer-grid',
    name: '',
    minHeight: 300,
    
    titleText: 'Search Customer Grid',
    initComponent: function () {
        var me = this;
        me.title = me.titleText;
        this.callParent();
    }
});