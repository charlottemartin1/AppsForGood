import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

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

  React.useEffect(() => {
    document.body.style.backgroundColor = '#e3cfe8';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/topics')}>
          Topics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/settings')}>
          Settings
        </button>
        <button style={buttonStyle} onClick={() => navigate('/awards')}>
          Awards
        </button>
      </div>
    </div>
  );
}

export default Home;