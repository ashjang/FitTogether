import axios, { AxiosResponse } from 'axios';

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useRef, useState } from 'react';
import UserProfile from './UserProfile';

export interface User {
    id: number;
    category: string;
    lat: number;
    long: number;
}
interface MapProps {
    category: string;
    userLocation: { lat: number; long: number };
}

const Map = (props: MapProps) => {
    const [authToken, setAuthToken] = useState('');
    const [category, setCategory] = useState<string>(props.category || '러닝');
    const kakaoMapRef = useRef<HTMLDivElement | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [initialCenter, setInitialCenter] = useState<kakao.maps.LatLng | null>(null);

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    const handleGoBackToInitial = () => {
        if (initialCenter && kakaoMapRef.current) {
            const map = new kakao.maps.Map(kakaoMapRef.current, {
                center: initialCenter,
                level: 3,
            });

            const filteredUsers = users.filter((user) => user.category === category);

            // 사용자의 현재 위치 마커 생성
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;

                        const userMarkerPosition = new kakao.maps.LatLng(userLat, userLng);
                        const markerOptions = {
                            position: userMarkerPosition,
                            image: new kakao.maps.MarkerImage(
                                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                                new kakao.maps.Size(24, 35)
                            ),
                        };
                        const newUserMarker = new kakao.maps.Marker(markerOptions);
                        newUserMarker.setMap(map);
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    }
                );
            }

            // 다른 유저 마커 생성 로직...
            filteredUsers.forEach((user) => {
                const markerPosition = new kakao.maps.LatLng(user.lat, user.long);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                kakao.maps.event.addListener(marker, 'click', function (this: kakao.maps.Marker) {
                    setSelectedUser(user);
                });
            });

            console.log('Creating map...');
        }
    };

    useEffect(() => {
        const storedAuthToken = sessionStorage.getItem('authToken');
        if (storedAuthToken) {
            setAuthToken(storedAuthToken);
        }
    }, []);

    useEffect(() => {
        axios
            .get(`/api/users/${userId}`, {
                headers: {
                    'X-AUTH-TOKEN': authToken,
                },
                params: {
                    category: category,
                },
            })
            .then((response) => {
                const data = response.data;
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, [category, authToken]);

    useEffect(() => {
        if (!kakaoMapRef.current) {
            return;
        }

        const targetPoint = new kakao.maps.LatLng(props.userLocation.lat, props.userLocation.long);

        const options = {
            center: targetPoint,
            level: 3,
        };

        setInitialCenter(targetPoint); // 초기 위치 저장

        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);

        // Geolocation API를 사용하여 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // 사용자의 현재 위치 마커 생성
                    const userMarkerPosition = new kakao.maps.LatLng(userLat, userLng);
                    const markerOptions = {
                        position: userMarkerPosition,
                        // 기본 마커 이미지 사용
                        image: new kakao.maps.MarkerImage(
                            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                            new kakao.maps.Size(24, 35)
                        ),
                    };
                    const newUserMarker = new kakao.maps.Marker(markerOptions);
                    newUserMarker.setMap(map);
                },
                (error) => {
                    console.error('Error getting current position:', error);
                }
            );
        }

        users
            .filter((user) => user.category === category)
            .forEach((user) => {
                const markerPosition = new kakao.maps.LatLng(user.lat, user.long);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                kakao.maps.event.addListener(marker, 'click', function (this: kakao.maps.Marker) {
                    setSelectedUser(user);
                });
            });

        console.log('Creating map...');
    }, [props.userLocation, users, category]);

    const handleClose = () => {
        setSelectedUser(null);
    };

    const handleFetchUserData = async (userId: number) => {
        try {
            const response: AxiosResponse<User> = await axios.get(`/api/users/${userId}`, {
                headers: {
                    'X-AUTH-TOKEN': authToken,
                },
            });

            const userData: User = response.data;

            // userData를 활용하여 원하는 작업을 수행
            console.log(userData.category, userData.lat, userData.long);
            // 또는 다른 함수 호출
            handleMapMarkerCreation(userData.lat, userData.long);

            setSelectedUser(userData);
            console.log('User data fetched successfully');
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <MapContainer isSidebarOpen={selectedUser !== null}>
            <BtnTab>
                <button
                    className={`category01 ${category === '러닝' ? 'active' : ''}`}
                    onClick={() => handleTabClick('러닝')}
                >
                    러닝
                </button>
                <button
                    className={`category02 ${category === '등산' ? 'active' : ''}`}
                    onClick={() => handleTabClick('등산')}
                >
                    등산
                </button>
                <button
                    className={`category03 ${category === '헬스' ? 'active' : ''}`}
                    onClick={() => handleTabClick('헬스')}
                >
                    헬스
                </button>
            </BtnTab>
            <MapBox ref={kakaoMapRef} isSidebarOpen={selectedUser !== null}>
                <GoBackButton onClick={handleGoBackToInitial}>
                    <span className="blind">원래 위치로 돌아가기</span>
                    <LightIcon icon={faCrosshairs} />
                </GoBackButton>
            </MapBox>
            {selectedUser && (
                <UserProfileWrapper>
                    <UserProfile user={selectedUser} onClose={handleClose} />
                </UserProfileWrapper>
            )}
        </MapContainer>
    );
};

const MapContainer = styled.div<{ isSidebarOpen: boolean }>`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 0px auto;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
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
const MapBox = styled.div<{ isSidebarOpen: boolean }>`
    position: relative;
    // position: absolute;
    top: 130px;
    // left: 50%;
    // transform: translateX(-50%);

    // width: ${(props) => (props.isSidebarOpen ? '50%' : '70%')};
    width: 80%;
    height: 70%;

    border-radius: 10px;
    transition: all 0.3s;

    left: ${(props) => (props.isSidebarOpen ? '40%' : '50%')};
    transform: translateX(${(props) => (props.isSidebarOpen ? '-50%' : '-50%')});
`;
const GoBackButton = styled.button`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 28px;
    padding: 4px;
    border: none;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 10;
`;
const LightIcon = styled(FontAwesomeIcon)`
    font-weight: lighter;
    stroke-width: 1;
    color: rgb(18, 17, 17);
`;
//프로필
const UserProfileWrapper = styled.div`
    position: absolute;
    right: -120px;
    top: 200px;
    width: 30%;
    height: 100%;
`;

export default Map;
