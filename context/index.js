import { createContext, useContext, useState, useEffect } from 'react';
import NFTABI from '../artifacts/contracts/TamagoSan.sol/TamagoSan.json'
import TraitABI from '../artifacts/contracts/Traits.sol/Traits.json'

const ConnectionContext = createContext({});
const ContractContext = createContext({});
const ServerContext = createContext({});



const Provider = ({ children }) => {
    const [connected, setConnected] = useState(false)
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState(null)
  const [isChainCorrect,setIsChainCorrect] = useState(null)
    const value = [connected, setConnected, provider, setProvider, address, setAddress, isChainCorrect, setIsChainCorrect]

    return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

export { ConnectionContext, Provider };

const Contract = ({ children }) => {
    const NFTAddress = '0xEC0E0030a775C3d43a312E464422Dec198A3DaD5'
    const TraitAddress = '0xAbE68a0442Cf4eed794820118e4F3fFDF619D29F'
    const value = [NFTABI, TraitABI, NFTAddress, TraitAddress]

    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

export { ContractContext, Contract };

const Server = ({ children }) => {
    const serverURL ='https://tamagosan-server-cmh4q.ondigitalocean.app/'
    const value = [serverURL]

    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

export { ServerContext, Server };
