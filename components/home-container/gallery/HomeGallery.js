import React, { useEffect, useState } from 'react'
import ProfileList from './profile-list/ProfileList'
import logo from '../../../images/logo-large.png'
import test from '../../../images/test.png'
import { Grid, Container, Card, TextField, MenuItem } from '@material-ui/core'
import './HomeGallery.css'

function HomeGallery({ setSelectedProfile }) {
  return (
    <div
      style={{
        minHeight: '70vh',
        paddingBottom: '4rem',
        paddingTop: '1.5rem',
        backgroundImage:
          'inear-gradient( 102.1deg,  rgba(37,94,23,1) 7.7%, rgba(246,253,213,1) 93.3% )',
        backgroundColor: '#FFDEE9',
        backgroundImage: 'linear-gradient(0deg, #fcebf1 0%, #d6fffe 100%)',
      }}
    >
      <section id="gallery" className="gallery-container">
        <div className="outer">
          <TextField
            fullWidth
            name="petType"
            select
            label="Department"
            variant="outlined"
            style={{ width: '80%' }}
            // onChange={(e) => setPetType(e.target.value)}
            defaultValue="All Departments"
            // ref={petTypeRef}
            id="test"
          >
            <MenuItem value="All Departments">All Departments</MenuItem>
            <MenuItem value="Accounting">☐ Accounting</MenuItem>
            <MenuItem value="Advertising">☐ Advertising</MenuItem>
            <MenuItem value="Art & History">☐ Art & History</MenuItem>
            <MenuItem value="Web3">☐ Web3</MenuItem>
            <MenuItem value="Other">☐ Other</MenuItem>
          </TextField>

          <form className="search-form">
            <div className="outer pseudo-search">
              <input type="text" placeholder="Search" autofocus required />
              <span className="search-clear">Clear</span>
              <span className="search-icon">🔍</span>
            </div>
          </form>
        </div>
        <br />
        {/* Profiles */}
        <Card
          style={{
            borderRadius: '24px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <ProfileList setSelectedProfile={setSelectedProfile} />
        </Card>
      </section>
    </div>
  )
}

export default HomeGallery
