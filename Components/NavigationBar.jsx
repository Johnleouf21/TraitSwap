import Button from 'react-bootstrap/Button'
import React from 'react'
import { ethers } from 'ethers'
import Navbar from 'react-bootstrap/Navbar'
import { useContext } from 'react'
import { ConnectionContext } from '../context'
import RandomMint from './RandomMint'


const NavigationBar = () => {
    // polygon mumbai
    const correctChain = '0x13881'
    // ganache testing
    // const correctChain = '0x1691'

    const [connected, setConnected, provider, setProvider, address, setAddress, isChainCorrect, setIsChainCorrect] = useContext(ConnectionContext)
    async function connect() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send('eth_requestAccounts', [])
        if (account.length > 0) {
            chainCheck(account,provider)
        }
    }

    async function chainCheck(account,provider) {
        var chain = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(chain)
        if (chain === correctChain) {
            
            setIsChainCorrect(true)
            setConnected(true)
            setProvider(provider)
            setAddress(account[0]);
        }
        else {
            setIsChainCorrect(false)
        }
    }

    return (
        <Navbar className='navbarMain text'>
            <Navbar.Brand>
                <img alt="" className='navLogo' src='Assets/Images/logo-min.png' />
            </Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                <Button onClick={connect} className='navConnectBtn'>
                    {
                        connected ?
                            <>Connected</> :
                            <>Connect Wallet</>
                    }
                </Button>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar