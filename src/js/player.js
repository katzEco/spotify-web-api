const authUrl = "https://accounts.spotify.com/authorize";
const client_id = "";
const redirect_uri = "http://localhost:1980/";
const scope = [
  "ugc-image-upload",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
];
const params = {
  response_type: "token",
  state: Date.now().toString(16),
  show_dialog: true,
  client_id,
  scope,
  redirect_uri,
};
const queryString = Object.keys(params)
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join("&");

// ====================

var access_token = window.localStorage.getItem("access_token");
var token_type = window.localStorage.getItem("token_type");
var expire_time = window.localStorage.getItem("expire_time");
if (
  !access_token ||
  `${access_token}` === "undefined" ||
  expire_time <= Date.now()
) {
  const hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  window.location.hash = "";
  if (hashParams.state) {
    window.localStorage.setItem("access_token", hashParams.access_token);
    window.localStorage.setItem("token_type", hashParams.token_type);
    window.localStorage.setItem(
      "expire_time",
      Date.now() + hashParams.expires_in * 1000
    );
    window.location.href = "/";
  }
  $("#login").show();
} else {
  $("#logout").show();
  var x = setInterval(function () {
    var expires_in = ((expire_time - Date.now()) / 1000).toFixed();
    $("#time").html(`Access Token Expires in : ${expires_in} sec`);
    if (expires_in < 0) {
      clearInterval(x);
      location.reload();
    }
    expires_in--;
  }, 1000);
}
