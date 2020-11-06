import React from 'react';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import moment from 'moment';


const Hit = ({ hit }) => (
  <div className="row">
    <div className="col-sm-12">
        <a className="search-type-link" href="/blog">Blog</a>&nbsp;&gt;&nbsp;
        <a className="search-type-link">{hit.category}</a>
      <h2>
      <a className="search-title-link" href={`/support/how-to/${hit.url}`}>
        <Highlight attribute="title" hit={hit} />
      </a>
      </h2>
      <a className="search-summary-link" href={`/support/how-to/${hit.url}`}>
        <p className="search-summary"><Highlight attribute="description" hit={hit} /></p>
      </a>
      <span className="search-author" > By &nbsp; <a className="search-author-link" href={`/support/how-to/${hit.authors}`}><Highlight attribute="authors" hit={hit} tagName="mark" /></a></span>
      <span className="search-date">{moment(hit.datePublished).format('LL')}</span>
    </div>
  </div>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
