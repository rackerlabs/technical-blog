import React from 'react';
import Highlight from './Highlight';
import PropTypes from 'prop-types';
import moment from 'moment';


const Hit = ({ hit }) => (
  <div className="row">
    <div className="col-sm-12">
        <a className="search-type-link" href="/blog">Blog</a>&nbsp;&gt;&nbsp;
          <ul>{
          hit.categories.map(function(item, index) {
            return <li key={`${index}`}><a className="search-type-link">{ (index ? ', ' : '') + item }</a></li>;
          })
        }</ul>
      <h2>
      <a className="search-title-link" href={`/support/how-to/${hit.url}`}>
        <Highlight attribute="title" hit={hit} />
      </a>
      </h2>
      <a className="search-summary-link" href={`/support/how-to/${hit.url}`}>
        <p className="search-summary"><Highlight attribute="summary" hit={hit} /></p>
      </a>
      <span className="search-author" > By &nbsp; <a className="search-author-link" href={`/support/how-to/${hit.author}`}><Highlight attribute="author" hit={hit} tagName="mark" /></a></span>
      <span className="search-date">{moment(hit.date).format('LL')}</span>
    </div>
  </div>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
