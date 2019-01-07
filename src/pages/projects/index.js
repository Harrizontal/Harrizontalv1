import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Image from 'gatsby-image';

import Layout from '../../components/Layout'
import styled from "styled-components";
import { rhythm, scale } from '../../utils/typography'

const PortfolioWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 4em 4.5em 4em 4.5em;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
`
const PorfolioIntroSection = styled.div`
  width: 100%;
  color: black;
  height: auto;
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
  display:block;
  position: relative;
  transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);

  &:hover{
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
    if(posts != undefined){
      return (
        <Layout location={this.props.location}>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: siteDescription }]}
            title={siteTitle}
          />
          <PortfolioWrapper>
            <PorfolioIntroSection>
              <h1
                  style={{
                    ...scale(2),
                    marginBottom: 0,
                    marginTop: rhythm(3),
                  }}
                >
                My works
              </h1>
            </PorfolioIntroSection>
            <PortfolioSection>
              {posts.map(({ node }) => {
                const title = get(node, 'frontmatter.title') || node.fields.slug
                return (
                  <Item key={node.fields.slug}>
                      <StyledLink to={node.fields.slug}>
                          <Image fluid={node.frontmatter.cover_image.childImageSharp.fluid}/>
                      </StyledLink>
                      <Title>{title}</Title>
                  </Item>
                )
              })}
            </PortfolioSection>
          </PortfolioWrapper>
        </Layout>
      )
     }else{
       return(
        <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <PortfolioWrapper>
          <PorfolioIntroSection>
            <h1
                style={{
                  ...scale(1.5),
                  marginBottom: rhythm(5),
                  marginTop: rhythm(3),
                }}
              >
              Opps! Check it out soon.
            </h1>
          </PorfolioIntroSection>
         </PortfolioWrapper>
      </Layout>
       )
     }
  }
}

export default BlogIndex
// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "DD MMMM, YYYY")
//             title
//           }
//         }
//       }
//     }
//   }
// `
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\/projects/"}},
      sort: { fields: [frontmatter___date], order: DESC }) {
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
              childImageSharp{
                fluid(maxWidth: 200, maxHeight: 200){
                  ...GatsbyImageSharpFluid_tracedSVG
                }
                fixed{
                  ...GatsbyImageSharpFixed_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
