import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../config";
import {ChatRequest, ChatResponse} from "../pages/api/chat";



export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: config.deployBase,
  }),
  endpoints: (build) => ({
    getChat: build.query<ChatResponse, ChatRequest>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (params: ChatRequest) => ({
        url: `/api/chat`,
        method: 'POST',
        body: params
      }),

      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: StructureResponse }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
          response: { status: string | number },
          meta,
          arg
      ) => response.status,
    }),
  }),
})

export const { useGetChatQuery } = api;

