import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Image from "gatsby-image";

import Layout from "../../components/layout";
import styled from "styled-components";

import { withPrefix } from "gatsby";

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

  @media (min-width: ${props => props.theme.breakpoint.xl}) {
    padding: 4em 25% 4em 25%;
  }

  @media (max-width: ${props => props.theme.breakpoint.l}) {
    padding: 4em 8% 4em 8%;
  }

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    padding: 4em 2em 4em 2em;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    padding: 4em 1em 4em 1em;
  }
`;

const BlogSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  text-align: center;
  margin-bottom: 2em;
  transition: transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1);

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    flex-direction: column;
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    margin-bottom: 1em;
  }
`;
const ImageSection = styled(Image)`
  width: 50%;
  height: auto;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
  }
`;
const BlogInfoSection = styled.div`
  width: 50%;
  height: auto;
  padding: 3em 0 3em 3em;
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    max-width: 100%;
    width: 100%;
    padding: 1em 0 3em 0;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    max-width: 100%;
    width: 100%;
    padding: 1em 0 1em 0;
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: ${props => props.theme.colors.bg};
  line-height: 39.5px;
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  transition: opacity 300ms ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 1.7em;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    line-height: 18px;
    font-size: 1em;
  }
`;
const DateAndReadMore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Date = styled.p`
  font-size: 1em;
  margin: 0;
  color: ${props => props.theme.colors.greyLight};

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 0.8em;
  }
`;
const Except = styled.p`
  font-size: 1em;
  color: ${props => props.theme.colors.greyLight};
  margin-top: 1em;

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 0.8em;
  }
`;
const StyledLink = styled(Link)`
  font-size: 1em;
  text-decoration: none;
  color: white;
  transition: opacity 300ms ease-in-out;

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 0.8em;
  }

  &:hover {
    opacity: 0.8;
  }
`;

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: siteDescription }]}
          title={siteTitle}
        />
        <BlogWrapper>
          <BlogSection>
            {posts.map(({ node }) => {
              const title = get(node, "frontmatter.title") || node.fields.slug;

              return (
                <Item key={node.fields.slug}>
                  <ImageSection
                    fluid={node.frontmatter.cover_image.childImageSharp.fluid}
                  />
                  <BlogInfoSection>
                    <Title to={node.fields.slug}>{title}</Title>
                    <Except>{node.excerpt}</Except>
                    <DateAndReadMore>
                      <Date>{node.frontmatter.date}</Date>
                      <StyledLink to={node.fields.slug}>Read more</StyledLink>
                    </DateAndReadMore>
                  </BlogInfoSection>
                </Item>
              );
            })}
          </BlogSection>
        </BlogWrapper>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            cover_image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 300) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
                fixed {
                  ...GatsbyImageSharpFixed_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
