defmodule TalkingStick.MeetingChannel do
  use TalkingStick.Web, :channel

  intercept [
    "become_moderator",
    "relinquish_moderator",
    "reset_speaker_and_queue",
    "request_stick",
    "unrequest_stick",
    "relinquish_stick"
  ]

  def setup(json) do
    %{:meeting_id => meeting_id, :user => user} =
      Poison.decode!(json, as: %{user: %User{}}, keys: :atoms!)

    meeting_id = String.to_atom(meeting_id)
    MeetingAgent.start_link(meeting_id)
    [meeting_id, user]
  end

  # handles the special `"lobby"` subtopic
  # TODO not sure we want this?
  def join("meetings:lobby", payload, socket) do
    if authorized?("lobby", payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # handles any other subtopic as the room ID, for example `"rooms:12"`, `"rooms:34"`
  # TODO Do we want this to "auth" the meeting request?
  def join("meetings:" <> meeting_id, auth_message, socket) do
    if authorized?(meeting_id, auth_message) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # TODO: These should only broadcast to "meeting" <> meeting_id
  def handle_in("become_moderator", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.become_moderator(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_in("relinquish_moderator", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.relinquish_moderator(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_in("reset_speaker_and_queue", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.reset_speaker_and_queue(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_in("request_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.request_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_in("unrequest_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.unrequest_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_in("relinquish_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.relinquish_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("become_moderator", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_out("relinquish_moderator", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_out("reset_speaker_and_queue", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_out("request_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_out("unrequest_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_out("relinquish_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  # TODO: Add real deal authorization logic here as required.
  defp authorized?(meeting_id, _payload) do
    if(meeting_id) do
      true
    else
      false
    end
  end
end
