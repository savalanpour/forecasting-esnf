import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'
import Menu from "@/components/Menu/Menu";
import {Button, Radio} from "antd";
const Chart = dynamic(() => import('../components/Chart/Chart'), {
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <main className="content">
        <div className="border-r-gray-200 border-r">
          <div className="logo">ENSF 619</div>
          <Menu active="2" />
        </div>
        <Chart />
      </main>
    </div>
  )
}
