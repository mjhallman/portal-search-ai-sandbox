import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {useGetStructureQuery, useSearchQuery} from "../../store/deployApi";
import React, {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import SearchHit from "../search_hit/SearchHit";
import {useGetChatQuery} from "../../store/api";
import ChatResponseDisplay from "./ChatResponseDisplay";

export type SearchProps = {}

export type StructureResponse = {

}

export type DeploymentParams = {
  organizationId: string
  deploymentId: string
}

const Search = (props: SearchProps) => {


  const [searchQueryInForm, setSearchQueryInForm] = useState("Is it safe to move files?")
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

  const {data: chatData, error: chatError, isFetching: chatIsFetching, } = useGetChatQuery({
    query: searchQuery,
    contentHrefs: data ? data?.hits.slice(0, 3).map(hit => hit.href) : []
  }, {
    skip: !(!!searchQuery && !!data)
  })

  const chatResponseHtml = chatData?.chatResponse?.answer


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
    <Grid container spacing={2} padding={5}>
      <Grid item xs={12}>
        <TextField value={searchQueryInForm} onChange={handleTextChange} onKeyDown={handleKeyDown} label="Search" variant="standard"  fullWidth={true}/>
      </Grid>

      <Grid item xs={6}>
        <div>

          <h2>Search Results</h2>
          <hr/>
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
      </Grid>

      <Grid item xs={4}>
        <div>
          <h2>Chat</h2>
          <hr/>
          {chatIsFetching && <div>Loading...</div>}
          {!chatIsFetching && chatData && <div>
            <ChatResponseDisplay chatResponse={chatData}/>

          </div>}
        </div>
      </Grid>

    </Grid>

  )

}

export default Search
