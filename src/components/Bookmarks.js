import React, { useState } from 'react';
import EventCard from './EventCard';
import '../Events.css';


const Bookmarks = () => {
  // Load bookmarked events from localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    const data = localStorage.getItem('bookmarkedEventsData');
    return data ? JSON.parse(data) : [];
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');

  // Filtered bookmarks (search/category)
  const filteredBookmarks = bookmarks.filter(ev => {
    const matchesSearch =
      (ev.title && ev.title.toLowerCase().includes(search.toLowerCase())) ||
      (ev.description && ev.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat =
      category === 'All Categories' ||
      ev.eventType === category ||
      ev.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h1 style={{fontWeight:800, fontSize:'2.3rem', color:'#22223b'}}>Bookmarked Events</h1>
          <div style={{color:'#64748b', fontSize:'1.1rem'}}>All your saved events in one place</div>
        </div>
      </div>
      <div className="d-flex gap-3 mb-4">
        <input
          className="form-control"
          style={{maxWidth: '400px'}}
          placeholder="Search bookmarks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{maxWidth: '200px'}}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Hackathon</option>
          <option>Internship</option>
          <option>Workshop</option>
          <option>Competition</option>
          <option>Seminar</option>
        </select>
      </div>
      {filteredBookmarks.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{background:'#fff', borderRadius:'1.2rem', minHeight:'340px', border:'1.5px solid #e5e7eb'}}>
          <i className="bi bi-bookmark" style={{fontSize:'3.5rem', color:'#cbd5e1', marginBottom:'1rem'}}></i>
          <div style={{fontWeight:700, fontSize:'1.3rem', color:'#22223b'}}>No bookmarks yet</div>
          <div style={{color:'#64748b', fontSize:'1.08rem', marginBottom:'1.5rem'}}>Bookmark events to see them here.</div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredBookmarks.map((event, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <EventCard event={event} showBookmark={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
