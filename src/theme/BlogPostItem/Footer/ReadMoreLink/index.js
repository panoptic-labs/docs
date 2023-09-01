import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import "./ReadMoreLink.css"
function ReadMoreLabel({whiteText = false}) {
  return (
    <b className={clsx("read-more-label", {"text-white": whiteText})}>
      <Translate
        id="theme.blog.post.readMore"
        description="The label used in blog post item excerpts to link to full blog posts">
        Read
      </Translate>
    </b>
  );
}
export default function BlogPostItemFooterReadMoreLink(props) {
  const {blogPostTitle, whiteText, ...linkProps} = props;
  return (
    <Link
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        {title: blogPostTitle},
      )}
      className="read-more-link"
      {...linkProps}>
      <div className="read-more-button">
        <ReadMoreLabel whiteText={whiteText}/>
        {whiteText &&
          <img src={`/img/icons/read-more-arrow-white.svg`} alt="read-more-arrow" className="read-more-arrow"/>
        }
        {!whiteText &&
          <img src={`/img/icons/read-more-arrow.svg`} alt="read-more-arrow" className="read-more-arrow"/>
        }
      </div>
    </Link>
  );
}
