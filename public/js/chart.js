var TITLE = 'Season Leaderboard';
var X_AXIS = 'Player Names';
var Y_AXIS = 'Score'
var SHOW_LEGEND = false;

const config = {
    type: 'bar',
    data: data,
    options: {
        title: {
            display: true,
            text: TITLE,
            fontSize: 14,
          },
          scales: {
            xAxes: [{
              stacked: STACKED,
              scaleLabel: {
                display: X_AXIS
              },
              gridLines: {
                display: SHOW_GRID,
              },
              ticks: {
            beginAtZero:true
              }
        
    }],
    yAxes: [{
        beginAtZero: true,
        scaleLabel: {
          display: Y_AXIS
        },
        gridLines: {
          display: SHOW_GRID,
        },
        ticks: {
          beginAtZero: true,

        }
      }]
    },
}
}