const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

/**
 * @warning В работе нужно использовать классовый подход и самописный HttpTransport
 * @see https://practicum.yandex.ru/learn/middle-frontend/courses/d0b6060f-550a-4fe8-bc01-3496013f7260/sprints/18176/topics/b8f31bf4-5dc3-4b69-8689-9e50e8a70921/lessons/83244899-b95f-409c-a634-2e0bc8f944e7/
 */
export function request<T extends any>({
  method,
  path,
  data,
}: any): Promise<T> {
  return sleep().then(() =>
    fetch(`${process.env.API_ENDPOINT}/${path}`, {
      method,
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null,
    })
      .then((response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json');
        return isJson ? response.json() : null;
      })
      .then((data) => {
        return data as unknown as T;
      }),
  );
}

request.post = <T>(path: string, data?: any) =>
  request<T>({ method: 'POST', path, data });
request.get = <T>(path: string) => request<T>({ method: 'GET', path });
