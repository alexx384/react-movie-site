import { useOutletContext } from '@remix-run/react';
import { SearchFormHeader } from '~/components/SearchFormHeader';
import { SearchFormHeaderContext } from '~/interfaces/outletContext';
import { AddMovieDialog } from '~/components/AddMovieDialog';

export default function NewMovieWithSearchFormHeader() {
  const props = useOutletContext<SearchFormHeaderContext>();
  return (
    <>
      <SearchFormHeader {...props} />
      <AddMovieDialog {...props} />
    </>
  );
}
