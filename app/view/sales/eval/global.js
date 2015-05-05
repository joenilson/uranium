/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('Uranium.view.sales.eval.global', {
    extend: 'Ext.panel.Panel',
    xtype: 'sales-eval-globalold',
    width: 660,
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px; vertical-align: top; background-color: #CECECE;' }
    },
    flex: 1,
    defaults: {
        xtype: 'panel',
        width: 200,
        height: 280,
        bodyPadding: 10
    },
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
                html: 'KitchenSink.DummyText.mediumText'
            },
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
        ];

        this.callParent();
    }
});
