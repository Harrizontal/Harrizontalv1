import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import Image from "gatsby-image";

import Bio from "../components/Bio";
import styled from "styled-components";
import Layout from "../components/layout";
import { rhythm, scale } from "../utils/typography";
import "prismjs/themes/prism-okaidia.css"; // for code markdown prismjs

const BlogWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0 4.5em 4em 4.5em;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    padding: 0;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;

  @media (min-width: ${props => props.theme.breakpoint.xl}) {
    padding: 3em 20% 4em 20%;
  }

  @media (mmax-width: ${props => props.theme.breakpoint.l}) {
    padding: 3em 5% 4em 5%;
  }

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    flex-direction: column;
    max-width: 100%;
    width: 100%;
  }
`;

const BlogInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1em;

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    padding-right: 0em;
    width: 100%;
    order: 2;
    padding: 1em 2em 0em 2em;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    padding: 1em 1em 0em 1em;
  }
`;

const HeroImage = styled.div`
  width: 800px;
  height: auto;
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    width: 100%;
    order: 1;
  }
`;
const Date = styled.p`
  margin: 0;
  font-size: 1em;
  margin-bottom: 5px;
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 0.8em;
  }
`;
const Title = styled.h1`
  margin: 0;
  font-size: 2em;
  margin-bottom: 10px;
`;
const Description = styled.p`
  margin: 0;
  font-size: 1em;
  color: rgba(0, 0, 0, 0.54);

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 0.9em;
  }
`;
const Blog = styled.div`
  width: 100%;
  height: auto;
  font-size: 0.9em;
  padding: 5em 3em 0 3em;

  @media (min-width: ${props => props.theme.breakpoint.xl}) {
    padding: 3em 25% 4em 25%;
  }

  @media (min-width: ${props => props.theme.breakpoint.l}) {
    padding: 3em 20% 4em 20%;
  }

  @media (max-width: ${props => props.theme.breakpoint.l}) {
    padding: 3em 15% 4em 15%;
  }

  @media (max-width: ${props => props.theme.breakpoint.m}) {
    padding: 3em 13% 4em 13%;
  }

  @media (max-width: ${props => props.theme.breakpoint.s}) {
    padding: 3em 1em 4em 1em;
  }
`;
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const siteDescription = post.excerpt;
    const {
      previous,
      next,
      newPrevious,
      newNext,
      found,
      count
    } = this.props.pageContext;
    console.log(newPrevious);
    console.log(newNext);
    console.log(found);
    console.log(count);
    return (
      <Layout>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <BlogWrapper>
          <HeroSection>
            <BlogInfo>
              <Date>{post.frontmatter.date}</Date>
              <Title>{post.frontmatter.title}</Title>
              <Description>{post.frontmatter.description}</Description>
            </BlogInfo>
            <HeroImage>
              <Image
                fluid={post.frontmatter.cover_image.childImageSharp.fluid}
              />
            </HeroImage>
          </HeroSection>
          <Blog>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1)
              }}
            />
          </Blog>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              padding: 0
            }}
          >
            <li>
              {newPrevious && (
                <Link to={newPrevious.fields.slug} rel="prev">
                  ← {newPrevious.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {newNext && (
                <Link to={newNext.fields.slug} rel="next">
                  {newNext.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </BlogWrapper>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        cover_image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 500) {
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
`;

// return (
//   <Layout>
//     <Helmet
//       htmlAttributes={{ lang: 'en' }}
//       meta={[{ name: 'description', content: siteDescription }]}
//       title={`${post.frontmatter.title} | ${siteTitle}`}
//     />
//     <h1>{post.frontmatter.title}</h1>
//     <Image fluid={post.frontmatter.cover_image.childImageSharp.fluid}/>

//     <p
//       style={{
//         ...scale(-1 / 5),
//         display: 'block',
//         marginBottom: rhythm(1),
//         marginTop: rhythm(-1),
//       }}
//     >
//       {post.frontmatter.date}
//     </p>
//     <div dangerouslySetInnerHTML={{ __html: post.html }} />
//     <hr
//       style={{
//         marginBottom: rhythm(1),
//       }}
//     />
//     <Bio />

//     <ul
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         listStyle: 'none',
//         padding: 0,
//       }}
//     >
//       <li>
//         {
//           newPrevious &&
//           <Link to={newPrevious.fields.slug} rel="prev">
//             ← {newPrevious.frontmatter.title}
//           </Link>
//         }
//       </li>
//       <li>
//         {
//           newNext &&
//           <Link to={newNext.fields.slug} rel="next">
//            {newNext.frontmatter.title} →
//           </Link>
//         }
//       </li>
//     </ul>
//   </Layout>
// )
