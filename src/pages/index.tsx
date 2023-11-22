import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'
import Menu from "@/components/Menu/Menu";
import {Button} from "antd";
const PriceCurveChart = dynamic(() => import('../components/Chart/Chart'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="content">
      <div className="border-r-gray-200 border-r">
        <div className="logo">ENSF 619</div>
        
        <Menu />
      </div>
      <div className="content-box">
        <div style={{minHeight: "600px"}}><PriceCurveChart /></div>
        <div className="mb-32 text-center flex w-40 justify-center mx-auto lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Button className="btn" type="primary" >Prediction</Button>
        </div>
      </div>
    </main>
  )
}
