defmodule ChatWeb.RoomChannel do
  use ChatWeb, :channel
  alias Chat.Users.User
  alias Chat.Repo
  alias Phoenix.Socket

  def join("room:lobby", _payload, socket) do
    if _current_user = socket.assigns[:current_user] do
      Phoenix.Socket.assign(socket, :room_id, "lobby")
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("room:" <> private_chat_id, _payload, socket) do
    if _current_user = socket.assigns[:current_user] do
      Phoenix.Socket.assign(socket, :room_id, private_chat_id)
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info(:after_join, socket) do
    room_id = socket.assigns[:room_id]

    socket = put_email(socket)
    email = socket.assigns[:email]
    broadcast!(socket, "after_join", %{email: email, room_id: room_id})

    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", _payload, socket) do
    socket = put_email(socket)
    email = socket.assigns[:email]
    broadcast!(socket, "ping", %{body: "ping", email: email})

    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    socket
    |> put_email
    |> broadcast!("new_msg", %{body: body, email: socket.assigns[:email]})

    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  defp put_email(socket) do
    # if nil = socket.assigns[:email] do
    # IO.puts "email is not defined"
    current_user_id = socket.assigns[:current_user]
    user = Repo.get!(User, current_user_id)
    email = user.email

    socket = Phoenix.Socket.assign(socket, :email, email)
    # end
    IO.inspect(socket.assigns)
    IO.puts(socket.assigns[:email])
    socket
  end
end
