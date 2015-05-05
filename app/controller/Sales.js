Ext.define('Uranium.controller.Sales', {
    extend: 'Ext.app.Controller',
    alias: 'controller.sales',
    /*
     *  controlador de ventas
     */
    requires: [
        'Uranium.view.*',
        'Ext.window.*',
        'Uranium.store.sales.EvalDaily'
    ],
    /*
    stores: [
       'sales.EvalDaily'
    ],
    */
    config: {
        control: {
            'sales-eval': {
                click: 'onClick'
            }
        }
    },

    onClick: function(event){
        console.log('le dio click');
        console.log(event);
    },
    init: function() {

        if(localStorage.getItem('LoggedIn')){
        }
    }
});
