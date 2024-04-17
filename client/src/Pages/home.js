import { useNavigate } from "react-router-dom";
import './home.css'; // Import your CSS file

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bodyhome"> {/* Apply the body class */}
      <div className="HomeContainer"> {/* Apply the container class */}
        <div className="HomeBody">
          <div className="RecettaHeading">Recetta</div>
          <div className="homethought">Make magic with what you have</div>
          <div className="homebuttonsgroup">
            <div>
              <button className="homebutton" onClick={() => { navigate("/fromname"); }}>By Name</button>
            </div>
            <div>
              <button className="homebutton" onClick={() => { navigate("/fromimage"); }}>By Image</button>
            </div>
            <div>
              <button className="homebutton" onClick={() => { navigate("/fromingredients"); }}>By Ingredients</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
