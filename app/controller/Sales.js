Ext.define('Uranium.controller.Sales', {
    extend: 'Ext.app.Controller',
    /*
    requires: [
        'Uranium.view.*',
        'Ext.window.*'
    ],
    */
    stores: [
       'sales.EvalDaily'
    ]
    /*
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
        }
    }
    */
});
