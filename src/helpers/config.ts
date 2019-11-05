import { config } from "dotenv";

config();
config({ path: ".env.secret" });

function throwError(envVar: string): void {
  throw new Error(`env variable not set for ${envVar}`);
}

function throwStringError(envVar: string): string {
  throw throwError(envVar);
}

function throwNumberError(envVar: string): number {
  throw throwError(envVar);
}

export const IS_PRODUCTION = process.env.NODE_ENV === "production" || false;

export const EARTHQUAKE_ENDPOINT =
  process.env.EARTHQUAKE_ENDPOINT || throwStringError("EARTHQUAKE_ENDPOINT");

export const SLACK_HOOK_URL =
  process.env.SLACK_HOOK_URL || throwStringError("SLACK_HOOK_URL");

export const MAGNITUDE_THRESHOLD =
  Number(process.env.MAGNITUDE_THRESHOLD) ||
  throwNumberError("MAGNITUDE_THRESHOLD");

export const TIME_BETWEEN_EXECUTIONS =
  Number(process.env.TIME_BETWEEN_EXECUTIONS) ||
  throwNumberError("TIME_BETWEEN_EXECUTIONS");
