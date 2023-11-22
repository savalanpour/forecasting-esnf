import React, {useEffect, useRef, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import s from "./Chart.module.css";
import dayjs from "dayjs";

const Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState(null)
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1", requestOptions)
    .then(response => response.json())
    .then(result => {
      setData(result.data)
      let x = [], y = []
      result?.data.forEach(item => {
        x.push(+item.priceUsd)
        y.push(dayjs(item.date).format('DD MMM'))
      })
      setX(x)
      setY(y)
    })
    .catch(error => console.log('error', error));
  }, [])
  console.log("x", x)
  console.log("y", y)
  const chartOptions = {
    chart: {
      type: 'spline',
      height: 600
    },
    title: {
      text: 'Bitcoin Price'
    },
    subtitle: {
      text: 'Source: ' +
        '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
        'target="_blank">Wikipedia.com</a>'
    },
    xAxis: {
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      //   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      categories: y,
      accessibility: {
        description: 'Months of the year'
      }
    },
    yAxis: {
      title: {
        text: 'USD'
      },
      labels: {
        format: '{value}'
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: [{
      name: 'Bitcoin Price',
      marker: {
        symbol: 'square'
      },
      // data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26, 22.8, 17.5, 12.1, 7.6]
      data: x
    
    }]
  };
  
  return (
    <div className={s.chart}>
      {data ? <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="chart"
        ref={chartRef}
      /> : null }
    </div>
  );
};

export default Chart;
