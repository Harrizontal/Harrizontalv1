// import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'

// Wordpress2016.overrideThemeStyles = () => ({
//   'a.gatsby-resp-image-link': {
//     boxShadow: 'none',
//   },
//   'h3 > a': {
//     fontFamily: ['Montserrat', 'sans-serif'].join(','),
//     color: "#000000"
//   }
// })

// Wordpress2016.bodyFontFamily=['Open Sans', 'sans-serif']

// delete Wordpress2016.googleFonts

// const typography = new Typography(Wordpress2016)


// // Hot reload typography in development.
// if (process.env.NODE_ENV !== 'production') {
//   typography.injectStyles()
// }

// export default typography
// export const rhythm = typography.rhythm
// export const scale = typography.scale

import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Helvetica','Georgia', 'serif'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
