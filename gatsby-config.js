require("dotenv").config({  
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: "/bugb",
  siteMetadata: {
    title: `Bug B. Vintage`,
    description: `Edit this`,
    author: `Will`,
  },
  plugins: [
{
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-116081759-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "https://master.d3amzip69qnu33.amplifyapp.com/",
      },
    },

    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-sass",
      `gatsby-plugin-transition-link`,
      {
        resolve: `gatsby-source-instagram`,
        options: {
          username: `bugbvintage`,
        },
      },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
{
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL || "https://bugb-backend.herokuapp.com",   contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "collections",
          "clothing-images",
          "clothing-piece",
        ],
          singleTypes:[
              "front-page",
              "large-nav",
              "about-page",
          ],
        queryLimit: 1000,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
