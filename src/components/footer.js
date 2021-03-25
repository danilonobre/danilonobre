import * as React from "react"
import PropTypes from "prop-types"
import Contacts from "../components/contacts"

const Header = ({ siteNav }) => (

  <footer className="page-footer">

    <h2 className="title">Get in touch</h2>
    <p className="intro-text">Want to discuss a project, collaborate or say hello?</p>

    <Contacts
      data={siteNav}
      showLabel={true}
    />

  </footer>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
