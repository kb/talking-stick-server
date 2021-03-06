// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "deps/phoenix/web/static/js/phoenix"

let socket = new Socket("wss://talking-stick-service.herokuapp.com/socket")

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

// This is super jank. Just assume we have a query param and the value for the key
// is the id of the meeting we want to connect to. Really just for testing that channels
// are getting segmented on the broadcast/push from the server
let meeting_id = window.location.search.split('=')[1]
let user1_id = "1"
let user2_id = "2"
let user3_id = "3"
let user4_id = "4"

let channel_name = `meetings:${meeting_id}`
let channel = socket.channel(channel_name, {})
let meeting = $("#meeting")
let moderator = $("#moderator")
let speaker = $("#speaker")
let queue = $("#queue")

channel.on("meeting", payload => {
  console.log(payload)
  moderator.text(`${JSON.stringify(payload.meeting.moderator)}`)
  speaker.text(`${JSON.stringify(payload.meeting.speaker)}`)
  queue.text(`${JSON.stringify(payload.meeting.queue)}`)
})

channel.join()
  .receive("ok", resp => {
    console.log("Joined successfully", resp)
    let meeting = JSON.stringify({
      meeting_id: meeting_id
    })
    channel.push("sync", meeting)
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

let becomeModeratorUser1Button = $("#become-moderator-user1-button")
let becomeModeratorUser2Button = $("#become-moderator-user2-button")
let becomeModeratorUser3Button = $("#become-moderator-user3-button")
let becomeModeratorUser4Button = $("#become-moderator-user4-button")

let relinquishModeratorUser1Button = $("#relinquish-moderator-user1-button")
let relinquishModeratorUser2Button = $("#relinquish-moderator-user2-button")
let relinquishModeratorUser3Button = $("#relinquish-moderator-user3-button")
let relinquishModeratorUser4Button = $("#relinquish-moderator-user4-button")

let resetSpeakerAndQueueUser1Button = $("#reset-speaker-and-queue-user1-button")
let resetSpeakerAndQueueUser2Button = $("#reset-speaker-and-queue-user2-button")
let resetSpeakerAndQueueUser3Button = $("#reset-speaker-and-queue-user3-button")
let resetSpeakerAndQueueUser4Button = $("#reset-speaker-and-queue-user4-button")

let requestStickUser1Button = $("#request-stick-user1-button")
let requestStickUser2Button = $("#request-stick-user2-button")
let requestStickUser3Button = $("#request-stick-user3-button")
let requestStickUser4Button = $("#request-stick-user4-button")

let unrequestStickUser1Button = $("#unrequest-stick-user1-button")
let unrequestStickUser2Button = $("#unrequest-stick-user2-button")
let unrequestStickUser3Button = $("#unrequest-stick-user3-button")
let unrequestStickUser4Button = $("#unrequest-stick-user4-button")

let relinquishStickUser1Button = $("#relinquish-stick-user1-button")
let relinquishStickUser2Button = $("#relinquish-stick-user2-button")
let relinquishStickUser3Button = $("#relinquish-stick-user3-button")
let relinquishStickUser4Button = $("#relinquish-stick-user4-button")

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

resetSpeakerAndQueueUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("reset_speaker_and_queue", meeting)
})

resetSpeakerAndQueueUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("reset_speaker_and_queue", meeting)
})

resetSpeakerAndQueueUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("reset_speaker_and_queue", meeting)
})

resetSpeakerAndQueueUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("reset_speaker_and_queue", meeting)
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

unrequestStickUser1Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user1_id,
      name: "user1",
      email: "user1@example.com"
    }
  })
  channel.push("unrequest_stick", meeting)
})

unrequestStickUser2Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user2_id,
      name: "user2",
      email: "user2@example.com"
    }
  })
  channel.push("unrequest_stick", meeting)
})

unrequestStickUser3Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user3_id,
      name: "user3",
      email: "user3@example.com"
    }
  })
  channel.push("unrequest_stick", meeting)
})

unrequestStickUser4Button.on("click", event => {
  let meeting = JSON.stringify({
    meeting_id: meeting_id,
    user:{
      id: user4_id,
      name: "user4",
      email: "user4@example.com"
    }
  })
  channel.push("unrequest_stick", meeting)
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

export default socket
