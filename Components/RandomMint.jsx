import { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { ConnectionContext, ContractContext, ServerContext } from '../context'
import { ethers } from 'ethers'
import axios from 'axios'
import { useState } from 'react'


const RandomMint = () => {

    const [NFTABI, TraitABI, NFTAddress, TraitAddress] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [serverUrl] = useContext(ServerContext)
    const [minted, setMinted] = useState(false)
    const [mintedIDs, setMintedIDs] = useState()
    const [mintedTamago, setMintedTamago] = useState()
    const [data, setData] = useState({})
    const [accounts, setAccounts] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [loader, setLoader] = useState(true);
    

    useEffect(() => {
        setLoader(false);
         fetchData()
       }, [accounts[0]])

       async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                
                const basePrice = await contract.basePrice();
                console.log(basePrice)
                const object = {
                  "basePrice": String(basePrice),
                }
                setData(object);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const incrementQuantity = () => {
        quantity + 1 <= 4 && setQuantity(quantity + 1);
    }
    const decrementQuantity = () => {
        quantity - 1 >= 1 && setQuantity(quantity - 1)
    }

    async function mintRandom(e) {
        e.target.innerHTML = 'Please wait!'
        var body = new FormData();
        body.append('address', ethers.utils.getAddress(address))
        console.log(address)
        if (quantity>=1) {
            axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                if (response.status === 200) {
                    var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                    response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                    let overrides = {
                        from: accounts[0],
                        value: (data.basePrice * 1).toString()
                    }
                    var tx1 = await contract.randomMint(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1, overrides)
                    e.target.innerHTML = "Minting NFT and Parts!"
                    var result = await tx1.wait()
                    if (result['status'] === 1) {
                        setMintedIDs((response.data['tokenIDs']))
                        setMintedTamago(await getTotalSupply())
                        setMinted(true)
                            if (quantity>=2) {
                                axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                    if (response.status === 200) {
                                        var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                        response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                        let overrides = {
                                            from: accounts[0],
                                            value: (data.basePrice * 1).toString()
                                        }
                                        var tx = await contract.randomMint(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1, overrides)
                                        e.target.innerHTML = "Minting NFT and Parts!"
                                        var result = await tx.wait()
                                        if (result['status'] === 1) {
                                            setMintedIDs((response.data['tokenIDs']))
                                            setMintedTamago(await getTotalSupply())
                                            setMinted(true)
                                                if (quantity===2) {
                                                    axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                                        if (response.status === 200) {
                                                            var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                                            response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                                            var txFree = await contract.randomFreeMint(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1)
                                                            e.target.innerHTML = "Minting NFT and Parts!"
                                                            var resultFree = await txFree.wait(1)
                                                            if (resultFree['status'] === 1) {
                                                                setMintedIDs((response.data['tokenIDs']))
                                                                setMintedTamago(await getTotalSupply())
                                                                setMinted(true)
                                                                    
                                                            }
                                                            else {
                                                                e.target.innerHTML = 'Failed'
                                                            }
                                                        }
                                                        else {
                                                            e.target.innerHTML = 'Failed'
                                                        }
                                                })}
                                                if (quantity>=3) {
                                                    axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                                        if (response.status === 200) {
                                                            var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                                            response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                                            let overrides = {
                                                                from: accounts[0],
                                                                value: (data.basePrice * 1).toString()
                                                            }
                                                            var tx = await contract.randomMint(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1, overrides)
                                                            e.target.innerHTML = "Minting NFT and Parts!"
                                                            var result = await tx.wait()
                                                            if (result['status'] === 1) {
                                                                setMintedIDs((response.data['tokenIDs']))
                                                                setMintedTamago(await getTotalSupply())
                                                                setMinted(true)
                                                                    if (quantity>=4) {
                                                                        axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                                                            if (response.status === 200) {
                                                                                var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                                                                response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                                                                let overrides = {
                                                                                    from: accounts[0],
                                                                                    value: (data.basePrice * 1).toString()
                                                                                }
                                                                                var tx = await contract.randomMint(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1, overrides)
                                                                                e.target.innerHTML = "Minting NFT and Parts!"
                                                                                var result = await tx.wait()
                                                                                if (result['status'] === 1) {
                                                                                    setMintedIDs((response.data['tokenIDs']))
                                                                                    setMintedTamago(await getTotalSupply())
                                                                                    setMinted(true)
                                                                                        if (quantity===4) {
                                                                                            axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                                                                                if (response.status === 200) {
                                                                                                    var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                                                                                    response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                                                                                    var txFree = await contract.randomFreeMint2(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1)
                                                                                                    e.target.innerHTML = "Minting NFT and Parts!"
                                                                                                    var resultFree = await txFree.wait()
                                                                                                    if (resultFree['status'] === 1) {
                                                                                                        setMintedIDs((response.data['tokenIDs']))
                                                                                                        setMintedTamago(await getTotalSupply())
                                                                                                        setMinted(true)
                                                                                                            if (quantity===4) {
                                                                                                                axios.post(serverUrl + 'mintRandom', body, { headers: { "Content-Type": "multipart/form-data" } }).then(async (response) => {
                                                                                                                    if (response.status === 200) {
                                                                                                                        var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
                                                                                                                        response.data['tokenIDs'] = getArray(response.data['tokenIDs'])
                                                                                                                        var txFree = await contract.randomFreeMint2(address, response.data['tokenIDs'], response.data['messageHash'], response.data['signature'], 1)
                                                                                                                        e.target.innerHTML = "Minting NFT and Parts!"
                                                                                                                        var resultFree = await txFree.wait()
                                                                                                                        if (resultFree['status'] === 1) {
                                                                                                                            setMintedIDs((response.data['tokenIDs']))
                                                                                                                            setMintedTamago(await getTotalSupply())
                                                                                                                            setMinted(true)
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            e.target.innerHTML = 'Failed'
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        e.target.innerHTML = 'Failed'
                                                                                                                    }
                                                                                                            })}
                                                                                                    }
                                                                                                    else {
                                                                                                        e.target.innerHTML = 'Failed'
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    e.target.innerHTML = 'Failed'
                                                                                                }
                                                                                        })}
                                                                                }
                                                                                else {
                                                                                    e.target.innerHTML = 'Failed'
                                                                                }
                                                                            }
                                                                            else {
                                                                                e.target.innerHTML = 'Failed'
                                                                            }
                                                                    })}
                                                            }
                                                            else {
                                                                e.target.innerHTML = 'Failed'
                                                            }
                                                        }
                                                        else {
                                                            e.target.innerHTML = 'Failed'
                                                        }
                                                })}

                                        }
                                        else {
                                            e.target.innerHTML = 'Failed'
                                        }
                                    }
                                    else {
                                        e.target.innerHTML = 'Failed'
                                    }
                            })}
                    }
                    else {
                        e.target.innerHTML = 'Failed'
                    }
                }
                else {
                    e.target.innerHTML = 'Failed'
                }
        })}
        
        
        

    }

    function getArray(response) {
        console.log(response)
        var arr = []
        var splitResponse = response.split(',')
        splitResponse.map((value) => {
            arr.push(parseInt(value.replace('[', '').replace(']', '')))
        })
        return arr
    }

    async function getTotalSupply() {
        var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider)
        var result = await contract.totalSupply()
        return parseInt(result.toString())
    }
    
        return (
            <>
                <div>
                    <div>
                        <img className='eggHolder' alt='' style={{ position: 'relative', width: 'auto' }} src='Assets/Images/starterPack.png' />
                    </div>
                    <Button onClick={() => decrementQuantity()} className='mintBtn'>-</Button>
                    <Button onClick={(e) => mintRandom(e)} className='mintBtn'>{quantity} Random Mint!</Button>
                    <Button onClick={() => incrementQuantity()} className='mintBtn'>+</Button>
                    
                </div>
                <div>
                    cost : {String(data.basePrice * quantity/10**18)}
                </div>
                <div className='notice'>
                    There are this choices :<br/>
                    - Mint 1 for 1 NFT,<br/>
                    - Mint 2 for 2 NFT + 1 free,<br/>
                    - Mint 3 for 3 NFT,<br/>
                    - Mint 4 for 4 NFT + 2 free.<br/>
                    - Don&apos;t miss to accept all transactions,<br/>
                    - Go to the view/edit page for amazing Building.
                </div>
            </>
        );  
}

export default RandomMint;