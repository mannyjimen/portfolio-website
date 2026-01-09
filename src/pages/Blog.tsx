import "../index.css";
import { ScrambleText} from '../components/ScrambleText';
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="container">
      <header>
        <h1 className="name-style">
          <ScrambleText text="blog :D" />
        </h1>
      </header>
      
      <main>
        <div className="header-style">
          <ul>
            <li><Link to="/" className="top-page-link">home</Link></li>
          </ul>
          <p>
            this is where i like to write about <br></br> 
            the projects/software i am working on.

            <br></br><br></br>
            i dont really write a lot, sorry if theres <br></br>
            any grammatical mistakes :(
          </p>
        </div>

{/* POSTS */}
    <div className="blogs">
        <h2 className="blogposts-section-title">posts\n</h2>
    </div>
      </main>
    </div>
  );
}

export default Blog