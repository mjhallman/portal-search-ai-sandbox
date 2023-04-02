import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {useGetStructureQuery, useSearchQuery} from "../../store/api";
import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import SearchHit from "../search_hit/SearchHit";

export type SearchProps = {}

export type StructureResponse = {

}

export type DeploymentParams = {
  organizationId: string
  deploymentId: string
}


const Search = (props: SearchProps) => {
  const [searchQueryInForm, setSearchQueryInForm] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [skip, setSkip] = useState(true)
  const apiDetails = useSelector((state: RootState) => state.apiDetails.value)
  const { data, error, isLoading } = useSearchQuery(
      {
        deploymentParams: {
          organizationId: "jorsek-qa-nightly",
          deploymentId: apiDetails.deployApiDetails.deploymentId,
        },
        searchRequest: {
          queryString: searchQuery
        }
      },
      {
        skip
      }
  );

  const handleTextChange = (event) => {
    const value = event.target.value
    setSearchQueryInForm(value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(searchQueryInForm)
      setSkip(false)
    }
  }

  return (
    <div>

      <TextField onChange={handleTextChange} onKeyDown={handleKeyDown} label="Search" variant="standard" />

      {isLoading && <div>Loading...</div>}
      {data && <div>
        {
          data.hits.map((hit) => {
            return (
              <SearchHit key={hit.href} searchHit={hit} />
            )
          })
        }

      </div>}


    </div>
  )

}

export default Search
