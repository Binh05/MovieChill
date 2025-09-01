export default function MovieCard({ imgURL }: { imgURL: string }) {
    return (
        <div>
            <div className="max-w-40 rounded-2xl">
                <img
                    className="w-full rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w500/${imgURL}`}
                    alt=""
                />
            </div>
        </div>
    );
}
