import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Image from 'gatsby-image';

import Bio from '../../components/Bio'
import Layout from '../../components/Layout'
import { rhythm } from '../../utils/typography'
import styled from "styled-components";

import {withPrefix} from 'gatsby'

const BlogWrapper = styled.div`
  background-color: #1c1b1b;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 4em 4.5em 4em 4.5em;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
`

const BlogSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Item = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  text-align: center;
  margin-bottom: 2em;
  transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  @media (max-width: 900px) {
    flex-direction: column;
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
  }
`
const ImageSection = styled(Image)`
  width: 50%;
  height: auto;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
  }
`
const BlogInfoSection = styled.div`
  width: 50%;
  height: auto;
  padding: 3em 0 3em 3em;
  text-align: left;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    padding: 3em 0 3em 0;
  }
`

const Title = styled.h5`
  color: white;
  font-size: 2rem;
  margin: 0;
`
const DateAndReadMore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Date = styled.p`
  font-size: 1em;
  margin: 0;
  color: #bcbbbb;
`
const Except = styled.p`
  font-size: 1em;
  color: white;
  margin-top: 1em;

`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: opacity 300ms ease-in-out;

  &:hover{
    opacity: 0.8
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
        <BlogWrapper>
          <BlogSection>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <Item key={node.fields.slug}>
                    <ImageSection fluid={node.frontmatter.cover_image.childImageSharp.fluid}/>
                    <BlogInfoSection>
                      <Title>{title}</Title>
                      <Except>{node.excerpt }</Except>
                      <DateAndReadMore>
                        <Date>{node.frontmatter.date}</Date>
                        <StyledLink to={node.fields.slug}>Read more</StyledLink>
                      </DateAndReadMore>
                    </BlogInfoSection>
              </Item>
            )
          })}
          </BlogSection>
        </BlogWrapper>
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
    allMarkdownRemark(filter: { fileAbsolutePath: {regex : "\/blog/"}},
      sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            collection
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            cover_image{
              publicURL
              childImageSharp{
                fluid(maxWidth: 500, maxHeight: 300){
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