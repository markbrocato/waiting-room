/**
 * Waiting room
 */
export async function handleHttpRequest(req, context) {
  const url = "https://api1-origin.mockaroo.com/waiting-room-config.json";

  // Get the waiting room config and cache for 60 seconds
  const res = await fetch(url, {
    headers: {
      "X-Api-Key": "c12fbb80",
      Host: "my.api.mockaroo.com",
    },
    edgio: {
      origin: "api",
      caching: {
        max_age: "60s",
      },
    },
  });

  const { trafficPercentage } = await res.json();

  // Note Math.random() doesnt work in Sailfish due to a known bug
  if (Math.random() > trafficPercentage) {
    // let the user through
    context.respondWith(
      await fetch("https://test-team-waiting-room-default.edgio.link", {
        edgio: {
          origin: "edgio_serverless",
        },
      })
    );
  } else {
    // send them to the waiting room
    context.respondWith(
      await fetch(
        "https://test-team-waiting-room-default.edgio.link/waiting-room",
        {
          edgio: {
            origin: "edgio_serverless",
          },
        }
      )
    );
  }
}
