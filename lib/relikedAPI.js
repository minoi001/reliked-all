const relikedApiKey = process.env.RELIKED_API_KEY;

export async function getBrandVariables() {
  const response = await fetch("/api/selling/brands", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const variablesResponse = await response.json();
  return variablesResponse;
}

export async function getColourVariables() {
  const response = await fetch("/api/selling/colours", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const variablesResponse = await response.json();
  return variablesResponse;
}

export async function getInfluencerVariables() {
  const response = await fetch("/api/selling/influencers", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const variablesResponse = await response.json();
  return variablesResponse;
}

export async function getSizeVariables() {
  const response = await fetch("/api/selling/sizes", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const variablesResponse = await response.json();
  return variablesResponse;
}

export async function getTypeVariables() {
  const response = await fetch("/api/selling/types", {
    headers: {
      APIkey: relikedApiKey,
    },
  });
  const variablesResponse = await response.json();
  return variablesResponse;
}

export async function createProduct(input) {
  const response = await fetch("/api/products/createProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(input),
  });
  const variablesResponse = await response;
  return variablesResponse;
}
