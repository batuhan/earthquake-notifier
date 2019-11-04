import axios, { AxiosResponse } from "axios";
import { SLACK_HOOK_URL } from "./config";
import Earthquake from "../entities/earthquake";

export default function sendToSlack(
  earthquake: Earthquake
): Promise<AxiosResponse> {
  return axios.post(SLACK_HOOK_URL, {
    text: `${earthquake.location} bölgesinde, ${earthquake.magnitude} şiddetinde deprem gerçekleşti.`
  });
}
