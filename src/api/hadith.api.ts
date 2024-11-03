import axios from "axios";
import { basePath } from "../common/env";

export const fetchHadiths = async (hadithNo: number) => {
  const response = await axios.get(`${basePath}/hadiths`, {
    params: { hadith_no: hadithNo },
  });
  return response.data.hadiths || [];
};
