import { FilterPage } from 'src/pages/main/filter/FilterPage';
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { z } from 'zod';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { zodResolver } from '@hookform/resolvers/zod';
import { commitSession } from 'src/app/server/sessions';
import { authenticate } from 'src/app/server/authenticate';
import { useLoaderData } from '@remix-run/react';

type FormData = z.infer<typeof filterSchema>;
const resolver = zodResolver(filterSchema);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { newSession } = await authenticate(request);

  const searchParams = new URL(request.url).searchParams;
  const { data: filterParams } = filterSchema.safeParse(Object.fromEntries(searchParams));
  const townList = searchParams.get('townList')?.split(',') ?? [];

  return json(
    { filter: { ...filterParams, townList } },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  const queries = Object.entries(data)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => {
      if (k !== 'townList') {
        return `${k}=${v}`;
      }
      return `${k}[]=${v}`;
    })
    .join('&');

  return redirect(`/?${queries}`);
};

export default function ListFilterPage() {
  const { filter } = useLoaderData<typeof loader>();
  return <FilterPage initialFilter={filter} />;
}
