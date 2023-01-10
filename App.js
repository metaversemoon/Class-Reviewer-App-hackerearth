import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import HomeGallery from './components/home-container/gallery/HomeGallery'
import LandingPage from './components/landing/LandingPage'
import Profile from './components/home-container/profile/Profile'
import CreateProfile from './components/create-profile/CreateProfile'
import PostComment from './components/create-profile/PostComment'
import CreateLinks from './components/create-links/CreateLinks'
import MyProfile from './components/home-container/myprofile/MyProfile'
import Notifications from './components/notifications/Notifications'
import DonateNFT from './components/donate-nft/DonateNFT'
import Web3Modal from 'web3modal'
// import XmtpChat from './components/xmtp-chat/XmtpChat'
import ABI from './artifacts/contracts/Ratemyclass.sol/Ratemyclass.json'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

import UAuth from '@uauth/js'
const { ethers } = require('ethers')

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web 3 Modal Demo',
      infuraId: process.env.INFURA_KEY,
    },
  },
  // walletconnect: {
  //   package: WalletConnect,
  //   options: {
  //     infuraId: process.env.INFURA_KEY
  //   }
  // }
}

const web3Modal = new Web3Modal({
  providerOptions, // required
})

function App() {
  const [wallet, setWallet] = useState('')
  const [donateNfts, setDonateNfts] = useState(false)
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  console.log('🚀 ~ file: App.js ~ line 28 ~ App ~ contract', contract)
  const [donateStream, setDonateStream] = useState(false)
  const [web3authLogin, setWeb3authLogin] = useState(null)
  const [hasProfile, setHasProfile] = useState('')
  const [allProfiles, setAllProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('')
  const [image, setImage] = useState('')
  const [position, setPosition] = useState('')
  const [instructorName, setInstructorName] = useState('')
  const [bio, setBio] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')
  const [userUD, setUserUD] = useState('')
  const [category, setCategory] = useState('Other')
  const [data, setData] = useState([])

  const unstoppableDomainInstance = new UAuth({
    clientID: '2def7330-0b3b-4f2c-9452-b63cfa0637a4',
    redirectUri: 'https://class-reviewer.netlify.app/',
    scope: 'openid wallet email profile:optional social:optional',
  })

  const unstoppableDomainLogin = async () => {
    const user = await unstoppableDomainInstance.loginWithPopup()
    console.log('MY user', user)
    if (user) {
      localStorage.setItem('user', user)
      setUserUD(user)
      setWallet(user.idToken.wallet_address)
    }
  }

  const userLogOut = () => {
    localStorage.removeItem('user')
    setUserUD('')
  }

  // useEffect(() => {
  //   if (contract) {
  //     getFundraisers()
  //   }
  // }, [contract])

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  const getAllClasses = async () => {
    const temp = []
    const res = await contract.getAllGroups()
    console.log(
      '🚀 ~ file: HomeGallery.js ~ line 33 ~ getFundraisers ~ res',
      res,
    )

    // for (let i = 0; i < res.length; i++) {
    //   let obj = {}
    //   // data from smart contract
    //   const organizer = res[i][4]
    //   const totalDonations = res[i]['totalDonations'].toString()
    //   const fundraiserId = res[i].id.toString()

    //   // fetchs data from nftStorage
    //   const nftStorageURL = res[i][1]
    //   let getNFTStorageData = await fetch(nftStorageURL)
    //   let fundraiserData = await getNFTStorageData.json()

    //   //  fundraiser data
    //   const img = getImage(fundraiserData.image)
    //   // gets data from nftStorage
    //   const data = JSON.parse(fundraiserData.description)
    //   // builds fundraiser data
    //   obj.fundraiserId = fundraiserId
    //   obj.organizer = organizer
    //   obj.totalDonations = totalDonations
    //   obj.title = fundraiserData.name
    //   obj.image = img
    //   obj.description = data.description
    //   obj.category = data.category
    //   obj.targetAmmount = data.targetAmmount
    //   obj.creationDate = data.creationDate
    //   temp.push(obj)
    // }

    // setData(temp)
  }

  const connectWallet = async () => {
    // const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setWallet(address)
    localStorage.setItem('currentAccountLocalStorage', address)
    setProvider(provider)
    setSigner(signer)
    let contract = new ethers.Contract(
      '0x15036E33e8E8f706fd77A1aC550d28FD58432c1B',
      ABI.abi,
      signer,
    )
    setContract(contract)
    // if (contract) {
    //   getAllClasses()
    // }
  }

  const disconnectWallet = async () => {
    localStorage.removeItem('currentAccountLocalStorage')
    setWallet('')
  }

  useEffect(() => {}, [])

  return (
    <Router>
      <div className="">
        <Navbar
          unstoppableLogin={unstoppableDomainLogin}
          userUD={userUD}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          wallet={wallet}
          hasProfile={hasProfile}
        />

        <Route exact path="/">
          <LandingPage setSelectedProfile={setSelectedProfile} />
        </Route>
        <Route exact path="/classes">
          <HomeGallery
            allProfiles={allProfiles}
            setSelectedProfile={setSelectedProfile}
            contract={contract}
          />
        </Route>

        <Switch>
          <Route exact path="/notifications" component={Notifications} />

          <Route path="/create">
            <CreateProfile
              setCoverPhoto={setCoverPhoto}
              setImage={setImage}
              setPosition={setPosition}
              setInstructorName={setInstructorName}
              instructorName={instructorName}
              setBio={setBio}
              setCoverPhotoFunction={setCoverPhoto}
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              setCategory={setCategory}
              contract={contract}
            />
          </Route>

          <Route path="/post-comment">
            <PostComment
              setCoverPhoto={setCoverPhoto}
              setImage={setImage}
              setPosition={setPosition}
              setInstructorName={setInstructorName}
              instructorName={instructorName}
              setBio={setBio}
              setCoverPhotoFunction={setCoverPhoto}
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              setCategory={setCategory}
              contract={contract}
            />
          </Route>
          <Route exact path="/donate">
            <DonateNFT
              selectedProfile={selectedProfile}
              contract={contract}
              wallet={wallet}
              donateNfts={donateNfts}
              provider={provider}
              signer={signer}
              donateStream={donateStream}
            />
          </Route>

          <Route path="/create-links">
            <CreateLinks
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              contract={contract}
            />
          </Route>

          <Route path="/profile/details/:userAddress">
            <Profile selectedProfile={selectedProfile} wallet={wallet} />
          </Route>
          <Route path="/my-profile">
            <MyProfile selectedProfile={selectedProfile} wallet={wallet} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
