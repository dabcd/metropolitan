import { useSelector } from "react-redux";
import { useGetSearchQuery } from "../../slices/apiSlice";
import { selectSearchQuery } from "../../slices/querySlice";
import Gallery from "./Gallery";
import "./dotsloader.css";

export default function GalleryData() {
  const queryString = useSelector(selectSearchQuery);

  const {
    data = [],
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSearchQuery(queryString, {
    skip: !queryString,
  });

  if (isError) {
    return <p>{error}</p>;
  }

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isSuccess) {
    return null;
  }

  if (!data.objectIDs) {
    return <p>Nothing found for this query</p>;
  }

  const objects = data.objectIDs.slice();

  return <Gallery objects={objects} />;
}
