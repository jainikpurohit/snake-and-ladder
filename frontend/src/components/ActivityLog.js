import React from 'react';
import PropTypes from 'prop-types';
import './css/ActivityLog.css';

const ActivityLog = ({ activityLog }) => (
  <section className="App-activity-log">
    <h2>Activity Log</h2>
    <ul>
      {activityLog.map((log, index) => (
        <li key={index} className={`${log.type} ${log.logEntryClass}`}>{log.message}</li>
      ))}
    </ul>
  </section>
);

ActivityLog.propTypes = {
  activityLog: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      logEntryClass: PropTypes.string,
    })
  ).isRequired,
};

export default ActivityLog;
