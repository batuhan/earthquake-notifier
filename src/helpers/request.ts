import http from "http";

export default function get(url: string): Promise<string> {
  return new Promise(resolve => {
    http.get(url, res => {
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
