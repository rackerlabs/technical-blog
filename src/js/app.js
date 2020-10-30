import contentLoaded from "content-loaded";
import SmoothScroll from "./imports/smoothScroll";
const Entities = require('html-entities').AllHtmlEntities;
// import algoliasearch from 'algoliasearch/lite';
// import PropTypes from 'prop-types';

import moment from "moment";

// import React, { Component } from "react";
// import {
//   InstantSearch,
//   Hits,
//   SearchBox,
//   Pagination,
//   Highlight,
//   ClearRefinements,
//   RefinementList,
//   Configure,
// } from 'react-instantsearch-dom';

// const algoliaClient = algoliasearch(ALGOLIA_NETLIFY_BLOG_APP_ID, ALGOLIA_NETLIFY_BLOG_SEARCH_KEY);
// const searchClient = {
//   search(requests) {
//     if (requests.every(({
//         params
//     }) => !params.query)) {
//       return Promise.resolve({
//         results: requests.map(() => ({
//           hits: [],
//           nbHits: 0,
//           nbPages: 0,
//         })),
//       });
//     }
//     return algoliaClient.search(requests);
//   },
// };
// class App extends Component {
//   render() {
//     return (
//       <div className="ais-InstantSearch">
//         <InstantSearch indexName={ALGOLIA_NETLIFY_BLOG_INDEX} searchClient={searchClient}>
//           <div className="right-panel">
//             <SearchBox />
//             <Hits hitComponent={Hit} />
//             <Pagination />
//           </div>
//         </InstantSearch>
//       </div>
//     )
//   }
// }
// function Hit(props) {
//   return (
//     <div>
//       <div className="hit-name">
//         <Highlight attribute="title" hit={props.hit} />
//       </div>
//       <div className="hit-description">
//         <Highlight attribute="content" hit={props.hit} />
//       </div>
//     </div>
//   );
// }

// Hit.propTypes = {
//   hit: PropTypes.object.isRequired,
// };

// export default App;
