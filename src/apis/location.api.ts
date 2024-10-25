import { ILocationReqDto, ILocationResDto } from "../types/location.type";
import { locationUrl } from "./client";
import { urls } from "./urls";

type getLocationDataType = (_: ILocationReqDto) => Promise<ILocationResDto>;
export const getLocationData: getLocationDataType = async (params) => {
  const client = locationUrl();
  const response = await client.get(urls.location, {
    params: {
      q: params.q,
      key: params.key,
    },
  });
  console.log(response);
  return response.data;
};
