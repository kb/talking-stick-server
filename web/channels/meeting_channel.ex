defmodule TalkingStick.MeetingChannel do
  use TalkingStick.Web, :channel

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
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # handles any other subtopic as the room ID, for example `"rooms:12"`, `"rooms:34"`
  # TODO Do we want this to "auth" the meeting request?
  def join("meetings:" <> room_id, auth_message, socket) do
    if authorized?(auth_message) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("become_moderator", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.become_moderator(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("become_moderator", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_in("relinquish_moderator", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.relinquish_moderator(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("relinquish_moderator", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_in("reset_speaker_and_queue", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.reset_speaker_and_queue(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("reset_speaker_and_queue", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_in("request_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.request_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("request_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_in("unrequest_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.unrequest_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("unrequest_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end

  def handle_in("relinquish_stick", json, socket) do
    [meeting_id, user] = setup(json)

    {:ok, meeting} = MeetingAgent.relinquish_stick(meeting_id, user)
    broadcast! socket, "meeting", %{meeting: meeting}
    {:noreply, socket}
  end

  def handle_out("relinquish_stick", payload, socket) do
    push socket, "meeting", payload
    {:noreply, socket}
  end



















  # TEMP for getting it all working
  def handle_in("new_msg", %{"body" => body}, socket) do
    # Meeting.start_link(:new_msg)
    # Meeting.put_task(:new_msg, body, "foobar")
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end

  # TEMP for getting it all working
  def handle_out("new_msg", payload, socket) do
    # IO.puts(Meeting.get("new_msg"))
    push socket, "new_msg", payload
    {:noreply, socket}
  end

  # TEMP for getting it all working
  def handle_in("add_to_queue", %{"body" => body}, socket) do
    # Meeting.start_link(:add_to_queue)
    # Meeting.put_task(:add_to_queue, body, "foobar")
    broadcast! socket, "add_to_queue", %{body: body}
    {:noreply, socket}
  end

  # TEMP for getting it all working
  def handle_out("add_to_queue", payload, socket) do
    # IO.puts(Meeting.get("add_to_queue"))
    push socket, "add_to_queue", payload
    {:noreply, socket}
  end

  # BELOW IS ALL FROM GENERATOR

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (meetings:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end