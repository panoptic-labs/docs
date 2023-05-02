import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./RecentUpdates.css";

const RecentUpdates = () => {
  return (
    <section className="recent-updates">
      <div className="recent-updates__head">
        <h2 className="recent-updates__title">Recent updates</h2>
        <div className="recent-updates__pagination">
          <button className="pagination__prev">{"<"}</button>
          <button className="pagination__next">{">"}</button>
        </div>
      </div>
      <div className="recent-updates__cards">

      </div>
    </section>
  );
};

export default RecentUpdates;
