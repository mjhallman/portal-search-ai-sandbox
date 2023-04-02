import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DeploymentParams, StructureResponse} from "../components/Search";
import {config} from "../config";

export type SearchHit = {
  title: string
  href: string
  shortDescription: string
  type: string
  highlights: string
}



export type SearchResponse = {
  totalResults: number
  hits: SearchHit[]

  facets: any[]
  hierarchicalFacets: any[]

}
export type SearchRequest = {
  queryString: string
}

export type SearchParams = {
  deploymentParams: DeploymentParams
  searchRequest: SearchRequest
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.deployBase,
  }),
  endpoints: (build) => ({
    getStructure: build.query<StructureResponse, DeploymentParams>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (params: DeploymentParams) => ({ url: `${config.deployPath}structure?token=${config.deployApiKey}` }),
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: StructureResponse }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
          response: { status: string | number },
          meta,
          arg
      ) => response.status,
    }),
    search: (build.query<SearchResponse, SearchParams>({
      query: (params: SearchParams) => ({
        url: `dev/org/${params.deploymentParams.organizationId}/deployments/${params.deploymentParams.deploymentId}/search?token=${config.deployApiKey}`,
        method: 'POST',
        body: params.searchRequest
      })
    }))
  }),
})

export const { useGetStructureQuery, useSearchQuery } = api;

