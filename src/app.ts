import xml2js from "xml2js";
import get from "./helpers/request";
import { EARTHQUAKE_ENDPOINT } from "./helpers/config";

async function bootstrap(): Promise<void> {
  const data = await get(EARTHQUAKE_ENDPOINT);
  const parsedData = await xml2js.parseStringPromise(data);
  console.log(data, parsedData);
}

bootstrap();
