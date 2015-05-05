Ext.define('Uranium.controller.Menu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Uranium.view.*',
        'Ext.window.*'
    ],

    config: {
        control: {
            'navigation-tree': {
                selectionchange: 'onTreeNavSelectionChange'
            },
            'navigation-breadcrumb breadcrumb': {
                selectionchange: 'onBreadcrumbNavSelectionChange'
            },
            'thumbnails': {
                itemclick: 'onThumbnailClick',
                itemdblclick: 'onThumbnailClick'
            },
            'tool[regionTool]': {
                click: 'onSetRegion'
            }
        },
        refs: {
            viewport: 'viewport',
            navigationTree: 'navigation-tree',
            navigationBreadcrumb: 'navigation-breadcrumb',
            contentPanel: 'contentPanel',
            descriptionPanel: 'descriptionPanel'
        },
        routes  : {
            ':id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },

    beforeHandleRoute: function(id, action) {
        if(localStorage.getItem('LoggedIn')){
            /*
            if(Ext.StoreMgr.get('navigation') === undefined){
                //Ext.create('Uranium.store.Navigation', {storeId: 'navigation'});
            }
            */

            var me = this;
            
            var node = (localStorage.getItem('systemId'))?Ext.StoreMgr.get('navigation').getNodeById(id):'';

            //console.log('creamos los nodos');
            //var node = undefined;
            //console.log(Ext.StoreMgr.get('navigation').getNodeById('all'));
            //console.log(id);
            //console.log(node);
            if (node) {
                //resume action
                //console.log('existe');
                action.resume();
            } else {
                Ext.defer(function(){
                    me.redirectTo(me.getApplication().getDefaultToken());
                },200);
                /*
                Ext.Msg.alert(
                    'Route Failure',
                    'The view for ' + id + ' could not be found. You will be taken to the application\'s start',
                    function() {
                        me.redirectTo(me.getApplication().getDefaultToken());
                    }
                );
                */
                //stop action
                action.stop();
            }
        }
    },

    handleRoute: function(id) {
        if(localStorage.getItem('LoggedIn')){
        var me = this,
            navigationTree = me.getNavigationTree(),
            navigationBreadcrumb = me.getNavigationBreadcrumb(),

            store = Ext.StoreMgr.get('navigation'),
            node = store.getNodeById(id),

            contentPanel = me.getContentPanel(),
            themeName = Ext.themeName,
            hasTree = navigationTree && navigationTree.isVisible(),
            cmp, className, ViewClass, clsProto, thumbnailsStore;

        Ext.suspendLayouts();
        //console.log(node);
        if (node.isLeaf()) {
            contentPanel.removeAll(true);
            if (hasTree) {
                navigationTree.getSelectionModel().select(node);
                navigationTree.getView().focusNode(node);
            } else {
                navigationBreadcrumb.setSelection(node);
            }
            //console.log(id);
            className = Ext.ClassManager.getNameByAlias('widget.' + id);
            //console.log(className);
            ViewClass = Ext.ClassManager.get(className);
            //console.log(ViewClass);
            clsProto = ViewClass.prototype;

            if (clsProto.themes) {
                clsProto.themeInfo = clsProto.themes[themeName];

                if (themeName === 'uranium') {
                    clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.uranium);
                } else if (themeName !== 'neptune' && themeName !== 'uranium') {
                    if (themeName === 'crisp-touch') {
                        clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes['neptune-touch']);
                    }
                    clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.neptune);
                }
                // <debug warn>
                // Sometimes we forget to include allowances for other themes, so issue a warning as a reminder.
                if (!clsProto.themeInfo) {
                    Ext.log.warn ( 'Example \'' + className + '\' lacks a theme specification for the selected theme: \'' +
                        themeName + '\'. Is this intentional?');
                }
                // </debug>
            }

            cmp = new ViewClass();

            contentPanel.add(cmp);

            this.updateTitle(node);

            Ext.resumeLayouts(true);

            if (cmp.floating) {
                cmp.show();
            }
        } else {
            if (!hasTree) {
                navigationBreadcrumb.setSelection(node);
            }
            /*
            thumbnailsStore = me.getThumbnailsStore();
            thumbnailsStore.removeAll();
            thumbnailsStore.add(node.childNodes);
            if (!thumbnails.ownerCt) {
                contentPanel.removeAll(true);
            }
            //contentPanel.body.removeCls('kitchensink-example');
            contentPanel.add(thumbnails);
            */
            this.updateTitle(node);
            Ext.resumeLayouts(true);

        }
        }
    },

    updateTitle: function(node) {
        var text = node.get('text'),
            title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text;

        this.getContentPanel().setTitle(title);
        document.title = document.title.split(' - ')[0] + ' - ' + text;
    },

    onSetRegion: function (tool) {
        var panel = tool.toolOwner;

        var regionMenu = panel.regionMenu || (panel.regionMenu =
            Ext.widget({
                xtype: 'menu',
                items: [{
                    text: 'North',
                    checked: panel.region === 'north',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('north');
                    }
                },
                {
                    text: 'East',
                    checked: panel.region === 'east',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('east');
                    }
                },{
                    text: 'West',
                    checked: panel.region === 'west',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('west');
                    }
                }]
            }));

        regionMenu.showBy(tool.el);
    },

    onTreeNavSelectionChange: function(selModel, records) {
        //console.log('We are here!');
        var record = records[0];
        //console.log(record);
        if (record) {
            this.redirectTo(record.getId());
        }
    },

    onBreadcrumbNavSelectionChange: function(breadcrumb, node) {
        if (node) {
            this.redirectTo(node.getId());
        }
    },

    onThumbnailClick: function(view, node) {
        this.redirectTo(node.getId());
    }
});
