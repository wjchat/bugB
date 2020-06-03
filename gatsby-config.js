
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
        trackingId: "UA-167572949-1",
        head: "true",
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: "IGQVJWelpTeWEzUGs2T0theUh1ZA2F5bjR1YmZAFSkk4YmFiVUdwMm0xYnZAyemtEVG1xQmUzYm9mc1JqR1ZA4OGFQTXo1R254VEJuNzM3ZA3MtVHFyZAGdhQ3dvX1Q1TC1GSU05TlVnVXFwMDRFWFpiUzZATZAwZDZD",
      },
    },

    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-sass",
    `gatsby-plugin-transition-link`,
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
        apiURL: "https://bugb-backend.herokuapp.com",
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "collections",
          "clothing-images",
          "clothing-piece",
        ],
        singleTypes: ["front-page", "large-nav", "about-page"],
        queryLimit: 1000,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
