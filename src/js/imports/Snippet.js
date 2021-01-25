import React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';
const entities = require("entities");

const Snippet = ({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      highlightProperty: '_snippetResult',
      attribute,
      hit,
    });
    return (
      <span>
        {parsedHit.map(
          (part, index) =>
            part.isHighlighted ? (
              <mark key={index}>{entities.decodeHTML(part.value)}</mark>
            ) : (
              <span key={index}>{entities.decodeHTML(part.value)}</span>
            )
        )}
      </span>
    );
};
  
export default connectHighlight(Snippet)