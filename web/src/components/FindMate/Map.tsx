import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { signInInfo } from '../../recoil/AuthState/atoms';
import imgSrc from '../../assets/user-marker.png';
import UserProfile from './UserProfile';
import Modal from 'react-modal';

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
    const signInData = useRecoilValue(signInInfo);
    const token = sessionStorage.getItem('token');
    const [category, setCategory] = useState<string>('RUNNING');
    const kakaoMapRef = useRef<HTMLDivElement | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null); // 시연용으로 고정 위도 사용
    const [longitude, setLongitude] = useState<number | null>(null); // 시연용으로 고정 경도 사용
    const [users, setUsers] = useState<User[] | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [map, setMap] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const testlat = 37.566826;
    const testlng = 126.9786567;

    const handleCategoryClick = (newCategory: string) => {
        setCategory(newCategory);
        setSelectedUser(null);
    };

    // 내 위치 업데이트 함수
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

    // 3km 이내 사용자 불러오는 함수
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

    // 현재 위치 marker 생성하는 함수
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

    // 카테고리 변경 시 실행되는 함수
    useEffect(() => {
        // 현재 위치의 위도, 경도 상태에 저장
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // setLatitude(position.coords.latitude); // 시연용으로 고정 위도 사용
                    setLatitude(testlat);
                    // setLongitude(position.coords.longitude); // 시연용으로 고정 경도 사용
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

    // users가 존재 && 업데이트 시 실행되는 함수
    useEffect(() => {
        users?.forEach((user) => {
            // 좋아하는 운동에 현재 카테고리의 운동이 있는 user만 추출, 내 정보는 무시
            if (user.exerciseChoice.includes(category) && user.nickname !== signInData.nickname) {
                // 아까처럼 위치 설정해 marker를 찍어서 지도에 출력
                const userLatLng = new window.kakao.maps.LatLng(user.latitude, user.longitude);
                console.log(user.latitude, user.longitude);
                const marker = new window.kakao.maps.Marker({
                    position: userLatLng,
                    image: new window.kakao.maps.MarkerImage(
                        imgSrc,
                        new window.kakao.maps.Size(50, 50)
                    ),
                });
                marker.setMap(map);

                // 각 마커에 이벤트 리스너 등록
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                });
            }
        });
    }, [users]);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <MapContainer>
            <CategoryBtnTab>
                <CategoryBtn
                    className={`category01 ${category === 'RUNNING' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('RUNNING')}
                >
                    러닝
                </CategoryBtn>
                <CategoryBtn
                    className={`category02 ${category === 'HIKING' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('HIKING')}
                >
                    등산
                </CategoryBtn>
                <CategoryBtn
                    className={`category03 ${category === 'WEIGHT' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('WEIGHT')}
                >
                    헬스
                </CategoryBtn>
            </CategoryBtnTab>
            <MapBox ref={kakaoMapRef}>
                <GoBackButton onClick={createCurrentLocationMarker}>
                    <span className="blind">현재 위치로 이동</span>
                    <LightIcon icon={faCrosshairs} />
                </GoBackButton>
            </MapBox>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleToggleModal}
                contentLabel="Example Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: 'max-content',
                        height: 'max-content',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'none',
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <UserProfile selectedUser={selectedUser} />
            </Modal>
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

const CategoryBtnTab = styled.div`
    position: relative;
    top: 60px;
    z-index: 10;
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-style: none;
        border-radius: 15px;
        padding: 3px 10px;
        background-color: #fff;
        box-shadow: 2.5px 5px 10px rgba(0, 0, 0, 0.5);

        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 45%;
        // transform: translateX(-40%);
    }
    .category03 {
        left: 55%;
        // transform: translateX(-60%);
    }
`;
const CategoryBtn = styled.button``;

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

export default Map;
