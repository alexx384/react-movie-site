import { useOutletContext } from '@remix-run/react';
import { SearchFormHeader } from '~/components/SearchFormHeader';
import { SearchFormHeaderContext } from '~/interfaces/outletContext';
import { AddMovieDialog } from '~/components/AddMovieDialog';
import { ActionArgs } from '@remix-run/node';
import { addMovieData } from '~/api/movieApi';
import { JSONResponse } from '~/hooks';
import { FullMovieInfo } from '~/interfaces/movieInfo';
import {
  createErrorActionResponse,
  createSuccessActionResponse,
} from '~/utils';
import { mapFullMovieInfoToCreateMovieResponse } from '~/utils/mapper.utils';

export const action = async ({
  request,
}: ActionArgs): Promise<JSONResponse<FullMovieInfo>> => {
  const body = await request.formData();
  const bodyData = body.get('data');
  if (!bodyData) {
    return createErrorActionResponse('There is no data for add movie request');
  }

  try {
    const parsedBodyData: FullMovieInfo = JSON.parse(String(bodyData));
    parsedBodyData.releaseDate = new Date(parsedBodyData.releaseDate);
    parsedBodyData.genreIds = new Set(parsedBodyData.genreIds);
    const formMovieData = mapFullMovieInfoToCreateMovieResponse(parsedBodyData);
    const responseData = await addMovieData(formMovieData);
    return createSuccessActionResponse(responseData);
  } catch (e) {
    return createErrorActionResponse((e as Error).message);
  }
};

export default function NewMovieWithSearchFormHeader() {
  const props = useOutletContext<SearchFormHeaderContext>();
  return (
    <>
      <SearchFormHeader {...props} />
      <AddMovieDialog {...props} />
    </>
  );
}
