import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import InfiniteHits from './InfiniteHits';
import { connectStateResults } from "react-instantsearch/connectors"

const algoliaClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <span></span>
    )
);
const searchClient = {
    search(requests) {
        if (
            requests.every(({ params }) => !params.query.trim()
            )) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                    nbPages: 0,
                    processingTimeMS: 0,
                })),
            });
        }
        return algoliaClient.search(requests);
    }
};

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName={ALGOLIA_BLOG_INDEX} searchClient={searchClient}>
          <Configure hitsPerPage={16} />
          <SearchBox className="searchbox" translations={{ placeholder: 'Search across Blogs', }} showLoadingIndicator />
            <Results>
              <InfiniteHits minHitsPerPage={16} />
            </Results>
        </InstantSearch>
      </div>
    );
  }
}

export default App;