// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { load } from 'cheerio';
import { SearchItem } from '../../../types';
import {
  ITEM_SEARCH_ENDPOINT,
  SINGLE_ITEM_ENDPOINT,
} from '../../../utils/constants';

const DOFUSLAB_BASE_URL = 'https://dofuslab.io/view/';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const responseData = [];
      const { data } = await axios.get(
        `${DOFUSLAB_BASE_URL}${req.query.dofuslabUrl}` as string
      );
      const html = data;
      const $ = load(html);
      const parent = $('.css-6krhcy');
      const itemsWithNameAndImage = parent
        .map((_, elem) => ({
          name: elem.attribs.alt,
          image: elem.attribs.src.split('/item/')[1],
        }))
        .toArray();

      const returnResult = await Promise.all(
        itemsWithNameAndImage.map(async (item) => {
          const { data } = await axios.get(
            `${ITEM_SEARCH_ENDPOINT}${item.name}`
          );
          const filtered = data.filter((searchItem: SearchItem) => {
            const split = searchItem.image_urls.icon.split('/');
            return split[split.length - 1] === item.image;
          });
          return filtered;
        })
      );

      const flattened = returnResult.flatMap((item) => item);

      let uniqueItems = flattened.reduce((unique, o) => {
        if (!unique.some((obj: SearchItem) => obj.ankama_id === o.ankama_id)) {
          unique.push(o);
        }
        return unique;
      }, []);

      for (let item of uniqueItems) {
        const result = await axios.get(
          `${SINGLE_ITEM_ENDPOINT}${item.ankama_id}`
        );
        if (result.data.hasOwnProperty('recipe')) {
          responseData.push({ ...result.data, quantity: 1 });
        }
      }
      res.send(responseData);
    } catch (err) {
      console.log(err);
      res.send({ error: 'No such url!' });
    }
  }
}
