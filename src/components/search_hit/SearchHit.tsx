import {SearchHit} from "../../store/api";

export type SearchHitProps = {
  searchHit: SearchHit
}

const SearchHit = (props: SearchHitProps) => {

  return (
      <div className="search-hit">
        <h3>{props.searchHit.title}</h3>
        <p>{props.searchHit.shortDescription}</p>
      </div>
  )
}

export default SearchHit