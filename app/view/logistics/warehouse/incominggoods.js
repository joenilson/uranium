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
 * Description of incominggoods
 *
 * @author Joe Nilson <joenilson@gmail.com>
 */
Ext.define('Uranium.view.logistics.warehouse.incominggoods', {
    extend: 'Ext.panel.Panel',
    xtype: 'logistics-warehouse-incoming-goods',
    name: '',
    titleText: 'Incoming Goods',
    initComponent: function () {
        var me = this;
        me.title = me.titleText;
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
        this.callParent();
    }
});