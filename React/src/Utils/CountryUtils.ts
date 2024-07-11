import countryData from "../Assets/JSON/countries.json"

interface Country {
    Name: string;
    Code: string;
}

// Get country code by country name (used later to generate flag icons with external library)
export function getCountryCode(countryName: string): string | undefined {
    const country: Country | undefined = countryData.find((c: Country) => c.Name === countryName);
    return country ? country.Code : undefined;
}
