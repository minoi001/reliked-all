const relikedApiKey = process.env.RELIKED_API_KEY;

// get regID

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
  const response = await fetch(
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
  //   console.log(response);
  return response;
}

export async function getWishlistItems(
  sessionid,
  regid,
  lid,
  next,
  itemslimit,
  sortby,
  sortorder,
  filterby
) {
  const response = await fetch(
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
  //   console.log(response);
  return response;
}

export async function wishlistItemUpdate(sessionid, regid, lid, request) {
  // const testItemInfo = {
  //   variantId: "2222",
  //   productId: "4444",
  //   handle: "test-product-handle",
  // };

  console.log(request);
  const response = await fetch(
    `/api/swym/item/update?regid=${regid}&sessionid=${sessionid}&lid=${lid}`,
    {
      method: "POST",
      headers: {
        APIkey: relikedApiKey,
      },
      body: JSON.stringify(request),
    }
  ).then((response) => {
    return response.json();
  });
  //   console.log(response);
  return response;
}
