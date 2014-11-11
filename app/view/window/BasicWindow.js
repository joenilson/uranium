/**
 * Demonstrates a basic window control.
 */
Ext.define('Uranium.view.window.BasicWindow', {
    extend: 'Ext.window.Window',
    xtype: 'basic-window',

    layout: 'fit',
    height: '100%',
    width: '100%',
    title: 'Window',
    autoScroll: true,
    html: 'KitchenSink.DummyText.extraLongText',
    constrain: true,
    closable: false
});
