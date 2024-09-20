//* IMPORT
import { INDEX } from "../constants";

const generateElasticsearchAuth = ({ index = INDEX.CAR_INFO }) => {
  const username = process.env.ELASTIC_USERNAME;
  const password = process.env.ELASTIC_PASSWORD;

  const credentials = btoa(`${username}:${password}`);
  const authorizationHeader = `Basic ${credentials}`;

  return {
    authorizationHeader,
    index,
  };
};

export { generateElasticsearchAuth };
