import { PushSubscription } from "web-push";

declare global {
  interface UserPrivateMetadata {
    subscriptions?: PushSubscription[];
  }

  interface UserUnsafeMetadata {
    mutedChannels?: string[];
  }
}
