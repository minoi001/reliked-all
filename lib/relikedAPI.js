const relikedApiKey = process.env.RELIKED_API_KEY;

export async function getBrandVariables() {
  const response = await fetch("/api/selling/brands", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const brandVariables = await response.json();
  console.log(brandVariables);
  return brandVariables;
}
