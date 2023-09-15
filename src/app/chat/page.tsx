"use client";

import { UserButton } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const userId = "user_2VQomYPZT93Xne0lVnIWdQTcJBw";

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

chatClient.connectUser(
  {
    id: userId,
    name: "Ricardo",
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVlFvbVlQWlQ5M1huZTBsVm5JV2RRVGNKQncifQ.nVKHEwvWbSEOOeaXcHqt9OL1Vk-WGofwemsIpPeeJ24"
);

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [userId],
});

export default function ChatPage() {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
