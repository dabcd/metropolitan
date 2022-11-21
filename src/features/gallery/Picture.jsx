import { useDispatch } from "react-redux";
import { useGetObjectQuery } from "../../slices/apiSlice";
import { saveLightbox } from "../../slices/querySlice";
import notFound from "../../assets/not-found2.png";

export default function Picture(props) {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetObjectQuery(
    props.objectId
  );

  if (!isSuccess) return null;

  function handleClick() {
    dispatch(saveLightbox(props.id));
  }

  let image = notFound;
  if (data.primaryImageSmall) {
    image = data.primaryImageSmall;
  }

  return (
    <>
      <div className="Picture">
        <img
          src={image}
          alt={data.title.slice(0, 100)}
          onClick={() => handleClick()}
        />
        <div className="picture-info">
          <div className="font-bold">{data.title.slice(0, 80)}</div>
          <div className="artist font-italic">
            {data.artistDisplayName.slice(0, 80)}
          </div>
          <div className="date">{data.objectDate}</div>
        </div>
      </div>
    </>
  );
}
