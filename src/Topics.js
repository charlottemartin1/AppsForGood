import React from 'react';
import { useNavigate } from 'react-router-dom';

function Topics() {
  const navigate = useNavigate();

  const pageStyle = {
    height: '100vh',
    margin: 0,
    backgroundColor: '#e3cfe8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle = {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    padding: '20px 0',
  };

  const homeButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#a68bad',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'center',
    flexGrow: 1,
  };

  const buttonStyle = {
    padding: '20px 40px',
    fontSize: '24px',
    backgroundColor: '#a68bad',
    color: 'black',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1>Topics Page</h1>
        <button style={homeButtonStyle} onClick={() => navigate('/')}>
          Home
        </button>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/kinematics')}>
          Kinematics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/dynamics')}>
          Dynamics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/energy-work-power')}>
          Energy, Work, and Power
        </button>
        <button style={buttonStyle} onClick={() => navigate('/momentum')}>
          Momentum
        </button>
        <button style={buttonStyle} onClick={() => navigate('/circular-motion-gravity')}>
          Circular Motion and Gravity
        </button>
        <button style={buttonStyle} onClick={() => navigate('/rotational-mechanics')}>
          Rotational Mechanics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/simple-harmonic-motion')}>
          Simple Harmonic Motion
        </button>
      </div>
    </div>
  );
}

export default Topics;
