function IndexPage(session) {
  const index = `<!DOCTYPE html>
<html>
  <head>
    <title>katzPlayer</title>

    <style>
      @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Thai:100,200,300,regular,500,600,700);
      @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans+JP:100,200,300,regular,500,600,700);
      @import url(https://fonts.googleapis.com/css?family=Noto+Emoji:300,regular,500,600,700);

      * {
        font-family: "IBM Plex Sans Thai", "IBM Plex Sans JP", sans-serif;
        transition: all 0.3s;
      }

      body {
        padding: 0;
        margin: 0;

        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: center !important;
      }

      .container {
        width: 100%;
        height: 100vh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 2rem;

        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(1rem);
      }

      #logout {
        position: fixed;
        top: 2rem;
        right: 2rem;

        background: #ea3232;
        color: whitesmoke;
      }

      button {
        padding: 0.5rem 1rem;
        border-radius: 10px;
        border: none;
      }

      button:hover {
        border-radius: 1rem;
        opacity: 0.8;
        cursor: pointer;
      }

      .playerDetailed {
        width: 20rem;
        background: #2e2f2f;
        color: whitesmoke;
        border-radius: 1rem;

        display: flex;
        flex-direction: column;
      }

      .playerDetailed .cover {
        width: 100%;
        height: 20rem;
      }

      .cover img {
        width: 100%;
        height: auto;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }

      .playerDetailed .detailed {
        width: 100%;
        padding: 1rem 0;
      }

      .playerDetailed .detailed h2,
      .playerDetailed .detailed h4,
      .playerDetailed .detailed div {
        margin: 0;
        padding: 0 1rem;
        max-width: 90%;
        margin: auto 0;
        word-wrap: break-word;
      }

      .controller {
        padding: 1rem;
        background: #2e2f2f;
        border-radius: 1rem;
      }

      .controller .detailed input#durationBar {
        width: 100%;
      }

      .controller button {
        font-size: 24px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-family: "Noto Emoji", sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="playerDetailed">
        <div class="cover">
          <img src="" alt="cover" id="track-cover-image" />
        </div>
        <div class="detailed">
          <h2 id="track-title"></h2>
          <h4 id="track-artist"></h4>
          <div id="track-playlist"></div>
        </div>
      </div>
      <div class="controller">
        <div class="detailed">
          <input
            id="durationBar"
            type="range"
            min="0"
            step="0.1"
            value="0"
            max="220946"
          />
        </div>
        <button id="prev">⏮️</button>
        <button id="togglePlay"></button>
        <button id="next">⏭️</button>
      </div>
    </div>

    <button id="logout">Log Out</button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
      function SecToMin(sec) {
        var mins = Math.floor(sec / 60);
        var secs = Math.floor(sec - mins * 60);
        if (secs < 10) {
          secs = "0" + secs;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }
        return mins + ":" + secs;
      }

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = "${session}";
        const player = new Spotify.Player({
          name: "katz",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.1,
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          localStorage.setItem("device_id", device_id);
          fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: "Bearer ${session}",
            }),
            body: JSON.stringify({
              device_ids: [device_id],
              play: true,
            }),
          });

          Swal.fire({
            icon: "success",
            text: "Spotify Web Playback SDK is connected!",
          });

          window.setInterval(() => {
            player.getCurrentState().then((state) => {
              if (!state) return;
              document.querySelector("#durationBar").value = state.position;
            });
          });
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
          window.location.replace("/api/auth/logout");
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
          window.location.replace("/api/auth/logout");
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        document.getElementById("togglePlay").onclick = function () {
          player.togglePlay();
        };

        document.getElementById("prev").onclick = function () {
          player.previousTrack();
        };

        document.getElementById("next").onclick = function () {
          player.nextTrack();
        };

        document.querySelector("#logout").onclick = function () {
          window.location.replace("/api/auth/logout");
        };

        document.querySelector("#durationBar").onchange = function () {
          player.seek(document.querySelector("#durationBar").value);
        };

        player.on("player_state_changed", (state) => {
          const playlist =
            state.context.metadata.context_description !== undefined
              ? state.context.metadata.context_description
              : "Single";
          const trackImage =
            state.track_window.current_track.album.images[0].url;
          const trackName = state.track_window.current_track.name;
          const trackArtist = state.track_window.current_track.artists
            .map((a) => a.name)
            .join(", ");

          // Web Title
          const title = trackName + " | " + playlist;
          document.querySelector("title").innerHTML = title;

          // Body BG
          document.body.style.background = "url(" + trackImage + ")";

          // Detailed
          document.querySelector("#track-cover-image").src = trackImage;
          document.querySelector("#track-title").innerHTML = trackName;
          document.querySelector("#track-artist").innerHTML = trackArtist;
          document.querySelector("#track-playlist").innerHTML = playlist;

          // Controller
          document
            .querySelector("#durationBar")
            .setAttribute("max", state.duration);
          if (state.paused) {
            document.querySelector("#togglePlay").innerHTML = "▶️";
          } else {
            document.querySelector("#togglePlay").innerHTML = "⏸️";
          }
        });

        player.connect();
      };
    </script>
  </body>
</html>
`
  return index
}

module.exports = IndexPage
