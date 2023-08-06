import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { engagementHelper } from "./utils";
import { messageCountList } from "@data/messages.json";
import { channels } from "@data/channels.json";
import { ChannelDto, MessageDto } from "@src/types";


export const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    //these could be easily rewritten to thunk/any other API request handlers
    messageCountList as MessageDto[],
    channels as ChannelDto[]
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
