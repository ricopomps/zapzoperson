import { UserButton } from "@clerk/nextjs";

export default function ChatPage() {
  return (
    <div>
      CHAT
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
