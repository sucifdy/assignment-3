import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Mengarahkan kembali ke halaman sebelumnya
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 | Not Found</h1>
      <button
        data-testid="back"
        style={styles.button}
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default NotFound;
