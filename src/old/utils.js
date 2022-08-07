import { exec } from "child_process";

export const objToStr = (obj) => {
  return `\`\`\`\n${JSON.stringify(obj, null, 2)}\`\`\``;
};

export const getCommand = (str) => {
  let cmd = "";
  const params = [];

  const rawCmd = str
    .replace("/", "")
    .replace("@findoss_lunch_order_bot", "")
    .split(" ");

  cmd = rawCmd.shift();
  if (rawCmd.length > 0) {
    params.push(...rawCmd);
  }

  return { cmd, params };
};

export const arraysEqual = (a1, a2) => {
  return JSON.stringify(a1) == JSON.stringify(a2);
};

export const checkServer = () => {
  return new Promise((res, rej) => {
    exec("pm2 jlist", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        rej();
      }

      const obj = JSON.parse(stdout);

      const formatted = obj.map((v) => {
        return {
          pid: v.pid,
          name: v.name,
          status: v.status,
          pm_uptime: v.pm2_env.pm_uptime,
          restart_time: v.pm2_env.restart_time,
          unstable_restarts: v.pm2_env.unstable_restarts,
          version: v.version,
          monit: v.monit,
        };
      });

      res(formatted);
    });
  });
};
