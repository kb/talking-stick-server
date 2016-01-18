defmodule TalkingStick.PageController do
  use TalkingStick.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
