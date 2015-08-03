Ext.define('Uranium.view.sales.eval.FirstEvaluation', {
    extend: 'Ext.form.Panel',
    controller: 'salesview',
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        labelWidth: 100,
        margin: '5 5 5 5'
    },
    requires: [
        'Ext.slider.Single'
    ],
    flex: 1,

    textDate: 'Day',
    textCancel: 'Cancel',
    textSubmit: 'Submit',

    textPunctuality: 'Punctuality',
    textCBLate: 'Late',
    textCBOnTime: 'On Time',
    textCBAbsent: 'Absent',

    textAppearance: 'Appearance',
    textCBClean: 'Clean',
    textCBUnclean: 'Unclean',

    textResetTitle: 'Reset Form?',
    textResetMsg: 'You are choosing clean the Form, <br/> Do you want to continue?',

    textAlertTitle: 'Record Exists!',
    textAlertMsg: 'A record exists with the same date!.',

    //url: '/api/sales/firsteval',
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
        var minDateValue = new Date(TodayValue.getTime() - 2 * 24 * 60 * 60 * 1000);
        this.items = [{
            xtype: 'datefield',
            name: 'evaldate',
            fieldLabel: this.textDate,
            //margin: '5 5 5 0',
            allowBlank: false,
            value: new Date(),
            format: 'd-m-Y',
            minValue: minDateValue,
            submitFormat: 'd-m-Y',
            submitValue : true
        }, {
            xtype: 'radiogroup',
            fieldLabel: this.textPunctuality,
            layout: {
                autoFlex: false
            },

            defaults: {
                name: 'punctuality',
                margin: '0 15 0 0'
            },

            items: [{
                inputValue: 'late',
                boxLabel: this.textCBLate
            }, {
                inputValue: 'ontime',
                boxLabel: this.textCBOnTime
            }, {
                inputValue: 'absent',
                boxLabel: this.textCBAbsent
            }]
          },{
            //xtype: 'radiogroup',
            xtype: 'slider',
            fieldLabel: this.textAppearance,
            name: 'appearance',
            increment: 20,
            minValue: 0,
            maxValue: 100,
            value: 100,
            width: 100
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
                if(record.get('eval_date')===values.evaldate && record.get('type_survey')==='first_survey') {
                    return true;
                }
            });
            if(match == -1 ){
                form.submit({
                    params: {
                        params: {
                        /*system: localStorage.getItem('userSystem'),*/
                        system: localStorage.getItem('systemId'),
                        eid: this.employeeNo,
                        parentEid: localStorage.getItem('employeeId'),
                        evaldate: values.evaldate,
                        type_survey: "first_survey",
                        punctuality: this.processValue(values.punctuality),
                        appearance: values.appearance
                        }
                    },
                    success: function(event, action) {
                        var window = Ext.WindowManager.getActive();
                        window.close();
                        Ext.Msg.alert('Success', action.result.message);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.message);
                    }
                });
            }else{
                Ext.Msg.alert(this.textAlertTitle, this.textAlertMsg);
            }

        }
    },
    processValue: function(value){
        if(value === 'ontime'){
            return 100;
        }else if(value === 'late'){
            return 50;
        }else {
            return 0;
        }
    }
});
