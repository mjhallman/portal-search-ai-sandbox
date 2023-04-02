import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ApiDetails, DeployApiDetails} from "../../pages/index";

export interface ApiDetailsState {
  value: ApiDetails
}

const initialState: ApiDetailsState = {
  //https://dev-deploy.heretto.com/dev/org/jorsek-qa-nightly/deployments/wVJmtAVdxYrtaCwaImDB/
  value: {
    deployApiDetails: {
      deployUrl: 'https://deploy.herett.com',
      organizationId: 'jorsek-qa-nightly',
      deploymentId: 'wVJmtAVdxYrtaCwaImDB',
      deployApiKey: ''
    },
    openAiKey: ''
  }
}

export const counterSlice = createSlice({
  name: 'apiDetails',
  initialState,
  reducers: {
    setDeployUrl: (state, action: PayloadAction<string>) => {
      state.value.deployApiDetails.deployUrl = action.payload
    },
    setOrganizationId: (state, action: PayloadAction<string>) => {
      state.value.deployApiDetails.organizationId = action.payload
    },
    setDeploymentId: (state, action: PayloadAction<string>) => {
      state.value.deployApiDetails.deploymentId = action.payload
    },
    setDeployApiKey: (state, action: PayloadAction<string>) => {
      state.value.deployApiDetails.deployApiKey = action.payload
    },
    setOpenAiKey: (state, action: PayloadAction<string>) => {
      state.value.openAiKey = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDeployUrl, setOrganizationId, setDeploymentId, setDeployApiKey, setOpenAiKey } = counterSlice.actions

export default counterSlice.reducer