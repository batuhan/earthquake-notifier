import http from "http";
import xml2js from "xml2js";

function get(): Promise<string> {
  return new Promise(resolve => {
    http.get("http://udim.koeri.boun.edu.tr/zeqmap/xmlt/son24saat.xml", res => {
      let data = "";

      // A chunk of data has been received.
      res.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received.
      res.on("end", () => {
        resolve(data);
      });
    });
  });
}

async function bootstrap(): Promise<void> {
  const data = await get();
  const parsedData = await xml2js.parseStringPromise(data);
  console.log(data, parsedData);
}

bootstrap();
