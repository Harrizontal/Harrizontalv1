import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from "styled-components";


import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

const IntroSection = styled.div`
  width: 100%;
  height: 300px;
`

const PortfolioSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

// for image mainly
const Item = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  text-align: center;
  padding: 3em;
  transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  @media (max-width: 900px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-top: 3rem !important;
  }
`

const Title = styled.h3`
  font-size: 2rem;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
  transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
`
const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;
  color: black;
  transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  img{
    margin: 0;
    transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  &:hover, img:hover {
    transform: scale(0.95);
  }

  &:hover + ${Title}{
    transform: translateY(-0.5rem);
  }
`

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
            Currently a student in Nanyang Technological University, Singapore. Test
            </h1>
          </IntroductionText>
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
