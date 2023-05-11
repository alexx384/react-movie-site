import { useOutletContext } from '@remix-run/react';
import { MovieIdContext } from '~/interfaces/outletContext';
import { MovieDetailsHeader } from '~/components/MovieDetailsHeader';

export default function MovieIdIndex() {
  const contextProps = useOutletContext<MovieIdContext>();
  return <MovieDetailsHeader {...contextProps} />;
}
