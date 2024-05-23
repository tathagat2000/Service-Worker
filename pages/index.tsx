import { useState, useEffect } from "react";

export default function Home() {
  const [corsEnabled, setCorsEnabled] = useState(false);
  const corsProps = corsEnabled ? { crossOrigin: "anonymous" } : undefined;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((registration) => console.log("scope is: ", registration.scope))
        .catch((err) =>
          console.log(err, "Error while registering service worker")
        );
    }
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1080px",
        margin: "auto",
        fontSize: "20px",
      }}
    >
      <button type="button" onClick={() => setCorsEnabled((p) => !p)}>
        Click Here to Toggle Cors Request
      </button>
      <text>{corsEnabled ? "CORS is enabled" : "CORS is disabled"}</text>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src="https://i.imgur.com/oWm3Ssh.jpeg"
          alt="Annoyed Dog"
          style={{ width: "400px", objectFit: "cover" }}
          {...corsProps}
        />
        <img
          src="https://i.ytimg.com/vi/cCOL7MC4Pl0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLABOyGuIBaw1GFlzCQMY2pXOIyL0A"
          alt="Event Loop"
          style={{ width: "400px", objectFit: "cover" }}
          {...corsProps}
        />
      </div>

      <text>
        On clicking on Enabling CORS we basically add crossOrigin="anonymous"
        tag to the img
      </text>
      <text>
        <li>
          When an img tag is rendered, the browser makes a call to fetch the
          image.
        </li>
        <li>
          FetchMode of this call is "no-cors". This tells the browser to Block
          the frontend JavaScript code from seeing contents of the response body
          and headers under all circumstances. The browser can still read the
          response and accordingly render the image. It is just that the
          frontend code can't read the response.
        </li>
        <li>
          On adding crossOrigin="anonymous" tag, the fetchMode of the call is
          'cors'. What this implies is that if the cors rules are validated,
          then the network call goes through else it fails. In case it goes
          through, then the frontend JavaScript code can also read the response
          body and headers of the call
        </li>
        <li>
          The dog image that you're seeing here returns
          Access-Control-Allow-Origin: *, when a cors request is made. The Event
          loop image on the other hand does not, and hence the network call
          fails with a cors error and so you don't see the image being rendered
        </li>
      </text>

      <text style={{ fontWeight: 600 }}>
        How does this affect a service worker?
      </text>

      <text>
        <li>
          Our aim of adding a service worker was to check the network requests
          for img/video/audio, and log in case the network request fails.
        </li>
        <li>
          By default all these requests are no-cors, which blocks our frontend
          code from reading the response body, or headers. The status is also
          returned as 0, so there's no way for us to know if the call failed or
          succeeded. These no-cors calls are also called as opaque responses.{" "}
        </li>
        <li>
          Given that we can't add crossOrigin anonymous to our img components as
          it may cause regressions (The other domain might not return
          crossOrigin header, which will cause the call to fail and image won't
          be rendered all together), nor can we read opaque responses, it leaves
          us no way to use a service worker to know whether the call succedded
          or failed
        </li>
      </text>

      <text style={{ fontWeight: "600" }}>Opaque vs Normal Response</text>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src="opaqueResponse.png"
          alt="Opaque  Response"
          style={{ width: "400px" }}
        />
        <img
          src="normalResponse.png"
          alt="Normal  Response"
          style={{ width: "400px" }}
        />
      </div>
    </div>
  );
}
