import React from 'react';
import Highcharts from "highcharts";
import ReactHighcharts from "react-highcharts";

import HighchartsMore from "highcharts-more";
HighchartsMore(ReactHighcharts.Highcharts);
import HighchartsExporting from "highcharts-exporting";
HighchartsExporting(ReactHighcharts.Highcharts);

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      config: {

        chart: {
            type:'bar'
        },

        title: {
            text: 'Author Profile Comparison'
        },
    
        subtitle: {
            text: 'Source: semanticscholar.com'
        },
    
        yAxis: {
            title: {
                text: 'Number/Proportion'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },

        xAxis: {
            title: {
                title:'Author Id'
            },
            categories: []
        },
    
        series: [],

        // series: [{
        //     name: 'Installation',
        //     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        // }, {
        //     name: 'Manufacturing',
        //     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        // }, {
        //     name: 'Sales & Distribution',
        //     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        // }, {
        //     name: 'Project Development',
        //     data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        // }, {
        //     name: 'Other',
        //     data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        // }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    }
    }
    this.handleChart(this.props.data)
  }

  handleChart(authors){
    let state = this.state;
    let attributes = ['citationVelocity','InfluentialCitations','noOfpapers','upwardTrending'];
    authors.forEach((author,i)=>{
        state.config.xAxis.categories.push(author.id);
    })
    this.setState(state);
    for(var att=0;att<attributes.length;att++){
    state.config.series.push({name:attributes[att],data:[]});
    authors.forEach((author,i)=>{
        if(att==0)
            state.config.series[att].data.push(author.data.citationVelocity);
        else if(att==1)
            state.config.series[att].data.push(author.data.influentialCitationCount);
        else if(att==2)
            state.config.series[att].data.push(author.data.papers.length);
        else
            state.config.series[att].data.push(author.data.upTrendCount);
        // console.log(author.data.upTrendCount)
    })
    }
    // console.log(state.config.series)
    this.setState(state);
  }


  render() { 
    return (
      <div>
        <ReactHighcharts config = {this.state.config}></ReactHighcharts>
      </div>
    )
  }
} 
export default ChartComponent;
