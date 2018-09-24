import React from 'react'

// Import typefaces
import 'typeface-open-sans'
import 'typeface-merriweather'

import profilePic from './profile_pic_v2.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Harrison`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Harrison Wong</strong> who lives and works in Singapore, building useful things.{' '}
          <a href="https://www.linkedin.com/in/harrison-wong-bb4bbb8b/" target="_blank">
            You should connect him on Linkedin
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
