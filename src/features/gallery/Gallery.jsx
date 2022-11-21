import { useState, useMemo, useEffect } from "react";
import throttle from "lodash.throttle";
import Picture from "./Picture";
import Lightbox from "../lightbox/Lightbox";

// The amount of images to be loaded at once
const IMAGES_NUMBER = 12;

// These values correspond to css values of ".Picture"
const PICTURE_WIDTH = 200;
const PICTURE_HEIGHT = 250;

export default function Gallery({ objects }) {

  const [content, setContent] = useState([]);

  const throttledHandleLoad = useMemo(
    () => throttle(handleLoad, 1000, { leading: true, trailing: false }),
    []
  );

  function handleLoad(num = 1) {
    if (!hasMoreObjects) return;
    setContent((prev) => objects.slice(0, prev.length + num * IMAGES_NUMBER));
  }

  function handleScroll() {
    const measure =
      document.documentElement.offsetHeight -
      (window.innerHeight + document.documentElement.scrollTop);
    if (measure >= 0 && measure <= 100) {
      throttledHandleLoad();
    }
  }

  const hasMoreObjects = content.length === objects.length ? false : true;

  useEffect(() => {
    setContent([]);
  }, [objects]);

  useEffect(() => {
    let numberOfBatches = Math.ceil(
      (Math.floor(window.innerWidth / PICTURE_WIDTH) *
        Math.floor(window.innerHeight / PICTURE_HEIGHT)) /
        IMAGES_NUMBER
    );
    if (numberOfBatches === 0) {
      numberOfBatches = 1;
    }
    handleLoad(numberOfBatches);
  }, [objects]);

  useEffect(() => {
    if (!hasMoreObjects) {
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      throttledHandleLoad.cancel();
    };
  }, [hasMoreObjects]);

  return (
    <div>
      <div className="Gallery">
        {content.map((elem, index) => (
          <Picture key={index} id={index} objectId={elem} />
        ))}
      </div>
      <Lightbox objects={objects} />
    </div>
  );
}
