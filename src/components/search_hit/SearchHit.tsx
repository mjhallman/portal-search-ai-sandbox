import {SearchHit} from "../../store/deployApi";

export type SearchHitProps = {
  searchHit: SearchHit
}

const SearchHit = (props: SearchHitProps) => {
  const portalUrl = 'https://coredev1-dev.portal.heretto.com/'
  const url = `${portalUrl}${props.searchHit.href}`

  return (
      <div className="search-hit">
        <h3><a href={url} target={"_blank"}>{props.searchHit.title}</a></h3>
        <p>{props.searchHit.shortDescription}</p>
      </div>
  )
}

export default SearchHit