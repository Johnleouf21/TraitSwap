import React from 'react'
import { useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import Link from 'next/link'
import { ConnectionContext } from '../context'


const Body = () => {

    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

    if (!connected) {
        if (isChainCorrect === null) {
            return (
                <div className='text bodyDiv'>
                    <img width={400} src='Assets/Images/banner_image_min.png' />
                    <h2 className='bodyText'>Create your customizable TAMAGOSAN!</h2>
                </div>
            )
        } else if (isChainCorrect === false) {
            return (<h1 className='text'>Incorrect Chain!</h1>);
        }
    }
    else if (connected) {
        return (
            <div>
                <ButtonGroup>
                    <Link href='/'>
                        <Button style={{margin: '5px'}}>Mint</Button>
                    </Link>
                    <Link href='View'>
                        <Button style={{margin: '5px'}}>View/Edit</Button>
                    </Link>
                </ButtonGroup>
            </div>
        );
    }
}

export default Body