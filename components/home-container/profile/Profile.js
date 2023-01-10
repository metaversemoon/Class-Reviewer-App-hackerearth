import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'
import { Container, Box, Grid, Button, Chip, Card } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LinearProgress from '@mui/material/LinearProgress'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import './Profile.css'
import donation from '../../../images/list.png'
import classImage from '../../../images/classImage.png'
import Overview from './Overview'
import Updates from './Updates'
import SingleDistributionBar from './SingleDistributionBar'
import Contact from './Contact'
// import TableUpdates from './TableUpdates'

const dataUpdates = [
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
]

function Profile({
  account,
  currentAccount,
  selectedProfile,
  setDonateNfts,
  setDonateStream,
}) {
  const { userAddress } = useParams()
  selectedProfile = {
    image: classImage,
    className: 'Solidity Smart Contracts',
    professorName: 'Joe Boulet',
    rating: '72',
    created: 'August 23, 2022',
    wouldTakeAgain: '90%',
    position: 'Prefessor at MIT, Unitversity of California',
    classDificulty: '4',
    classId: '4',
    tags: ['Caring', 'Participation Matters', 'Caring', 'helpful'],
    ratings: [
      { label: 'Awesome 5', rate: 95 },
      { label: 'Great 4', rate: 10 },
      { label: 'Good 3', rate: 5 },
      { label: 'Ok 2', rate: 0 },
      { label: 'Awful 1', rate: 0 },
    ],
    comments: ['link1', 'link2'],
  }

  const comment = {
    quality: '',
    dificulty: '',
    classSection: '',
    classRating: '',
    description: '',
    tags: '',
  }
  const history = useHistory()
  console.log('selectedProfile', selectedProfile)
  const [showProfile, setShowProfile] = useState(false)
  const [section, setSection] = useState('StudentRatings')

  useEffect(() => {}, [])

  useEffect(() => {
    // getProfile(userAddress)
  }, [userAddress])

  const donate = async (e) => {
    setDonateStream(false)
    history.push(`/donate`)
  }
  const donateStream = async (e) => {
    setDonateStream(true)
    history.push(`/donate`)
  }

  const donateNFTs = async (e) => {
    setDonateNfts(true)
    history.push(`/donate`)
  }

  const visitSite = (site) => {
    const link = site.value
    if (link) {
      window.open(link, '_blank')
    } else {
      window.open(site, '_blank')
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container
      style={{ minHeight: '70vh', paddingBottom: '1rem', paddingTop: '4rem' }}
    >
      <p className="title">Ratings for {selectedProfile.className} class</p>
      <br />
      <br />
      <section style={{ display: 'flex', justifyItems: 'center' }}>
        <div
          style={{
            width: '100%',
          }}
        >
          <img
            src={selectedProfile.image}
            alt="classImage"
            style={{
              width: '60%',
            }}
          />
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              paddingBottom: '0.5rem',
            }}
          >
            {selectedProfile.className}
          </p>
          <p className="position"> {selectedProfile.position}</p>

          <div style={{ display: 'flex', justifyContent: 'normal' }}>
            <div style={{ width: '150px' }}>
              <p className="class-dificulty">
                {selectedProfile.wouldTakeAgain}
              </p>
              <p className="position">Would Take Again</p>
            </div>

            <div style={{ width: '150px' }}>
              <p className="class-dificulty">
                {selectedProfile.classDificulty}{' '}
              </p>
              <p className="position">Level of Difficulty </p>
            </div>
          </div>
          <br />
          <p className="position">Class id: {selectedProfile.classId}</p>
        </div>
        <div
          style={{
            width: '100%',
            color: 'black',
            textAlign: 'end',
          }}
        >
          <Button
            style={{
              width: '50%',
              background: 'rgb(0, 85, 253)',
              color: 'white',
            }}
            component={Link}
            to="/post-comment"
          >
            Rate this class
          </Button>
          <br />
          <br />

          <Card
            style={{
              padding: '2rem',
            }}
          >
            <div className="page-wallet-address">
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  paddingBottom: '0.8rem',
                }}
              >
                Rating Distribution
              </p>

              {selectedProfile?.ratings
                ? selectedProfile.ratings.map((ele, index) => (
                    <SingleDistributionBar ele={ele} key={index} />
                  ))
                : ''}
            </div>
          </Card>
        </div>
      </section>

      <section id="comments">
        <br />

        <div
          style={{
            paddingTop: '2.5rem',
            paddingBottom: '1rem',
          }}
        >
          <Button
            variant={section === 'StudentRatings' ? 'contained' : ''}
            onClick={() => setSection('StudentRatings')}
          >
            Student Ratings
          </Button>
          <Button
            variant={section === 'LiveClass' ? 'contained' : ''}
            onClick={() => setSection('LiveClass')}
          >
            Live Class
          </Button>

          <Button
            variant={section === 'Chat' ? 'contained' : ''}
            onClick={() => setSection('Chat')}
          >
            Chat with XMTP
          </Button>

          <Button
            variant={section === 'StreamPayment' ? 'contained' : ''}
            component={Link}
            to="/donate"
            // onClick={() => setSection('StreamPayment')}
          >
            Stream Payment By Superfluid
          </Button>

          {/* <Button
            variant={section === 'DonateNFTs' ? 'contained' : ''}
            onClick={() => setSection('DonateNFTs')}
          >
            Donate NFTs NftPort
          </Button> */}
        </div>

        <hr style={{ border: '1px solid #c8c8c8' }} />
        <br />

        <Card
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(241, 241, 241, 0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            <div
              style={{
                flex: '10%',
                textAlign: 'center',
              }}
            >
              <p className="quality">QUALITY</p>

              <p className="quality-bg">5.0</p>
              <br />
              <br />
              <p className="quality">DIFFICULTY</p>

              <p
                className="quality-bg"
                style={{
                  background: 'rgb(228, 228, 228)',
                }}
              >
                4.0
              </p>
            </div>

            <div
              style={{
                flex: '90%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="class-section">Class section: KINS4010</p>
                <p className="awesome">😎 AWESOME</p>
                <p className="date">Oct 25th, 2022</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '.8rem',
                }}
              >
                <p>
                  For Credit: <span className="bold">Yes</span>
                </p>
                <p>
                  Attendance: <span className="bold">Mandatory</span>{' '}
                </p>
                <p>
                  Would Take Again: <span className="bold">Yes</span>
                </p>
                <p>
                  Grade: <span className="bold">A</span>a
                </p>
                <p>
                  Textbook: <span className="bold">N/A</span>
                </p>
              </div>
              <br />
              <br />
              <br />
              <p className="review-text ">
                One of the best profs at McGill. Saba is a great guy who
                actually cares about students. He may seem like a typical
                serious prof but he's actually quite nice and approachable.
                Slides are fun and very colourful but you need to take down
                notes like mad. Although he can be a bit verbose but this is
                still my favourite class, learned so much! Thumbs up!
              </p>

              {selectedProfile.tags
                ? selectedProfile.tags.map((tag, index) => (
                    <Chip
                      label={tag}
                      key={index}
                      style={{ marginRight: '.3rem' }}
                    />
                  ))
                : ''}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '2rem',
                }}
              >
                <div>
                  <ThumbUpOffAltIcon />
                  <span
                    style={{
                      paddingRight: '1.5rem',
                    }}
                  >
                    0
                  </span>
                  <ThumbDownOffAltIcon />
                  <span>3</span>
                </div>
                <EmojiFlagsIcon />
              </div>
            </div>
          </div>
        </Card>
        <br />
        <br />

        <Card
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(241, 241, 241, 0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            <div
              style={{
                flex: '10%',
                textAlign: 'center',
              }}
            >
              <p className="quality">QUALITY</p>

              <p className="quality-bg">5.0</p>
              <br />
              <br />
              <p className="quality">DIFFICULTY</p>

              <p
                className="quality-bg"
                style={{
                  background: 'rgb(228, 228, 228)',
                }}
              >
                4.0
              </p>
            </div>

            <div
              style={{
                flex: '90%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="class-section">Class section: KINS4010</p>
                <p className="awesome">😎 AWESOME</p>
                <p className="date">Oct 25th, 2022</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '.8rem',
                }}
              >
                <p>
                  For Credit: <span className="bold">Yes</span>
                </p>
                <p>
                  Attendance: <span className="bold">Mandatory</span>{' '}
                </p>
                <p>
                  Would Take Again: <span className="bold">Yes</span>
                </p>
                <p>
                  Grade: <span className="bold">A</span>a
                </p>
                <p>
                  Textbook: <span className="bold">N/A</span>
                </p>
              </div>
              <br />
              <br />
              <br />
              <p className="review-text ">
                Dr. Park is by far my favorite Professor I have had. He is so
                understanding and takes the time to make sure you understand the
                material.He will review it and explain it in different ways to
                ensure that everyone is gets it.He also so funny and loves when
                the class has a discussion instead of him just speaking.I
                learned a lot from him.
              </p>

              {selectedProfile.tags
                ? selectedProfile.tags.map((tag, index) => (
                    <Chip
                      label={tag}
                      key={index}
                      style={{ marginRight: '.3rem' }}
                    />
                  ))
                : ''}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '2rem',
                }}
              >
                <div>
                  <ThumbUpOffAltIcon />
                  <span
                    style={{
                      paddingRight: '1.5rem',
                    }}
                  >
                    0
                  </span>
                  <ThumbDownOffAltIcon />
                  <span>3</span>
                </div>
                <EmojiFlagsIcon />
              </div>
            </div>
          </div>
        </Card>
        <br />
        <br />
        <br />
      </section>
    </Container>
  )
}

export default Profile
