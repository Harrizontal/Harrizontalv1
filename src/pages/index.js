import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from "styled-components";


import Layout from '../components/layout'
import Introduction from '../components/introduction';

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

class BlogIndex extends React.Component {

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Introduction/>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            cover_image{
              publicURL
            }
          }
        }
      }
    }
  }
`
