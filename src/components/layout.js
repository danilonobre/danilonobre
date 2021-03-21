/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { StaticImage } from "gatsby-plugin-image";

import "../styles/index.sass";
import "../styles/styles.scss";

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (

        <div className={`container ${showMenu ? "is-open" : ""}`}>
          
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />

          <div className="page-intro" id="about">

            <header className="page-header">

              <div className="page-logo">
                <StaticImage src="../images/danilonobre-ui-designer.png" alt="" />
              </div>

              <nav className="sidebar__menu">
                <ul>
                  <li>
                    <Link to="#about">About</Link>
                  </li>
                  <li>
                    <Link to="#work">Work</Link>
                  </li>
                  <li>
                    <Link to="#contact">Contact</Link>
                  </li>
                </ul>
              </nav>

            </header>

            <div className="intro-text"
              dangerouslySetInnerHTML={{
                __html:
                  data.datoCmsHome.introTextNode.childMarkdownRemark.html
              }}
            />

          </div>
        
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </div>
              </div>
            </div>
            {children}
          </div>

          <footer className="page-footer" id="contact">

            <p className="sidebar__social">
              {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                <a
                  key={profile.profileType}
                  href={profile.url}
                  target="blank"
                  className={`social social--${profile.profileType.toLowerCase()}`}
                >
                  {" "}
                </a>
              ))}
            </p>

          </footer>

        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
