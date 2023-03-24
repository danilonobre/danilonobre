import * as React from "react"
import {  Link } from 'gatsby'
import PropTypes from "prop-types"
import Contacts from "../components/contacts"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle,siteNav,siteDescription }) => (

  <header className="page-header">
    
    <Link to="/">

        <StaticImage
          src="../images/danilonobre-ui-designer.png"
          alt={siteTitle}
          placeholder="blurred"
          layout="fixed"
          width={160}
          height={160}
          className="page-logo"
        />

    </Link>

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
