import React, { useEffect, useState } from 'react'
import logoTest from '../../images/logo2.png'
import { Link } from 'react-router-dom'

import {
  Grid,
  StylesProvider,
  Container,
  Card,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core'
import './LandingPage.css'

function LandingPage(props) {
  return (
    <StylesProvider injectFirst>
      <div className="container">
        <div className="decorationNav"></div>

        <section className="landingBanner">
          <img src={logoTest} className="logoTest" alt="" />
          <p className="banner-title">
            Find a class to rate or check its ratings before registering.
          </p>
          <Button
            variant="contained"
            component={Link}
            to="/classes"
            className="banner-btn"
          >
            Get Started
          </Button>{' '}
          <br />
          <p className="banner-lookup">I'd like to look up a class by name</p>
        </section>

        <section className="howItWorks">
          <p className="banner-title2">
            Join the Rate My Online Classes Family
          </p>
          <p className="">Join the Rate My Online Classes Family</p>
          <div className="parent-flex">
            <div className="flex-item">
              <img
                src="https://www.ratemyprofessors.com/static/media/instructional-slide-pencil-lady.492f2289.svg"
                alt=""
              />
              <p className="item-text">Manage and edit your ratings</p>
            </div>

            <div className="flex-item">
              <img
                src="https://www.ratemyprofessors.com/static/media/instructional-slide-mystery-lady.bf022e31.svg"
                alt=""
              />
              <p className="item-text">Your ratings are always anonymous</p>
            </div>

            <div className="flex-item">
              <img
                src="https://www.ratemyprofessors.com/static/media/instructional-slide-thumb-war.e03fdb37.svg"
                alt=""
                style={{ height: '164px' }}
              />
              <p className="item-text">Like or dislike ratings</p>
            </div>
          </div>
        </section>
      </div>
    </StylesProvider>
  )
}

export default LandingPage
