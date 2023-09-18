import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import './BlogListFilters.css'

const BlogListFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState('View All');
  // const history = useHistory();

  const filters = ['View All', 'Design', 'Development', 'Product', 'News', 'Management', 'Interviews'];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // history.push(`/blog/tags/${filter}`);
  };

  return (
    <div className="blog-list-filters-container">
      <div className="blog-list-filters">
        {filters.map((filter) => (
          <div 
            key={filter}
            className={`filter-item ${filter === selectedFilter ? 'filter-item-selected' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListFilters;