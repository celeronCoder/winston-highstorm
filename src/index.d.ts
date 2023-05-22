import { Highstorm, HighstormOptions } from "@highstorm/client";
import { LogEntry } from "winston";
import TransportStream, { TransportStreamOptions } from "winston-transport";

export class HighstormTransport extends TransportStream {
  protected highstormClient: typeof Highstorm.prototype;
  protected channelName: string;

  constructor(opts: HighstormTransportOptions);

  log(info: LogEntry, callback: any): void;
}

export type HighstormTransportOptions = TransportStreamOptions &
  HighstormOptions & { channelName: string };
