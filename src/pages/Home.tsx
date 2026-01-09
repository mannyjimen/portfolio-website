import "../index.css";
import { ScrambleText} from '../components/ScrambleText';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <header>
        <h1 className="name-style">
          <ScrambleText text="manuel jiménez" />
        </h1>
      </header>
      <main>
{/* HEADER SECTION */}
        <div className="header-style">
          <ul>
            <li><Link to="/blog" className="top-page-link">blog</Link></li>
            <li><a className = "top-page-link" href="https://www.linkedin.com/in/manueljimenez03/" target="_blank" rel="noopener noreferrer">linkedin</a></li>
            <li><a className = "top-page-link" href="https://github.com/mannyjimen" target="_blank" rel="noopener noreferrer">github</a></li>
          </ul>
          <p>
            undergrad cs @ hunter <br></br> nyc
            <br></br> <br></br>
            i love learning how software works under the hood.
            <br></br>
            very interested in compilers and parallelization.
            <br></br>
            <br></br>
            currently learning Go, coming from C++
            <br></br>
            (which is why the accent color for my site is blue...)
          </p>
        </div>
{/* PROJECT SECTION */}
        <div className="projects">
          <h2 className="project-section-title">projects\n</h2>
          <div className="project">
            <a className="project-name" href="https://github.com/mannyjimen/Monkey-Compiler" target="_blank">monkey compiler</a>
            <p className="project-blurb">writing a compiler from scratch in Go.
              <br></br>
              (its beautiful)
            </p>
          </div>
          <div className="project">
            <a className="project-name" href="https://github.com/mannyjimen/Mini-Compiler" target="_blank">lox interpreter</a>
            <p className="project-blurb">wrote an interpreter in C++ from scratch.
              <br></br>
              lexing, parsing, interpreting...
            </p>
          </div>
          <div className="project">
            <a className="project-name" href="https://github.com/mannyjimen/Path-of-the-Tarnished" target="_blank">elden ring stat optimizer</a>
            <p className="project-blurb">cli tool for determining optimal elden ring stat 
              <br></br>
               distribution based on class and weapon.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Home