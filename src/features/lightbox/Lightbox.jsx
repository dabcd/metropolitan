import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLightbox, saveLightbox } from "../../slices/querySlice";
import { useGetObjectQuery, usePrefetch } from "../../slices/apiSlice";
import "./lightbox.css";

export default function Lightbox({ objects }) {
  const dispatch = useDispatch();
  const lightbox = useSelector(selectLightbox);
  const isLightbox = Number.isInteger(lightbox);
  const prefetchPage = usePrefetch("getObject");

  const { data, isLoading, isSuccess, isError, error } = useGetObjectQuery(
    objects[lightbox],
    {
      skip: !isLightbox,
    }
  );

  useEffect(() => {
    if (!isLightbox) return;
    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  }, [lightbox]);

  if (!isLightbox) return null;

  function handleKeys(event) {
    event.preventDefault();
    if (event.key === "ArrowRight" || event.key === " ") nextImage();
    if (event.key === "ArrowLeft") previousImage();
    if (event.key === "Escape") exitLightbox();
  }

  function nextImage() {
    const size = objects.length;
    if (lightbox === size - 1) return;
    dispatch(saveLightbox(lightbox + 1));
    if (lightbox + 2 < size) prefetchPage(objects[lightbox + 2]);
  }

  function previousImage() {
    if (lightbox === 0) return;
    dispatch(saveLightbox(lightbox - 1));
  }

  function exitLightbox() {
    dispatch(saveLightbox(null));
  }

  if (isError) nextImage();
  if (!isSuccess) return null;

  const isImage = data.primaryImageSmall ? true : false;

  return (
    <div className="lb-overlay">
      <div className="lb-image">
        {isImage && (
          <a className="lb-img-link" href={data.primaryImage} target="_blank">
            click here for full-size image
          </a>
        )}
        <img
          src={isImage ? data.primaryImageSmall : null}
          style={
            isImage ? { objectFit: "contain" } : { objectFit: "scale-down" }
          }
        />
      </div>
      <div className="lb-text">
        <div className="font-bold">{data.title}</div>
        <div className="font-italic">
          {data.artistPrefix} {data.artistDisplayName}
        </div>
        <div>{data.objectDate}</div>
        <div>department: {data.department}</div>
        <div>{data.medium}</div>
        <a className="lb-link" href={data.objectURL} target="_blank">
          Find more details on Museum page
        </a>
      </div>
      <div>
        <div className="lb-close" onClick={exitLightbox}>
          ✖
        </div>
        <div className="lb-left" onClick={previousImage}>
          {"<"}
        </div>
        <div className="lb-right" onClick={nextImage}>
          {">"}
        </div>
      </div>
    </div>
  );
}
