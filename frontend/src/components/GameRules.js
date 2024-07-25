import React from 'react';
import PropTypes from 'prop-types';
import './css/GameRules.css';
import ActivityLog from './ActivityLog';

const GameRules = ({ rules, activityLog }) => (
  <aside className="App-rules">
    <h2>How to Play!</h2>
    <ul>
      {rules.map((rule, index) => (
        <li key={index}>{rule}</li>
      ))}
    </ul>
    <ActivityLog activityLog={activityLog} />
  </aside>
);

GameRules.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  activityLog: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      player: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GameRules;
