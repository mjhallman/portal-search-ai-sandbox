import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import React, {ChangeEvent} from "react";
import {
  setDeployApiKey,
  setDeploymentId,
  setDeployUrl,
  setOpenAiKey, setOrganizationId
} from "./apiDetailsSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  TextField,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box} from "@mui/system";


const ApiDetailsForm = () => {
  const apiDetails = useSelector((state: RootState) => state.apiDetails.value)
  const deployApiDetails = apiDetails.deployApiDetails
  const dispatch = useDispatch()

  const handleChange = (valueToAction) => (e) => {
    dispatch(valueToAction(e.target.value))
  }

  return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
          <Typography>API Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Card variant="outlined">
              <Typography variant={"h4"}>Deployment info</Typography>
              <div><TextField label="Deploy URL" variant="standard" value={deployApiDetails.deployUrl} onChange={handleChange(setDeployUrl)}/></div>
              <div><TextField label="Organization ID" variant="standard" value={deployApiDetails.organizationId} onChange={handleChange(setOrganizationId)}/></div>
              <div><TextField label="Deployment ID" variant="standard" value={deployApiDetails.deploymentId} onChange={handleChange(setDeploymentId)}/></div>
              <div><TextField label="Deploy API Key" variant="standard" type={"password"} value={deployApiDetails.deployApiKey} onChange={handleChange(setDeployApiKey)} /></div>
            </Card>
          </Box>

          <Box>
            <Card variant="outlined">
              <Typography variant={"h4"}>Open AI Info</Typography>
              <div><TextField label="API Key" variant="standard" type="password" value={apiDetails.openAiKey} onChange={handleChange(setOpenAiKey)}/></div>
            </Card>
          </Box>
        </AccordionDetails>
      </Accordion>
  )
}

export default ApiDetailsForm