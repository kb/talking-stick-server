defmodule MeetingAgent do
  require Logger

  @doc "Start a MeetingAgent for a given id and link to current process"
  def start(id) do
    Logger.debug("MeetingAgent start/1 id #{id}")
    # We use `start/2` instead of `start_link/2` to avoid the Agent getting
    # killed off if the originating requestor terminates its socket connection
    Agent.start(fn -> %Meeting{:queue => []} end, name: id)
  end

  @doc "Get the meeting struct"
  def get(id) do
    Agent.get(id, fn meeting ->
      {:ok, meeting}
    end)
  end

  @doc "Become the meeting moderator."
  def become_moderator(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.become_moderator(meeting, user)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end

  @doc "Give up moderator capabilities."
  def relinquish_moderator(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.relinquish_moderator(meeting, user)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end

  @doc "Reset the speaker and queue to default state"
  def reset_speaker_and_queue(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.reset_speaker_and_queue(meeting, user)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end

  @doc "Request the stick"
  def request_stick(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.request_stick(meeting, user, meeting.speaker)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end

  @doc "Unrequest the stick"
  def unrequest_stick(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.unrequest_stick(meeting, user)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end

  @doc "Pass the stick"
  def relinquish_stick(id, user) do
    Agent.get_and_update(id, fn meeting ->
      updated_meeting = Meeting.relinquish_stick(meeting, user, meeting.queue)
      {{:ok, updated_meeting}, updated_meeting}
    end)
  end
end
