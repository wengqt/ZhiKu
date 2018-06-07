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
     size: [500, 500], // 画布size，[ width, height ]
     padding: 0,
     spiral: 'rectangular', // 标签螺旋排布规律函数 'archimedean' || 'rectangular' || {function}
      fontSize(d) {
        if (d.value) {
          return (d.value - min) / (max - min) * (80 - 24) + 24;
        }
        return 0;
      } ,// 计算标签字体大小的回调函数，d为一行数据
     text(d) {
         return d.text
     }, // 生成标签文本的回调函数，d为一行数据
     timeInterval: Infinity, // 最大迭代时间
     //  imageMask: {
     //      Image
     //  }, // Image的实例，必须是loaded状态
 })


 function wordChart() {
     const chart = new G2.Chart({
         id: 'word',
         width: 500,
         height: 500,
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
            fontWeight:'bolder' // 选中的样式
        },
      });
     chart.render();
 }
 wordChart();