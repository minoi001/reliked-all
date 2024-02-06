const relikedApiKey = process.env.RELIKED_API_KEY;

export async function getRegId(useragenttype, useremail, useruuid) {
  let url = "";

  if (useremail) {
    url = `/api/swym/regid?useragenttype=${useragenttype}&useremail=${useremail}`;
  } else {
    url = `/api/swym/regid?useragenttype=${useragenttype}&useruuid=${useruuid}`;
  }

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

export async function getWishlists(regid, sessionid) {
  return await fetch(
    `/api/swym/wishlists?regid=${regid}&sessionid=${sessionid}`,
    {
      method: "POST",
      headers: {
        APIkey: relikedApiKey,
      },
    }
  ).then((response) => {
    return response.json();
  });
}

export async function getWishlistItems(sessionid, regid, lid) {
  return await fetch(
    `/api/swym/wishlist?regid=${regid}&sessionid=${sessionid}&lid=${lid}`,
    {
      method: "POST",
      headers: {
        APIkey: relikedApiKey,
      },
    }
  ).then((response) => {
    return response.json();
  });
}

export async function updateSwymWishlist(sessionid, regid, lid, request) {
  await fetch(
    `/api/swym/item/update?regid=${regid}&sessionid=${sessionid}&lid=${lid}`,
    {
      method: "POST",
      headers: {
        APIkey: relikedApiKey,
      },
      body: JSON.stringify(request),
    }
  ).catch((error) => {
    console.error("Error:", error);
  });
}
