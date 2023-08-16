import axios from 'axios';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useRef, useState } from 'react';
import UserProfile from './UserProfile';

export interface User {
    id: number;
    gender: boolean;
    category: string;
    lat: number;
    long: number;
}
interface MapProps {
    category: string;
}
interface ApiResponse {
    data: User[];
}

const Map = (props: MapProps) => {
    const token: string = sessionStorage.getItem('token') || '';
    const [userData, setUserData] = useState({});

    //tab click
    const [category, setCategory] = useState<string>(props.category || '러닝');
    // map
    const kakaoMapRef = useRef<HTMLDivElement | null>(null);
    //user marker
    const [users, setUsers] = useState<User[]>([]);
    // user click
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [map, setMap] = useState<window.kakao.maps.Map | null>(null);

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);

                    if (map) {
                        map.panTo(newCenter);

                        // Add marker for current location with Kakao default icon
                        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: new kakao.maps.MarkerImage(
                                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                                new kakao.maps.Size(30, 45)
                            ),
                        });
                        marker.setMap(map);
                    }
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleMapClick = async (mouseEvent: any) => {
        const clickedLatLng = mouseEvent.latLng;
        const newMarkerPosition = {
            lat: clickedLatLng.getLat(),
            long: clickedLatLng.getLng(),
        };

        // 마커 생성
        if (map) {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(
                    newMarkerPosition.lat,
                    newMarkerPosition.long
                ),
                map: map,
            });

            // 서버로 위치 정보 전송하는 로직 추가
            if (selectedUser) {
                try {
                    await axios.post('/api/location', {
                        userId: selectedUser.id,
                        lat: newMarkerPosition.lat,
                        long: newMarkerPosition.long,
                    });
                    console.log('Location updated successfully.');
                } catch (error) {
                    console.error('Error updating location:', error);
                }
            }
        }
    };

    useEffect(() => {
        if (token) {
            getUserData(token)
                .then(() => {
                    // 데이터를 처리
                })
                .catch((error) => {
                    console.error('데이터를 불러오는 중 오류 발생:', error);
                    alert('회원정보를 받아오는데 실패했습니다.');
                });
        }
    }, []);

    const getUserData = async (token: string) => {
        try {
            const response = await axios.get<ApiResponse>('/api/users/my', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `/api/location/nearby?lat=${latitude}&long=${longitude}`,
                    {
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                    }
                );
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(window.kakao);
        console.log(window.kakao.maps);
        if (!kakaoMapRef.current) {
            return;
        }

        const options = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 카카오맵 디폴트 위치 (서울시청)
            level: 3,
        };
        const map = new window.kakao.maps.Map(kakaoMapRef.current, options);

        setMap(map);

        users
            .filter((user) => user.category === category)
            .forEach((user) => {
                const markerPosition = new window.kakao.maps.LatLng(user.lat, user.long);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);

                window.kakao.maps.event.addListener(marker, 'click', function () {
                    setSelectedUser(user);

                    // 마커 클릭 시 위치 등록 기능 실행
                    handleMapClick({ latLng: markerPosition });
                });
            });

        console.log('Creating map...');
    }, [users, category]);

    const handleClose = () => {
        setSelectedUser(null);
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
                <GoBackButton onClick={moveToCurrentLocation}>
                    <span className="blind">현재 위치로 이동</span>
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
    position: absolute;
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
//프로필
const UserProfileWrapper = styled.div`
    position: absolute;
    right: -120px;
    top: 200px;
    width: 30%;
    height: 100%;
`;

export default Map;
