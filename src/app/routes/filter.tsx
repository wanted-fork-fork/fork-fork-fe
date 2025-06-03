import { FilterPage } from 'src/pages/main/filter/FilterPage';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { getValidatedFormData } from 'remix-hook-form';
import { z } from 'zod';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof filterSchema>;
const resolver = zodResolver(filterSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  const queries = Object.entries(data)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return redirect(`/?${queries}`);
};

export default function ListFilterPage() {
  return <FilterPage />;
}
