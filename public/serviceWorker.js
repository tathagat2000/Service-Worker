self.addEventListener("fetch", (event) => {
  const destination = event.request.destination;

  if (destination === "image") {
    event.respondWith(
      (async () => {
        let response;
        try {
          response = await fetch(event.request);
        } catch (e) {
          console.log("Error while fetching event request", e);
        }
        console.log("Responded With", { event, response });
        return response;
      })()
    );
  }
});
