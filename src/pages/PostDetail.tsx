import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ScrambleText } from '../components/ScrambleText';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
import "../index.css";

function PostDetail() {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        //importing raw text from local file VITE way
        import(`../posts/${slug}.md?raw`).then((res) => {
            const { data, content } = matter(res.default);
            setDate(data.date)
            setContent(content);
        })
        .catch(() => setContent("# 404\n post not found. check filename"));
    }, [slug]);

    return (
        <div className="container">
            <header>
                <h1 className="name-style">
                    <ScrambleText text={slug?.replace(/-/g, ' ') || "post"} /> 
                </h1>
                <p style={{ opacity: 0.5, fontSize: '0.9rem', marginTop: '-10px' }}>{date}</p>
            </header>

            <main>
                <div className="header-style">
                    <ul>
                        <li><Link to="/blog" className="top-page-link"> back to blog</Link></li>
                    </ul>
                </div>

                <div className="markdown-body">
                    <ReactMarkdown
                        components={{
                            a: ({node, ...props}: any) => <a {...props} target="_blank" rel="noopener noreferrer" />
                        }}
                    >{content}</ReactMarkdown>
                </div>
            </main>
        </div>
    )
}

export default PostDetail;