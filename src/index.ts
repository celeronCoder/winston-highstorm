import Transport, { TransportStreamOptions } from "winston-transport";
import { Highstorm, HighstormOptions } from "@highstorm/client";
import type { LogEntry } from "winston";

export class HighstormTransport extends Transport {
  protected highstormClient: typeof Highstorm.prototype;
  protected channelName: string;
  constructor(
    opts: TransportStreamOptions & HighstormOptions & { channelName: string }
  ) {
    super(opts);

    this.highstormClient = new Highstorm({ token: opts.token });
    this.channelName = opts.channelName;
  }

  log(info: LogEntry, callback: any) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    // ingest data to highstorm
    const { level, message, ...meta } = info;

    this.highstormClient
      .ingest(this.channelName, {
        event: level,
        content: message,
        metadata: meta,
      })
      .then((res) => {
        if (res.id) callback();
      })
      .catch((error) => {
        new Error(error);
      });
  }
}
