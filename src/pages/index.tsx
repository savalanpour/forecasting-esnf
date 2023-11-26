import Head from 'next/head'
import Link from 'next/link';
import Menu from "@/components/Menu/Menu";
import {Tooltip} from "antd";

export default function Home() {
  return (
    <div>
      <main className="content">
        <div className="border-r-gray-200 border-r">
          <div className="logo">ENSF 619</div>
          <Menu active="1" />
        </div>
        <div className="box-product">
          <div className="row-product">
            <Link href="/bitcoin">
              <div className="box" style={{cursor: "pointer", background: "#d1e7dd"}}>
                <img src="/images/bitoin-new.png" width={140} />Bitcoin
              </div>
            </Link>
            <Tooltip placement="top" title="Coming Soon">
              <div className="box">
                <img src="/images/Weather.png" width={140} />Weather</div>
            </Tooltip>
          </div>
          <div className="row-product">
            <Tooltip placement="top" title="Coming Soon">
              <div className="box">
                <img src="/images/Influenza.png" height={140} />Influenza
              </div>
            </Tooltip>
            <Tooltip placement="top" title="Coming Soon">
              <div className="box">
                <img src="/images/Electricity.png" height={140} />Electricity
              </div>
            </Tooltip>
          </div>
        </div>
      </main>
    </div>
  )
}
