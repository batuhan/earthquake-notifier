import xml2js from "xml2js";
import get from "./helpers/request";
import { EARTHQUAKE_ENDPOINT } from "./helpers/config";

interface Earthquake {
  date: Date;
  location: string;
  latitude: number;
  longitude: number;
  magnitude: number;
  depth: number;
}

async function bootstrap(): Promise<void> {
  const data = await get(EARTHQUAKE_ENDPOINT);
  const parsedData = await xml2js.parseStringPromise(data);
  const mappedData = parsedData.eqlist.earhquake.map(
    (x: { $: Record<string, string> }): Earthquake => {
      const { $ } = x;
      return {
        date: new Date($.name.replace(".", "-")),
        location: $.lokasyon.trim(),
        latitude: Number($.lat),
        longitude: Number($.lng),
        magnitude: Number($.mag),
        depth: Number($.Depth)
      };
    }
  );
  console.log(mappedData);
}

bootstrap();
