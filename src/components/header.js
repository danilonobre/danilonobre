import * as React from "react"
import PropTypes from "prop-types"
import Contacts from "../components/contacts"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle,siteNav,siteDescription }) => (

  <section className="page-intro">

    <header className="page-header">
    
      <StaticImage
        src="../images/danilonobre-ui-designer.png"
        alt={siteTitle}
        placeholder="blurred"
        layout="fixed"
        width={160}
        height={160}
        className="page-logo"
      />
    
      <nav className="page-nav">

        <Contacts
          data={siteNav}
          showLabel={false}
        />

      </nav>

    </header>

    <h1 dangerouslySetInnerHTML={{ __html: siteDescription }}></h1>

  </section>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
