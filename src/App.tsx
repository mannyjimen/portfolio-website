import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail'
import CompilerDemo from './pages/CompilerDemo';
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* renders current portfolio */}
        <Route path="/" element={<Home />} />
        
        {/* renders blog list */}
        <Route path="/blog" element={<Blog />} />

        {/* renders blog posts individually (on click) */}
        <Route path="/blog/:slug" element={<PostDetail />} />
        
        <Route path="/test" element={<CompilerDemo />} />
      </Routes>
    </Router>
  );
}

export default App;