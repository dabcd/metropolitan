import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveQuery } from "./slices/querySlice";

export default function SearchForm() {
  const [query, setQuery] = useState({
    hasImages: true,
    isHighlight: true,
    q: "",
  });

  const dispatch = useDispatch();

  function handleQuery(event) {
    if (event.target.type === "checkbox") {
      setQuery((prev) => ({
        ...prev,
        [event.target.name]: !prev[event.target.name],
      }));
    } else {
      setQuery((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query.q.length > 1) {
      dispatch(saveQuery(query));
    }
  }

  return (
    <div className="SearchForm">
      <form className="form" onSubmit={handleSubmit}>
        <div className="search-flex">
          <input
            className="search-input"
            type="text"
            name="q"
            value={query.q}
            placeholder="Search for topic(s)..."
            onChange={handleQuery}
            autoFocus
          />
          <input className="search-button" type="submit" value="Search" />
        </div>
        <div className="search-checkbox">
          <label htmlFor="isHighlight">Only among featured artworks?</label>
          <input
            type="checkbox"
            name="isHighlight"
            id="isHighlight"
            checked={query.isHighlight}
            onChange={handleQuery}
          />
        </div>
      </form>
    </div>
  );
}
