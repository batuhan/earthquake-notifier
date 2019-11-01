import xml2js from "xml2js";
import get from "./helpers/request";

async function bootstrap(): Promise<void> {
  const data = await get(
    "http://udim.koeri.boun.edu.tr/zeqmap/xmlt/son24saat.xml"
  );
  const parsedData = await xml2js.parseStringPromise(data);
  console.log(data, parsedData);
}

bootstrap();
