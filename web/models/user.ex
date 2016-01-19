defmodule User do
  @derive [Poison.Encoder]
  defstruct [:id, :name, :email]

  # TODO: Should this be a protocol?
  def to_tuple(user) do
    {user.id, user}
  end
end
