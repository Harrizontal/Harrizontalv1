import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  padding: 4em 4.5em 4em 4.5em;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 100%;
    padding: 1.5em 2em 1.5em 2em;
  }
`

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`

const NavigationDiv = styled.div`
  width: auto;
  height: auto;
`

const NavigationUl = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  -webkit-flex-flow: row wrap;
  justify-content: flex-end;
`
const NavigationLi = styled.li`
  text-decoration: none;
  padding: 0 0 0 50px;
  margin: 0;
`
const StyledLink = styled(Link)`
  text-decoration: ${props => props.checked ? "underline" : "none"};
  color: black;
  font-family: 'Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-weight: bold;
`

const Header = ({ siteTitle, menuLinks ,pathname}) => (
  <HeaderWrapper>
    <HeaderTitle>
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
    </HeaderTitle>
    <NavigationDiv>
      <NavigationUl>
          {
            menuLinks.map(link =>
              <NavigationLi>
                <StyledLink key={link.name} to={link.link} checked={isEqual(pathname,link.link)}>{link.name}</StyledLink>
              </NavigationLi>)
          }
      </NavigationUl>
    </NavigationDiv>
  </HeaderWrapper>
)

function isEqual(pathname,link){
  if(pathname == link){
    return true;
  }else{
    return false;
  }
}

export default Header


// const Header = ({ siteTitle, menuLinks }) => (
//   <div>
//       <h1
//             style={{
//               ...scale(1.5),
//               marginBottom: rhythm(1.5),
//               marginTop: 0,
//             }}
//           >
//             <Link
//               style={{
//                 boxShadow: 'none',
//                 textDecoration: 'none',
//                 color: 'inherit',
//               }}
//               to={'/'}
//             >
//               Harrizontal
//             </Link>
//           </h1>

//       <nav style={{ display: 'flex', flex: 1 }}>
//       {
//         menuLinks.map(link =>
//           <li key={link.name} style={{ 'listStyleType': 'none' }}>
//             <Link to={link.link}>{link.name}</Link>
//           </li>)
//       }
//     </nav>
//   </div>
// )

// import React from "react"
// import styled from "styled-components"


// const Container = styled.div`
//   margin: 3rem auto;
//   max-width: 600px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `

// export default props => <h1>{props.headerText}</h1>