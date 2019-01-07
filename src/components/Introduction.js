import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'

const IntroductionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0em 4.5em 0em 4.5em;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 900px) {
    padding: 0 2em 0 2em;
  }
`
const IntroductionText = styled.div`
  width: 100%;
  color: black;
  height: auto;
`
const Introduction = () => (
  <IntroductionWrapper>
      <IntroductionText>
      <h1
            style={{
              ...scale(2),
              marginBottom: 0,
              marginTop: rhythm(4),
            }}
          >
          I am Harrison Wong.
        </h1>
        <h1
          style={{
            ...scale(2),
            marginBottom: 0,
            marginTop: 0,
          }}
        >
        Designer and Developer
        </h1>

        <h1
          style={{
            ...scale(2),
            marginBottom: rhythm(4),
            marginTop: rhythm(3),
          }}
        >
        Currently a student in Nanyang Technological University, Singapore.
        </h1>


      </IntroductionText>
      
  </IntroductionWrapper>
)


export default Introduction
