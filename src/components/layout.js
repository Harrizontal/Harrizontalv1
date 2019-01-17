import React from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import Header from './Header'
import Footer from './Footer'
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import get from 'lodash/get'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"


const timeout = 250
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

export default ({location,children}) => (
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
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Header siteTitle={data.site.siteMetadata.title} menuLinks={data.site.siteMetadata.menuLinks} pathname={isValid(location)}></Header>
            {children}
            <Footer/>
          </React.Fragment>
        </ThemeProvider>
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



// class layout extends React.Component {
//   render() {
//     const { location, children, data} = this.props

//     return (
//       <div>
//         <ThemeProvider theme={theme}>
//           <React.Fragment>
//             <Link to={"/blog"}>Blog</Link>
//             <TransitionGroup>
//               <ReactTransition
//                 timeout={{
//                   enter: timeout,
//                   exit: timeout,
//                 }}
//               >
//                 {status => (
//                   <div
//                     style={{
//                       ...getTransitionStyles[status],
//                     }}
//                   >
//                     {children}
//                   </div>
//                 )}
//               </ReactTransition>
//             </TransitionGroup>
//             <Footer/>
//           </React.Fragment>
//         </ThemeProvider>
//       </div>
//     )
//   }
// }

// function isValid(location){
//   if(location != undefined){
//     return location.pathname
//   }else{
//     return "/";
//   }
// }

// export default layout

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//         description
//         menuLinks{
//           name
//           link
//         }
//       }
//     }
//   }
// `