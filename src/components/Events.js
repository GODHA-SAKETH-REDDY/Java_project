import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddEvent from './AddEvent';
import EventCard from './EventCard';
import '../Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Example stats (replace with real counts if available)
  const stats = [
    { label: 'Upcoming Events', value: '155+', color: '#3b5bfd' },
    { label: 'Hackathons', value: '35', color: '#16a34a' },
    { label: 'Internships', value: '25', color: '#f59e1b' },
    { label: 'Students', value: '25K+', color: '#334155' },
  ];
  const categories = [
    { label: 'All', icon: 'bi-calendar', count: 155, key: 'all' },
    { label: 'Hackathons', icon: 'bi-trophy', count: 35, key: 'Hackathon' },
    { label: 'Internships', icon: 'bi-briefcase', count: 25, key: 'Internship' },
    { label: 'Workshops', icon: 'bi-mortarboard', count: 30, key: 'Workshop' },
    { label: 'Competitions', icon: 'bi-award', count: 32, key: 'Student Competition' },
    { label: 'Seminars', icon: 'bi-people', count: 33, key: 'Seminar' },
  ];
  const [tab, setTab] = useState('featured');
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

  // Set category from navigation state (e.g., from Footer)
  useEffect(() => {
    if (location.state && location.state.category) {
      setActiveCategory(location.state.category);
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Filtering logic
  const now = new Date();
  const filteredEvents = events.filter(event => {
    // Tab filter
    if (tab === 'featured') {
      // Show all events by default
      // (If you want to filter for featured in the future, add logic here)
    } else if (tab === 'upcoming') {
      // Show only events with eventDate in the future
      if (!event.eventDate) return false;
      const eventDate = new Date(event.eventDate);
      if (isNaN(eventDate.getTime()) || eventDate < now) return false;
    }
    // Category filter (use event.type, case-insensitive)
    if (activeCategory === 'all') return true;
    const typeMap = {
      Hackathon: 'hackathon',
      Internship: 'internship',
      Workshop: 'workshop',
      'Student Competition': 'competition',
      Seminar: 'seminar',
    };
    const eventType = (event.type || '').toLowerCase();
    if (activeCategory in typeMap) {
      return eventType === typeMap[activeCategory];
    }
    return true;
  });

  // Bookmark logic
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('bookmarkedEvents');
    return saved ? JSON.parse(saved) : [];
  });

  const handleBookmark = (event) => {
    let updated;
    if (bookmarkedIds.includes(event._id)) {
      updated = bookmarkedIds.filter(id => id !== event._id);
    } else {
      updated = [...bookmarkedIds, event._id];
      // Save event data to localStorage for Bookmarks page
      const all = JSON.parse(localStorage.getItem('bookmarkedEventsData') || '[]');
      if (!all.find(e => e._id === event._id)) {
        localStorage.setItem('bookmarkedEventsData', JSON.stringify([...all, event]));
      }
    }
    setBookmarkedIds(updated);
    localStorage.setItem('bookmarkedEvents', JSON.stringify(updated));
    // Remove from data if unbookmarked
    if (!updated.includes(event._id)) {
      const all = JSON.parse(localStorage.getItem('bookmarkedEventsData') || '[]');
      localStorage.setItem('bookmarkedEventsData', JSON.stringify(all.filter(e => e._id !== event._id)));
    }
  };

  return (
    <div className="container mt-4">
      <div className="events-hero text-center">
        <h1 style={{fontWeight:800, fontSize:'3rem', color:'#22223b', marginBottom:'0.5rem'}}>
          Discover Amazing <span style={{color:'#3b5bfd'}}>Student Events</span>
        </h1>
        <p style={{fontSize:'1.25rem', color:'#475569', marginBottom:'2.5rem'}}>
          Find hackathons, internships, workshops, and competitions tailored for students. Never miss an opportunity to grow your skills and network.
        </p>
        <div className="row justify-content-center mb-4">
          {stats.map((stat, idx) => (
            <div className="col-6 col-md-3 mb-3 mb-md-0" key={stat.label}>
              <div style={{background:'#fff', borderRadius:'1.1rem', boxShadow:'0 2px 12px rgba(59,91,253,0.07)', padding:'1.2rem 0.5rem'}}>
                <div style={{fontWeight:700, fontSize:'2rem', color:stat.color}}>{stat.value}</div>
                <div style={{fontSize:'1.08rem', color:'#64748b'}}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h4 style={{fontWeight:700, color:'#22223b', marginBottom:0}}>Categories</h4>
          <button
            className="btn btn-light border d-flex align-items-center"
            style={{fontWeight:500}}
            onClick={() => alert('More Filters coming soon!')}
          >
            <i className="bi bi-funnel me-2"></i>More Filters
          </button>
        </div>
        <div className="row mb-4 g-3">
          {categories.map((cat, idx) => (
            <div className="col-6 col-md-2" key={cat.label}>
              <div
                className={activeCategory === cat.key ? 'category-tile active' : 'category-tile'}
                style={{cursor:'pointer'}}
                onClick={() => setActiveCategory(cat.key)}
              >
                <i className={`bi ${cat.icon} mb-2`} style={{fontSize:'1.5rem'}}></i>
                <div style={{fontWeight:600}}>{cat.label}</div>
                <div style={{fontSize:'1.1rem', color:'#64748b'}}>{cat.count}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex mb-4" style={{gap:'1rem'}}>
          <button className={tab==='featured' ? 'btn btn-dark' : 'btn btn-light border'} style={{fontWeight:600, minWidth:160}} onClick={()=>setTab('featured')}>
            <i className="bi bi-graph-up-arrow me-2"></i>Featured Events
          </button>
          <button className={tab==='upcoming' ? 'btn btn-dark' : 'btn btn-light border'} style={{fontWeight:600, minWidth:160}} onClick={()=>setTab('upcoming')}>
            <i className="bi bi-calendar-event me-2"></i>Upcoming
          </button>
        </div>
      </div>
      {/* <AddEvent onEventAdded={fetchEvents} /> */}
      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="row">
          {filteredEvents.map(event => (
            <div className="col-md-4 mb-4" key={event._id}>
              <EventCard
                event={event}
                onBookmark={handleBookmark}
                isBookmarked={bookmarkedIds.includes(event._id)}
                showBookmark={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
