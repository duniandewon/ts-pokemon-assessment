interface Extensions {
  path: string;
  code: string;
}

export interface GQLError {
  message: string;
  extensions: Extensions;
}

export function GraphQLAdapter(baseURL: string) {
  const request = async <Response, Variables>(
    query: string,
    variables: Variables
  ) => {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.errors) {
        throw responseData.errors as GQLError[];
      }

      return responseData as Response;
    } catch (err) {
      const error = err as GQLError[];
      console.error("GraphQL request error:", error);
      throw error;
    }
  };

  return request;
}
