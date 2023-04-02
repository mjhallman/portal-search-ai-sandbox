import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from "../components/search/Search";
import {RootState, store} from "../store/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import ApiDetailsForm from "../components/api_details/ApiDetailsForm";


export type ApiDetails = {
  deployApiDetails: DeployApiDetails
  openAiKey: string
}

export type DeployApiDetails = {
  deployUrl: string;
  organizationId: string;
  deploymentId: string;
  deployApiKey: string;
};

export default function Home() {

  return (
      <>
        <Head>
          <title>AI Sandbox</title>
          <meta name="description" content="Generated by create next app"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main>
          <Provider store={store}>
            <center><Typography variant={"h2"}>AI Sandbox</Typography></center>
            {/*<ApiDetailsForm/>*/}
            <Search/>

          </Provider>
        </main>
      </>
  )
}
