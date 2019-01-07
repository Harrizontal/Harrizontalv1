import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'
import { SocialIcon } from 'react-social-icons';

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 400px;
  position: relative;
`

const ContactMe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
  background-color: #393E46;
  color: white;
  justify-content: center;
  height: 100%;
  align-items: center;
`

const FollowMe = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 40%;
background-color: #F2F2F2;
color: #393E46;
justify-content: center;
height: 100%;
align-items: center;
`
const SocialIcon2 = styled(SocialIcon)`
  transition: opacity 300ms ease-in-out;
  margin-right: 0.5em;

  &:hover{
    opacity: 0.75;
  }
`
const Footer = () => (
  <FooterWrapper>
    <ContactMe>
      <h1 style={{
            ...scale(2),
            marginBottom: 0,
            marginTop: 0,
          }}>
          Say hi!
      </h1>
      <h2 style={{
            ...scale(1),
            marginBottom: 0,
            marginTop: rhythm(0.5),
          }}>
          Harrisonwjy@hotmail.com
      </h2>
    </ContactMe>
    <FollowMe>
    <h3 style={{
            marginBottom: 0,
            marginTop: 0,
            marginRight: rhythm(0.3),
            opacity: 0.9,
            ...scale(0.2)
          }}>
          Follow
      </h3>
      <SocialIcon2 url="https://www.linkedin.com/in/harrison-wong-bb4bbb8b/" bgColor="#393E46"/>
      <SocialIcon2 url="https://www.behance.net/harrizontal" bgColor="#393E46" />
      <SocialIcon2 url="https://www.instagram.com/harrizontal" bgColor="#393E46" />
    </FollowMe>
  </FooterWrapper>
)


export default Footer


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