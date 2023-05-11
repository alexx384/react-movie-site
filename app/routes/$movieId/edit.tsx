import { useOutletContext } from '@remix-run/react';
import { MovieIdContext } from '~/interfaces/outletContext';
import { EditMovieDialog } from '~/components/EditMovieDialog';
import { ActionArgs } from '@remix-run/node';
import { JSONResponse } from '~/hooks';
import { FullMovieInfo } from '~/interfaces/movieInfo';
import {
  createErrorActionResponse,
  createSuccessActionResponse,
} from '~/utils';
import { updateMovieData } from '~/api/movieApi';
import { mapFullMovieInfoToUpdateMovieResponse } from '~/utils/mapper.utils';

export const action = async ({
  request,
}: ActionArgs): Promise<JSONResponse<FullMovieInfo>> => {
  const body = await request.formData();
  const bodyData = body.get('data');
  if (!bodyData) {
    return createErrorActionResponse(
      'There is no data for update movie request'
    );
  }

  try {
    const parsedBodyData: FullMovieInfo = JSON.parse(String(bodyData));
    parsedBodyData.releaseDate = new Date(parsedBodyData.releaseDate);
    parsedBodyData.genreIds = new Set(parsedBodyData.genreIds);
    const formMovieData = mapFullMovieInfoToUpdateMovieResponse(parsedBodyData);
    const responseData = await updateMovieData(formMovieData);
    return createSuccessActionResponse(responseData);
  } catch (e) {
    return createErrorActionResponse((e as Error).message);
  }
};

export default function EditMovie() {
  const contextProps = useOutletContext<MovieIdContext>();
  return <EditMovieDialog {...contextProps} />;
}
