Ext.define('Uranium.view.Systems', {
    extend: 'Ext.form.ComboBox',
    requires: 'Uranium.store.Systems',
    xtype: 'systems-combo',
    id: 'app-header-company-selector',
    fieldLabelText: 'Choose your System',
    
    queryMode: 'local',
    displayField: 'legal_name',
    valueField: 'id',
    width: 380,
    listeners: {
        select: function(combo, record){
            localStorage.setItem("systemId",combo.getValue('id'));
            var store = Ext.StoreMgr.get('navigation').getNodeById('all');
            store.removeAll();
            store.destroy();
            var store = Ext.create('Uranium.store.Navigation');
            store.getNodeById('all');
            var treePanel = Ext.getCmp('navigation-tree');
            treePanel.reconfigure(store);
        }
    },
    initComponent: function(){
        this.store = Ext.create('Uranium.store.Systems');
        this.emptyText =  this.fieldLabelText;
        this.callParent();
    }
});
