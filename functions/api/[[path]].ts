import { handleApi, type Env } from "../../server/portfolio-api"

export const onRequest = (context: { request: Request; env: Env }) =>
  handleApi(context.request, context.env)
