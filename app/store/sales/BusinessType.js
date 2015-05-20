/* 
 * Copyright (C) 2015 Niurka Rodriguez <nrodriguezg@grupoism.com.do>
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
Ext.define('Uranium.store.sales.BusinessType', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"DT", "name":"Detallista"},
        {"abbr":"MT", "name":"Mayorista"},
        {"abbr":"CD", "name":"Cadena"},
        {"abbr":"SM", "name":"Supermercado"},
        {"abbr":"OC", "name":"Ocacional"}
    ]
});


