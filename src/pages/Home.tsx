import { useState, useEffect } from 'react';
import "../index.css";
import { ScrambleText} from '../components/ScrambleText';
import { Link } from "react-router-dom";
import matter from 'gray-matter';

function Home() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });

    const loadedPosts = Object.keys(modules).map((path) => {
      const slug = path.split('/').pop()?.replace('.md', '');
      const rawContent = (modules[path] as { default: string }).default;
      const { data } = matter(rawContent);

      return {
        slug,
        date:  data.date,
        //fallback
        title: data.title || slug?.replace(/-/g, ' ')
      };
    });

    const sorted = loadedPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);

    setRecentPosts(sorted);
  }, []);

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
            <p className="project-blurb">currently building a compiler from scratch in Go.
              <br></br>
              contains lexer, parser, bytecode compiler, and virtual machine.
            </p>
          </div>
          <div className="project">
            <a className="project-name" href="https://github.com/mannyjimen/Mini-Compiler" target="_blank">lox interpreter</a>
            <p className="project-blurb">wrote an interpreter in C++ from scratch.
              <br></br>
              lexing, parsing, and walking the tree...
            </p>
          </div>
          <div className="project">
            <a className="project-name" href="https://github.com/mannyjimen/Path-of-the-Tarnished" target="_blank">elden ring stat optimizer</a>
            <p className="project-blurb">cli tool written in Go. 
              <br></br>
               determines optimal elden ring stat distribution.
            </p>
          </div>
        </div>
{/*RECENT BLOG POSTS SECTION*/}
        <div className = "blogs" style={{ marginTop: '3rem' }}>
          <h2 className = "blogposts-section-title">recent blog posts\n</h2>
          <div className = "projects">
            {recentPosts.map((post) => (
              <div className="project" key={post.slug} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline '}}>
                  <Link to={`/blog/${post.slug}`} className="project-name">
                    {post.title}
                  </Link>
                  <span style={{opacity: 0.4, fontSize: '0.85rem', fontFamily: 'var(--font-monospace)' }}>
                    {post.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to= "/blog" className="top-page-link" style={{fontSize: '0.9rem'}}>
            view all posts
          </Link>
        </div>

      </main>
    </div>
  )
}

export default Home