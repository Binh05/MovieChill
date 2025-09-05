import { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationLink,
} from "@/components/ui/pagination";
import MovieCard from "@/components/features/MovieCard";
import { useSearchParams } from "react-router-dom";

interface Movie {
    poster_path: string;
}

export default function Content({ title }: { title: string }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = async (page: number) => {
        const API_KEY = "";
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&page=${page}`,
            );
            const data = await res.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies(1);
    }, []);

    return (
        <div className="my-50 grid w-full justify-center">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl uppercase">{title}</h1>
                    <button className="flex" type="button">
                        <Funnel />
                        Bộ lọc
                    </button>
                </div>
                <div className="mx-auto flex flex-wrap gap-4">
                    {!loading &&
                        movies.map((m) => <MovieCard imgURL={m.poster_path} />)}
                </div>
                <div>
                    <PaginationContainer
                        fetchMovies={fetchMovies}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
}

// function PaginationContainer({
//     fetchMovies,
// }: {
//     fetchMovies: (page: number) => void;
// }) {
//     const [currentPage, setCurrentPage] = useState(1);

//     return (
//         <Pagination>
//             <PaginationContent>
//                 <PaginationItem>
//                     <PaginationPrevious
//                         onClick={() => {
//                             setCurrentPage((prev) => prev - 1);
//                             fetchMovies(currentPage - 1);
//                         }}
//                         to={`/${currentPage - 1}`}
//                     />
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationLink
//                         to={`/${currentPage - 1}`}
//                         onClick={() => {
//                             setCurrentPage((prev) => prev - 1);
//                             fetchMovies(currentPage - 1);
//                         }}
//                         isActive
//                     >
//                         {currentPage - 1}
//                     </PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationLink to={`/${currentPage}`}>
//                         {currentPage}
//                     </PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationLink
//                         to={`/${currentPage + 1}`}
//                         onClick={() => {
//                             setCurrentPage((prev) => prev + 1);
//                             fetchMovies(currentPage + 1);
//                         }}
//                     >
//                         {currentPage + 1}
//                     </PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                     <PaginationNext to="#" />
//                 </PaginationItem>
//             </PaginationContent>
//         </Pagination>
//     );
// }

type Props = {
    fetchMovies: (page: number) => void;
    totalPages: number; // để kiểm tra trang cuối
};

function PaginationContainer({ fetchMovies, totalPages }: Props) {
    const [searchParams] = useSearchParams();

    // Lấy page từ query param (vd: /anime?page=3)
    const page = parseInt(searchParams.get("page") || "1", 10);

    // Gọi API khi page thay đổi
    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    // Đổi page bằng cách cập nhật param URL
    const handleChangePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return; // tránh vượt ngoài phạm vi
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        to={`?page=${page - 1}`}
                        onClick={
                            page === 1
                                ? undefined
                                : () => handleChangePage(page - 1)
                        }
                        className={
                            page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>

                {/* Trang hiện tại và xung quanh */}
                {page > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            to={`?page=${page - 1}`}
                            onClick={() => handleChangePage(page - 1)}
                        >
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink to={`?page=${page}`} isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {page < totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            to={`?page=${page + 1}`}
                            onClick={() => handleChangePage(page + 1)}
                        >
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleChangePage(page + 1)}
                        to={`?page=${page + 1}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
