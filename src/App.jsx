// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css"; // Optional custom styles

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  const postsPerPage = 9;

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fetch posts from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(POSTS_URL);
        const data = await res.json();
        setPosts(data);
        setDisplayedPosts(data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter posts by search
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayedPosts(filtered);
    setPage(1);
  }, [search, posts]);

  const paginatedPosts = displayedPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );
  const totalPages = Math.ceil(displayedPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow dark:shadow-white/10">
        <h1 className="text-xl sm:text-2xl font-bold">📡 JSONPlaceholder Posts</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Counter */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🔢 Counter</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              -
            </button>
            <span className="text-xl font-bold">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>
        </section>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search posts by title..."
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />

        {/* Loading/Error */}
        {loading && <p className="text-center animate-pulse">⏳ Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Posts List */}
        {!loading && !error && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow hover:scale-105 transition-transform duration-200"
                >
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-sm">{post.body}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm mt-10 pb-4 opacity-60">
        © {new Date().getFullYear()} | Built by  Adebayo Toheeb with 💻 React + Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
