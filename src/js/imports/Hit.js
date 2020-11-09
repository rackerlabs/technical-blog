import React from 'react';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Snippet } from 'react-instantsearch-dom';


const Hit = ({ hit }) => {
  if (hit.authors && hit.authors.length > 0 && hit.category) {
    const categories = hit.category.replace(/[\[\]]/g, "").split(',');
    return (
      <div className="row">
        <div className="col-sm-12">
          <a className="search-type-link" href="/blog">Blog</a>&nbsp;&gt;&nbsp;
          {categories.map((category, index) => <a key={category} href={`/blog/categories/${category.trimStart().replace(/\s+/g, '-')}`} className="search-type-link">{category} {index < categories.length - 1 ? ',\u00A0' : ''}</a>)}
          <h2>
            <a className="search-title-link" href={`${hit.url}`}>
              <Highlight attribute="title" hit={hit} />
            </a>
          </h2>
          <a className="search-summary-link" href={`${hit.url}`}>
            <p className="search-summary"><Snippet hit={hit} attribute="description" tagName="mark"/></p>
          </a>
          <span className="search-author" > By &nbsp; <a className="search-author-link" href={`/blog/authors/${hit.authors[0].replace(/\s+/g, '-')}`}>{hit.authors[0]}</a></span>
          <span className="search-date">{hit.image}</span>
        </div>
      </div>
    )
  } else {
    return (<span></span>);
  }
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
