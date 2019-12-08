export interface IDisplayMessage {
  type: string;
  sender: string;
  self: boolean;
  message: string;

  toHtml(): string;
}

export default class DisplayMessage implements IDisplayMessage {
  type: string;
  sender: string;
  message: string;
  self: boolean;

  toHtml(): string {
    return `<div class="bg-gray-100 rounded m-2  p-2">
      <span class="font-bold mr-2">${this.sender}</span>${this.message}
    </div>`;
  }
}
