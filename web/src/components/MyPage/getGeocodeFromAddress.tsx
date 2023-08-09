import axios from 'axios';

type Address = string;

interface KakaoApiResponse {
    documents: { x: number; y: number }[];
}
// 주소를 좌표로 변환하는 함수
const getGeocodeFromAddress = async (
    address: Address
): Promise<{ lat: number; long: number } | null> => {
    const APP_GEO_CODE_API_KEY = import.meta.env.VITE_APP_GEO_CODE_API_KEY as string;
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
    )}`;
    const headers = {
        Authorization: `KakaoAK ${APP_GEO_CODE_API_KEY}`,
    };

    try {
        const response = await axios.get<KakaoApiResponse>(url, { headers });
        const { documents } = response.data;
        if (documents.length > 0) {
            const { x: long, y: lat } = documents[0] as { x: number; y: number };
            return { lat, long };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Geocoding API 호출 오류:', error);
        return null;
    }
};

export default getGeocodeFromAddress;
