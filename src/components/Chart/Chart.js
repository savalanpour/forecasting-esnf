import React, {useEffect, useRef, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import s from "./Chart.module.css";
import dayjs from "dayjs";
import {Button} from "antd";

const Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState(null)
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  const [last, setLast] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=m30", requestOptions)
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
      console.log(JSON.stringify(result?.data.length), result?.data.length)
      setLast(result?.data.length)
    })
    .catch(error => console.log('error', error));
  }, [])
  const chartOptions = {
    chart: {
      type: 'spline',
      height: 600
    },
    title: {
      text: 'Bitcoin Price'
    },
    subtitle: {
      text: 'ESNF - 619'
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
      data: x,
      zoneAxis: 'x',
      zones: [{
        value: last,
        color: '#2caffe'
      }, {
        color: '#1f7834'
      }]
    },]
  };
  const peredict = () => {
    setLoading(true)
    setTimeout(()=>{
      setX([...x,
        ...x.splice(0,200),
      ] )
      setY([...y,
        ...y.splice(0,200),
      ] )
      setLoading(false)
    }, 3000)
  }
  
  return (
    <div className="content-box">
      <div style={{minHeight: "600px"}}>
        <div className={s.chart}>
          {data ? <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            constructorType="chart"
            ref={chartRef}
          /> : null }
        </div>
      </div>
      <div className="mb-32 text-center flex w-40 justify-center mx-auto lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {loading ? <img style={{margin: "-10px auto 0", display: "block"}} width={80} src="/icegif-1265.gif"/>: <Button className="btn" type="primary" onClick={peredict} >Prediction Next</Button>}
      </div>
    </div>
  );
};

export default Chart;
