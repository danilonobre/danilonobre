module.exports = {
  siteMetadata: {
    siteUrl: "https://danilonobre.com.br",
    title: "Danilo Nobre - UI/UX Designer and Frontend developer",
    description: `Hi, i'm <span>Danilo Nobre</span>, an interface designer focused on bringing results from user-centered experiences.`,
    author: 'Danilo Nobre',
    email: "mailto:danilonobre@gmail.com",
    linkedin: "https://www.linkedin.com/in/danilonobre",
    behance: "https://www.behance.net/danilonobre",
    dribbble: "https://dribbble.com/danilonobre",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-11048518-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/danilonobre-ui-designer-full.png",
        name: `Danilo Nobre`,
        short_name: `Danilo Nobre`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-remark-images`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "works",
        path: "./src/works/",
      },
      __key: "works",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "shots",
        path: "./src/shots/",
      },
      __key: "shots",
    },
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/templates/work.js"),
        },
        plugins: [`gatsby-remark-images`,`gatsby-remark-images-zoom`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-images-zoom`,
        ],
      },
    },
  ],
};
