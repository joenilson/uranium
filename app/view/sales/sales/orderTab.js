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
Ext.define('Uranium.view.sales.sales.orderTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'ordertab',
    orderTabText: 'Productos',
    orderObsText: 'Observation',
    orderOthersText: 'Others',
    width: '100%',
    requires: [
        'Uranium.view.sales.sales.orderGrid'
    ],
    initComponent: function(){
        this.items = [{
            xtype: 'ordergrid'
        },{
            title: this.orderObsText,
            html: 'One'
        },{
            title: this.orderOthersText,
            html: 'One'
        }];
        this.callParent();
    }
    
});