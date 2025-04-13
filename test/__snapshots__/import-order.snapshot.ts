import type { D } from "node:module";

import type { F } from "@third/party";
import type { E } from "third-party";

import type { G } from "@first/party";

import type { C } from "#subpath-import";

import type { B } from "/absolute";
import type { A } from "./relative";

import { d } from "node:module";

import { f } from "@third/party";
import { e } from "third-party";

import { g } from "@first/party";

import { c } from "#subpath-import";

import { b } from "/absolute";
import { a } from "./relative";
