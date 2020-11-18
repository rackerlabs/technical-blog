import React from 'react';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import moment from 'moment';
const Entities = require('html-entities').AllHtmlEntities;
import Snippet from './Snippet';


const Hit = ({ hit }) => {
  const entities = new Entities();
  if (hit.categories != null && hit.date != null && hit.date != '' && hit.url != null && hit.author != null) {
    return (
      <div className="row">
        <div className="col-sm-12">
          <a className="search-type-link" href="/blog">Blog</a>&nbsp;&gt;&nbsp;
          {hit.categories.map((category, index) => <a key={category} href={`/blog/categories/${category.trimStart().replace(/\s+/g, '-')}`} className="search-type-link">{category} {index < hit.categories.length - 1 ? ',\u00A0' : ''}</a>)}
          <h2>
            <a className="search-title-link" href={`/blog/${hit.url.replace(/\s+/g, '-')}`}>
              <Highlight attribute="title" hit={hit} />
            </a>
          </h2>
          <a className="search-summary-link" href={`/blog/${hit.url.replace(/\s+/g, '-')}`}>
            <p className="search-summary"><Snippet hit={hit} attribute="content" tagName="mark"/></p>
          </a>
          <span className="search-author" > By &nbsp; <a className="search-author-link" href={`/blog/authors/${hit.author.replace(/\s+/g, '-')}`}><Highlight attribute="author" hit={hit} /></a></span>
          <span className="search-date">{moment(hit.date).format('LL')}</span>
        </div>
      </div>
    );
  } else {
    return (<span></span>);
  }
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
