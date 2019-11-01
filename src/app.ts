import xml2js from "xml2js";
import { createConnection } from "typeorm";
import get from "./helpers/request";
import { EARTHQUAKE_ENDPOINT } from "./helpers/config";
import Earthquake from "./entities/earthquake";

async function stuff($: Record<string, string>): Promise<Earthquake | null> {
  const date = new Date($.name.replace(".", "-"));
  const location = $.lokasyon.trim();
  const oldEarthquake = await Earthquake.findOne({ where: { date, location } });
  if (!oldEarthquake) {
    const newEarthquake = new Earthquake();
    newEarthquake.date = date;
    newEarthquake.location = location;
    newEarthquake.latitude = Number($.lat);
    newEarthquake.longitude = Number($.lng);
    newEarthquake.magnitude = Number($.mag);
    newEarthquake.depth = Number($.Depth);
    return newEarthquake.save();
  }
  return null;
}

async function bootstrap(): Promise<void> {
  await createConnection();

  const data = await get(EARTHQUAKE_ENDPOINT);
  const parsedData = await xml2js.parseStringPromise(data);
  const earthquakes = parsedData.eqlist.earhquake;

  const promises = [];
  for (let i = 0; i < earthquakes.length; i += 1) {
    const { $ } = earthquakes[i];
    promises.push(stuff($));
  }

  await Promise.all(promises);
  console.log(promises);
}

bootstrap();
