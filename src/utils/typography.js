import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'h3 > a': {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    color: "#000000"
  }
})

Wordpress2016.bodyFontFamily=['Open Sans', 'sans-serif']

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)


// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
