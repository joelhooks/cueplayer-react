import React from 'react'
import Helmet from 'react-helmet'
import Footer from './Footer'
import Nav from './Nav'

export default props => {
  return (
    <div className="wrapper">
      <Helmet
        titleTemplate="cueplayer-react - %s"
        title="React Video Component"
        defaultTitle="React Video Component"
        meta={[
          {
            name: 'description',
            content:
              'cueplayer-react is a web video player built from the ground up for an HTML5 world using React library.',
          },
          {
            property: 'og:type',
            content: 'article',
          },
        ]}
      />
      {props.children}
    </div>
  )
}
