import React from 'react';

// Recursive component rendering the toc tree
function TOCItemTree({ toc, className, linkClassName, itemClassName, isChild, path = [] }) {
  
  if (!toc.length) {
    return null;
  }

  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading, index) => {
        const newPath = [...path, index + 1]; // append the current number to the path
        const content = `${newPath.join('.')}. ${heading.value}`; // construct the numbering string
        
        return (
          <li key={heading.id} className={itemClassName ?? undefined}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a
              href={`#${heading.id}`}
              className={linkClassName ?? undefined}
              // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{__html: content}}
            />
            <TOCItemTree
              isChild
              toc={heading.children}
              className={className}
              linkClassName={linkClassName}
              path={newPath} // pass down the current path to the next level
            />
          </li>
        );
      })}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
