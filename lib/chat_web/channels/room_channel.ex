defmodule ChatWeb.RoomChannel do
  use ChatWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_chat_id, _payload, _socket) do
    {:error, %{reason: "unauthorized"}}
      # if authorized?(payload) do
      #   {:ok, socket}
      # else
      #   {:error, %{reason: "unauthorized"}}
      # end
  end



  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
