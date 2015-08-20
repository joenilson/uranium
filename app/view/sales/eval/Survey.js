var countSurvey = 0;
Ext.define('Uranium.view.sales.eval.Survey', {
    extend: 'Ext.form.Panel',
    controller: 'salesview',
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        labelWidth: 140,
        margin: '5 5 5 5'
    },

    flex: 1,

    textDate: 'Day',
    textCliente: 'Client Code',
    textCancel: 'Cancel',
    textSubmit: 'Submit',
    textResetTitle: 'Reset Form?',
    textResetMsg: 'You are choosing clean the Form, <br/> Do you want to continue?',
    textSuccessBegin: 'Survey ',
    textSuccessEnd: ' saved...',
    textSuccessTitle: 'Success',
    textWarningTitle: 'Warning',
    textSurvey: [
        {'visit':'Clients Visit' ,
        'posters':'Postering' ,
        'product':'Product Expiration' ,
        'wrongorder':'Wrong Order' ,
        'contaminatedfridge':'Contaminated Fridge'}
   ],

    textYes: 'Yes',
    textNo: 'No',

    textAlertTitle: 'Record Exists!',
    textAlertMsg: 'A record exists with the same date!.',

    //url: '/api/sales/survey',
    url: '/api2/lib/sap/hcm/Survey',
    paramsAsHash: true,
    employeeNo: null,
    gridOrigin: '',
    baseParams: {
        controller: 'sap/hcm/Survey',
        method: 'save'
    },
    jsonSubmit: true,
    initComponent: function(){
        var TodayValue = new Date();
        var minDateValue = new Date(TodayValue.getTime() - 7 * 24 * 60 * 60 * 1000);
        this.items = [{
            xtype: 'datefield',
            name: 'evaldate',
            fieldLabel: this.textDate,
            //margin: '5 5 5 0',
            allowBlank: false,
            value: new Date(),
            format: 'd-m-Y',
            minValue: minDateValue,
            maxValue:  new Date(),
            submitFormat: 'd-m-Y',
            submitValue : true
        },{
            xtype: 'textfield',
            name: 'client_code',
            fieldLabel: this.textClient,
            allowBlank: false
        },{
            xtype: 'radiogroup',
            fieldLabel: this.textSurvey[0].visit,
            layout: {
                autoFlex: false
            },
            defaults: {
                name: 'visit',
                margin: '0 15 0 0'
            },
            items: [{
                inputValue: 'yes',
                boxLabel: this.textYes
            }, {
                inputValue: 'no',
                boxLabel: this.textNo
            }]
          },{
            xtype: 'radiogroup',
            fieldLabel: this.textSurvey[1].posters,
            layout: {
                autoFlex: false
            },
            defaults: {
                name: 'posters',
                margin: '0 15 0 0'
            },
            items: [{
                inputValue: 'yes',
                boxLabel: this.textYes
            }, {
                inputValue: 'no',
                boxLabel: this.textNo
            }]
          },{
            xtype: 'radiogroup',
            fieldLabel: this.textSurvey[2].product,
            layout: {
                autoFlex: false
            },
            defaults: {
                name: 'product',
                margin: '0 15 0 0'
            },
            items: [{
                inputValue: 'yes',
                boxLabel: this.textYes
            }, {
                inputValue: 'no',
                boxLabel: this.textNo
            }]
          },{
            xtype: 'radiogroup',
            fieldLabel: this.textSurvey[3].wrongorder,
            layout: {
                autoFlex: false
            },
            defaults: {
                name: 'wrongorder',
                margin: '0 15 0 0'
            },
            items: [{
                inputValue: 'yes',
                boxLabel: this.textYes
            }, {
                inputValue: 'no',
                boxLabel: this.textNo
            }]
          },{
            xtype: 'radiogroup',
            fieldLabel: this.textSurvey[4].contaminatedfridge,
            layout: {
                autoFlex: false
            },
            defaults: {
                name: 'contaminatedfridge',
                margin: '0 15 0 0'
            },
            items: [{
                inputValue: 'yes',
                boxLabel: this.textYes
            }, {
                inputValue: 'no',
                boxLabel: this.textNo
            }]
          }];

        this.buttons =  [{
            text: this.textCancel,
            scope: this,
            handler: this.onResetClick
        }, {
            text: this.textSubmit,
            scope: this,
            handler: this.onCompleteClick
        }];
        this.callParent();
    },
    onResetClick: function(button){
        console.log(button);
        var form = this.getForm();
        Ext.Msg.show({
            title: this.textResetTitle,
            message: this.textResetMsg,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    form.reset();
                    console.log('Yes pressed');
                } else if (btn === 'no') {
                    console.log('No pressed');
                    //this.close();
                }
            }
        });
    },

    onCompleteClick: function(button){
        var me = this;
        var form = this.getForm();
        if (form.isValid()) {
            var values = form.getValues();
            var gridStore = me.gridOrigin.getStore();
            var match = gridStore.findBy(function(record,id) {
                if(record.get('eval_date')===values.evaldate && record.get('type_survey')==='survey' && record.get('customerId')===values.client_code) {
                    return true;
                }
            });
            if(match === -1){
                form.submit({
                    params: {
                        params: {
                            eid: this.employeeNo,
                            parentEid: localStorage.getItem('employeeId'),
                            /*system: localStorage.getItem('userSystem'),*/
                            system: localStorage.getItem('systemId'),
                            client_code: values.client_code,
                            evaldate: values.evaldate,
                            type_survey: "survey",
                            visit: values.visit,
                            posters: values.posters,
                            product: values.product,
                            wrongorder: values.wrongorder,
                            contaminatedfridge: values.contaminatedfridge
                        }
                    },
                    success: function(event, action) {
                        form.reset();
                        countSurvey++;
                        if(countSurvey===15){
                            countSurvey = 0;
                            var window = Ext.WindowManager.getActive();
                            window.close();
                        }
                        Ext.Msg.alert(me.textSuccessTitle, me.textSuccessBegin+countSurvey+me.textSuccessEnd);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert(me.textWarningTitle, action.result.message);
                    }
                });
            }else{
                Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
            }
        }
    }
});
