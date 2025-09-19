import React from 'react';

const EventCard = ({ event, onBookmark, isBookmarked, showBookmark = false }) => {
  return (
    <div className="event-card card h-100 p-0 border-0">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex align-items-center mb-2 justify-content-between">
            <div className="d-flex align-items-center">
              <span className="event-badge me-2">{event.eventType}</span>
            </div>
            {showBookmark && (
              <button
                className="btn btn-link p-0 border-0"
                style={{boxShadow:'none'}}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                onClick={() => onBookmark(event)}
              >
                <i className={isBookmarked ? 'bi bi-bookmark-fill text-primary' : 'bi bi-bookmark'} style={{fontSize:'1.4em'}}></i>
              </button>
            )}
          </div>
          <h5 className="card-title fw-bold mb-1" style={{color:'#3b5bfd'}}>{event.title}</h5>
          <h6 className="card-subtitle mb-2 event-meta text-secondary"><i className="bi bi-person-circle me-1"></i>{event.organizerName}</h6>
          <p className="card-text mb-2" style={{minHeight:'60px'}}>{event.description}</p>
          <div className="event-meta-list mb-2">
            <div className="event-meta d-flex align-items-center mb-1">
              <i className="bi bi-geo-alt me-2"></i>
              <span>{event.location}</span>
            </div>
            <div className="event-meta d-flex align-items-center mb-1">
              <i className="bi bi-calendar-event me-2"></i>
              <span><strong>Event:</strong> {event.eventDate ? new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
            </div>
            <div className="event-meta d-flex align-items-center mb-1">
              <i className="bi bi-clock me-2"></i>
              <span><strong>Deadline:</strong> {event.deadline ? new Date(event.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
            </div>
            {event.participants && (
              <div className="event-meta d-flex align-items-center mb-1">
                <i className="bi bi-people me-2"></i>
                <span>{event.participants.toLocaleString()} participants</span>
              </div>
            )}
          </div>
          <div className="event-tags mb-2">
            {event.tags && event.tags.map((tag, idx) => (
              <span key={idx} className="event-tag">{tag}</span>
            ))}
          </div>
        </div>
        <a
          href={event.applyLink || event.link || '#'}
          className="btn btn-primary w-100 mt-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{fontWeight:600, fontSize:'1.1rem'}}
        >
          Apply Now <i className="bi bi-box-arrow-up-right ms-1"></i>
        </a>
      </div>
    </div>
  );
};

export default EventCard;
