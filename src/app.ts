import xml2js from "xml2js";
import { createConnection } from "typeorm";
import axios from "axios";
import { EARTHQUAKE_ENDPOINT, MAGNITUDE_THRESHOLD } from "./helpers/config";
import Earthquake, { Geocodes } from "./entities/earthquake";
import { openStreetMapGeocoder } from "./helpers/geocode";
import sendToSlack from "./helpers/sender";

async function save($: Record<string, string>): Promise<Earthquake | null> {
  const date = new Date(
    `${$.name.replace(/\./gi, "-").replace(/ /gi, "T")}+0300`
  );
  const location = $.lokasyon.trim();
  const oldEarthquake = await Earthquake.findOne({ where: { date, location } });
  if (!oldEarthquake) {
    const earthquake = new Earthquake();
    earthquake.date = date;
    earthquake.location = location;
    earthquake.latitude = Number($.lat);
    earthquake.longitude = Number($.lng);
    earthquake.magnitude = Number($.mag);
    earthquake.depth = Number($.Depth);
    const geocodes: Geocodes = {};
    const loc = {
      lat: earthquake.latitude,
      lon: earthquake.longitude
    };
    try {
      geocodes.openStreetMap = await openStreetMapGeocoder.reverse(loc);
      // geocodes.google = await googleGeocoder.reverse(loc);
    } catch (e) {
      console.log(e);
    }
    earthquake.geocodes = geocodes;
    return earthquake.save();
  }
  return null;
}

async function process($: Record<string, string>): Promise<Earthquake | null> {
  const earthquake = await save($);
  if (earthquake && earthquake.magnitude > MAGNITUDE_THRESHOLD) {
    await sendToSlack(earthquake);
  }
  return earthquake;
}

async function bootstrap(): Promise<void> {
  await createConnection();

  const { data } = await axios.get(EARTHQUAKE_ENDPOINT);
  const parsedData = await xml2js.parseStringPromise(data);
  const earthquakes = parsedData.eqlist.earhquake;

  const promises = [];
  for (let i = 0; i < earthquakes.length; i += 1) {
    const { $ } = earthquakes[i];
    promises.push(process($));
  }

  await Promise.all(promises);
}

bootstrap();
