import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToStudentPage = () => {
    navigate('/student');
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <h1>Studi Independen Kampus Merdeka</h1>
        <h2>by RUANGGURU</h2>
        <div className="button-container">
          <button
            data-testid="student-btn"
            className="all-student-btn"
            onClick={goToStudentPage}
          >
            ALL STUDENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
