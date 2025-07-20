import { genres } from "./Data.js";

export default function GenreFilter({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={function (e) {
                onChange(e.target.value);
            }}
        >

            <option value="All">All Genres</option>
            {genres.map(function (genre) {
                return (
                    <option key={genre.id} value={genre.title}>
                        {genre.title}
                    </option>
                );
            })}

        </select>
    );
}