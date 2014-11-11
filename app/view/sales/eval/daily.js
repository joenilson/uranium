/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('Uranium.view.sales.eval.daily', {
    extend: 'Ext.Container',
    //extend: 'Ext.panel.Panel',
    xtype: 'sales-eval-daily',

    width: '100%',
    height: '100%',
    /*
    requires: [
        'Ext.layout.container.Table'
    ],
    */
    layout: 'auto',
    //flex: 1,
    /*
    defaults: {
        xtype: 'panel',
        width: 200,
        height: 280,
        bodyPadding: 10
    },
    */
    //<example>
    themes: {
        uranium: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    //</example>

    initComponent: function () {
        this.items = [
            {
                tools: [
                    { type:'refresh' },
                    { type:'search' },
                    { type:'minus' },
                    { type:'plus' }
                ],
                //title: 'Tools',
                xtype: 'grid-sales-evaldaily',
                layout: 'fit'
                //flex: 1
                //anchor: '100% 100%'
                //anchor: '100%'
            }
            /*
            {
                title: 'Title',
                html: 'KitchenSink.DummyText.mediumText'
            },
            {
                title: 'Collapsible',
                collapsible: true,
                html: 'KitchenSink.DummyText.mediumText'
            },
            {
                title: 'Tools',
                collapsed: true,
                collapsible: true,
                width: 640,
                html: 'KitchenSink.DummyText.mediumText',
                tools: [
                    { type:'pin' },
                    { type:'refresh' },
                    { type:'search' },
                    { type:'save' }
                ],
                colspan: 3
            }
            */
        ];

        this.callParent();
    }
});
