import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1
        data-testid="home-page"
        className="navbar-title"
        onClick={() => navigate('/')}
      >
        Student Portal
      </h1>
      <div className="navbar-links">
        <button
          data-testid="student-page"
          className="navbar-btn"
          onClick={() => navigate('/student')}
        >
          All Student
        </button>
        <button
          data-testid="add-page"
          className="navbar-btn"
          onClick={() => navigate('/add')}
        >
          Add Student
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
