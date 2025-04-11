import { ReadonlyURLSearchParams } from 'next/navigation';

export function updateQueryString(
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
}

export function updateQueryStrings(
  params: { name: string; value: string }[],
  searchParams: ReadonlyURLSearchParams
) {
  const newParams = new URLSearchParams(searchParams.toString());
  params.forEach((param) => {
    newParams.set(param.name, param.value);
  });
  return newParams.toString();
}
