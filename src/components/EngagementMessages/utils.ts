import { ChannelDto, MessageDto } from "@src/types";

type ChannelsWithMessages = Record<
  //channelId
  string,
  {
    channelName: string;
    //tuple with [x,y] coords where x - date, y - messagesCount
    points: [number, number][];
  }
>;

const sortByDate = (a: MessageDto, b: MessageDto) =>
  new Date(a.timeBucket).getTime() - new Date(b.timeBucket).getTime();

//this utility class don`t need to have any inner state
class EngagementHelper {
  sortMessagesByDate(messages: MessageDto[]) {
    return [...messages].sort(sortByDate);
  }

  engagementMessageOverTimeChartOptions(
    messagesCountList: MessageDto[],
    channels: ChannelDto[]
  ) {
    const channelsWithMessages: ChannelsWithMessages = {};
    const result = [];
    const sortedMessages = this.sortMessagesByDate(messagesCountList);

    // using two pointers for iterating messages and channels
    let messagesIndex = 0;
    let channelsIndex = 0;

    while (messagesIndex < messagesCountList.length) {
      const currentMessage = sortedMessages[messagesIndex];
      const currentChannel = channels[channelsIndex];

      if (currentMessage?.channelId === currentChannel?.id) {
        channelsWithMessages[`${currentChannel.id}`] = {
          channelName: currentChannel.label,
          points: [
            ...(channelsWithMessages[`${currentChannel.id}`]?.points || []),
            [
              new Date(currentMessage.timeBucket).getTime(),
              parseInt(currentMessage.count),
            ],
          ],
        };
      }

      if (channelsIndex === channels.length - 1) {
        channelsIndex = 0;
        messagesIndex++;
      } else {
        channelsIndex++;
      }
    }

    for (const key in channelsWithMessages) {
      //filter channels with only one message
      if (channelsWithMessages[key].points.length > 1) {
        result.push({
          name: channelsWithMessages[key].channelName,
          data: channelsWithMessages[key].points,
        });
      }
    }

    // this config could be more configurable, but there weren`t any mentions about it
    return {
      title: { text: null },
      chart: {
        type: "spline",
      },
      xAxis: {
        type: "datetime",
        tickInterval: 24 * 3600 * 1000,

        tickWidth: 0,
        labels: {
          format: "{value:%e %b}",
        },
        title: {
          text: "Messages count",
        },
      },
      yAxis: { title: { text: "" } },
      series: result,
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.y} messages on {point.x:%e %b}",
      },
    };
  }
}

export const engagementHelper = new EngagementHelper();
