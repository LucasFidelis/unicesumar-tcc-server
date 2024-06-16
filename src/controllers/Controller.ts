export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}

export interface HttpRequest {
  body: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
}

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: { message }
})

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: { message }
})

export const unauthorized = (message: string): HttpResponse => ({
  statusCode: 401,
  body: { message }
})

