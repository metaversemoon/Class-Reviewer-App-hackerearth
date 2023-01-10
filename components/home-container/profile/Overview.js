import { Link } from 'react-router-dom'
import { Box, Grid, Typography, Button, Card, Chip } from '@mui/material'
import profileIcon from '../../../images/profile-icon.png'
import LinearProgress from '@mui/material/LinearProgress'

function Overview({ selectedProfile }) {
  return (
    <section>
      I need to add a
      <p className="title-fundraiser"> {selectedProfile.title}</p>
      <img
        src={selectedProfile.image}
        alt="community"
        className="foundraiser-img"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '1rem',
        }}
      >
        <img src={profileIcon} alt="profileIcon" className="profile-icon" />
        <p style={{ paddingLeft: '0.3rem' }}>
          <strong>{`${selectedProfile.organizer.substring(32)}...`} </strong>
          is the creator or owner of this post...
        </p>
      </div>
      <p
        className="description"
        style={{
          paddingTop: '1rem',
          paddingBottom: '2rem',
        }}
      >
        {selectedProfile.description}
      </p>
      <Chip
        className="profile-chip"
        label={` Category: ${selectedProfile.category}`}
        variant="outlined"
      />
      <Chip
        className="profile-chip"
        label={` Created at: ${selectedProfile.creationDate}`}
        variant="outlined"
      />
      <Chip
        className="profile-chip"
        label={`Virtual Study Group id: ${selectedProfile.fundraiserId}`}
        variant="outlined"
      />
      <br />
      <br />
    </section>
  )
}

export default Overview
