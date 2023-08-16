import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
// import UserProfile from './UserProfile';

interface User {
    userId: number;
    nickname: string;
    gender: boolean;
    introduction: string;
    exerciseChoice: string[];
    latitude: number;
    longitude: number;
}

const Map: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [category, setCategory] = useState<string>('RUNNING');
    const kakaoMapRef = useRef<HTMLDivElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [map, setMap] = useState<any>(null);

    const testlat = 37.566826;
    const testlng = 126.9786567;

    const handleCategoryClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    const putCurrentLocation = async () => {
        try {
            const response = await axios.put(
                `/api/location?lat=${testlat}&long=${testlng}`,
                {},
                {
                    headers: { 'X-AUTH-TOKEN': token },
                }
            );
            console.log(response.data);
            getUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const getUsers = async () => {
        try {
            console.log(token);
            const response = await axios.get('/api/location/map', {
                headers: { 'X-AUTH-TOKEN': token },
            });
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createCurrentLocationMarker = () => {
        // 저장한 위도,경도 상태를 기반으로 현재 위치를 정의
        if (map) {
            const currentLatLng = new window.kakao.maps.LatLng(testlat, testlng);
            // 지도를 현재 위치로 이동하는 기능 포함
            map.panTo(currentLatLng);

            // 좌표의 위치를 기반으로 마커를 생성
            const marker = new window.kakao.maps.Marker({
                position: currentLatLng,
                image: new window.kakao.maps.MarkerImage(
                    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    new window.kakao.maps.Size(30, 45)
                ),
            });

            // 마커 객체를 map에 찍는 메서드
            marker.setMap(map);
        }

        putCurrentLocation();
    };

    useEffect(() => {
        console.log(window.kakao);
        console.log(window.kakao.maps);

        // 현재 위치의 위도, 경도 상태에 저장
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // setLatitude(position.coords.latitude);
                    setLatitude(testlat);
                    // setLongitude(position.coords.longitude);
                    setLongitude(testlng);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }

        // 카카오맵 오류시 탈출
        if (!kakaoMapRef.current) {
            return;
        }

        // 카카오맵 초기 위치 설정하여 map 상태에 저장
        const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
        };
        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);
        setMap(map);
    }, [category]);

    useEffect(() => {
        users?.forEach((user) => {
            const userLatLng = new window.kakao.maps.LatLng(user.latitude, user.longitude);
            console.log(user.latitude, user.longitude);
            const marker = new window.kakao.maps.Marker({
                position: userLatLng,
                image: new window.kakao.maps.MarkerImage(
                    'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                    new window.kakao.maps.Size(20, 30)
                ),
            });

            marker.setMap(map);
        });
    }, [users]);

    // const handleClose = () => {
    //     setSelectedUser(null);
    // };

    return (
        <MapContainer>
            <BtnTab>
                <Btn
                    className={`category01 ${category === 'RUNNING' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('RUNNING')}
                >
                    러닝
                </Btn>
                <Btn
                    className={`category02 ${category === 'HIKING' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('HIKING')}
                >
                    등산
                </Btn>
                <Btn
                    className={`category03 ${category === 'WEIGHT' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('WEIGHT')}
                >
                    헬스
                </Btn>
            </BtnTab>
            <MapBox ref={kakaoMapRef}>
                <GoBackButton onClick={createCurrentLocationMarker}>
                    <span className="blind">현재 위치로 이동</span>
                    <LightIcon icon={faCrosshairs} />
                </GoBackButton>
            </MapBox>
            {selectedUser && (
                <UserProfileWrapper>
                    {/* <UserProfile user={selectedUser} onClose={handleClose} /> */}
                </UserProfileWrapper>
            )}
        </MapContainer>
    );
};

const MapContainer = styled.div`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 0px auto;
    padding: 20px 60px;
    box-sizing: border-box;
    transition: all 0.3s;
`;

const BtnTab = styled.div`
    position: relative;
    top: 30px;
    z-index: 10;
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #000;
        border-radius: 20px;
        padding: 4px 20px;
        background-color: #fff;

        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;
const Btn = styled.button``;

const MapBox = styled.div`
    position: absolute;
    top: 130px;
    left: 10%;
    width: 80%;
    height: 70%;
    border-radius: 10px;
    transition: all 0.3s;
`;
const GoBackButton = styled.button`
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px;
    border: none;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 10;
`;
const LightIcon = styled(FontAwesomeIcon)`
    font-size: 28px;
    color: rgb(18, 17, 17);
`;

const UserProfileWrapper = styled.div`
    position: absolute;
    right: -120px;
    top: 200px;
    width: 30%;
    height: 100%;
`;

export default Map;
