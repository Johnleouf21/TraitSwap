import { useContext, useState } from "react";
import { ConnectionContext, ContractContext } from "../context";
import { ethers } from "ethers";
import { useEffect } from "react";
import EditTamagosan from "./EditTamagosan";

const ViewEditTamagosan = () => {

    const [editMode, setEditMode] = useState(false)
    const [selectedID, setSelectedID] = useState()
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [NFTABI, TraitABI, NFTAddress, TraitAddress] = useContext(ContractContext)
    const tamagoURL = 'https://tamagosan.fra1.digitaloceanspaces.com/tamagosanImage/'
    const [ownedNFTs, setOwnedNFTs] = useState([])
    const [noNFT, setNoNFT] = useState()

    useEffect(() => {
        getOwnedTamagosans()
    },[])

    async function getOwnedTamagosans() {
        var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
        var result = await contract.getOwnedNftIDs()
        if (result.toString() === '') {
            setNoNFT(true)
        }
        else {
            result = result.toString().split(',')
            setOwnedNFTs(result)
        }
    }

    function viewStakedParts(ID) {
        setSelectedID(ID)
        setEditMode(true)
    }

    if (!editMode) {
        if (noNFT) {
            return (<h1 style={{marginTop:'20px'}}>No NFT Owned Mint a Tamagosan!</h1>)
        }
        else {
            return (
                <>
                    <div className="tamagoContainer">
                        <h3>Owned Tamagosans</h3>
                        {ownedNFTs.slice(0, 4).map((NFT) => {
                            return (
                                <img onClick={() => viewStakedParts(NFT)} className='tamagoImage' src={tamagoURL + NFT + '.png' + '?t='+new Date().getTime()} />
                            )
                        })}
                    </div>
                    <div className="tamagoContainer">
                            {ownedNFTs.slice(4, 8).map((NFT) => {
                                return (
                                    <img onClick={() => viewStakedParts(NFT)} className='tamagoImage' src={tamagoURL + NFT + '.png' + '?t='+new Date().getTime()} />
                                )
                            })}
                    </div>
                    <div className="tamagoContainer">
                            {ownedNFTs.slice(8, 12).map((NFT) => {
                                return (
                                    <img onClick={() => viewStakedParts(NFT)} className='tamagoImage' src={tamagoURL + NFT + '.png' + '?t='+new Date().getTime()} />
                                )
                            })}
                    </div>
                    <div className="tamagoContainer">
                            {ownedNFTs.slice(12, 16).map((NFT) => {
                                return (
                                    <img onClick={() => viewStakedParts(NFT)} className='tamagoImage' src={tamagoURL + NFT + '.png' + '?t='+new Date().getTime()} />
                                )
                            })}
                    </div>
                    <div className="tamagoContainer">
                            {ownedNFTs.slice(16, 20).map((NFT) => {
                                return (
                                    <img onClick={() => viewStakedParts(NFT)} className='tamagoImage' src={tamagoURL + NFT + '.png' + '?t='+new Date().getTime()} />
                                )
                            })}
                    </div>
                </>
            );
        }
    }
    else {
        return (
            <EditTamagosan tokenID={selectedID} />
        )
    }
}

export default ViewEditTamagosan;