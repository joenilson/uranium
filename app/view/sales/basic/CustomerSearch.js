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
 * Description of CustomerSearch
 *
 * @author Joe Nilson <joenilson@gmail.com>
 */
Ext.define('Uranium.view.sales.basic.CustomerSearch', {
    extend: 'Ext.form.ComboBox',
    xtype: 'customer-search',
    name: '',
    emptyText: 'Search a value',
    tpl: [
        '<ul class="x-list-plain">',
            '<tpl for=".">',
                '<li class="',
                    Ext.baseCSSPrefix, 'grid-group-hd ',
                    Ext.baseCSSPrefix, 'grid-group-title">{legal_name}</li>',
                '<li class="x-boundlist-item">',
                    '{real_name}',
                '</li>',
            '</tpl>',
        '</ul>'
    ],
    displayField: 'legal_name',
    minChars: 0,
    queryParam: 'q',
    queryMode: 'remote',
    typeCustomer: '',
    initComponent: function () {
        this.store = Ext.create('Uranium.store.Customers');
        this.emptyText = this.textEmpty;
        this.callParent();
    }
});

