export default function SearchBar({value, onChange}) {
    return (
        <input
            type="text"
            placeholder="Search podcasts..."
            value={value}
            onChange={function (e) {
                onChange(e.target.value);
            }}
        />
    )
}