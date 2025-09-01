import { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import MovieCard from "@/components/features/MovieCard";

interface Movie {
    poster_path: string;
}

export default function Content({ title }: { title: string }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const API_KEY = "";
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&page=1`,
                );
                const data = await res.json();
                setMovies(data.results);
                setLoading(false);
                console.log(data.results[0]);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-8">
            <h1>{title}</h1>
            <button className="flex" type="button">
                <Funnel />
                Bộ lọc
            </button>
            <div className="mx-auto flex flex-wrap gap-4">
                {!loading &&
                    movies.map((m) => <MovieCard imgURL={m.poster_path} />)}
            </div>
        </div>
    );
}
