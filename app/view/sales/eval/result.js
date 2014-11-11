/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('Uranium.view.sales.eval.result', {
    extend: 'Ext.Panel',
    xtype: 'sales-eval-result',

    requires: [
        'Ext.draw.Color',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Scatter',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.*'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    leftAxis = chart.getAxes()[0],
                    store = chart.getStore();
                chart.setAnimation(true);
                // we want the maximum to be derived from the store (series data)
                leftAxis.setMaximum(NaN);
                fromHSL = Ext.draw.Color.fly('blue').getHSL();
                store.setData(createData(50));
            }
        },
        {
            text: 'Drop all bubbles',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    store = chart.getStore(),
                    leftAxis = chart.getAxes()[0];
                chart.setAnimation({
                    easing: 'bounceOut',
                    duration: 1000
                });
                fromHSL = Ext.draw.Color.fly('cyan').getHSL();
                // fix the maximum for a nice bubble drop animation
                leftAxis.setMaximum(leftAxis.getRange()[1]);
                store.setData(createData(50, true));
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        id: 'bubble-chart',
        store: {
            fields: [ 'id', 'g1', 'g2', 'g3', 'g4', 'g5' ]
        },
        background: '#242021',
        //background: { image: 'resources/images/scatter_background.png' },
        insetPadding: 20,
        interactions: ['panzoom', 'itemhighlight'],
        series: {
            type: 'scatter',
            xField: 'id',
            yField: 'g2',
            highlightCfg: {
                scale: 1.3
            },
            marker: {
                type: 'circle',
                radius: 5,
                fillStyle: 'rgb(203,143,203)',
                miterLimit: 1,
                lineCap: 'butt',
                lineWidth: 1,
                fx: {
                    duration: 200
                }
            },
            style: {
                renderer: function (sprite, config, rendererData, index) {
                    var store = rendererData.store,
                        storeItem = store.getData().items[index];
                    config.radius = interpolate(storeItem.data.g3, 0, 1000, 5, 30);
                    config.fillOpacity = interpolate(storeItem.data.g3, 0, 1000, 1, 0.7);
                    config.fill = interpolateColor(storeItem.data.g3, 0, 1000);
                    config.stroke = config.fill;
                    config.lineWidth = 3;
                }
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g0','g1','g2','g3'],
            minimum: 0,
            maximum: 100,
            style: {
                majorTickSize: 10,
                lineWidth: 3,
                stroke: '#888',
                estStepSize: 50
            },
            label: {
                color: '#888',
                fontFamily: 'Chalkboard, sans-serif',
                fontSize: 20
            },
            grid: {
                image: 'resources/images/scatter_background.png',
                stroke: '#444',
                odd: {
                    fill: '#333'
                }
            }
        }, {
            type: 'numeric',
            position: 'bottom',
            fields: ['g0','g1','g2','g3'],
            //fields: ['id'],
            minimum: 0,
            maximum: 100,
            style: {
                majorTickSize: 10,
                lineWidth: 3,
                stroke: '#888',
                estStepSize: 100
            },
            label: {
                color: '#888',
                fontFamily: 'Chalkboard, sans-serif',
                fontSize: 20
            },
            grid: {
                stroke: '#cecece'
            }
        }]
    }],

    constructor: function(config) {
        this.callParent(arguments);
        this.down('cartesian').getStore().setData(createData(50));

        fromHSL = Ext.draw.Color.fly('blue').getHSL();
        toHSL = Ext.draw.Color.fly('red').getHSL();
        fromHSL[2] = 0.3;
    }
});

var fromHSL, toHSL, seed = 1.3;

// Controllable random.
function random() {
    seed *= 7.3;
    seed -= Math.floor(seed);
    return seed;
}

function createData(count, allNull) {
    var data = [],
        record = allNull ?
        {
            'id': randomBetween(0,100),
            'g0': randomBetween(0,100),
            'g1': randomBetween(0,100),
            'g2': randomBetween(0,100),
            'g3': randomBetween(0,100),
            'name': 'Item-0'
        } : {
            'id': randomBetween(0,100),
            'g0': randomBetween(0,100),
            'g1': randomBetween(0,100),
            'g2': randomBetween(0,100),
            'g3': randomBetween(0,100),
            'name': 'Item-0'
        },
        i;

    data.push(record);
    for (i = 1; i < count; i++) {
        record = allNull ?
        {
            'id': randomBetween(-100,100),
            'g0': randomBetween(-100,100),
            'g1': randomBetween(-100,100),
            'g2': randomBetween(-100,100),
            'g3': randomBetween(-100,100)
        } : {
            'id': i,
            'g0': randomBetween(-100,100),
            'g1': randomBetween(-100,100),
            'g2': randomBetween(-100,100),
            'g3': randomBetween(-100,100)
        };
        data.push(record);
    }
    return data;
}

function interpolate(lambda, minSrc, maxSrc, minDst, maxDst) {
    return minDst + (maxDst - minDst) * Math.max(0, Math.min(1, (lambda - minSrc) / (maxSrc - minSrc)));
}

function interpolateColor(lambda, minSrc, maxSrc) {
    return Ext.draw.Color.fly(0, 0, 0, 0).setHSL(
        interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
        interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
        interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
    ).toString();
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
    /*
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
    */
}
