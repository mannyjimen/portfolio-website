import { useState, useEffect} from 'react';
import "../index.css";
import { ScrambleText} from '../components/ScrambleText';
import { Link } from "react-router-dom";
import matter from 'gray-matter';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined' && !(window as any).Buffer) {
  (window as any).Buffer = Buffer
}

function Blog() {

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    //grabs every .md file in /posts
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });
    //removing leading path details
    const postSlugs = Object.keys(modules).map((path) => {
      const slug = path.split('/').pop()?.replace('.md', '');
      const rawContent = (modules[path] as { default: string }).default;

    //date!
      const { data } = matter(rawContent);

      return {
        slug,
        date: data.date,
        title: slug?.replace(/-/g, ' ')
      };
  });

  const sorted = postSlugs.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  setPosts(sorted);

}, []);

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

{/* posts */}
    <div className="blogs">
        <h2 className="blogposts-section-title">posts\n</h2>
        <div className="projects">
          {posts.map((post) => (
            <div className="project" key={post.slug} style={{marginBottom: '1.5rem'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <Link to={`/blog/${post.slug}`} className="project-name">
                  {post.title}
                </Link>
                {/*displaying date*/}
                <span style={{ opacity: 0.4, fontSize: '0.85rem', fontFamily: 'var(--font-monospace)'}}>
                  {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
    </div>
      </main>
    </div>
  );
}

export default Blog