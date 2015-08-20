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
Ext.define('Uranium.view.logistics.basic.Suppliers', {
    extend: 'Ext.form.Panel',
    xtype: 'logistics-basic-suppliers',
    frame: false,
    autoScroll: true,
    titleText: 'Suppliers',
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
    textYes: 'Yes',
    textNo: 'No',
    textSuccessText: 'Supplier data saved ',
    textSuccessTitle: 'Success',
    textWarningTitle: 'Warning',
    textWarningText: 'Ops, our umpalumpas aren\'t working, please try again',
    bodyPadding: 10,
    labelWidthValue: 140,
    gridOrigin: '',
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
                style: 'padding: 10px',
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
                                xtype: 'datefield',
                                width: '40%',
                                fieldLabel: this.fdiText,
                                name: 'fechaingreso',
                                value: new Date(),
                                allowBlank: false
                            }, {
                                xtype: 'customer-status',
                                margin: '0 0 0 5',
                                width: '20%',
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
                style: 'padding: 10px',
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
                                labelWidth: 140,
                                xtype: 'fieldcontainer',
                                fieldLabel: this.credText,
                                layout: 'hbox',
                                items: [{
                                        xtype: 'radiofield',
                                        name: 'credit',
                                        boxLabel: this.textYes,
                                        inputValue: 'y'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        xtype: 'radiofield',
                                        name: 'credit',
                                        boxLabel: this.textNo,
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
                                        labelWidth: 140,
                                        width: 240,
                                        name: 'creditamount',
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
                                name: 'email-payment',
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
                    }]
            }];
        this.buttons = [{
                xtype:  'customer-search',
                width: '20%',
                id: 'search-supplier',
                listeners: {
                    specialkey: function (e, t, opts) {
                        if (t.getKey() === t.ENTER) {
                            console.log('enter pressed');
                            me.searchSupplier();
                        }
                    }
                }
            }, {
                text: this.searButtonText,
                scope: this,
                handler: this.searchSupplier
            }, '->', {
                text: this.cleaButtonText
            }, {
                text: this.savButtonText,
                disabled: true,
                formBind: true,
                scope: this,
                handler: this.saveSupplier
            }];
        this.callParent();
    },
    lw: function () {
        return 140;
    },
    searchSupplier: function(){
        var me = this;
        var searchValue = Ext.getCmp('search-supplier');
        if(searchValue.value === undefined || searchValue.value === ''){
            /*
             * advanced_list_regex(
                {
                system: localStorage.getItem('systemId'),
                keyfrases: [
                [ "real_name", "^res.*$" ]
                ],
                keytypes: ["SUP"]
                },
             */
        }else{
            /*
             * advanced_list_regex(
                {
                system: "1000",
                keyfrases: [
                [ "legal_name", "^jose.*$" ],
                [ "real_name", "^.*res.*$" ]
                ],
                keytypes: []
                },
             */
        }
        Ext.Ajax.request({
            url: '/api2/lib/Customer',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            jsonData: {
                controller: 'Customer',
                method: ' advanced_list',
                params: {
                    system: localStorage.getItem('systemId'),
                    keyfrases: [],
                    keytypes: ["SUP"]
                }
            },

            scope: this,
            success: function(responseData){
                
                //me.unmask();
                //var root = me.getRootNode();            
                //root.removeAll();
                // Parse AJAX response to get tree structure
                //var ajaxData = Ext.JSON.decode(responseData.responseText);                        
                //var treeNodes = ajaxData.data.object;
                
                //root.replaceChild(treeNodes);    // To add JSON response to tree
            },
            failure: function(error){
                //me.unmask();
                Ext.Msg.alert(me.textAjaxFailure);
            }
        }, me);
        console.log(searchValue.value);
    },
    saveSupplier: function(){
        var me = this;
        var form = me.getForm();
        var dt = new Date();
        var actualDate = Ext.Date.format(dt, 'Y-m-d');
        if(form.isValid()){
            var values = form.getValues();
            console.log(values);
            
            Ext.Ajax.request({
                method: 'POST',
                url: '/api2/lib/Customer',
                headers: { 'Content-Type': 'application/json' },
                jsonData: {
                    controller: 'Customer',
                    method: 'insert',
                    params: {
                       system: localStorage.getItem('systemId'),
                        legal_name: values.razonsocial,
                        real_name: values.nombre,
                        addresses: [{
                            id_address: 0,
                            address: values.direccion,
                            location: "1001",
                            phone: values.telefono,
                            email: values.email,
                            contact: values.contacto,
                            default: "true"
                        }],
                        accounting: [{
                            id_accounting: 0,
                            phone: values.telefono,
                            email: values.email,
                            contact: values.contacto,
                            default: "true"
                        }],
                        nif_type: values.nif,
                        country: "DO",
                        currency: "DOP",
                        banking: "",
                        type: "SUP",
                        username: localStorage.getItem('username'),
                        userdate: actualDate
                   }
                },
                
                success: function(response){
                    console.log(response.data.object);
                    form.reset();
                    Ext.Msg.alert(me.textSuccessTitle, me.textSuccessText);
                },
                failure: function(response) {
                    Ext.Msg.alert(me.textWarningTitle, me.textWarningText);
                } 
            });
        }
    }
});