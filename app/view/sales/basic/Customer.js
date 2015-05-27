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
Ext.define('Uranium.view.sales.basic.Customer', {
    extend: 'Ext.form.Panel',
    xtype: 'sales-customer',
    frame: false,
    autoScroll: true,
    titleBasicDataText: 'Basic Data',
    titleSalesDataText: 'Sales Data',
    titleCreditControlText: 'Credit Control',
    nifText: 'RNC / Cedula',
    ncText: 'Nombre Comercial',
    rcText: 'Razon Social',
    adText: 'Address',
    conText: 'Contacto',
    fhText: 'Phone',
    emText: 'Email',
    calText: 'Qualification',
    fdiText: 'Date of Admission',
    tblText: 'Table',
    rtText: 'Route',
    locText: 'Location',
    contText: 'Country',
    credText: 'Credit',
    contphText: 'Contact Phone',
    concobText: 'Contact Payment',
    cmtText: 'Credit Amount',
    pymcText: 'Payment Contact Email',
    costEmptyText: 'Customer',
    autoText: 'Authorized By',
    searButtonText: 'Search',
    cleaButtonText: 'Clear',
    savButtonText: 'Save',
    bodyPadding: 10,
    labelWidthValue: 140,
    initComponent: function () {
        this.items = [{
                xtype: 'fieldset',
                title: this.titleBasicDataText,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: this.labelWidthValue,
                            labelAlign: 'top'
                        },
                        items: [
                            {
                                xtype: 'numberfield',
                                width: 220,
                                name: 'nif',
                                fieldLabel: this.nifText,
                                mouseWheelEnabled: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                allowBlank: false,
                                enablekeyEvents: true,
                                listeners: {
                                    specialkey: function (e, t, opts) {
                                        if (t.getKey() === t.ENTER) {
                                            console.log('enter pressed');
                                        }
                                    },
                                    afterrender: function (field) {
                                        field.focus();
                                    }
                                }
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: this.lw(),
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'nombre',
                                fieldLabel: this.ncText,
                                width: '50%',
                                margin: '0 5 0 0', //top, right, bottom, left
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'razonsocial',
                                fieldLabel: this.rcText,
                                width: '49%',
                                allowBlank: false
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'direccion',
                                fieldLabel: this.adText,
                                width: '50%',
                                margin: '0 5 0 0',
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                width: '49%',
                                name: 'contacto',
                                fieldLabel: this.conText
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'numberfield',
                                width: '30%',
                                name: 'telefono',
                                fieldLabel: this.fhText,
                                mouseWheelEnabled: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                margin: '0 0 0 0'
                            }, {
                                xtype: 'displayfield',
                                width: '20%',
                                margin: '0 0 0 0'
                            }, {
                                xtype: 'textfield',
                                width: '49%',
                                name: 'email',
                                vtype: 'email', //validador de tipo de componente
                                fieldLabel: this.emText
                            }
                        ]
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: this.titleSalesDataText,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'business-type',
                                width: '40%',
                                allowBlank: false
                            }, {
                                xtype: 'fieldcontainer',
                                fieldLabel: this.calText,
                                margin: '0 0 0 5',
                                width: '280',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        boxLabel: 'A',
                                        inputValue: 'a',
                                        name: 'calificacion'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        xtype: 'radiofield',
                                        boxLabel: 'B',
                                        inputValue: 'b',
                                        name: 'calificacion'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        xtype: 'radiofield',
                                        boxLabel: 'C',
                                        inputValue: 'c',
                                        name: 'calificacion'
                                    }
                                ]
                            }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'datefield',
                                width: '40%',
                                fieldLabel: this.fdiText,
                                name: 'fechaingreso',
                                value: new Date(),
                                allowBlank: false
                            }, {
                                xtype: 'customer-status',
                                margin: '0 0 0 5',
                                width: '40%',
                                allowBlank: false
                            }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'numberfield',
                                width: '30%',
                                name: 'mesa',
                                fieldLabel: this.tblText,
                                mouseWheelEnabled: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                allowBlank: false
                            }, {
                                xtype: 'numberfield',
                                width: '30%',
                                name: 'ruta',
                                fieldLabel: this.rtText,
                                mouseWheelEnabled: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                margin: '0 0 0 5'
                            }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: 140,
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'textfield',
                                width: '50%',
                                name: 'localidad',
                                fieldLabel: this.locText,
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                name: 'pais',
                                fieldLabel: this.contText,
                                layout: 'anchor',
                                margin: '0 0 0 5',
                                width: '49%',
                                allowBlank: false
                            }]
                    }]
            }, {
                xtype: 'fieldset',
                title: this.titleCreditControlText,
                defaults: {
                    labelStyle: 'font-weight: bold',
                    labelAlign: 'top',
                    labelWidth: this.labelWidthValue
                },
                items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                                labelStyle: 'font-weight: bold',
                                labelWidth: 60,
                                xtype: 'fieldcontainer',
                                fieldLabel: this.credText,
                                layout: 'hbox',
                                items: [{
                                        xtype: 'radiofield',
                                        name: 'diascredito',
                                        boxLabel: 'Yes',
                                        inputValue: 'y'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        xtype: 'radiofield',
                                        name: 'diascredito',
                                        boxLabel: 'No',
                                        inputValue: 'n',
                                        margin: '0 10 0 0'
                                    }, {
                                        xtype: 'displayfield',
                                        width: 30,
                                        margin: '0 0 0 0'
                                    }, {
                                        labelStyle: 'font-weight: bold',
                                        xtype: 'credit-days',
                                        width: 170
                                    }, {
                                        xtype: 'displayfield',
                                        width: 30,
                                        margin: '0 0 0 0'
                                    }, {
                                        labelStyle: 'font-weight: bold',
                                        xtype: 'numberfield',
                                        fieldLabel: this.cmtText,
                                        width: 200,
                                        name: 'credit-days',
                                        mouseWheelEnabled: false,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        margin: '0 0 0 9',
                                        decimalPrecision: 2,
                                        decimalSeparator: '.'
                                    }]
                            }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelStyle: 'font-weight: bold',
                            labelWidth: this.lw(),
                            labelAlign: 'top'
                        },
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: this.concobText,
                                width: '30%',
                                name: 'contact-payment'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: this.pymcText,
                                width: '30%',
                                name: 'email',
                                vtype: 'email',
                                margin: '0 0 0 5'
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaults: {
                                    labelStyle: 'font-weight: bold',
                                    labelWidth: this.lw(),
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'numberfield',
                                        width: 130,
                                        name: 'contact-phone',
                                        fieldLabel: this.contphText,
                                        mouseWheelEnabled: false,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        margin: '0 0 0 5'
                                    }]
                            }]
                    }, {
                        xtype: 'textfield',
                        width: '30%',
                        name: 'authorized-by',
                        fieldLabel: this.autoText
                    }]
            }];
        this.buttons = [{
                emptyText: this.costEmptyText,
                xtype: 'numberfield',
                width: '20%',
                mouseWheelEnabled: false,
                hideTrigger: true,
                keyNavEnabled: false,
                listeners: {
                    specialkey: function (e, t, opts) {
                        if (t.getKey() === t.ENTER) {
                            console.log('enter pressed');
                        }
                    }
                }
            }, {
                text: this.searButtonText
            }, '->', {
                text: this.cleaButtonText
            }, {
                text: this.savButtonText,
                disabled: true,
                formBind: true
            }];
        this.callParent();
    },
    lw: function () {
        return 140;
    }
});

