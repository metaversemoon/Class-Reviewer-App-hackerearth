import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'

function SingleDistributionBar({ ele }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      }}
    >
      <p
        style={{
          fontSize: '.9rem',
          flex: '25%',
          textAlign: 'right',
          paddingRight: '10px',
        }}
      >
        {ele.label}
      </p>
      <LinearProgress
        variant="determinate"
        value={ele.rate}
        style={{ height: '1.5rem', width: '50%', flex: '75%' }}
      />
    </div>
  )
}

export default SingleDistributionBar
