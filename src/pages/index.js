import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from "styled-components";


import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

import Fade from 'react-reveal/Fade';
import {ssrFadeout} from 'react-reveal/globals'; 

ssrFadeout(false);

const IntroductionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0em 4.5em 0em 4.5em;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    padding: 0 2em 0 2em;
  }
`
const IntroductionText = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.text};
  height: auto;

  
  h1{
    font-size: 4.5em;
    margin: 0;
  }

  h1:nth-child(3){
    margin-top: 1em;
    margin-bottom: 2em;
  }


  @media (max-width: ${props => props.theme.breakpoint.m}) {
    h1{
      font-size: 3em;
      margin: 0;
    }
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    h1{
      font-size: 1.5em;
      margin: 0;
    }
  }
  
`

class BlogIndex extends React.Component {

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    return (
      <Layout>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <IntroductionWrapper>
          <Fade delay={400}>
            <IntroductionText>
              <h1>I am Harrison Wong.</h1>
              <h1>Designer and Developer</h1>
              <h1>Currently a student at Nanyang Technological University, Singapore.</h1>
            </IntroductionText>
          </Fade>
      </IntroductionWrapper>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
