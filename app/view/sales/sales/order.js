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
    extend: 'Ext.form.Panel',
    xtype: 'sales-order',
    id: 'sales-order',
    /*width: 660,*/
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px; vertical-align: top; background-color: #CECECE;' }
    },
    flex: 1,
   
    titleText: 'Sales Orders',
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
                html: 'KitchenSink.DummyText.mediumText 2'
            },
            {
                title: 'Title',
                html: 'KitchenSink.DummyText.mediumText'
            },
            {
                title: 'Collapsible',
                collapsible: true,
                html: 'KitchenSink.DummyText.mediumText'
            },
            {
                title: 'Tools',
                collapsed: true,
                collapsible: true,
                width: 640,
                html: 'KitchenSink.DummyText.mediumText',
                tools: [
                    { type:'pin' },
                    { type:'refresh' },
                    { type:'search' },
                    { type:'save' }
                ],
                colspan: 3
            }
        ];

        this.callParent();
    }
});



