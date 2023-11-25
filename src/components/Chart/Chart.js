import React, {useEffect, useRef, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import s from "./Chart.module.css";
import dayjs from "dayjs";
import {Button, Radio} from "antd";
// import axios from 'axios';

const Chart = () => {
  const chartRef = useRef();
  const [data, setData] = useState(null)
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  const [last, setLast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('d1');
  
  useEffect(() => {
    //"BINANCE"
    // BTC
    // let config = {
    //   method: 'get',
    //   maxBodyLength: Infinity,
    //   url: 'https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_BTC_USDT/history?period_id=1HRS&time_start=2021-03-01T00:00:00&limit=1000',
    //   headers: {
    //     'Accept': 'text/plain',
    //     // 'X-CoinAPI-Key': 'E9C06A59-E16F-4B47-8B99-DAADD9A07685'
    //     'X-CoinAPI-Key': 'A24A2275-D9C1-4C69-88EF-F8AEA1B52808'
    //   }
    // };
    //
    // let x = [], y = []
    // axios(config)
    // .then((response) => {
    //   console.log(response.data);
    //   response?.data.forEach(item => {
    //     x.push(Math.round(item.price_close))
    //     y.push(item.time_close)
    //   })
    //   setX(x)
    //   setY(y)
    //   // setLast(response?.data?.length)
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    //
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let url;
    const today = new Date();
    const Date180 = new Date(new Date().setDate(today.getDate() - 180));
    const Date60 = new Date(new Date().setDate(today.getDate() - 60));
    const Date30 = new Date(new Date().setDate(today.getDate() - 29));
    if(type === "d1") url = `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=1411470720000&end=${+today}`;
    if(type === "h6") url = `https://api.coincap.io/v2/assets/bitcoin/history?interval=h6&start=${+Date180}&end=${+today}`;
    if(type === "h2") url = `https://api.coincap.io/v2/assets/bitcoin/history?interval=h2&start=${+Date60}&end=${+today}`;
    if(type === "h1") url = `https://api.coincap.io/v2/assets/bitcoin/history?interval=h1&start=${+Date30}&end=${+today}`;
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      setData(result.data)
      let x = [], y = []
      result?.data.forEach(item => {
        x.push(+item.priceUsd)
        y.push(dayjs(item.date).format('YYYY DD MMM'))
      })
      setX(x)
      setY(y)
      console.log(JSON.stringify(result?.data.length), result?.data.length)
      setLast(result?.data.length)
    })
    .catch(error => console.log('error', error));
  }, [type])
  
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
      <Radio.Group
        value={type}
        style={{display: "flex", width: "70%", margin: "0 auto 20px"}}
        onChange={(e) => setType(e.target.value)}
      >
        <Radio.Button style={{flex: 1, textAlign: "center"}} value="h1">H1</Radio.Button>
        <Radio.Button style={{flex: 1, textAlign: "center"}} value="h2">H2</Radio.Button>
        <Radio.Button style={{flex: 1, textAlign: "center"}} value="h6">H6</Radio.Button>
        <Radio.Button style={{flex: 1, textAlign: "center"}} value="d1">Daily</Radio.Button>
      </Radio.Group>
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
