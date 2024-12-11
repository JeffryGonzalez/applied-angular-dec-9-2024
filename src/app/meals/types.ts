export type Friend = { id: string; name: string; boughtLastTime: boolean };

export type FriendModel = Friend & { isPending: boolean };
