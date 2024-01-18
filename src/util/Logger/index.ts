import { LogColors, Logs } from "./LogColors";

export function LogServer(message: string) {
  console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Blue}${Logs.Server}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

export function LogError(message: string) {
  return console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Yellow}${Logs.Error}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

export function LogWarn(message: string) {
  return console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Yellow}${Logs.Warn}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

export function LogInfo(message: string) {
  console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Blue}${Logs.Info}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

export function LogGateway(message: string) {
  return console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Green}${Logs.Gateway}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

export function LogDatabase(message: string) {
  return console.log(
    `${LogColors.White}${LogColors.Bright}${LogColors.Cyan}${Logs.Database}${LogColors.White}: ${LogColors.White}${message}`,
  );
}

/**************************************/

// WOW https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express
export function LogRoutes(path: any, layer: any) {
  if (layer.route) {
    layer.route.stack.forEach(
      LogRoutes.bind(null, path.concat(split(layer.route.path))),
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      LogRoutes.bind(null, path.concat(split(layer.regexp))),
    );
  } else if (layer.method) {
    LogServer(
      `Route - ${layer.method.toUpperCase()} ${path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join("/")}`,
    );
  }
}

export function split(thing: any) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    const match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : "<complex:" + thing.toString() + ">";
  }
}
