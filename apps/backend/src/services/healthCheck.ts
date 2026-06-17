import { Status } from '../../generated/prisma/enums';

export async function checkHTTP(url: string) {
  const start = Date.now();
  try {
    const res = await fetch(url);
    return {
      status: res.ok ? Status.ONLINE : Status.OFFLINE,
      responseMs: Date.now() - start
    };
  } catch {
    return {
      status: Status.OFFLINE,
      responseMs: null
    };
  }
}
