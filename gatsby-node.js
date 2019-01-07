const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    collection
                  }
                  frontmatter {
                    title
                    date
                    posttype
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const posts2 = posts;
        
        _.each(posts, (post, index) => {

          // var previous = null
          // count = index + 1
          // var i = 0
          // while (i <= posts.length - 1){
          //   var node = posts[count].node
          //   if(node.fields.collection == post.node.fields.collection){
          //     previous = node
          //   }
          //   count++
          // }

          // const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          // const next = index === 0 ? null : posts[index - 1].node;

          var count = [] 
          _.each(posts2,(post2,index2) =>{
            if(post2.node.frontmatter.posttype == post.node.frontmatter.posttype){
              count.push(post2.node)
            }
          })

          var found = count.indexOf(posts[index].node)
          
          const newPrevious = count[found - 1] === null ? null : count[found - 1]
          const newNext = count[found + 1] === null ? null : count[found + 1]

          
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              postCollection: post.node.fields.collection,
              newPrevious,
              newNext,
              found,
              count
            },
          })
        })
      })
    )
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode,basePath:`pages`})
    const parent = getNode(_.get(node, 'parent'))

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // var getTypePost = value.split('/')
    // var value2 = getTypePost[1]
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, "sourceInstanceName")
    })

  }
}
