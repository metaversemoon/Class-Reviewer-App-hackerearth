import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './ProfileList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'

import { apiKey } from '../../../../APIKEYS'
import CircularStatic from '../../../commons/CircularProgressWithLabel'
import { displayAll } from '../../../../Phase/displayAll'

function ProfileList({ account, contractData, setSelectedProfile }) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [profiles, setProfiles] = useState([
    {
      image:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/08/learn-coding-online-for-free.png',
      className: 'Introduction to Programming',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'data:image/png;base64,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',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://www.potential.com/wp-content/uploads/2020/11/Online-teaching.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpwOgnI7iNkeJbKTVXpNdmLEpbpD3l_SdqIQtxAdm43-rbzW-GRWbDdXiVyeNXi0S0G0&usqp=CAU',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://poorvucenter.yale.edu/sites/default/files/images/TeachingOnlineatYale%282%29.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        ' https://plus.unsplash.com/premium_photo-1661685456957-3f93db2916ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
  ])
  console.log(
    '🚀 ~ file: ProfileList.js ~ line 44 ~ ProfileList ~ profiles',
    profiles,
  )

  useEffect(() => {
    // const loaddata = async () => {
    //   try {
    //     setLoading(true)
    //     const getAllProfiles = await displayAll()
    //     console.log(getAllProfiles)
    //     setProfiles([])
    //     // setProfiles(getAllProfiles)
    //     setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    //   }
    // }
    // loaddata()
  }, [])

  const details = (profile) => {
    console.log('here profile', profile.address)
    localStorage.removeItem('selectedProfile')
    localStorage.setItem('selectedProfile', profile)
    setSelectedProfile(profile)
    history.push(`/profile/details/${profile.address}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          <Grid container spacing={40} style={{ marginLeft: '2.9rem' }}>
            {profiles.length ? (
              profiles.map((profile, index) => (
                <Grid item spacing={1} className="swap-card">
                  <Card
                    sx={{ maxWidth: 400 }}
                    style={{ width: '400px', borderRadius: '15px' }}
                    onClick={() => details(profile)}
                  >
                    <CardMedia
                      component="img"
                      height="225"
                      image={profile.image}
                      alt="Profile"
                    />
                    <CardContent style={{ paddingBottom: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingBottom: '5px',
                        }}
                      >
                        <p className="gallery-name"> {profile.className}</p>
                        <p className="gallery-rating">
                          Ratings {profile.rating}
                        </p>
                      </div>

                      <p className="gallery-professor">
                        {profile.professorName}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Profiles Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ProfileList
