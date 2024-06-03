import chalk, { Chalk } from "chalk";

type MessageType = "error" | "success" | "info";

const CHALK_COLOR: Record<MessageType, Chalk> = {
  error: chalk.red,
  success: chalk.green,
  info: chalk.cyan,
};

interface CmdMessage {
  type: MessageType;
  message: string;
  data?: unknown;
}

const createCmdMessage = ({ type, message, data }: CmdMessage): void => {
  const params = [
    `${chalk.bold.magenta("[furniture-store-server]:")} ${CHALK_COLOR[type](
      message
    )}`,
    data ? JSON.stringify(data) : undefined,
  ].filter(Boolean);

  console.log(...params);
};

export default createCmdMessage;
