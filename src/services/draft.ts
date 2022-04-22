const baseUrL = "https://api.bryansuralta.com/draft";

export const insert = (htmlBody: string) => {
  const data = {
    user: {
      S: "test",
    },
    body: {
      S: htmlBody,
    },
  };

  return fetch(baseUrL + "/insert", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
