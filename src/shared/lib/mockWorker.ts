import {setupWorker} from "msw/browser";
import {getGoogooApiMock} from "src/types";

export const worker = setupWorker(...getGoogooApiMock());