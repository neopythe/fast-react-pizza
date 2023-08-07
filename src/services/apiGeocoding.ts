interface Address {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<Address> {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!response.ok) throw Error("Failed getting address");

  const data = await response.json();
  return data;
}
