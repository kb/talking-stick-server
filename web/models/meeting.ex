defmodule Meeting do
  @derive [Poison.Encoder]
  defstruct [:moderator, :speaker, :queue]

  @doc "Become moderator if there currently is no moderator"
  def become_moderator(meeting, user) do
    case meeting.moderator do
      nil ->
        %{meeting | moderator: user}
      _ ->
        meeting
    end
  end

  @doc "Give up the moderator position"
  def relinquish_moderator(meeting, %{:id => user_id}) do
    case meeting.moderator do
      %{:id => ^user_id} ->
        %{meeting | moderator: nil}
      _ ->
        meeting
    end
  end

  @doc "Reset speaker and queue to default state if requesting user is the moderator"
  def reset_speaker_and_queue(meeting, %{:id => user_id}) do
    case meeting.moderator do
      %{:id => ^user_id} ->
        %{meeting | speaker: nil, queue: []}
      _ ->
        meeting
    end
  end

  @doc "There is no currently speaker, therefore set the requesting user to the speaker"
  def request_stick(meeting, user, nil) do
    %{meeting | speaker: user}
  end

  @doc "There is currently speaker, therefore add the requesting user to the queue"
  def request_stick(meeting, user, %{:id => speaker_id}) do
    if speaker_id == user.id or
    Enum.any?(meeting.queue, fn(queue_user) -> queue_user.id  == user.id end) do
      meeting
    else
      # From Elixir in action:
      # "In general, you should avoid adding elements to the end of a list.
      # Lists are most efficient when new elements are pushed to the top, or
      # popped from it."
      #
      # Maybe this should change? I don't expect the list to be that long, so O(n)
      # should be okay here (shrug)
      %{meeting | queue: List.insert_at(meeting.queue, -1, user)}
    end
  end

  @doc "Remove user from the queue"
  def unrequest_stick(meeting, user) do
    %{meeting | queue: List.delete(meeting.queue, user)}
  end

  # TODO: if not the speaker, but in queue. Remove from queue.
  @doc "Relinquish stick to the head of the queue and update the queue to tail"
  def relinquish_stick(meeting, %{:id => user_id}, [head|tail]) do
    case meeting.speaker do
      %{:id => ^user_id} ->
        %{meeting | speaker: head, queue: tail}
      _ ->
        meeting
    end
  end

  @doc "Relinquish stick to no one as the queue is empty"
  def relinquish_stick(meeting, %{:id => user_id}, []) do
    case meeting.speaker do
      %{:id => ^user_id} ->
        %{meeting | speaker: nil, queue: []}
      _ ->
        meeting
    end
  end
end
