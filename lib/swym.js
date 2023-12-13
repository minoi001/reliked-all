const relikedApiKey = process.env.RELIKED_API_KEY;

// get regID

export async function getRegId(url) {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      APIkey: relikedApiKey,
    },
  }).then((response) => {
    return response.json();
  });
  //   console.log(response);
  return response;
}
