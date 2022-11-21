import SearchForm from "./SearchForm";
import GalleryData from "./features/gallery/GalleryData";

export default function App() {
  return (
    <div className="App">
      <h1>Search for artworks of the Metropolitan Museum of Art</h1>
      <SearchForm />
      <GalleryData />
    </div>
  );
}
