export type ChannelDto = {
  label: string;
  value: string;
  type: number;
  guild: string;
  guildId: string;
  parentId: null | string;
  permissionOverwrites: string[];

  nsfw: boolean;
  topic: null | string;
  id: string;
  rawPosition: number;
  createdTimestamp: number;
  rateLimitPerUser?: number;
  lastMessageId: null | string;
  // these fields could have concrete type, but the data don`t allow to identify them
  threads?: never[];
  messages?: never[];
};
