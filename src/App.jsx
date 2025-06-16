// App.jsx
import { useEffect, useState } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  const postsPerPage = 10;

  // Theme Effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fetch posts
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

  // Search filter
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayedPosts(filtered);
    setPage(1);
  }, [search, posts]);

  // Paginate
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
      <main className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by title..."
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />

        {/* Loading/Error */}
        {loading && <p className="text-center animate-pulse">⏳ Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Posts */}
        {!loading && !error && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800 transform transition hover:scale-105 duration-300"
                >
                  <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                  <p className="text-sm opacity-80">{post.body}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span className="font-medium">
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

      <footer className="text-center text-sm mt-10 pb-4 opacity-60">
        © 2025 | Built by Toheeb with 💻 React + Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
