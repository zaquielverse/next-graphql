import { QueryInput } from '@urql/exchange-graphcache';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query) {
  // @ts-ignore
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export default betterUpdateQuery;
