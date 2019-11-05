import axios, { AxiosResponse } from "axios";
import { SLACK_HOOK_URL } from "./config";
import Earthquake from "../entities/earthquake";

export default function sendToSlack(
  earthquake: Earthquake
): Promise<AxiosResponse> {
  return axios.post(SLACK_HOOK_URL, {
    text: `
Son dakika: ${earthquake.location}, ${
      earthquake.magnitude
    } büyüklüğünde deprem ile sarsıldı - ${earthquake.date.toLocaleDateString(
      "tr"
    )}
Kandilli'nin son dakika verilerine göre ${earthquake.date.toLocaleTimeString(
      "tr"
    )} itibariyle ${earthquake.location} bölgesinde, ${
      earthquake.magnitude
    }. büyüklüğünde bir deprem meydana geldi.
Sarsıntı yerin ${earthquake.depth} kilometre derinliğinde kaydedildi.
`
  });
}
