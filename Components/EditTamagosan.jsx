import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
// import Body from "../Assets/NFT Layers/Body/1.png"
import { ConnectionContext, ContractContext, ServerContext } from "../context";
import { useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

const EditTamagosan = (props) => {

    const [serverURL] = useContext(ServerContext)
    var transparentImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    const [part1, setPart1] = useState()
    const [part2, setPart2] = useState(transparentImage)
    const [part3, setPart3] = useState(transparentImage)
    const [part4, setPart4] = useState(transparentImage)
    const [part5, setPart5] = useState(transparentImage)
    const [part6, setPart6] = useState(transparentImage)
    const [part7, setPart7] = useState(transparentImage)
    const [part8, setPart8] = useState(transparentImage)
    const [connected, setConnected, provider, , address, setAddress] = useContext(ConnectionContext)
    const [NFTABI, TraitABI, NFTAddress, TraitAddress] = useContext(ContractContext)
    const [staked, setStaked] = useState([])
    const [stakedIDs, setStakedIDs] = useState([])
    const [availableTraits, setAvailableTraits] = useState([])
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [ownedNFTs, setOwnedNFTs] = useState([])
    const [noNFT, setNoNFT] = useState()
    const [editMode, setEditMode] = useState(false)
    const [selectedID, setSelectedID] = useState()
    const tamagoURL = 'https://tamagosan.fra1.digitaloceanspaces.com/tamagosanImage/'


    useEffect(() => {
        async function getStakedIDs() {
            var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
            var result = await contract.getStakedTraits(props.tokenID)
            setStakedIDs(result.toString().split(','))
            getData(result.toString().split(','))
        }
        getStakedIDs()
        getOwnedTraits()
        getOwnedTamagosans()
    }, []);

    async function getOwnedTraits() {
        var urlPath = serverURL + `getOwnedTraits/${address}?chain=mumbai&traitAddress=${TraitAddress}`
        var response = await axios.get(urlPath)
        console.log(response.data)
        setAvailableTraits(response.data)
    }

    async function approve(e) {
        try {
            var contract = new ethers.Contract(TraitAddress, TraitABI.ABI, provider.getSigner())
            var result = await contract.isApprovedForAll(address, NFTAddress)
            if (result === false) {
                var tx = await contract.setApprovalForAll(NFTAddress, true)
                var result = await tx.wait()
                if (result['status'] === 1) {
                    console.log('approved')
                }
            }
        }
        catch (err) {
            e.target.innerHTML = "Failed..Try again!"
        }
    }

    async function getData(stakedIDs) {
        var arr = stakedIDs
        var responseData = []
        for (var i = 0; i < arr.length; i++) {
            var response = await axios.get(serverURL + 'metadataTrait/' + arr[i].toString())
            responseData.push(response.data)
        }
        seggregateData(responseData)
    }

    function seggregateData(data) {
        // {category/trait:[image,level]}
        var traits = {}
        data.forEach((value) => {
            if (!traits[value['data']['Trait']]) {
                traits[value['data']['Trait']] = [value['image'], value['data']['Level']]
            }
        }
        )
        setupStakedLayers(traits)
        setStaked(traits)
    }

    function setupStakedLayers(data) {
        Object.entries(data).map((value) => {
            toggleLayer(value[0], value[1][0])
        })
    }

    function toggleLayer(category, image) {
        if (category === 'LOWER BODY') {
            if (part1 === image) {
                setPart1(transparentImage)
            }
            else {
                setPart1(image)
            }

        }
        else if (category === 'EARS') {
            if (part2 === image) {
                setPart2(transparentImage)
            }
            else {
                setPart2(image)
            }

        }
        else if (category === 'EYES') {
            if (part3 === image) {
                setPart3(transparentImage)
            }
            else {
                setPart3(image)
            }
        }
        else if (category === 'UPPER HEAD') {
            if (part4 === image) {
                setPart4(transparentImage)
            }
            else {
                setPart4(image)
            }
        }
        else if (category === 'ARMS') {
            if (part5 === image) {
                setPart5(transparentImage)
            }
            else {
                setPart5(image)
            }
        }
        else if (category === 'NOSE') {
            if (part7 === image) {
                setPart7(transparentImage)
            }
            else {
                setPart7(image)
            }
        }
        else if (category === 'MOUTH') {

            if (part6 === image) {
                setPart6(transparentImage)
            }
            else {
                setPart6(image)
            }
        }
        else if (category === 'EYE ACCESSORIES') {
            if (part8 === image) {
                setPart8(transparentImage)
            }
            else {
                setPart8(image)
            }
        }
    }

    function partClick(category, image, e, staked = false) {
        e = e.target
        var list = document.getElementsByName(category)
        list.forEach(element => {
            if (element.classList.contains('outline')) {
                element.classList.toggle('outline')
            }
        });
        if (category === 'LOWER BODY') {
            if (part1 === image) {
                setPart1(transparentImage)
            }
            else {
                setPart1(image)
                e.classList.toggle('outline')
            }

        }
        else if (category === 'EARS') {
            if (part2 === image) {
                setPart2(transparentImage)
            }
            else {
                setPart2(image)
                e.classList.toggle('outline')
            }

        }
        else if (category === 'EYES') {
            if (part3 === image) {
                setPart3(transparentImage)
            }
            else {
                setPart3(image)
                e.classList.toggle('outline')
            }
        }
        else if (category === 'UPPER HEAD') {
            if (part4 === image) {
                setPart4(transparentImage)
            }
            else {
                setPart4(image)
                e.classList.toggle('outline')
            }
        }
        else if (category === 'ARMS') {
            if (part5 === image) {
                setPart5(transparentImage)
            }
            else {
                setPart5(image)
                e.classList.toggle('outline')
            }
        }
        else if (category === 'NOSE') {
            if (part7 === image) {
                setPart7(transparentImage)
            }
            else {
                setPart7(image)
                e.classList.toggle('outline')
            }
        }
        else if (category === 'MOUTH') {

            if (part6 === image) {
                setPart6(transparentImage)
            }
            else {
                setPart6(image)
                e.classList.toggle('outline')
            }
        }
        else if (category === 'EYE ACCESSORIES') {
            if (part8 === image) {
                setPart8(transparentImage)
            }
            else {
                setPart8(image)
                e.classList.toggle('outline')
            }
        }
    }

    async function requestServer(tokenIDs) {
        var data = new FormData()
        data.append('tokenIDs', tokenIDs)
        data.append('NFTID', props.tokenID)
        var request = await axios.post(serverURL + 'stake/', data, { headers: { "Content-Type": "multipart/form-data" } });
        if (request.status === 200) {
            return true;
        }
    }

    async function editTamagosan(e) {
        console.log(stakedIDs)
        if (stakedIDs.length > 0) {

        // e.target.innerHTML ="Approving.."
        // await approve(e)
        var selectedParts = document.getElementsByClassName('outline')
        // if (selectedParts.length === stakedIDs.length) {
        //     return
        // }
        e.target.innerHTML = "Editing..."
        var tokenIDs = []
        var amounts = []
        for (let i = 0; i < selectedParts.length; i++) {
            let splitURL = selectedParts[i].src.split('/')
            tokenIDs.push(parseInt(splitURL.pop()))
        }
        //not of intersection of arrays
        var unstakeIDs = stakedIDs.filter(value => !tokenIDs.includes(parseInt(value)))
        for (let i = 0; i < unstakeIDs.length; i++) {
            amounts.push(1)
        }
        var amountsStake = []
        var stakeIDs = tokenIDs.filter(value => !stakedIDs.includes(value.toString()))
        for (let i = 0; i < stakeIDs.length; i++) {
            amountsStake.push(1)
        }
        var tokenIDsUnStake = stakedIDs.filter(value=> !unstakeIDs.includes(value))
        try {
            var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
            console.log(stakeIDs)
            console.log(amountsStake)
            console.log(unstakeIDs)
            console.log(amounts)
            
            
            if(unstakeIDs.length>0 && unstakeIDs[0]!=''){
                var tx = await contract.unstakeParts(props.tokenID, tokenIDsUnStake, unstakeIDs, amounts)
                var result = await tx.wait()
            }
            else{
                var result = true
            }
            if (result['status'] === 1 || result === true) {
                if(stakeIDs.length>0){
                    console.log("wow")
                    var tx = await contract.stakeParts(props.tokenID, tokenIDs, stakeIDs, amountsStake)
                    var resultResponse = await tx.wait()
                }
                else{
                    var resultResponse = true
                }
                if(resultResponse['status']===1 || resultResponse===true){
                //if(true){
                await requestServer(tokenIDs)
                document.getElementById('partsDiv').style.display = 'none'
                document.getElementById('secondPartsDiv').style.display = 'none'
                document.getElementById('eggs').style.display = 'none'
                document.getElementById('txt').style.marginTop = '300px'
                document.getElementById('txt').style.display = 'inline'
                document.getElementById('txt1').style.display = 'none'
                document.getElementById('stakeBTN').style.display = 'none'
                document.getElementById('availableParts').style.display = 'none'
                // }
                }
            }
            else {
                e.target.innerHTML = "Failed...Try again!"
            }
        }
        catch (err) {
            e.target.innerHTML = "Failed...Try again!"
            console.log(err)
        }
        }
        else {
            e.target.innerHTML ="Approving.."
        await approve(e)
        e.target.innerHTML="Staking..."
        var selectedParts = document.getElementsByClassName('outline')
        if(selectedParts.length===0){
            return
        }
        var tokenIDs=[]
        var amounts=[]
        for(var i=0;i<selectedParts.length;i++){
            var splitURL = selectedParts[i].src.split('/')
            tokenIDs.push(parseInt(splitURL.pop()))
            amounts.push(1)
        }
        try{
        var contract = new ethers.Contract(NFTAddress,NFTABI.abi,provider.getSigner())
        console.log(props.tokenID)
        console.log(tokenIDs)
        console.log(amounts)
        
        var tx = await contract.stakeParts(props.tokenID,tokenIDs,tokenIDs,amounts)
        var result = await tx.wait()
        if(result['status']===1){
        // if(true){
            await requestServer(tokenIDs)
            document.getElementById('partsDiv').style.display='none'
            document.getElementById('secondPartsDiv').style.display='none'
            document.getElementById('eggs').style.display='none'
            document.getElementById('txt').style.marginTop='300px'
            document.getElementById('txt').style.display='inline'
            
            document.getElementById('stakeBTN').style.display='none'
        }
        else{
            e.target.innerHTML="Failed...Try again!"
        }
        }
        catch(err){
            e.target.innerHTML="Failed...Try again!"
            console.log(err)
        }
        }

        
    }
    
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

    return (
        <div>
            <div className="tamagoContainer">
            <h3>Partsless TamagoSan! #{props.tokenID}</h3>
                <img className='tamagoImage' src={serverURL + 'tamagoImage/' + props.tokenID } />
            </div>
            <h3>Building preview TamagoSan! #{props.tokenID}</h3>
            <div id='tamago' style={{ width: '100%', height: '250px', display: 'flex', justifyContent: 'center', backgroundColor: 'none' }}>
                <img className='eggHolder' src={tamagoURL + props.tokenID + '.png'} style={{zIndex: '1'}}/>
                <img alt="" className='eggHolder' src={part1} style={{zIndex: '3'}}/>
                <img alt="" className='eggHolder' src={part2} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part3} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part4} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part5} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part6} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part7} style={{zIndex: '2'}}/>
                <img alt="" className='eggHolder' src={part8} style={{zIndex: '2'}}/>
                <h1 id='txt' style={{ display: 'none' }}>Tamago Trait Edited!</h1>
            </div>
            <h1 id='txt1'>Staked Parts</h1>
            <div id='partsDiv'>
                {
                    Object.entries(staked).slice(0, 4).map((value, key) => {
                        return (
                            <>
                                <div style={{ display: 'inline-block' }}>
                                    <>
                                        <img alt="" name={value[0]} className="partsHolder outline" src={value[1][0]} onClick={(e) => { partClick(value[0], value[1][0], e, true) }} />
                                        <h6 className={value[1][1]}>{value[1][1]}</h6>
                                    </>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div id='secondPartsDiv'>
                {
                    Object.entries(staked).slice(4, staked.length).map((value, key) => {
                        return (
                            <>
                                <div style={{ display: 'inline-block' }}>
                                    <>
                                        <img alt="" name={value[0]} className="partsHolder outline" src={value[1][0]} onClick={(e) => { partClick(value[0], value[1][0], e, staked) }} />
                                        <h6 className={value[1][1]}>{value[1][1]}</h6>
                                    </>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div id='availableParts' className="availablePartsDiv">
                <h1>Available Traits</h1>
                {
                    Object.entries(availableTraits).slice().map((valueArray) => {
                        return (<div>{valueArray[1].map((value) => {
                            console.log(value)
                            return (
                                <div style={{ display: 'inline-block' }}>
                                    <>
                                        <img name={valueArray[0]} className="partsHolder" src={value[0]} onClick={(e) => { partClick(valueArray[0], value[0], e, staked) }} />
                                        <h6 className={value[1]}>{value[1]}</h6>
                                    </>
                                </div>
                            )
                        })}</div>)
                    })
                }
            </div>
            <Button id='stakeBTN' style={{ marginTop: '10px', marginBottom: '10px' }} onClick={(e) => { editTamagosan(e) }} className="mintBtn">Edit</Button>
        </div >
    );

}

export default EditTamagosan;