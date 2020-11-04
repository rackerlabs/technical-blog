import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';


const Hit = ({ hit }) => (
  <div className="row">
    <div className="col-sm-12">
      <p className="search-title">
        <a className="search-link" href="/blog">Blog</a>&nbsp;`{'>'}`&nbsp;
        <a className="search-link" href="/blog">{hit.categories}</a>
      </p>
      <Highlight attribute="title" hit={hit} tagName="mark"/>
      <Highlight attribute="summary" hit={hit} tagName="mark"/>
      <span className="search-author" > By &nbsp; <Highlight attribute="author" hit={hit} tagName="mark" /></span>
      <span className="search-date">{hit.date}</span>
    </div>
  </div>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
