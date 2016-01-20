// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "deps/phoenix/web/static/js/phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

let channel = socket.channel("meetings:lobby", {})
let meeting = $("#meeting")
let moderator = $("#moderator")
let speaker = $("#speaker")
let queue = $("#queue")

let becomeModeratorUser1Button = $("#become-moderator-user1-button")
let becomeModeratorUser2Button = $("#become-moderator-user2-button")
let becomeModeratorUser3Button = $("#become-moderator-user3-button")
let becomeModeratorUser4Button = $("#become-moderator-user-4button")

let relinquishModeratorUser1Button = $("#relinquish-moderator-user1-button")
let relinquishModeratorUser2Button = $("#relinquish-moderator-user2-button")
let relinquishModeratorUser3Button = $("#relinquish-moderator-user3-button")
let relinquishModeratorUser4Button = $("#relinquish-moderator-user4-button")

let requestStickUser1Button = $("#request-stick-user1-button")
let requestStickUser2Button = $("#request-stick-user2-button")
let requestStickUser3Button = $("#request-stick-user3-button")
let requestStickUser4Button = $("#request-stick-user4-button")

let relinquishStickUser1Button = $("#relinquish-stick-user1-button")
let relinquishStickUser2Button = $("#relinquish-stick-user2-button")
let relinquishStickUser3Button = $("#relinquish-stick-user3-button")
let relinquishStickUser4Button = $("#relinquish-stick-user4-button")

let meeting_id = "123456"
let user1_id = Math.random().toString(36).substr(2, 5)
let user2_id = Math.random().toString(36).substr(2, 5)
let user3_id = Math.random().toString(36).substr(2, 5)
let user4_id = Math.random().toString(36).substr(2, 5)

becomeModeratorUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("become_moderator", meeting)
})

becomeModeratorUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("become_moderator", meeting)
})

becomeModeratorUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("become_moderator", meeting)
})

becomeModeratorUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("become_moderator", meeting)
})

relinquishModeratorUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("relinquish_moderator", meeting)
})

relinquishModeratorUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("relinquish_moderator", meeting)
})

relinquishModeratorUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("relinquish_moderator", meeting)
})

relinquishModeratorUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("relinquish_moderator", meeting)
})

requestStickUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("request_stick", meeting)
})

requestStickUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("request_stick", meeting)
})

requestStickUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("request_stick", meeting)
})

requestStickUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("request_stick", meeting)
})

relinquishStickUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("relinquish_stick", meeting)
})

relinquishStickUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("relinquish_stick", meeting)
})

relinquishStickUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("relinquish_stick", meeting)
})

relinquishStickUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("relinquish_stick", meeting)
})


channel.on("meeting", payload => {
  console.log(payload)
  moderator.text(`${JSON.stringify(payload.meeting.moderator)}`)
  speaker.text(`${JSON.stringify(payload.meeting.speaker)}`)
  queue.text(`${JSON.stringify(payload.meeting.queue)}`)
})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
