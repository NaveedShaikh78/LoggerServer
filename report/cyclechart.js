function cyclechart(reportData){
  var chartobj={}
  cycletime=[];
  idletime=[];
  $.each(sdata, function(val, item) {
    cycletime.push(item.cycletime);
  idletime.push(item.idletime);
});
  Highcharts.chart('reportchart', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Efficiency Optimization by Branch'
      },
      xAxis: {
          categories: [
              'Cycle',
              'Idle'
          ]
      },
      yAxis: [{
          min: 0,
          title: {
              text: 'Time Taken'
          }
      }, {
          title: {
              text: 'Profit (millions)'
          },
          opposite: true
      }],
      legend: {
          shadow: false
      },
      tooltip: {
          shared: true
      },
      plotOptions: {
          column: {
              grouping: false,
              shadow: false,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Employees',
          color: 'rgba(161,230,168,1)',
          data: cycletime,
          pointPadding: 0.3,
          pointPlacement: -0.2
      }, {
          name: 'Employees Optimized',
          color: 'rgba(235,70,103,1)',
          data: idletime,
          pointPadding: 0.44,
          pointPlacement: -0.2
      }]
  });
}
