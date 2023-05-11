import { useOutletContext } from '@remix-run/react';
import { SearchFormHeaderContext } from '~/interfaces/outletContext';
import { SearchFormHeader } from '~/components/SearchFormHeader';

export default function RootIndex() {
  const contextProps = useOutletContext<SearchFormHeaderContext>();
  return <SearchFormHeader {...contextProps} />;
}
