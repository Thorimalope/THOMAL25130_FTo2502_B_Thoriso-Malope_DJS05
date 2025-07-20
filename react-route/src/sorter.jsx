export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={function (e) {
        onChange(e.target.value);
      }}
    >
      <option value="A-Z">Sort A-Z</option>
      <option value="Z-A">Sort Z-A</option>
    </select>
  );
}