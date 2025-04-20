// pages/ResourcesPage.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkX, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Volume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    categories?: string[];
    infoLink: string;
  };
  accessInfo: {
    pdf: { isAvailable: boolean; acsTokenLink?: string };
    epub: { isAvailable: boolean; epubLink?: string };
  };
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Volume[]>([]);
  const [filtered, setFiltered] = useState<Volume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCat, setActiveCat] = useState("All");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  useEffect(() => {
    if (activeCat === "All") setFiltered(results);
    else
      setFiltered(
        results.filter((v) =>
          v.volumeInfo.categories?.includes(activeCat)
        )
      );
  }, [results, activeCat]);

  const fetchDocuments = async (loadMore = false) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const idx = loadMore ? startIndex : 0;
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&filter=free-ebooks&startIndex=${idx}&maxResults=10`
      );
      if (!res.ok) throw new Error("Network Error");
      const data = await res.json();
      const items: Volume[] = data.items || [];
      const newResults = loadMore ? [...results, ...items] : items;
      setResults(newResults);
      setStartIndex(idx + 10);

      const catSet = new Set<string>();
      newResults.forEach((v) =>
        v.volumeInfo.categories?.forEach((c) => catSet.add(c))
      );
      setCategories(["All", ...Array.from(catSet)]);
      setActiveCat("All");
    } catch (e) {
      console.error(e);
      setError("Unable to fetch documents. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setFiltered([]);
    setCategories(["All"]);
    setActiveCat("All");
    setStartIndex(0);
    setError(null);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const SKELETONS = Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-2xl" />
  ));

  return (
    <div className="px-4 py-10 md:px-6 max-w-6xl mx-auto">
      <div className="rounded-3xl shadow-[0_0_30px_rgba(200,0,0,0.4)] border border-gray-300 bg-gradient-to-br from-white/60 to-gray-100/70 backdrop-blur-md p-6 md:p-10 space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Find & Download Documents
          </h1>
          <p className="text-gray-600">Search free eBooks & papers.</p>
        </header>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type document topic..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => fetchDocuments(false)}
              disabled={loading}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              {loading ? "Searching…" : "Fetch"}
            </Button>
            <Button onClick={clearSearch} disabled={loading} variant="outline">
              Clear
            </Button>
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`cursor-pointer px-3 py-1 rounded-full font-medium ${
                  activeCat === cat
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {loading && results.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{SKELETONS}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((vol) => {
              const { id, volumeInfo, accessInfo } = vol;
              const pdfLink = accessInfo.pdf.isAvailable
                ? accessInfo.pdf.acsTokenLink
                : accessInfo.epub.isAvailable
                ? accessInfo.epub.epubLink
                : null;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex flex-col h-72 justify-between bg-white bg-opacity-60 backdrop-blur-md rounded-2xl border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    <CardContent className="flex flex-col flex-grow p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        {volumeInfo.categories && (
                          <Badge className="text-xs bg-red-600 text-white">
                            {volumeInfo.categories[0]}
                          </Badge>
                        )}
                        <button
                          onClick={() => toggleBookmark(id)}
                          aria-label="Bookmark"
                        >
                          {bookmarks.has(id) ? (
                            <Bookmark size={20} className="text-red-500" />
                          ) : (
                            <BookmarkX size={20} className="text-gray-300" />
                          )}
                        </button>
                      </div>
                      <div className="flex-grow flex flex-col space-y-1">
                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {volumeInfo.title}
                        </h2>
                        {volumeInfo.authors && (
                          <p className="text-gray-700 text-sm">
                            by {volumeInfo.authors.join(", ")}
                          </p>
                        )}
                        {volumeInfo.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {volumeInfo.description}
                          </p>
                        )}
                      </div>
                      <a
                        href={pdfLink || volumeInfo.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto"
                      >
                        <Button className="w-full bg-red-600 hover:bg-red-500 text-white">
                          {pdfLink ? "Download PDF" : "View Details"}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {!loading && filtered.length > 0 && (
          <div className="text-center">
            <Button
              onClick={() => fetchDocuments(true)}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
