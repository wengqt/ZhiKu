function wordChart() {
    // 给point注册一个词云的shape
    function getTextAttrs(cfg) {
        return Object.assign({}, {
            fillOpacity: cfg.opacity,
            fontSize: cfg.origin._origin.size,
            rotate: cfg.origin._origin.rotate,
            text: cfg.origin._origin.text,
            textAlign: 'center',
            fontFamily: cfg.origin._origin.font,
            fill: cfg.color,
            textBaseline: 'Alphabetic'
        }, cfg.style);
    }


    G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape(cfg, container) {
            var attrs = getTextAttrs(cfg);
            return container.addShape('text', {
                attrs: Object.assign(attrs, {
                    x: cfg.x,
                    y: cfg.y
                })
            });
        }
    });

    let da = [{
            text: '111',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '333',
            value: Math.random(),
            category: 'b'
        },
        {
            text: '222',
            value: Math.random(),
            category: 'b'
        },
        {
            text: '444',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        },
        {
            text: '555',
            value: Math.random(),
            category: 'a'
        }
    ]

    let dv = new DataSet.View().source(da)
    var range = dv.range('value');
    var min = range[0];
    var max = range[1];
    dv.transform({
        type: 'tag-cloud',
        fields: ['text', 'value'], // 参与标签云layout的字段集
        font: 'Verdana', // 标签字体
        size: [400, 300], // 画布size，[ width, height ]
        padding: 0,
        spiral: 'rectangular', // 标签螺旋排布规律函数 'archimedean' || 'rectangular' || {function}
        fontSize(d) {
            if (d.value) {
                return (d.value - min) / (max - min) * (80 - 24) + 24;
            }
            return 0;
        }, // 计算标签字体大小的回调函数，d为一行数据
        text(d) {
            return d.text
        }, // 生成标签文本的回调函数，d为一行数据
        timeInterval: Infinity, // 最大迭代时间
        //  imageMask: {
        //      Image
        //  }, // Image的实例，必须是loaded状态
    })
    const chart = new G2.Chart({
        id: 'word',
        // width: 500,
        forceFit: true,
        height: 300,
        padding: 0
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
        showTitle: false
    });
    chart.source(dv);
    chart.coord().reflect();
    chart.point().position('x*y').color('category').shape('cloud').tooltip('text*category').active({
        // 设置是否允许选中以及选中样式
        mode: 'single', // 多选还是单选
        style: {
            fontWeight: 'bolder' // 选中的样式
        },
    });
    chart.render();
    return chart;
}



function initLine() {
    var data2 = [{
        month: 'Jan',
        Tokyo: 7.0,
        London: 3.9
    }, {
        month: 'Feb',
        Tokyo: 6.9,
        London: 4.2
    }, {
        month: 'Mar',
        Tokyo: 9.5,
        London: 5.7
    }, {
        month: 'Apr',
        Tokyo: 14.5,
        London: 8.5
    }, {
        month: 'May',
        Tokyo: 18.4,
        London: 11.9
    }, {
        month: 'Jun',
        Tokyo: 21.5,
        London: 15.2
    }, {
        month: 'Jul',
        Tokyo: 25.2,
        London: 17.0
    }, {
        month: 'Aug',
        Tokyo: 26.5,
        London: 16.6
    }, {
        month: 'Sep',
        Tokyo: 23.3,
        London: 14.2
    }, {
        month: 'Oct',
        Tokyo: 18.3,
        London: 10.3
    }, {
        month: 'Nov',
        Tokyo: 13.9,
        London: 6.6
    }, {
        month: 'Dec',
        Tokyo: 9.6,
        London: 4.8
    }];
    var ds = new DataSet();
    var dv2 = ds.createView().source(data2);
    dv2.transform({
        type: 'fold',
        fields: ['Tokyo', 'London'], // 展开字段集
        key: 'city', // key字段
        value: 'temperature' // value字段
    });
    var chart2 = new G2.Chart({
        id: 'line',
        forceFit: true,
        // width: 700,
        height: 300
    });
    chart2.source(dv2, {
        month: {
            range: [0, 1]
        }
    });
    chart2.tooltip({
        crosshairs: {
            type: 'line'
        }
    });
    chart2.axis('temperature', {
        label: {
            formatter: function formatter(val) {
                return val + '°C';
            }
        }
    });
    chart2.line().position('month*temperature').color('city');
    chart2.point().position('month*temperature').color('city').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
    });
    chart2.render();
    return chart2;
}




function initPie() {
    var _DataSet = DataSet,
        DataView = _DataSet.DataView;

    var data = [{
        item: '事例一',
        count: 40
    }, {
        item: '事例二',
        count: 21
    }, {
        item: '事例三',
        count: 17
    }, {
        item: '事例四',
        count: 13
    }, {
        item: '事例五',
        count: 9
    }];
    var dv = new DataView();
    dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
    });
    var chart = new G2.Chart({
        id: 'pie',
        forceFit: true,
        height: 300
    });
    chart.source(dv, {
        percent: {
            formatter: function formatter(val) {
                val = val * 100 + '%';
                return val;
            }
        }
    });
    chart.coord('theta', {
        radius: 0.75
    });
    chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack().position('percent').color('item').label('percent', {
        formatter: function formatter(val, item) {
            return item.point.item + ': ' + val;
        }
    }).tooltip('item*percent', function (item, percent) {
        percent = percent * 100 + '%';
        return {
            name: item,
            value: percent
        };
    }).style({
        lineWidth: 1,
        stroke: '#fff'
    });
    chart.render();
    return chart;
}
