'use strict';

function getCharts() {
    var user = new AjaxHandler();
    user.statistics(function (data, state) {
        var all_graph = data.data;
        var _word = wordChart(all_graph.graph3);
        var _line = initLine(all_graph.graph2);
        var _pie = initPie(all_graph.graph1);
    }, function (data, state) {
        new Toast().showMsg('网络连接超时', 1500);
        wordChart([]);
        initLine([]);
        initPie([]);
    });
}

function wordChart(data1) {
    //console.log(!Array.isArray(data1)||data1.length==0)
    if (!Array.isArray(data1) || data1.length == 0) {
        document.getElementById('word').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6682\u65E0\u8BCD\u4E91</p>';
        return;
    }
    document.getElementById('word').innerHTML = '';
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

    var dv = new DataSet.View().source(data1);
    var range = dv.range('value');
    var min = range[0];
    var max = range[1];
    dv.transform({
        type: 'tag-cloud',
        fields: ['text', 'value'], // 参与标签云layout的字段集
        font: 'Verdana',
        size: [400, 300],
        padding: 0,
        spiral: 'rectangular', // 标签螺旋排布规律函数 'archimedean' || 'rectangular' || {function}
        fontSize: function fontSize(d) {
            if (d.value) {
                return (d.value - min) / (max - min) * (80 - 24) + 24;
            }
            return 0;
        },
        text: function text(d) {
            return d.text;
        },
        // 生成标签文本的回调函数，d为一行数据
        timeInterval: Infinity // 最大迭代时间
        //  imageMask: {
        //      Image
        //  }, // Image的实例，必须是loaded状态
    });
    var chart = new G2.Chart({
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
        }
    });
    chart.render();
    return chart;
}

function initLine(data2) {
    if (!Array.isArray(data2) || data2.length == 0) {
        document.getElementById('line').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6682\u65E0\u4E0A\u4F20\u4E0B\u8F7D\u52A8\u6001</p>';
        return;
    }
    //    console.log(data2)
    document.getElementById('line').innerHTML = '';
    var ds = new DataSet();
    var dv2 = ds.createView().source(data2);
    dv2.transform({
        type: 'fold',
        fields: ['upload', 'download'], // 展开字段集
        key: '上传/下载', // key字段
        value: '个数' // value字段
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
    chart2.axis('个数', {
        label: {
            formatter: function formatter(val) {
                return val + '个';
            }
        }
    });
    chart2.line().position('month*个数').color('上传/下载');
    chart2.point().position('month*个数').color('上传/下载').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
    });
    chart2.render();
    return chart2;
}

function initPie(data) {
    if (!Array.isArray(data) || data.length == 0) {
        document.getElementById('pie').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6682\u65E0\u997C\u56FE\u6570\u636E</p>';
        return;
    }
    document.getElementById('pie').innerHTML = '';
    var _DataSet = DataSet,
        DataView = _DataSet.DataView;

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