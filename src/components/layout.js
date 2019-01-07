import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Header from './Header'
import Footer from './Footer'

export default ({location,children, ...props}) => (

  <StaticQuery
    query={graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            menuLinks{
              name
              link
            }
          }
        }
      }
    `}
    render = {data => (
      <div>
       
        <Header siteTitle={data.site.siteMetadata.title} menuLinks={data.site.siteMetadata.menuLinks} pathname={isValid(location)}></Header>
        {children}
        <Footer/>
      </div>
    )}
  />
)

function isValid(location){
  if(location != undefined){
    return location.pathname
  }else{
    return "/";
  }
}
/*

*/
/*
class Template extends React.Component {
  render() {
    const { location, children } = this.props
    //const rootPath = `${__PATH_PREFIX__}/`
    let header

    //console.log(rootPath)
 
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Harrizontal
          </Link>
        </h1>
      )
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(45),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
      </div>
    )
  }
}

export default Template
*/