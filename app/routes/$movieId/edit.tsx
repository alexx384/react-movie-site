import { useOutletContext } from '@remix-run/react';
import { MovieIdContext } from '~/interfaces/outletContext';
import { EditMovieDialog } from '~/components/EditMovieDialog';

export default function EditMovie() {
  const contextProps = useOutletContext<MovieIdContext>();
  return <EditMovieDialog {...contextProps} />;
}
