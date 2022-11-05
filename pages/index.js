import Head from 'next/head'
import RandomMint from '../Components/RandomMint'
import { ConnectionContext } from '../context'
import { useContext } from 'react'
import React from 'react'





export default function Home() {

  const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

  if (connected) {
    return (
      
      <div className="App text">
      <Head>
        <title>TamagoSan! Dapp</title>
        <link rel="icon" href="/Assets/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
              <RandomMint/> 
      </div>
    )
  }
}
